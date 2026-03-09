import fs from 'fs';
import path from 'path';
import { 
  Resource, 
  ResourceCategory, 
  ResourceKnowledgeGraph, 
  ResourceSearchDocument,
  ResourceType,
  ValidationResult,
  VerificationResult
} from '../../types/resources';

export interface ArticleMetadata {
  slug: string;
  title: string;
  description: string | null;
  date: string | null;
}

// Search document interface for Fuse.js
export interface SearchDocument {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  content: string;
  fullContent: string;
  tags: string[];
  difficulty: string;
  section: string;
  date: string | null;
  wordCount: number;
}

// DSA Problem interfaces
export interface DSAProblem {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  order: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Theory';
  leetcode: string;
  description: string;
  examples: string[];
  solution?: string;
  timeComplexity?: string;
  spaceComplexity?: string;
  tags: string[];
}

export interface DSACategory {
  name: string;
  displayName: string;
  problems: DSAProblem[];
}

export interface DSASection {
  name: string;
  displayName: string;
  categories: DSACategory[];
}

export interface DSAContent {
  sections: DSASection[];
  totalProblems: number;
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
  
  // Enhanced features
  estimatedReadTime: number; // minutes
  prerequisites: string[]; // article slugs
  relatedArticles: string[]; // article slugs
  learningOutcomes: string[];
  keyConcepts: string[];
  
  // Interactive features
  interactiveElements: {
    quizzes: boolean;
    codePlaygrounds: boolean;
    exercises: boolean;
    projects: boolean;
  };
  
  // Media
  podcast?: {
    enabled: boolean;
    url?: string;
    duration?: number; // minutes
  };
  video?: {
    enabled: boolean;
    url?: string;
    duration?: number; // minutes
  };
  discussion?: {
    enabled: boolean;
    provider: 'giscus' | 'github';
  };
  resources?: {
    externalLinks?: string[];
    codeExamples?: string[];
    downloads?: string[];
    references?: string[];
  };
}

export interface RoadmapMeta {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  sections: string[];
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  
  // Enhanced metadata for 100xSystems context
  category: 'foundation' | 'systems' | 'development' | 'patterns' | 'devops' | 'ai' | 'leadership';
  level: number; // 1-9 based on README path
  prerequisites: string[]; // roadmap slugs that should be completed first
  outcomes: string[]; // what learner will achieve
  skills: string[]; // specific skills gained
  technologies: string[]; // technologies covered
  
  // Learning structure
  learningObjectives: string[];
  keyProjects: string[];
  assessmentCriteria: string[];
  
  // Metadata
  author?: string;
  tags: string[];
  lastUpdated: string;
  version: string;
  
  // Progress tracking
  totalArticles: number;
  estimatedHours: number;
  difficultyScore: number; // 1-100
  
  // Community features
  discussionEnabled: boolean;
  mentorshipAvailable: boolean;
  communityResources: string[];
  
  // Certification
  certificateAvailable: boolean;
  certificateRequirements: string[];
}

export interface KnowledgeGraph {
  roadmaps: Record<string, RoadmapMeta>;
  articles: Record<string, ArticleManifest>;
  relationships: {
    byRoadmap: Record<string, ArticleManifest[]>;
    bySection: Record<string, ArticleManifest[]>;
    byTag: Record<string, ArticleManifest[]>;
    byDifficulty: Record<string, ArticleManifest[]>;
    byCategory: Record<string, ArticleManifest[]>;
    bySkill: Record<string, ArticleManifest[]>;
    byTechnology: Record<string, ArticleManifest[]>;
    prerequisites: Record<string, string[]>; // article -> prerequisites
    related: Record<string, string[]>; // article -> related articles
  };
  
