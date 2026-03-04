export interface ArticleMetadata {
  slug: string;
  title: string;
  description: string | null;
  date: string | null;
}

export interface StaticArticleData {
  html: string;
  slug: string;
  title: string;
  description: string | null;
  date: string | null;
}

// New interfaces for manifest-based architecture
export interface ArticleManifest {
  slug: string;
  roadmaps: string[];
  section: string;
  order: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  author?: string;
  tags: string[];
  podcast?: {
    enabled: boolean;
    url?: string;
  };
  discussion?: {
    enabled: boolean;
    provider: 'giscus' | 'github';
  };
  resources?: {
    externalLinks?: string[];
    codeExamples?: string[];
  };
}

export interface RoadmapMeta {
  slug: string;
  title: string;
  description: string;
  sections: string[];
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface KnowledgeGraph {
  roadmaps: Record<string, RoadmapMeta>;
  articles: Record<string, ArticleManifest>;
  relationships: {
    byRoadmap: Record<string, ArticleManifest[]>;
    bySection: Record<string, ArticleManifest[]>;
    byTag: Record<string, ArticleManifest[]>;
  };
}

export class StaticSiteGenerator {
  private static getGitHubConfig() {
    const githubToken = process.env.GITHUB_TOKEN;
    const githubUsername = process.env.GITHUB_USERNAME;
    const githubRepo = process.env.GITHUB_REPO;
    const githubBranch = process.env.GITHUB_BRANCH || 'main';

    if (!githubToken || !githubUsername || !githubRepo) {
      throw new Error('GitHub credentials not configured for static generation');
    }

    return { githubToken, githubUsername, githubRepo, githubBranch };
  }

