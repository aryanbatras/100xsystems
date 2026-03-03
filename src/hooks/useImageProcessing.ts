import imageCompression from "browser-image-compression";
import { log, LogLevel } from '../lib/logger';

const logToTerminal = (message: string, type: LogLevel = 'info') => {
  log(message, type);
};

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

export const extractImagesFromDelta = (delta: any): ImageData[] => {
  logToTerminal('🔍 Starting image extraction from Delta...', 'info');
  logToTerminal(`📊 Delta operations count: ${delta.ops?.length || 0}`, 'info');
  
  const images: ImageData[] = [];
  
  delta.ops?.forEach((op: any, index: number) => {
    logToTerminal(`🔍 Processing operation ${index + 1}: ${Object.keys(op).join(', ')}`, 'info');
    
    if (op.insert && typeof op.insert === 'object' && 'image' in op.insert) {
      const imageData = op.insert.image;
      logToTerminal(`🖼️ Found image in operation ${index + 1}`, 'success');
      
      if (imageData.startsWith('data:image/')) {
        const matches = imageData.match(/data:image\/(\w+);base64,/);
        const fileType = matches ? `image/${matches[1]}` : 'image/png';
        
        // Calculate original size
        const base64Length = imageData.split(',')[1].length;
        const originalSizeKB = Math.round((base64Length * 3/4) / 1024);
        
        logToTerminal(`📏 Image ${images.length + 1} details:`, 'info');
        logToTerminal(`   - Type: ${fileType}`, 'info');
        logToTerminal(`   - Original size: ${originalSizeKB}KB`, 'info');
        logToTerminal(`   - Base64 length: ${base64Length} chars`, 'info');
        
        images.push({
          base64Data: imageData,
          temporaryId: `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          fileType
        });
      } else {
        logToTerminal('⚠️ Image data is not base64 format, skipping', 'warning');
      }
    }
  });
  
  logToTerminal(`✅ Image extraction complete. Found ${images.length} image(s)`, 'success');
  return images;
};

export const compressImage = async (file: string, imageIndex: number, totalImages: number): Promise<string> => {
  const startTime = Date.now();
  logToTerminal(`🗜️ [${imageIndex + 1}/${totalImages}] Starting ultra compression...`, 'info');
  
  try {
    // Parse base64 and get file info
    const base64Parts = file.split(',');
    const mimeType = base64Parts[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
    const base64Data = base64Parts[1];
    
    // Calculate original size
    const originalSizeBytes = base64Data.length * 3/4;
    const originalSizeKB = (originalSizeBytes / 1024).toFixed(2);
    const originalSizeMB = (originalSizeBytes / 1024 / 1024).toFixed(2);
    
    logToTerminal(`📏 [${imageIndex + 1}/${totalImages}] Original image details:`, 'info');
    logToTerminal(`   - MIME type: ${mimeType}`, 'info');
    logToTerminal(`   - Size: ${originalSizeKB}KB (${originalSizeMB}MB)`, 'info');
    logToTerminal(`   - Base64 chars: ${base64Data.length}`, 'info');
    
    const response = await fetch(file);
    const blob = await response.blob();
    const imageFile = new File([blob], 'image.jpg', { type: blob.type });
    
    logToTerminal(`🔧 [${imageIndex + 1}/${totalImages}] Blob created, size: ${(blob.size / 1024).toFixed(2)}KB`, 'info');
    
    const options = {
      maxSizeMB: 0.05,
      maxWidthOrHeight: 800,
      useWebWorker: true,
      initialQuality: 0.1,
      fileType: 'image/jpeg',
    };
    
    logToTerminal(`⚙️ [${imageIndex + 1}/${totalImages}] Compression settings:`, 'info');
    logToTerminal(`   - Max size: 50KB`, 'info');
    logToTerminal(`   - Max dimensions: 800x800`, 'info');
    logToTerminal(`   - Quality: 10%`, 'info');
    logToTerminal(`   - Output format: JPEG`, 'info');
    
    const compressionStartTime = Date.now();
    const compressedFile = await imageCompression(imageFile, options);
    const compressionTime = Date.now() - compressionStartTime;
    
    const compressedSizeKB = (compressedFile.size / 1024).toFixed(2);
    const compressedSizeMB = (compressedFile.size / 1024 / 1024).toFixed(2);
    
    logToTerminal(`✅ [${imageIndex + 1}/${totalImages}] Compression completed in ${compressionTime}ms:`, 'success');
    logToTerminal(`   - Compressed size: ${compressedSizeKB}KB (${compressedSizeMB}MB)`, 'success');
    
    const sizeReduction = ((imageFile.size - compressedFile.size) / imageFile.size) * 100;
    const sizeSavedKB = ((imageFile.size - compressedFile.size) / 1024).toFixed(2);
    
    logToTerminal(`📉 [${imageIndex + 1}/${totalImages}] Size reduction:`, 'success');
    logToTerminal(`   - Reduction: ${sizeReduction.toFixed(1)}%`, 'success');
    logToTerminal(`   - Space saved: ${sizeSavedKB}KB`, 'success');
    logToTerminal(`   - Compression ratio: ${(imageFile.size / compressedFile.size).toFixed(2)}:1`, 'success');
    
    const compressedBase64 = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(compressedFile);
    });
    
    const totalTime = Date.now() - startTime;
    logToTerminal(`⏱️ [${imageIndex + 1}/${totalImages}] Total compression time: ${totalTime}ms`, 'info');
    
    return compressedBase64;
  } catch (error) {
    const totalTime = Date.now() - startTime;
    logToTerminal(`❌ [${imageIndex + 1}/${totalImages}] Compression failed after ${totalTime}ms: ${error instanceof Error ? error.message : String(error)}`, 'error');
    logToTerminal(`🔍 Error details: ${error instanceof Error ? error.message : String(error)}`, 'error');
    return file;
  }
};

export const uploadImagesToGitHub = async (images: ImageData[], slug: string): Promise<UploadedImage[]> => {
  logToTerminal('🚀 Starting GitHub upload process...', 'info');
  logToTerminal(`📸 Total images to upload: ${images.length}`, 'info');
  logToTerminal(`📂 Target slug: ${slug}`, 'info');
  
  const uploadedImages: UploadedImage[] = [];
  const uploadStartTime = Date.now();
  
  // Start terminal logging for upload process
  logToTerminal('🚀 Starting GitHub upload process...', 'info');
  
  try {
    for (const [index, image] of images.entries()) {
      const imageStartTime = Date.now();
      logToTerminal(`\n📤 [${index + 1}/${images.length}] Processing image: ${image.temporaryId}`, 'info');
      
      try {
        // Compression phase
        logToTerminal(`🗜️ [${index + 1}/${images.length}] Starting compression...`, 'info');
        const compressedImage = await compressImage(image.base64Data, index, images.length);
        
        // Prepare for upload
        const base64Data = compressedImage.split(',')[1];
        const imageBuffer = Buffer.from(base64Data, 'base64');
        
        const imageNumber = String(index + 1).padStart(3, '0');
        const filename = `images/${slug}/${slug}-${imageNumber}.webp`;
        
        logToTerminal(`📦 [${index + 1}/${images.length}] Preparing upload:`, 'info');
        logToTerminal(`   - Filename: ${filename}`, 'info');
        logToTerminal(`   - Buffer size: ${(imageBuffer.length / 1024).toFixed(2)}KB`, 'info');
        logToTerminal(`   - Base64 length: ${base64Data.length} chars`, 'info');
        
        // Upload phase
        logToTerminal(`🌐 [${index + 1}/${images.length}] Starting GitHub upload...`, 'info');
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
        logToTerminal(`⏱️ [${index + 1}/${images.length}] API call completed in ${apiCallTime}ms`, 'info');
        logToTerminal(`📊 [${index + 1}/${images.length}] Response status: ${response.status} ${response.statusText}`, 'info');
        
        if (!response.ok) {
          const errorData = await response.json();
          logToTerminal(`❌ [${index + 1}/${images.length}] Upload failed: ${JSON.stringify(errorData)}`, 'error');
          throw new Error(`Upload error: ${errorData.error}`);
        }
        
        const result = await response.json();
        logToTerminal(`✅ [${index + 1}/${images.length}] Upload successful!`, 'success');
        logToTerminal(`🔗 [${index + 1}/${images.length}] Public URL: ${result.publicUrl}`, 'success');
        
        uploadedImages.push({
          temporaryId: image.temporaryId,
          publicUrl: result.publicUrl,
          filename: `${slug}-${imageNumber}.webp`
        });
        
        const imageTotalTime = Date.now() - imageStartTime;
        logToTerminal(`⏱️ [${index + 1}/${images.length}] Total processing time: ${imageTotalTime}ms`, 'info');
        
      } catch (error) {
        const imageTotalTime = Date.now() - imageStartTime;
        logToTerminal(`❌ [${index + 1}/${images.length}] Failed after ${imageTotalTime}ms: ${error instanceof Error ? error.message : String(error)}`, 'error');
        logToTerminal(`🔍 Error details for ${image.temporaryId}: ${error instanceof Error ? error.message : String(error)}`, 'error');
        
        // Continue with other images even if one fails
        logToTerminal(`⚠️ [${index + 1}/${images.length}] Continuing with remaining images...`, 'warning');
      }
    }
    
    const totalUploadTime = Date.now() - uploadStartTime;
    logToTerminal(`\n🎉 GitHub upload process completed in ${totalUploadTime}ms`, 'success');
    logToTerminal(`✅ Successfully uploaded: ${uploadedImages.length}/${images.length} images`, 'success');
    logToTerminal(`📊 Success rate: ${((uploadedImages.length / images.length) * 100).toFixed(1)}%`, 'success');
    
    if (uploadedImages.length > 0) {
      logToTerminal('\n📋 Uploaded images summary:', 'info');
      uploadedImages.forEach((img, index) => {
        logToTerminal(`   ${index + 1}. ${img.filename} -> ${img.publicUrl}`, 'success');
      });
    }
    
    return uploadedImages;
  } finally {
    // No cleanup needed since we're not capturing console logs
  }
};
