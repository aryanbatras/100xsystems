/**
 * ## Infrastructure: Image Processor
 *
 * Client-side image processing pipeline — extracts images
 * from Quill Delta documents, compresses them, and uploads
 * to GitHub Pages storage.
 *
 * @packageDocumentation
 */

import imageCompression from "browser-image-compression";
import { ImageData, UploadedImage } from '../application/types/shared.types';
import { log } from '../infrastructure/utils';
import { DateUtils } from '../infrastructure/utils';

export class ImageProcessor {
  private static readonly COMPRESSION_OPTIONS = {
    maxSizeMB: 0.05,
    maxWidthOrHeight: 800,
    useWebWorker: true,
    initialQuality: 0.1,
    fileType: 'image/jpeg',
  };

  private static async downloadImageAsBase64(imageUrl: string): Promise<string | null> {
    try {
      log(`📥 Downloading image from: ${imageUrl}`, 'info');
      
      const response = await fetch(imageUrl);
      if (!response.ok) {
        log(`⚠️ Failed to download image: ${response.status}`, 'warning');
        return null;
      }
      
      const blob = await response.blob();
      const base64 = await this.convertToBase64(new File([blob], 'image.jpg', { type: blob.type }));
      
      log(`✅ Successfully downloaded and converted image to base64`, 'success');
      return base64;
    } catch (error) {
      log(`❌ Error downloading image: ${error instanceof Error ? error.message : String(error)}`, 'error');
      return null;
    }
  }

  static async extractImagesFromDelta(delta: any): Promise<ImageData[]> {
    log('🔍 Starting image extraction from Delta...', 'info');
    log(`📊 Delta operations count: ${delta.ops?.length || 0}`, 'info');

    const images: ImageData[] = [];

    for (const [index, op] of (delta.ops || []).entries()) {
      if (this.isImageOperation(op)) {
        const imageData = op.insert.image;
        log(`🖼️ Found image in operation ${index + 1}`, 'success');

        if (this.isBase64Image(imageData)) {
          const imageInfo = this.parseImageData(imageData);
          if (imageInfo) {
            this.logImageDetails(imageInfo, images.length + 1);
            
            images.push({
              base64Data: imageData,
              temporaryId: this.generateTemporaryId(),
              fileType: imageInfo.fileType
            });
          }
        } else if (this.isGitHubImage(imageData)) {
          log(`🌐 Found GitHub image URL, downloading...`, 'info');
          const downloadedBase64 = await this.downloadImageAsBase64(imageData);
          
          if (downloadedBase64) {
            const imageInfo = this.parseImageData(downloadedBase64);
            if (imageInfo) {
              this.logImageDetails(imageInfo, images.length + 1);
              
              images.push({
                base64Data: downloadedBase64,
                temporaryId: this.generateTemporaryId(),
                fileType: imageInfo.fileType
              });
              
              log(`✅ GitHub image converted to base64 blob`, 'success');
            }
          } else {
            log(`⚠️ Failed to download GitHub image, skipping`, 'warning');
          }
        } else {
          log('⚠️ Image data is not base64 or GitHub URL format, skipping', 'warning');
        }
      }
    }

    log(`✅ Image extraction complete. Found ${images.length} image(s)`, 'success');
    return images;
  }

  private static isImageOperation(op: any): boolean {
    return op.insert && typeof op.insert === 'object' && 'image' in op.insert;
  }

  private static isBase64Image(imageData: string): boolean {
    return imageData.startsWith('data:image/');
  }

  private static isGitHubImage(imageData: string): boolean {
    return imageData.startsWith('https://') && 
           (imageData.includes('github.com') || imageData.includes('raw.githubusercontent.com')) &&
           (imageData.includes('.jpg') || imageData.includes('.jpeg') || 
            imageData.includes('.png') || imageData.includes('.webp') || 
            imageData.includes('.gif') || imageData.includes('.svg'));
  }

  private static parseImageData(imageData: string) {
    const matches = imageData.match(/data:image\/(\w+);base64,/);
    if (!matches) return null;

    const fileType = `image/${matches[1]}`;
    const base64Length = imageData.split(',')[1].length;
    const originalSizeKB = Math.round((base64Length * 3/4) / 1024);

    return {
      fileType,
      base64Length,
      originalSizeKB
    };
  }