  private static makeGitHubRequest(url: string): Promise<Response> {
    const { githubToken } = this.getGitHubConfig();
    
    return fetch(url, {
      headers: {
        'Authorization': `token ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });
  }

  static async fetchArticleFolders(): Promise<string[]> {
    const { githubUsername, githubRepo } = this.getGitHubConfig();
    
    const articlesDirUrl = `https://api.github.com/repos/${githubUsername}/${githubRepo}/contents/articles`;
    
    const response = await this.makeGitHubRequest(articlesDirUrl);

    if (!response.ok) {
      if (response.status === 404) {
        console.log('⚠️ Articles directory not found');
        return [];
      }
      
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!Array.isArray(data)) {
      throw new Error('Unexpected response format from GitHub API');
    }

    // Filter only directories (article folders)
    const articleFolders = data.filter((item: any) => item.type === 'dir');
    
    return articleFolders.map((folder: any) => folder.name);
  }

  static async fetchArticleMetadata(slug: string): Promise<ArticleMetadata> {
    const { githubUsername, githubRepo } = this.getGitHubConfig();
    
    try {
      // Try to fetch the index.html to extract metadata
      const indexUrl = `https://api.github.com/repos/${githubUsername}/${githubRepo}/contents/articles/${slug}/index.html`;
      
      const indexResponse = await this.makeGitHubRequest(indexUrl);

      if (indexResponse.ok) {
        const indexData = await indexResponse.json();
        const content = Buffer.from(indexData.content, 'base64').toString('utf-8');
        
        // Extract title from HTML content
        const titleMatch = content.match(/<title>(.*?)<\/title>/i);
        const title = titleMatch ? titleMatch[1].replace(' - 100x Systems', '') : slug;
        
        // Extract description from meta tag
        const descriptionMatch = content.match(/<meta name="description" content="(.*?)"/i);
        const description = descriptionMatch ? descriptionMatch[1] : null;
        
        // Extract date from meta tag or use folder creation date
        const dateMatch = content.match(/<meta property="article:published_time" content="(.*?)"/i);
        const date = dateMatch ? dateMatch[1] : null;

        return {
          slug,
          title,
          description,
          date
        };
      } else {
        // Fallback to folder name if index.html not found
        return {
          slug,
          title: slug.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
          description: null,
          date: null
        };
      }
    } catch (error) {
      console.error(`Error fetching metadata for ${slug}:`, error);
      return {
        slug,
        title: slug.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
        description: null,
        date: null
      };
    }
  }

  static async fetchArticleContent(slug: string): Promise<StaticArticleData> {
    const { githubUsername, githubRepo } = this.getGitHubConfig();
    
    // Fetch the index.html file for the specific article
    const indexUrl = `https://api.github.com/repos/${githubUsername}/${githubRepo}/contents/articles/${slug}/index.html`;
    
    const response = await this.makeGitHubRequest(indexUrl);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Article not found: ${slug}`);
      }
      
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const html = Buffer.from(data.content, 'base64').toString('utf-8');

    // Extract metadata from HTML
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].replace(' - 100x Systems', '') : slug;
    
    const descriptionMatch = html.match(/<meta name="description" content="(.*?)"/i);
    const description = descriptionMatch ? descriptionMatch[1] : null;
    
    const dateMatch = html.match(/<meta property="article:published_time" content="(.*?)"/i);
    const date = dateMatch ? dateMatch[1] : null;

    return {
      html,
      slug,
      title,
      description,
      date
    };
  }

  static async fetchAllArticlesMetadata(): Promise<ArticleMetadata[]> {
    const slugs = await this.fetchArticleFolders();
    
    // Fetch metadata for each article in parallel
    const articles = await Promise.all(
      slugs.map(slug => this.fetchArticleMetadata(slug))
    );

    // Sort articles by date (newest first) or by title if no date
    articles.sort((a, b) => {
      if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return a.title.localeCompare(b.title);
    });

    return articles;
  }

  static optimizeHtmlForStatic(html: string): string {
    // Basic HTML optimization for static generation
    // Remove unnecessary whitespace and comments
    return html
      .replace(/<!--[\s\S]*?-->/g, '') // Remove HTML comments
      .replace(/\s+/g, ' ') // Collapse whitespace
      .replace(/>\s+</g, '><') // Remove whitespace between tags
      .trim();
  }

  static validateArticleSize(html: string, slug: string): void {
    const sizeInBytes = Buffer.byteLength(html, 'utf8');
    const sizeInKB = sizeInBytes / 1024;
    
    if (sizeInKB > 128) {
      console.warn(`⚠️ Article "${slug}" is ${sizeInKB.toFixed(1)}kB which exceeds the 128kB threshold for optimal performance`);
    } else {
      console.log(`✅ Article "${slug}" is ${sizeInKB.toFixed(1)}kB - within optimal size range`);
    }
  }

  // Stage 1: Fetch roadmap metadata from /meta/*.json
  static async fetchRoadmapMeta(): Promise<Record<string, RoadmapMeta>> {
    const { githubUsername, githubRepo } = this.getGitHubConfig();
    
    const metaDirUrl = `https://api.github.com/repos/${githubUsername}/${githubRepo}/contents/meta`;
    
    try {
      const response = await this.makeGitHubRequest(metaDirUrl);
      if (!response.ok) return {};
      
      const files = await response.json();
      const roadmaps: Record<string, RoadmapMeta> = {};
      
      for (const file of files.filter((f: any) => f.name.endsWith('.json'))) {
        try {
          const fileUrl = `https://raw.githubusercontent.com/${githubUsername}/${githubRepo}/main/meta/${file.name}`;
          const contentResponse = await fetch(fileUrl);
          
          if (contentResponse.ok) {
            const content = await contentResponse.json();
            const slug = file.name.replace('.json', '');
            roadmaps[slug] = { ...content, slug };
            console.log(`✅ Loaded roadmap meta: ${slug}`);
          }
        } catch (error) {
          console.warn(`⚠️ Failed to load roadmap meta: ${file.name}`, error);
        }
      }
      
      return roadmaps;
    } catch (error) {
      console.error('Error fetching roadmap meta:', error);
      return {};
    }
  }

  // Stage 2: Fetch all article manifests from /articles/*/manifest.json
  static async fetchAllManifests(): Promise<Record<string, ArticleManifest>> {
    const slugs = await this.fetchArticleFolders();
    const { githubUsername, githubRepo } = this.getGitHubConfig();
    
    const manifests: Record<string, ArticleManifest> = {};
    
    // Fetch manifests in parallel for better performance
    const manifestPromises = slugs.map(async (slug) => {
      try {
        const manifestUrl = `https://raw.githubusercontent.com/${githubUsername}/${githubRepo}/main/articles/${slug}/manifest.json`;
        const response = await fetch(manifestUrl);
        
        if (response.ok) {
          const manifest = await response.json();
          return { slug, manifest: { ...manifest, slug } };
        } else {
          console.warn(`⚠️ No manifest found for ${slug}`);
          return null;
        }
      } catch (error) {
        console.error(`Error fetching manifest for ${slug}:`, error);
        return null;
      }
    });

    const results = await Promise.all(manifestPromises);
    
    results.forEach((result) => {
      if (result) {
        manifests[result.slug] = result.manifest;
        console.log(`✅ Loaded manifest: ${result.slug}`);
      }
    });
    
    return manifests;
  }

  // Stage 3: Build knowledge graph combining all metadata
  static async buildKnowledgeGraph(): Promise<KnowledgeGraph> {
    console.log('🏗️ Building knowledge graph...');
    
    // Execute all three stages in parallel for maximum performance
    const [roadmaps, manifests] = await Promise.all([
      this.fetchRoadmapMeta(),
      this.fetchAllManifests()
    ]);
    
    // Build relationships
    const relationships = {
      byRoadmap: {} as Record<string, ArticleManifest[]>,
      bySection: {} as Record<string, ArticleManifest[]>,
      byTag: {} as Record<string, ArticleManifest[]>
    };
    
    // Organize manifests by roadmap, section, and tags
    Object.values(manifests).forEach(manifest => {
      // Organize by roadmap
      if (manifest.roadmaps && Array.isArray(manifest.roadmaps)) {
        manifest.roadmaps.forEach(roadmapSlug => {
          if (!relationships.byRoadmap[roadmapSlug]) {
            relationships.byRoadmap[roadmapSlug] = [];
          }
          relationships.byRoadmap[roadmapSlug].push(manifest);
        });
      }
      
      // Organize by section (as array)
      if (manifest.section) {
        if (!relationships.bySection[manifest.section]) {
          relationships.bySection[manifest.section] = [];
        }
        relationships.bySection[manifest.section].push(manifest);
      }
      
      // Organize by tags (with null check)
      if (manifest.tags && Array.isArray(manifest.tags)) {
        manifest.tags.forEach(tag => {
          if (!relationships.byTag[tag]) {
            relationships.byTag[tag] = [];
          }
          relationships.byTag[tag].push(manifest);
        });
      }
    });
    
    // Sort articles by order within each roadmap and section
    Object.keys(relationships.byRoadmap).forEach(roadmap => {
      relationships.byRoadmap[roadmap].sort((a, b) => a.order - b.order);
    });
    
    Object.keys(relationships.bySection).forEach(section => {
      relationships.bySection[section].sort((a, b) => a.order - b.order);
    });
    
    console.log(`✅ Built knowledge graph: ${Object.keys(roadmaps).length} roadmaps, ${Object.keys(manifests).length} articles`);
    
    return {
      roadmaps,
      articles: manifests,
      relationships
    };
  }

  // Enhanced article fetch with manifest data
  static async fetchArticleWithManifest(slug: string): Promise<StaticArticleData & { manifest?: ArticleManifest }> {
    const articleData = await this.fetchArticleContent(slug);
    
    try {
      const { githubUsername, githubRepo } = this.getGitHubConfig();
      const manifestUrl = `https://raw.githubusercontent.com/${githubUsername}/${githubRepo}/main/articles/${slug}/manifest.json`;
      const response = await fetch(manifestUrl);
      
      if (response.ok) {
        const manifest = await response.json();
        return { ...articleData, manifest: { ...manifest, slug } };
      }
    } catch (error) {
      console.warn(`⚠️ No manifest found for ${slug}`);
    }
    
    return articleData;
  }
}