  // Advanced analytics
  analytics: {
    totalRoadmaps: number;
    totalArticles: number;
    averageDifficulty: number;
    mostPopularSkills: string[];
    learningPaths: string[][]; // recommended article sequences
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
    
    // Build enhanced relationships
    const relationships = {
      byRoadmap: {} as Record<string, ArticleManifest[]>,
      bySection: {} as Record<string, ArticleManifest[]>,
      byTag: {} as Record<string, ArticleManifest[]>,
      byDifficulty: {} as Record<string, ArticleManifest[]>,
      byCategory: {} as Record<string, ArticleManifest[]>,
      bySkill: {} as Record<string, ArticleManifest[]>,
      byTechnology: {} as Record<string, ArticleManifest[]>,
      prerequisites: {} as Record<string, string[]>,
      related: {} as Record<string, string[]>
    };
    
    // Collect analytics data
    const allSkills = new Set<string>();
    const allTechnologies = new Set<string>();
    const difficulties: number[] = [];
    
    // Organize manifests by various dimensions
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
      
      // Organize by section
      if (manifest.section) {
        if (!relationships.bySection[manifest.section]) {
          relationships.bySection[manifest.section] = [];
        }
        relationships.bySection[manifest.section].push(manifest);
      }
      
      // Organize by tags
      if (manifest.tags && Array.isArray(manifest.tags)) {
        manifest.tags.forEach(tag => {
          if (!relationships.byTag[tag]) {
            relationships.byTag[tag] = [];
          }
          relationships.byTag[tag].push(manifest);
        });
      }
      
      // Organize by difficulty
      if (!relationships.byDifficulty[manifest.difficulty]) {
        relationships.byDifficulty[manifest.difficulty] = [];
      }
      relationships.byDifficulty[manifest.difficulty].push(manifest);
      
      // Organize by category (through roadmaps)
      if (manifest.roadmaps && Array.isArray(manifest.roadmaps)) {
        manifest.roadmaps.forEach(roadmapSlug => {
          const roadmap = roadmaps[roadmapSlug];
          if (roadmap) {
            if (!relationships.byCategory[roadmap.category]) {
              relationships.byCategory[roadmap.category] = [];
            }
            relationships.byCategory[roadmap.category].push(manifest);
            
            // Organize by skills (from roadmap)
            if (roadmap.skills && Array.isArray(roadmap.skills)) {
              roadmap.skills.forEach(skill => {
                allSkills.add(skill);
                if (!relationships.bySkill[skill]) {
                  relationships.bySkill[skill] = [];
                }
                relationships.bySkill[skill].push(manifest);
              });
            }
            
            // Organize by technologies (from roadmap)
            if (roadmap.technologies && Array.isArray(roadmap.technologies)) {
              roadmap.technologies.forEach(tech => {
                allTechnologies.add(tech);
                if (!relationships.byTechnology[tech]) {
                  relationships.byTechnology[tech] = [];
                }
                relationships.byTechnology[tech].push(manifest);
              });
            }
          }
        });
      }
      
      // Handle article prerequisites and related articles
      if (manifest.prerequisites && Array.isArray(manifest.prerequisites)) {
        relationships.prerequisites[manifest.slug] = manifest.prerequisites;
      }
      
      if (manifest.relatedArticles && Array.isArray(manifest.relatedArticles)) {
        relationships.related[manifest.slug] = manifest.relatedArticles;
      }
      
      // Collect difficulty for analytics
      const difficultyScore = manifest.difficulty === 'beginner' ? 1 : manifest.difficulty === 'intermediate' ? 2 : 3;
      difficulties.push(difficultyScore);
    });
    
    // Sort articles by order within each grouping
    Object.keys(relationships.byRoadmap).forEach(roadmap => {
      relationships.byRoadmap[roadmap].sort((a, b) => a.order - b.order);
    });
    
    Object.keys(relationships.bySection).forEach(section => {
      relationships.bySection[section].sort((a, b) => a.order - b.order);
    });
    
    // Calculate analytics
    const analytics = {
      totalRoadmaps: Object.keys(roadmaps).length,
      totalArticles: Object.keys(manifests).length,
      averageDifficulty: difficulties.length > 0 ? difficulties.reduce((a, b) => a + b, 0) / difficulties.length : 0,
      mostPopularSkills: Array.from(allSkills).slice(0, 10), // Top 10 skills
      learningPaths: this.generateLearningPaths(manifests, relationships) // Generate recommended paths
    };
    
    console.log(`✅ Built knowledge graph: ${analytics.totalRoadmaps} roadmaps, ${analytics.totalArticles} articles`);
    
    return {
      roadmaps,
      articles: manifests,
      relationships,
      analytics
    };
  }
  
  // Helper method to generate learning paths
  private static generateLearningPaths(manifests: Record<string, ArticleManifest>, relationships: any): string[][] {
    // Simple learning path generation - can be enhanced with more sophisticated algorithms
    const paths: string[][] = [];
    
    // Generate paths by difficulty progression
    const beginnerArticles = Object.values(manifests).filter(m => m.difficulty === 'beginner');
    const intermediateArticles = Object.values(manifests).filter(m => m.difficulty === 'intermediate');
    const advancedArticles = Object.values(manifests).filter(m => m.difficulty === 'advanced');
    
    if (beginnerArticles.length > 0) {
      paths.push(beginnerArticles.slice(0, 5).map(a => a.slug)); // First 5 beginner articles
    }
    
    if (intermediateArticles.length > 0) {
      paths.push(intermediateArticles.slice(0, 5).map(a => a.slug)); // First 5 intermediate articles
    }
    
    if (advancedArticles.length > 0) {
      paths.push(advancedArticles.slice(0, 5).map(a => a.slug)); // First 5 advanced articles
    }
    
    return paths;
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

  // Search index generation for Fuse.js
  static async generateSearchIndex(): Promise<SearchDocument[]> {
    console.log('🔍 Building search index...');
    
    const articles = await this.fetchAllArticlesMetadata();
    const searchDocuments: SearchDocument[] = [];
    
    for (const article of articles) {
      try {
        const content = await this.fetchArticleContent(article.slug);
        
        // Extract clean text from HTML
        const cleanText = this.extractTextFromHtml(content.html);
        
        // Try to fetch manifest for additional metadata
        let manifest = null;
        try {
          const { githubUsername, githubRepo } = this.getGitHubConfig();
          const manifestUrl = `https://raw.githubusercontent.com/${githubUsername}/${githubRepo}/main/articles/${article.slug}/manifest.json`;
          const response = await fetch(manifestUrl);
          
          if (response.ok) {
            manifest = await response.json();
          }
        } catch (error) {
          // Manifest is optional, continue without it
        }
        
        searchDocuments.push({
          id: article.slug,
          slug: article.slug,
          title: article.title,
          description: article.description,
          content: cleanText.substring(0, 2000), // First 2000 chars for relevance
          fullContent: cleanText,
          tags: manifest?.tags || [],
          difficulty: manifest?.difficulty || 'beginner',
          section: manifest?.section || '',
          date: article.date,
          wordCount: cleanText.split(' ').length
        });
        
        console.log(`✅ Processed article for search: ${article.slug}`);
      } catch (error) {
        console.warn(`⚠️ Failed to process article ${article.slug} for search:`, error);
      }
    }
    
    console.log(`✅ Built search index: ${searchDocuments.length} documents`);
    return searchDocuments;
  }
  
  static extractTextFromHtml(html: string): string {
    // Remove script/style tags and metadata - use template literals for regex
    const cleanHtml = html
      .replace(new RegExp('<script[^>]*>[\\s\\S]*?<\\/script>', 'gi'), '')
      .replace(new RegExp('<style[^>]*>[\\s\\S]*?<\\/style>', 'gi'), '')
      .replace(new RegExp('<script[^>]*>[\\s\\S]*?<\\/script>', 'gi'), '')
      .replace(new RegExp('<meta[^>]*>', 'gi'), '')
      .replace(new RegExp('<link[^>]*>', 'gi'), '')
      .replace(new RegExp('<script type="application/json"[^>]*>[\\s\\S]*?<\\/script>', 'gi'), '');
    
    // Extract content from ql-editor
    const articleMatch = cleanHtml.match(new RegExp('<article[^>]*class="ql-editor"[^>]*>([\\s\\S]*?)<\\/article>'));
    const articleContent = articleMatch ? articleMatch[1] : cleanHtml;
    
    // Remove HTML tags and clean up - improved regex patterns
    return articleContent
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      .replace(/<style[^>]*>.*?<\/style>/gi, '')
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&#\d+;/g, '') // Remove numeric HTML entities
      .replace(/\s+/g, ' ')
      .trim();
  }

  // DSA Content Methods
  static parseDSAFrontmatter(content: string): { frontmatter: Record<string, any>, body: string } {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);
    
    if (!match) {
      return { frontmatter: {}, body: content };
    }
    
    try {
      const frontmatter = match[1];
      const body = match[2];
      const parsed: Record<string, any> = {};
      
      // Parse YAML-like frontmatter
      frontmatter.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length > 0) {
          let value = valueParts.join(':').trim();
          
          // Remove quotes if present
          if (value.startsWith('"') && value.endsWith('"')) {
            value = value.slice(1, -1);
          }
          
          // Parse arrays
          if (value.startsWith('[') && value.endsWith(']')) {
            const arrayValue = value.slice(1, -1).split(',').map(v => v.trim().replace(/['"]/g, ''));
            parsed[key.trim()] = arrayValue;
          } else {
            parsed[key.trim()] = value;
          }
        }
      });
      
      return { frontmatter: parsed, body };
    } catch (error) {
      console.warn('Error parsing frontmatter:', error);
      return { frontmatter: {}, body: content };
    }
  }

  static async fetchDSAProblems(): Promise<DSAContent> {
    console.log('🏗️ Building DSA content...');
    
    const sections: DSASection[] = [];
    let totalProblems = 0;
    
    // Define the structure based on curriculum
    const sectionStructure = [
      {
        name: 'implementation',
        displayName: 'Implementation',
        categories: []
      },
      {
        name: 'data-structures',
        displayName: 'Data Structures',
        categories: []
      },
      {
        name: 'revision',
        displayName: 'Revision',
        categories: []
      },
      {
        name: 'cses-algorithms',
        displayName: 'CSES Algorithms',
        categories: []
      },
      {
        name: 'codeforces-problems',
        displayName: 'Codeforces Problems',
        categories: []
      },
      {
        name: 'daily-coding-challenge',
        displayName: 'Daily Coding Challenge',
        categories: []
      }
    ];
    
    // For each section, scan categories and problems
    for (const section of sectionStructure) {
      const sectionPath = `/content/dsa/${section.name}`;
      
      try {
        const categories = await this.fetchDSACategories(sectionPath, section.name);
        section.categories = categories as never[]; // Type assertion to fix TypeScript error
        totalProblems += categories.reduce((sum, cat) => sum + cat.problems.length, 0);
      } catch (error) {
        console.warn(`⚠️ Failed to load section ${section.name}:`, error);
      }
    }
    
    sections.push(...sectionStructure);
    
    console.log(`✅ Built DSA content: ${totalProblems} problems across ${sections.length} sections`);
    
    return {
      sections,
      totalProblems
    };
  }

  static async fetchDSACategories(sectionPath: string, sectionName: string): Promise<DSACategory[]> {
    const categories: DSACategory[] = [];
    
    // This would scan the actual file system
    // For now, return empty - will be implemented with actual file scanning
    try {
        // Implementation would go here to scan directories
        const categoryNames = this.getCategoryNames(sectionName);
        
        for (const categoryName of categoryNames) {
          const problems = await this.fetchDSAProblemsForCategory(sectionPath, categoryName);
          if (problems.length > 0) {
            categories.push({
              name: categoryName,
              displayName: this.formatDisplayName(categoryName),
              problems
            });
          }
        }
      } catch (error) {
        console.warn(`Error fetching categories for ${sectionPath}:`, error);
      }
    
    return categories;
  }

  static getCategoryNames(sectionName: string): string[] {
    const categoryMap: Record<string, string[]> = {
      'implementation': [
        'introduction-to-data-structures', 'stacks-and-queues-basics', 'linked-lists-fundamentals', 'trees-and-graphs-introduction', 'sorting-and-searching-algorithms'
      ],
      'data-structures': [
        'arrays-matrices', 'searching-sorting', 'linked-list', 'stacks-queues', 'recursion-backtracking',
        'trees', 'binary-search-trees', 'heaps-trie', 'graphs', 'dynamic-programming',
        'greedy-algorithms', 'hashmaps', 'strings'
      ],
      'revision': [
        'arrays-hashing', 'binary-search', 'linked-list', 'recursion-backtracking',
        'stacks-queues', 'heaps', 'trees', 'graphs', 'dynamic-programming',
        'tries', 'strings'
      ],
      'cses-algorithms': [
        'introductory', 'sorting-searching', 'dynamic-programming', 'graph-algorithms',
        'range-queries', 'tree-algorithms', 'mathematics', 'string-algorithms',
        'geometry', 'advanced-techniques', 'additional-problems'
      ],
      'codeforces-problems': [
        'implementation', 'prime-sieve', 'bit-manipulation', 'stacks-queues-priorityqueues',
        'string-algorithms', 'trees', 'graph-algorithms', 'matrix-exponentiation',
        'trie', 'dynamic-programming', 'disjoint-set', 'sqrt-decomposition',
        'fenwick-tree', 'segment-tree', 'lazy-propagation'
      ],
      'daily-coding-challenge': ['problems']
    };
    
    return categoryMap[sectionName] || [];
  }

  static formatDisplayName(categoryName: string): string {
    return categoryName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  static async fetchDSAProblemsForCategory(sectionPath: string, categoryName: string): Promise<DSAProblem[]> {
    const problems: DSAProblem[] = [];
    
    // This would scan actual markdown files
    // For now, return empty - will be implemented with actual file scanning
    try {
      const categoryPath = `${sectionPath}/${categoryName}`;
      const problemFiles = await this.getProblemFiles(categoryPath);
      
      for (const filename of problemFiles) {
        if (filename.endsWith('.md')) {
          const problem = await this.parseDSAProblem(categoryPath, filename);
          if (problem) {
            problems.push(problem);
          }
        }
      }
      
      // Sort by order
      problems.sort((a, b) => a.order - b.order);
    } catch (error) {
      console.warn(`Error fetching problems for ${categoryName}:`, error);
    }
    
    return problems;
  }

  static async getProblemFiles(categoryPath: string): Promise<string[]> {
    const fullPath = path.join(process.cwd(), categoryPath);
    
    try {
      if (!fs.existsSync(fullPath)) {
        console.warn(`Directory does not exist: ${fullPath}`);
        return [];
      }
      
      const files = fs.readdirSync(fullPath);
      return files.filter(file => file.endsWith('.md')).sort();
    } catch (error) {
      console.warn(`Error reading directory ${fullPath}:`, error);
      return [];
    }
  }

  static async parseDSAProblem(categoryPath: string, filename: string): Promise<DSAProblem | null> {
    try {
      const fullPath = path.join(process.cwd(), categoryPath, filename);
      
      if (!fs.existsSync(fullPath)) {
        console.warn(`File does not exist: ${fullPath}`);
        return null;
      }
      
      const content = fs.readFileSync(fullPath, 'utf-8');
      const { frontmatter, body } = this.parseDSAFrontmatter(content);
      
      const problemId = filename.replace('.md', '');
      const orderMatch = problemId.match(/^(\d+)/);
      const order = orderMatch ? parseInt(orderMatch[1]) : 999;
      
      // Extract title from frontmatter or filename
      const title = frontmatter.title || problemId.replace(/^\d+-/, '').replace(/-/g, ' ');
      
      // Extract examples from markdown content
      const examples = this.extractExamples(body);
      
      return {
        id: problemId,
        title: title,
        category: categoryPath.split('/').pop() || '',
        subcategory: categoryPath.split('/').pop() || '',
        order,
        difficulty: frontmatter.difficulty || 'Easy',
        leetcode: frontmatter.leetcode || '',
        description: body,
        examples,
        timeComplexity: frontmatter.timeComplexity || '',
        spaceComplexity: frontmatter.spaceComplexity || '',
        tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : []
      };
    } catch (error) {
      console.warn(`Error parsing problem ${filename}:`, error);
      return null;
    }
  }

  static extractExamples(content: string): string[] {
    const examples: string[] = [];
    const lines = content.split('\n');
    let currentExample: string[] = [];
    let inExample = false;
    
    for (const line of lines) {
      if (line.startsWith('**Example:**') || line.startsWith('**Input:**') || line.startsWith('**Output:**')) {
        if (currentExample.length > 0) {
          examples.push(currentExample.join('\n').trim());
          currentExample = [];
        }
        inExample = true;
        currentExample.push(line);
      } else if (inExample && (line.startsWith('**') || line.startsWith('##'))) {
        // End of example block
        if (currentExample.length > 0) {
          examples.push(currentExample.join('\n').trim());
          currentExample = [];
        }
        inExample = false;
      } else if (inExample && line.trim()) {
        currentExample.push(line);
      }
    }
    
    // Add the last example if there is one
    if (currentExample.length > 0) {
      examples.push(currentExample.join('\n').trim());
    }
    
    return examples;
  }

  // ========== RESOURCE SYSTEM METHODS ==========

  static async fetchResourceCategories(): Promise<Record<string, ResourceCategory>> {
    const { githubUsername, githubRepo } = this.getGitHubConfig();
    
    try {
      const categoriesDirUrl = `https://api.github.com/repos/${githubUsername}/${githubRepo}/contents/content/resources/categories`;
      const response = await this.makeGitHubRequest(categoriesDirUrl);
      
      if (!response.ok) {
        console.log('⚠️ Resources categories directory not found');
        return {};
      }
      
      const files = await response.json();
      const categories: Record<string, ResourceCategory> = {};
      
      for (const file of files.filter((f: any) => f.name.endsWith('.json'))) {
        try {
          const fileUrl = `https://raw.githubusercontent.com/${githubUsername}/${githubRepo}/main/content/resources/categories/${file.name}`;
          const contentResponse = await fetch(fileUrl);
          
          if (contentResponse.ok) {
            const content = await contentResponse.json();
            const categoryName = file.name.replace('.json', '');
            categories[categoryName] = { ...content, category: categoryName };
            console.log(`✅ Loaded resource category: ${categoryName}`);
          }
        } catch (error) {
          console.warn(`⚠️ Failed to load resource category: ${file.name}`, error);
        }
      }
      
      return categories;
    } catch (error) {
      console.error('Error fetching resource categories:', error);
      return {};
    }
  }

  static async fetchResourcesByCategory(category: string): Promise<Resource[]> {
    const { githubUsername, githubRepo } = this.getGitHubConfig();
    
    try {
      const categoryUrl = `https://raw.githubusercontent.com/${githubUsername}/${githubRepo}/main/content/resources/categories/${category}.json`;
      const response = await fetch(categoryUrl);
      
      if (!response.ok) {
        console.warn(`⚠️ Resource category not found: ${category}`);
        return [];
      }
      
      const categoryData = await response.json();
      const resources = categoryData.resources || [];
      
      console.log(`✅ Loaded ${resources.length} resources from category: ${category}`);
      return resources;
    } catch (error) {
      console.error(`Error fetching resources for category ${category}:`, error);
      return [];
    }
  }

  static validateResourceSchema(resource: any): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    // Required fields
    const requiredFields = ['id', 'type', 'title', 'description', 'url', 'category', 'whyRecommended'];
    for (const field of requiredFields) {
      if (!resource[field]) {
        errors.push(`Missing required field: ${field}`);
      }
    }
    
    // Type validation
    const validTypes: ResourceType[] = ['article', 'video', 'podcast', 'tool', 'course', 'book', 'documentation', 'tutorial', 'framework', 'library', 'platform', 'community', 'newsletter', 'blog', 'research-paper', 'cheat-sheet', 'template', 'extension', 'other'];
    if (resource.type && !validTypes.includes(resource.type)) {
      errors.push(`Invalid resource type: ${resource.type}`);
    }
    
    // Quality validation
    const validQualities = ['gold', 'silver', 'bronze'];
    if (resource.quality && !validQualities.includes(resource.quality)) {
      errors.push(`Invalid quality level: ${resource.quality}`);
    }
    
    // Difficulty validation
    const validDifficulties = ['beginner', 'intermediate', 'advanced'];
    if (resource.difficulty && !validDifficulties.includes(resource.difficulty)) {
      errors.push(`Invalid difficulty level: ${resource.difficulty}`);
    }
    
    // URL validation
    if (resource.url && !this.isValidUrl(resource.url)) {
      errors.push(`Invalid URL format: ${resource.url}`);
    }
    
    // Warnings
    if (!resource.tags || resource.tags.length === 0) {
      warnings.push('No tags provided - resource may be hard to discover');
    }
    
    if (!resource.author && !resource.publisher) {
      warnings.push('No author or publisher provided - reduces credibility');
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  static async verifyResourceUrl(url: string): Promise<VerificationResult> {
    try {
      const startTime = Date.now();
      const response = await fetch(url, { method: 'HEAD' });
      const responseTime = Date.now() - startTime;
      
      return {
        isValid: response.ok,
        statusCode: response.status,
        statusText: response.statusText,
        responseTime
      };
    } catch (error) {
      return {
        isValid: false,
        statusCode: 0,
        statusText: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  static async buildResourceRelationships(resources: Resource[]): Promise<Record<string, string[]>> {
    const relationships: Record<string, string[]> = {};
    
    for (const resource of resources) {
      const related: string[] = [];
      
      // Add explicitly defined related resources
      if (resource.relatedResources) {
        related.push(...resource.relatedResources);
      }
      
      // Find resources by category
      const sameCategory = resources.filter(r => 
        r.category === resource.category && 
        r.id !== resource.id &&
        r.tags.some(tag => resource.tags.includes(tag))
      );
      related.push(...sameCategory.map(r => r.id));
      
      // Find resources by type
      const sameType = resources.filter(r => 
        r.type === resource.type && 
        r.id !== resource.id &&
        r.tags.some(tag => resource.tags.includes(tag))
      );
      related.push(...sameType.map(r => r.id));
      
      // Find resources by tags
      const sameTags = resources.filter(r => 
        r.id !== resource.id &&
        r.tags.some(tag => resource.tags.includes(tag))
      );
      related.push(...sameTags.map(r => r.id));
      
      // Remove duplicates and limit to 10 most related
      relationships[resource.id] = [...new Set(related)].slice(0, 10);
    }
    
    return relationships;
  }

  static async buildResourceKnowledgeGraph(): Promise<ResourceKnowledgeGraph> {
    console.log('🏗️ Building resource knowledge graph...');
    
    const categories = await this.fetchResourceCategories();
    const allResources: Resource[] = [];
    
    // Fetch all resources from all categories
    for (const categorySlug of Object.keys(categories)) {
      const resources = await this.fetchResourcesByCategory(categorySlug);
      allResources.push(...resources);
    }
    
    // Build relationships
    const relationships = {
      byCategory: {} as Record<string, Resource[]>,
      bySubcategory: {} as Record<string, Resource[]>,
      byType: {} as Record<ResourceType, Resource[]>,
      byQuality: {} as Record<string, Resource[]>,
      byTags: {} as Record<string, Resource[]>,
      byAuthor: {} as Record<string, Resource[]>,
      byPublisher: {} as Record<string, Resource[]>,
      
      resourceToResource: await this.buildResourceRelationships(allResources),
      resourcePrerequisites: {} as Record<string, string[]>,
      relatedByCategory: {} as Record<string, Resource[]>,
      relatedByType: {} as Record<string, Resource[]>,
      relatedByTags: {} as Record<string, Resource[]>,
      
      categoryToSubcategories: {} as Record<string, string[]>,
      subcategoryToResources: {} as Record<string, Resource[]>
    };
    
    // Organize resources by various dimensions
    const allTags = new Set<string>();
    const allAuthors = new Set<string>();
    const allPublishers = new Set<string>();
    const typeDistribution: Record<ResourceType, number> = {} as any;
    const qualityDistribution: Record<string, number> = {};
    const categoryDistribution: Record<string, number> = {};
    
    allResources.forEach(resource => {
      // By category
      if (!relationships.byCategory[resource.category]) {
        relationships.byCategory[resource.category] = [];
      }
      relationships.byCategory[resource.category].push(resource);
      
      // By subcategory
      if (resource.subcategory) {
        if (!relationships.bySubcategory[resource.subcategory]) {
          relationships.bySubcategory[resource.subcategory] = [];
        }
        relationships.bySubcategory[resource.subcategory].push(resource);
      }
      
      // By type
      if (!relationships.byType[resource.type]) {
        relationships.byType[resource.type] = [];
      }
      relationships.byType[resource.type].push(resource);
      
      // By quality
      if (!relationships.byQuality[resource.quality]) {
        relationships.byQuality[resource.quality] = [];
      }
      relationships.byQuality[resource.quality].push(resource);
      
      // By tags
      resource.tags.forEach(tag => {
        allTags.add(tag);
        if (!relationships.byTags[tag]) {
          relationships.byTags[tag] = [];
        }
        relationships.byTags[tag].push(resource);
      });
      
      // By author
      if (resource.author) {
        allAuthors.add(resource.author);
        if (!relationships.byAuthor[resource.author]) {
          relationships.byAuthor[resource.author] = [];
        }
        relationships.byAuthor[resource.author].push(resource);
      }
      
      // By publisher
      if (resource.publisher) {
        allPublishers.add(resource.publisher);
        if (!relationships.byPublisher[resource.publisher]) {
          relationships.byPublisher[resource.publisher] = [];
        }
        relationships.byPublisher[resource.publisher].push(resource);
      }
      
      // Collect analytics data
      typeDistribution[resource.type] = (typeDistribution[resource.type] || 0) + 1;
      qualityDistribution[resource.quality] = (qualityDistribution[resource.quality] || 0) + 1;
      categoryDistribution[resource.category] = (categoryDistribution[resource.category] || 0) + 1;
      
      // Prerequisites
      if (resource.prerequisites) {
        relationships.resourcePrerequisites[resource.id] = resource.prerequisites;
      }
    });
    
    // Build category hierarchies
    Object.values(categories).forEach(category => {
      if (category.childCategories) {
        relationships.categoryToSubcategories[category.category] = category.childCategories;
      }
    });
    
    const analytics = {
      totalResources: allResources.length,
      totalCategories: Object.keys(categories).length,
      typeDistribution,
      qualityDistribution,
      categoryDistribution,
      mostCommonTags: Array.from(allTags).slice(0, 20),
      topAuthors: Array.from(allAuthors).slice(0, 10),
      topPublishers: Array.from(allPublishers).slice(0, 10)
    };
    
    console.log(`✅ Built resource knowledge graph: ${analytics.totalResources} resources, ${analytics.totalCategories} categories`);
    
    return {
      resources: allResources.reduce((acc, resource) => {
        acc[resource.id] = resource;
        return acc;
      }, {} as Record<string, Resource>),
      categories,
      relationships,
      analytics
    };
  }

  static async generateResourceSearchIndex(): Promise<ResourceSearchDocument[]> {
    console.log('🔍 Building resource search index...');
    
    const knowledgeGraph = await this.buildResourceKnowledgeGraph();
    const searchDocuments: ResourceSearchDocument[] = [];
    
    for (const resource of Object.values(knowledgeGraph.resources)) {
      // Combine all searchable text
      const searchableContent = [
        resource.title,
        resource.description,
        resource.whyRecommended,
        resource.author || '',
        resource.publisher || '',
        resource.tags.join(' '),
        resource.category,
        resource.subcategory || '',
        resource.type,
        JSON.stringify(resource.metadata || {})
      ].join(' ').toLowerCase();
      
      searchDocuments.push({
        id: resource.id,
        title: resource.title,
        description: resource.description,
        url: resource.url,
        category: resource.category,
        subcategory: resource.subcategory,
        tags: resource.tags,
        difficulty: resource.difficulty,
        quality: resource.quality,
        type: resource.type,
        author: resource.author,
        publisher: resource.publisher,
        format: resource.format,
        accessType: resource.accessType,
        verificationStatus: resource.verificationStatus,
        content: searchableContent.substring(0, 2000),
        fullContent: searchableContent,
        allTags: resource.tags,
        searchableMetadata: JSON.stringify(resource.metadata || {}),
        relatedResourceCount: resource.relatedResources?.length || 0,
        prerequisiteCount: resource.prerequisites?.length || 0,
        wordCount: searchableContent.split(' ').length
      });
    }
    
    console.log(`✅ Built resource search index: ${searchDocuments.length} documents`);
    return searchDocuments;
  }

  private static isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
}
