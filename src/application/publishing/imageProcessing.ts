/**
 * @deprecated Image processing system has been removed.
 * Images are now managed through the public/ directory alongside content.
 */

export type ImageData = { dataUrl: string; fileName: string; };
export type UploadedImage = { url: string; fileName: string; };

export const extractImagesFromDelta = async (_delta: any): Promise<ImageData[]> => {
  return [];
};

export const compressImage = async (file: string, _imageIndex: number, _totalImages: number): Promise<string> => {
  return file;
};

export const uploadImagesToGitHub = async (_images: ImageData[], _slug: string): Promise<UploadedImage[]> => {
  return [];
};
