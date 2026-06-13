/**
 * ## 100xSystems: Shared UI/Infrastructure Types
 *
 * Cross-cutting type definitions used across the application layer.
 * These types are domain-agnostic and used by multiple features
 * (publishing, AI chat, etc.).
 *
 * WHY A SINGLE FILE:
 *   These types are small, stable, and have zero dependencies.
 *   Keeping them together avoids tiny single-type files and makes
 *   imports predictable.
 *
 * @packageDocumentation
 */

/**
 * A Quill Delta document — the core data structure for rich text content.
 *
 * @remarks
 * Represents a rich text document as an array of operations (inserts,
 * retains, deletes). Used by the Quill editor for article creation and
 * by the HtmlConverter for rendering.
 *
 * @public
 */
export interface QuillDelta {
  ops?: QuillOperation[];
}

/**
 * A single operation within a Quill Delta document.
 *
 * @remarks
 * The `insert` field can be a plain string for text or an object with
 * an `image` key for embedded images. The `attributes` field holds
 * formatting like bold, italic, color, etc.
 *
 * @public
 */
export interface QuillOperation {
  insert: string | { [key: string]: any };
  attributes?: { [key: string]: any };
}

/**
 * Raw image data extracted from a Quill Delta document.
 *
 * @remarks
 * Contains the base64-encoded data and file type. Used during the
 * image processing pipeline: extract → compress → upload.
 *
 * @public
 */
export interface ImageData {
  base64Data: string;
  temporaryId: string;
  fileType: string;
}

/**
 * Result of uploading an image to the GitHub storage repository.
 *
 * @remarks
 * Contains the temporary ID used during extraction and the permanent
 * public URL after upload. Used by the HtmlConverter to replace
 * inline data URLs with production image URLs.
 *
 * @public
 */
export interface UploadedImage {
  temporaryId: string;
  publicUrl: string;
  filename: string;
}

/**
 * Metadata embedded in the published HTML head section.
 *
 * @remarks
 * Stored as a JSON script tag in the HTML output. Used for SEO,
 * article loading, and update detection.
 *
 * @public
 */
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

/**
 * Response from the GitHub publishing API.
 *
 * @remarks
 * Returned by GitHubPublisher methods. The `url` field contains the
 * raw.githubusercontent.com URL to the published file. `size` is the
 * file size in bytes.
 *
 * @public
 */
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
