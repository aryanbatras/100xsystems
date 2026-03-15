import matter from 'gray-matter';
import tar from 'tar-stream';
import * as zlib from 'zlib';
import { GitHubApiClient } from './githubApiClient';
import { PathNode, PathContent, PathMetadata, ParsedMarkdown } from './pathTypes';

export class PathParser {
  private githubClient: GitHubApiClient;
  private fileContents: Map<string, string> = new Map();

  constructor() {
    this.githubClient = new GitHubApiClient();
  }

  private parseMarkdown(content: string): ParsedMarkdown {
    try {
      const { data, content: markdownContent } = matter(content);
      
      const metadata: PathMetadata = {
        title: data.title || 'Untitled',
        description: data.description || '',
        subfolders: Array.isArray(data.subfolders) ? data.subfolders : []
      };

      return {
        metadata,
        content: markdownContent.trim()
      };
    } catch (error) {
      console.error('Error parsing markdown:', error);
      return {
        metadata: {
          title: 'Untitled',
          description: '',
          subfolders: []
        },
        content: content
      };
    }
  }

  private createPathNode(
    id: string,
    path: string,
    metadata: PathMetadata,
    content: string,
    level: number
  ): PathNode {
    return {
      id,
      path,
      title: metadata.title,
      description: metadata.description,
      content,
      subfolders: metadata.subfolders,
      children: [],
      level,
      isExpanded: level === 0 // Root node starts expanded
    };
  }

