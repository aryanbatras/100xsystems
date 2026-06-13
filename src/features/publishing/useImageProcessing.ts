import { ImageProcessor } from '../../infrastructure/imageProcessor';
import { ImageData, UploadedImage } from '../../shared/types';

export type { ImageData, UploadedImage };

export const extractImagesFromDelta = (delta: any): Promise<ImageData[]> => {
  return ImageProcessor.extractImagesFromDelta(delta);
};

export const compressImage = async (file: string, imageIndex: number, totalImages: number): Promise<string> => {
  return ImageProcessor.compressImage(file, imageIndex, totalImages);
};

export const uploadImagesToGitHub = async (images: ImageData[], slug: string): Promise<UploadedImage[]> => {
  return ImageProcessor.uploadImagesToGitHub(images, slug);
};
