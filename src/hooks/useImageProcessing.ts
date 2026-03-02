import imageCompression from "browser-image-compression";

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
  const images: ImageData[] = [];
  
  delta.ops?.forEach((op: any) => {
    if (op.insert && typeof op.insert === 'object' && 'image' in op.insert) {
      const imageData = op.insert.image;
      if (imageData.startsWith('data:image/')) {
        const matches = imageData.match(/data:image\/(\w+);base64,/);
        const fileType = matches ? `image/${matches[1]}` : 'image/png';
        
        images.push({
          base64Data: imageData,
          temporaryId: `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          fileType
        });
      }
    }
  });
  
  return images;
};

export const compressImage = async (file: string): Promise<string> => {
  try {
    console.log('🗜️ Starting ultra compression...');
    
    const response = await fetch(file);
    const blob = await response.blob();
    const imageFile = new File([blob], 'image.jpg', { type: blob.type });
    
    const options = {
      maxSizeMB: 0.05,
      maxWidthOrHeight: 800,
      useWebWorker: true,
      initialQuality: 0.1,
      fileType: 'image/jpeg',
    };
    
    console.log(`📏 Original size: ${(imageFile.size / 1024).toFixed(2)}KB`);
    
    const compressedFile = await imageCompression(imageFile, options);
    
    console.log(`✅ Compressed size: ${(compressedFile.size / 1024).toFixed(2)}KB`);
    
    const sizeReduction = ((imageFile.size - compressedFile.size) / imageFile.size) * 100;
    console.log(`📉 Size reduction: ${sizeReduction.toFixed(1)}%`);
    
    const compressedBase64 = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(compressedFile);
    });
    
    return compressedBase64;
  } catch (error) {
    console.error('❌ Compression failed:', error);
    return file;
  }
};

export const uploadImagesToGitHub = async (images: ImageData[], slug: string): Promise<UploadedImage[]> => {
  const uploadedImages: UploadedImage[] = [];
  
  for (const [index, image] of images.entries()) {
    try {
      console.log(`🗜️ Compressing image ${index + 1}/${images.length}`);
      
      const compressedImage = await compressImage(image.base64Data);
      
      const base64Data = compressedImage.split(',')[1];
      const imageBuffer = Buffer.from(base64Data, 'base64');
      
      const imageNumber = String(index + 1).padStart(3, '0');
      const filename = `images/${slug}/${slug}-${imageNumber}.webp`;
      console.log(`📤 Uploading image: ${filename}`);
      
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
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Upload error: ${errorData.error}`);
      }
      
      const result = await response.json();
      
      uploadedImages.push({
        temporaryId: image.temporaryId,
        publicUrl: result.publicUrl,
        filename: `${slug}-${imageNumber}.webp`
      });
      
      console.log(`✅ Uploaded successfully: ${result.publicUrl}`);
      
    } catch (error) {
      console.error(`❌ Failed to upload image ${image.temporaryId}:`, error);
    }
  }
  
  return uploadedImages;
};
