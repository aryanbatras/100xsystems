export interface QuillDelta {
  ops?: QuillOperation[];
}

export interface QuillOperation {
  insert: string | { [key: string]: any };
  attributes?: { [key: string]: any };
}

export interface ImageData {
  base64Data: string;
  temporaryId: string;
  fileType: string;
}

export interface UploadedImage {
  temporaryId: string;
  publicUrl: string;
  filename: string;
}

export interface ArticleMetadata {
  title: string;
  slug: string;
  date: string;
  images: string[];
}

export interface HtmlGenerationConfig {
  title: string;
  slug: string;
  delta: QuillDelta;
  uploadedImages: UploadedImage[];
}

export interface ConversionResult {
  html: string;
  metadata: ArticleMetadata;
  processingTime: number;
  imageStats: {
    total: number;
    processed: number;
    replaced: number;
  };
}

export interface PublishResult {
  success: boolean;
  url?: string;
  size?: number;
  error?: string;
}

export interface PerformanceMetrics {
  startTime: number;
  conversionTime?: number;
  imageProcessingTime?: number;
  uploadTime?: number;
  totalTime: number;
}

export interface QuillConverterConfig {
  paragraphTag?: string;
  encodeHtml?: boolean;
  classPrefix?: string;
  inlineStyles?: InlineStylesConfig;
  multiLineBlockquote?: boolean;
  multiLineHeader?: boolean;
  multiLineCodeblock?: boolean;
  linkTarget?: string;
}

export interface InlineStylesConfig {
  font?: { [key: string]: string };
  size?: { [key: string]: string };
  color?: (value: string) => string;
  background?: (value: string) => string;
  align?: (value: string) => string;
  indent?: (value: string) => string;
  direction?: (value: string) => string;
}

export type LogLevel = 'info' | 'success' | 'error' | 'warning';

export type PublishingState = 'draft' | 'uploading' | 'success' | 'failed';

export interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: LogLevel;
}