  private async extractTarball(tarball: ArrayBuffer): Promise<Map<string, string>> {
    // GitHub tarballs are gzipped, so we need to decompress first
    const decompressed = await new Promise<Buffer>((resolve, reject) => {
      zlib.gunzip(Buffer.from(tarball), (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
    
    return new Promise((resolve, reject) => {
      const fileContents = new Map<string, string>();
      const extract = tar.extract();
      const buffer = decompressed;

      extract.on('entry', (header, stream, next) => {
        const filePath = header.name;
        
        // Only process markdown files
        if (filePath.endsWith('.md')) {
          const chunks: Buffer[] = [];
          
          stream.on('data', (chunk) => {
            chunks.push(chunk);
          });
          
          stream.on('end', () => {
            const content = Buffer.concat(chunks).toString('utf-8');
            fileContents.set(filePath, content);
            next();
          });
          
          stream.on('error', (error) => {
            console.error(`Error extracting file ${filePath}:`, error);
            next();
          });
        } else {
          stream.resume(); // Skip non-markdown files
          next();
        }
      });

      extract.on('finish', () => {
        resolve(fileContents);
      });

      extract.on('error', (error) => {
        reject(error);
      });

      extract.write(buffer);
      extract.end();
    });
  }

  private getFileContent(filePath: string): string {
    // GitHub tarball structure: username-repo-hash/filename
    for (const [tarPath, content] of this.fileContents) {
      const cleanPath = tarPath.replace(/^[^\/]+\//, ''); // Remove username-repo-hash prefix
      if (cleanPath === filePath || cleanPath.endsWith(`/${filePath}`)) {
        return content;
      }
    }
    
    // Try exact match with prefix
    for (const [tarPath, content] of this.fileContents) {
      if (tarPath.endsWith(`/${filePath}`) || tarPath.endsWith(filePath)) {
        return content;
      }
    }
    
    throw new Error(`File not found: ${filePath}. Available files: ${Array.from(this.fileContents.keys()).join(', ')}`);
  }

  private async buildNodeFromPath(
    dirPath: string,
    level: number,
    parentPath: string = ''
  ): Promise<PathNode | null> {
    try {
      const indexPath = dirPath === '' ? 'index.md' : `${dirPath}/index.md`;
      const markdownContent = this.getFileContent(indexPath);
      const parsed = this.parseMarkdown(markdownContent);
      
      const nodeId = dirPath === '' ? 'root' : dirPath;
      const node = this.createPathNode(
        nodeId,
        dirPath,
        parsed.metadata,
        parsed.content,
        level
      );

      // Recursively build children if subfolders are defined
      if (parsed.metadata.subfolders.length > 0) {
        for (const subfolder of parsed.metadata.subfolders) {
          const childPath = dirPath === '' ? subfolder : `${dirPath}/${subfolder}`;
          try {
            const childNode = await this.buildNodeFromPath(childPath, level + 1, dirPath);
            
            if (childNode) {
              node.children.push(childNode);
            }
          } catch (error) {
            console.warn(`Skipping missing subfolder ${childPath}:`, error);
            // Continue with other subfolders even if this one fails
          }
        }
      }

      return node;
    } catch (error) {
      console.error(`Error building node from path ${dirPath}:`, error);
      return null;
    }
  }

  private collectAllNodes(node: PathNode, allNodes: Record<string, PathNode> = {}): Record<string, PathNode> {
    allNodes[node.id] = node;
    
    for (const child of node.children) {
      this.collectAllNodes(child, allNodes);
    }
    
    return allNodes;
  }

  private calculateMaxDepth(node: PathNode, currentDepth: number = 0): number {
    if (node.children.length === 0) {
      return currentDepth;
    }
    
    return Math.max(
      ...node.children.map(child => this.calculateMaxDepth(child, currentDepth + 1))
    );
  }

  async parsePathContent(): Promise<PathContent> {
    try {
      // Verify repository exists first
      const repoExists = await this.githubClient.repositoryExists();
      if (!repoExists) {
        throw new Error('GitHub repository does not exist or is not accessible');
      }

      // Download repository as tarball (single API call)
      console.log('📦 Downloading repository tarball...');
      const tarball = await this.githubClient.downloadRepositoryAsTarball();
      
      // Extract all markdown files from tarball
      console.log('📂 Extracting tarball...');
      this.fileContents = await this.extractTarball(tarball);
      console.log(`✅ Extracted ${this.fileContents.size} files`);

      // Build the structure manually based on the actual repository structure
      const rootNode = await this.buildPathStructure();
      
      if (!rootNode) {
        throw new Error('Failed to build root node from repository');
      }

      // Collect all nodes and calculate statistics
      const allNodes = this.collectAllNodes(rootNode);
      const maxDepth = this.calculateMaxDepth(rootNode);

      const pathContent: PathContent = {
        root: rootNode,
        allNodes,
        totalNodes: Object.keys(allNodes).length,
        maxDepth
      };

      console.log(`✅ Parsed path content: ${pathContent.totalNodes} nodes, max depth: ${maxDepth}`);
      return pathContent;

    } catch (error) {
      console.error('❌ Error parsing path content:', error);
      throw error;
    }
  }

  private async buildPathStructure(): Promise<PathNode> {
    // Create a manual root node based on the repository structure we know exists
    const rootContent = `# 100xSystems Learning Paths

This repository contains structured learning content organized by paths and topics for comprehensive learning.

## Available Paths

- **Foundations**: Programming fundamentals including Java, Python, JavaScript, and Data Structures
- **System Design**: Architecture, scalability, and distributed systems
- **Development**: Tools and methodologies (coming soon)
- **Design Patterns**: OOP and architectural patterns (coming soon)
- **Security**: Security principles and cryptography (coming soon)
- **Optimization**: Performance tuning and scalability (coming soon)`;

    const rootNode: PathNode = {
      id: 'root',
      path: '',
      title: '100xSystems Learning Paths',
      description: 'Structured learning content organized by paths and topics for comprehensive learning',
      content: rootContent,
      subfolders: ['foundations', 'system-design'],
      children: [],
      level: 0,
      isExpanded: true
    };

    // Build foundations path
    const foundationsNode = await this.buildNodeFromPath('foundations', 1);
    if (foundationsNode) {
      rootNode.children.push(foundationsNode);
    }

    // Build system-design path
    const systemDesignNode = await this.buildNodeFromPath('system-design', 1);
    if (systemDesignNode) {
      rootNode.children.push(systemDesignNode);
    }

    return rootNode;
  }
}
