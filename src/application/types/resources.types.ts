export type ResourceType = 
  | 'article'
  | 'video' 
  | 'podcast'
  | 'tool'
  | 'course'
  | 'book'
  | 'documentation'
  | 'tutorial'
  | 'framework'
  | 'library'
  | 'platform'
  | 'community'
  | 'newsletter'
  | 'blog'
  | 'research-paper'
  | 'cheat-sheet'
  | 'template'
  | 'extension'
  | 'other';

export interface Resource {
  id: string;
  type: ResourceType;
  title: string;
  description: string;
  url: string;
  
  category: string;
  subcategory?: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  quality: 'gold' | 'silver' | 'bronze';
  
  author?: string;
  publisher?: string;
  publishedDate?: string;
  duration?: number;
  format?: string;
  
  whyRecommended: string;
  prerequisites?: string[];
  relatedResources?: string[];
  lastVerified: string;
  verificationStatus: 'verified' | 'pending' | 'deprecated';
  language: string;
  accessType: 'free' | 'freemium' | 'paid';
  order?: number;
  
  viewCount?: number;
  bookmarkCount?: number;
  
  metadata?: Record<string, any>;
}

export interface ResourceCategory {
  category: string;
  displayName: string;
  description: string;
  icon?: string;
  subcategories?: string[];
  allowedTypes: ResourceType[];
  parentCategory?: string;
  childCategories?: string[];
  metadata?: Record<string, any>;
}

export interface ResourceKnowledgeGraph {
  resources: Record<string, Resource>;
  categories: Record<string, ResourceCategory>;
  relationships: {
    byCategory: Record<string, Resource[]>;
    bySubcategory: Record<string, Resource[]>;
    byType: Record<ResourceType, Resource[]>;
    byQuality: Record<string, Resource[]>;
    byTags: Record<string, Resource[]>;
    byAuthor: Record<string, Resource[]>;
    byPublisher: Record<string, Resource[]>;
    
    resourceToResource: Record<string, string[]>;
    resourcePrerequisites: Record<string, string[]>;
    relatedByCategory: Record<string, Resource[]>;
    relatedByType: Record<string, Resource[]>;
    relatedByTags: Record<string, Resource[]>;
    
    categoryToSubcategories: Record<string, string[]>;
    subcategoryToResources: Record<string, Resource[]>;
  };
  
  analytics: {
    totalResources: number;
    totalCategories: number;
    typeDistribution: Record<ResourceType, number>;
    qualityDistribution: Record<string, number>;
    categoryDistribution: Record<string, number>;
    mostCommonTags: string[];
    topAuthors: string[];
    topPublishers: string[];
  };
}

export interface ResourceSearchDocument {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  subcategory?: string;
  tags: string[];
  difficulty: string;
  quality: string;
  type: ResourceType;
  author?: string;
  publisher?: string;
  format?: string;
  accessType: string;
  verificationStatus: string;
  content: string;
  fullContent: string;
  allTags: string[];
  searchableMetadata: string;
  relatedResourceCount: number;
  prerequisiteCount: number;
  wordCount: number;
}

export interface ResourceSearchResult {
  item: ResourceSearchDocument;
  score?: number;
  matches?: any[];
}

export interface ResourceSearchFilters {
  category: string;
  type: ResourceType;
  quality: string;
  difficulty: string;
  accessType: string;
  tags: string[];
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface VerificationResult {
  isValid: boolean;
  statusCode: number;
  statusText: string;
  finalUrl?: string;
  responseTime?: number;
}

export interface ResourceAnalytics {
  totalResources: number;
  totalCategories: number;
  typeDistribution: Record<ResourceType, number>;
  qualityDistribution: Record<string, number>;
  categoryDistribution: Record<string, number>;
  mostCommonTags: string[];
  topAuthors: string[];
  topPublishers: string[];
  recentlyAdded: Resource[];
  mostViewed: Resource[];
  highestQuality: Resource[];
}

export interface CategoryAnalytics {
  category: string;
  resourceCount: number;
  subcategoryCount: number;
  typeDistribution: Record<ResourceType, number>;
  qualityDistribution: Record<string, number>;
  averageQuality: number;
  topTags: string[];
  recentAdditions: Resource[];
}

export interface UsageAnalytics {
  totalViews: number;
  totalBookmarks: number;
  mostViewedCategories: Record<string, number>;
  mostViewedTypes: Record<ResourceType, number>;
  searchQueries: Array<{
    query: string;
    count: number;
    timestamp: string;
  }>;
  userEngagement: {
    averageSessionDuration: number;
    bounceRate: number;
    returnVisitorRate: number;
  };
}