  private static logImageDetails(imageInfo: any, imageNumber: number): void {
    log(`📏 Image ${imageNumber} details:`, 'info');
    log(`   - Type: ${imageInfo.fileType}`, 'info');
    log(`   - Original size: ${imageInfo.originalSizeKB}KB`, 'info');
    log(`   - Base64 length: ${imageInfo.base64Length} chars`, 'info');
  }

  private static generateTemporaryId(): string {
    return `temp-${DateUtils.generateUniqueId()}`;
  }

  static async compressImage(file: string, imageIndex: number, totalImages: number): Promise<string> {
    const startTime = Date.now();
    log(`🗜️ [${imageIndex + 1}/${totalImages}] Starting compression...`, 'info');

    try {
      const imageInfo = await this.prepareImageForCompression(file);
      log(`📦 [${imageIndex + 1}/${totalImages}] Image prepared:`, 'info');
      this.logCompressionInfo(imageInfo);

      const compressedFile = await imageCompression(imageInfo.file, this.COMPRESSION_OPTIONS);
      const compressionTime = Date.now() - startTime;

      this.logCompressionResults(imageInfo.file, compressedFile, compressionTime, imageIndex, totalImages);

      return await this.convertToBase64(compressedFile);
    } catch (error) {
      const totalTime = Date.now() - startTime;
      log(`❌ [${imageIndex + 1}/${totalImages}] Compression failed after ${totalTime}ms: ${error instanceof Error ? error.message : String(error)}`, 'error');
      return file;
    }
  }

  private static async prepareImageForCompression(file: string) {
    const base64Parts = file.split(',');
    const mimeType = base64Parts[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
    const base64Data = base64Parts[1];
    
    const originalSizeBytes = base64Data.length * 3/4;
    const originalSizeKB = (originalSizeBytes / 1024).toFixed(2);
    const originalSizeMB = (originalSizeBytes / 1024 / 1024).toFixed(2);

    const response = await fetch(file);
    const blob = await response.blob();
    const imageFile = new File([blob], 'image.jpg', { type: blob.type });

    return {
      file: imageFile,
      mimeType,
      originalSizeKB,
      originalSizeMB,
      base64Length: base64Data.length,
      blobSize: blob.size
    };
  }

  private static logCompressionInfo(imageInfo: any): void {
    log(`   - MIME type: ${imageInfo.mimeType}`, 'info');
    log(`   - Size: ${imageInfo.originalSizeKB}KB (${imageInfo.originalSizeMB}MB)`, 'info');
    log(`   - Base64 chars: ${imageInfo.base64Length}`, 'info');
    log(`   - Blob size: ${(imageInfo.blobSize / 1024).toFixed(2)}KB`, 'info');
  }

  private static logCompressionResults(
    originalFile: File,
    compressedFile: File,
    compressionTime: number,
    imageIndex: number,
    totalImages: number
  ): void {
    const compressedSizeKB = (compressedFile.size / 1024).toFixed(2);
    const compressedSizeMB = (compressedFile.size / 1024 / 1024).toFixed(2);
    const sizeReduction = ((originalFile.size - compressedFile.size) / originalFile.size) * 100;
    const sizeSavedKB = ((originalFile.size - compressedFile.size) / 1024).toFixed(2);

    log(`✅ [${imageIndex + 1}/${totalImages}] Compression completed in ${compressionTime}ms:`, 'success');
    log(`   - Compressed size: ${compressedSizeKB}KB (${compressedSizeMB}MB)`, 'success');
    log(`   - Reduction: ${sizeReduction.toFixed(1)}%`, 'success');
    log(`   - Space saved: ${sizeSavedKB}KB`, 'success');
    log(`   - Compression ratio: ${(originalFile.size / compressedFile.size).toFixed(2)}:1`, 'success');
  }

  private static async convertToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  }

