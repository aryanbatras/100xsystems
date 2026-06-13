/**
 * ## Publishing Domain: Image Processing Wrappers
 *
 * Thin convenience wrappers around the ImageProcessor infrastructure
 * service. Exists so the presentation layer can import from the
 * application layer rather than directly from infrastructure.
 *
 * @packageDocumentation
 */

import { ImageProcessor } from '../../infrastructure/imageProcessor';
import { ImageData, UploadedImage } from '../types/shared.types';

export type { ImageData, UploadedImage };

/**
 * Extracts base64 image data from a Quill Delta document.
 *
 * @param delta - The Quill Delta document to scan
 * @returns Array of extracted image data (base64 + metadata)
 *
 * @public
 */
export const extractImagesFromDelta = (delta: any): Promise<ImageData[]> => {
  return ImageProcessor.extractImagesFromDelta(delta);
};

/**
 * Compresses a base64 image using browser-image-compression.
 *
 * @param file - Base64 data URL of the image
 * @param imageIndex - Index for progress logging
 * @param totalImages - Total count for progress context
 * @returns Compressed base64 data URL
 *
 * @public
 */
export const compressImage = async (file: string, imageIndex: number, totalImages: number): Promise<string> => {
  return ImageProcessor.compressImage(file, imageIndex, totalImages);
};

/**
 * Uploads processed images to the GitHub storage repository.
 *
 * @param images - Array of image data to upload
 * @param slug - Article slug for folder naming
 * @returns Array of upload results with public URLs
 *
 * @public
 */
export const uploadImagesToGitHub = async (images: ImageData[], slug: string): Promise<UploadedImage[]> => {
  return ImageProcessor.uploadImagesToGitHub(images, slug);
};
