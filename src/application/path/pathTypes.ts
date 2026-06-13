export interface PathMetadata {
  title: string;
  description: string;
  subfolders: string[];
}

export interface PathNode {
  id: string;
  path: string;
  title: string;
  description: string;
  content: string;
  subfolders: string[];
  children: PathNode[];
  level: number;
  isExpanded: boolean;
}

export interface PathContent {
  root: PathNode;
  allNodes: Record<string, PathNode>;
  totalNodes: number;
  maxDepth: number;
}

export interface GitHubFile {
  name: string;
  path: string;
  type: 'file' | 'dir';
  content?: string;
}

export interface ParsedMarkdown {
  metadata: PathMetadata;
  content: string;
}