  static async uploadImagesToGitHub(images: ImageData[], slug: string): Promise<UploadedImage[]> {
    log('🚀 Starting GitHub upload process...', 'info');
    log(`📸 Total images to upload: ${images.length}`, 'info');
    log(`📂 Target slug: ${slug}`, 'info');

    const uploadedImages: UploadedImage[] = [];
    const uploadStartTime = Date.now();

    try {
      for (const [index, image] of images.entries()) {
        const result = await this.processSingleImage(image, index, images.length, slug);
        if (result) {
          uploadedImages.push(result);
        }
      }

      this.logUploadResults(uploadedImages, images, uploadStartTime);
      return uploadedImages;
    } catch (error) {
      log(`❌ Upload process failed: ${error instanceof Error ? error.message : String(error)}`, 'error');
      return uploadedImages;
    }
  }

  private static async processSingleImage(
    image: ImageData,
    index: number,
    totalImages: number,
    slug: string
  ): Promise<UploadedImage | null> {
    const imageStartTime = Date.now();
    log(`\n📤 [${index + 1}/${totalImages}] Processing image: ${image.temporaryId}`, 'info');

    try {
      const compressedImage = await this.compressImage(image.base64Data, index, totalImages);
      const uploadResult = await this.uploadToGitHub(compressedImage, index, totalImages, slug);

      const uploadedImage: UploadedImage = {
        temporaryId: image.temporaryId,
        publicUrl: uploadResult.publicUrl,
        filename: uploadResult.filename
      };

      const imageTotalTime = Date.now() - imageStartTime;
      log(`⏱️ [${index + 1}/${totalImages}] Total processing time: ${imageTotalTime}ms`, 'info');

      return uploadedImage;
    } catch (error) {
      const imageTotalTime = Date.now() - imageStartTime;
      log(`❌ [${index + 1}/${totalImages}] Failed after ${imageTotalTime}ms: ${error instanceof Error ? error.message : String(error)}`, 'error');
      log(`⚠️ [${index + 1}/${totalImages}] Continuing with remaining images...`, 'warning');
      return null;
    }
  }

  private static async uploadToGitHub(
    compressedImage: string,
    index: number,
    totalImages: number,
    slug: string
  ): Promise<{ publicUrl: string; filename: string }> {
    const base64Data = compressedImage.split(',')[1];
    const imageBuffer = Buffer.from(base64Data, 'base64');

    const imageNumber = String(index + 1).padStart(3, '0');
    const filename = `images/${slug}/${slug}-${imageNumber}.webp`;

    log(`📦 [${index + 1}/${totalImages}] Preparing upload:`, 'info');
    log(`   - Filename: ${filename}`, 'info');
    log(`   - Buffer size: ${(imageBuffer.length / 1024).toFixed(2)}KB`, 'info');

    const apiCallStartTime = Date.now();
    const response = await fetch('/api/upload-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filename: filename,
        content: imageBuffer.toString('base64'),
      }),
    });

    const apiCallTime = Date.now() - apiCallStartTime;
    log(`⏱️ [${index + 1}/${totalImages}] API call completed in ${apiCallTime}ms`, 'info');

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Upload error: ${errorData.error}`);
    }

    const result = await response.json();
    log(`✅ [${index + 1}/${totalImages}] Upload successful!`, 'success');
    log(`🔗 [${index + 1}/${totalImages}] Public URL: ${result.publicUrl}`, 'success');

    return {
      publicUrl: result.publicUrl,
      filename: `${slug}-${imageNumber}.webp`
    };
  }

  private static logUploadResults(
    uploadedImages: UploadedImage[],
    originalImages: ImageData[],
    uploadStartTime: number
  ): void {
    const totalUploadTime = Date.now() - uploadStartTime;
    log(`\n🎉 GitHub upload process completed in ${totalUploadTime}ms`, 'success');
    log(`✅ Successfully uploaded: ${uploadedImages.length}/${originalImages.length} images`, 'success');
    log(`📊 Success rate: ${((uploadedImages.length / originalImages.length) * 100).toFixed(1)}%`, 'success');

    if (uploadedImages.length > 0) {
      log('\n📋 Uploaded images summary:', 'info');
      uploadedImages.forEach((img, index) => {
        log(`   ${index + 1}. ${img.filename} -> ${img.publicUrl}`, 'success');
      });
    }
  }
}
