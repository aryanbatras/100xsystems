import { useRef, useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import imageCompression from "browser-image-compression";
import styles from './QuillEditor.module.css';

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  title?: string;
  onTitleChange?: (title: string) => void;
}

export default function QuillEditor({
  value,
  onChange,
  placeholder,
  title,
  onTitleChange,
}: QuillEditorProps) {
  const quillRef = useRef<ReactQuill>(null);
  const [mounted, setMounted] = useState(false);
  const [imageQueue, setImageQueue] = useState<any[]>([]);
  const [articleTitle, setArticleTitle] = useState(title || '');
  const [publishingState, setPublishingState] = useState<'draft' | 'uploading' | 'success' | 'failed'>('draft');

  useEffect(() => {
    setMounted(true);
  }, []);

  const extractImagesFromDelta = (delta: any) => {
    const images: any[] = [];
    
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

  const compressImage = async (file: string): Promise<string> => {
  try {
    console.log('🗜️ Starting ultra compression...');
    
    // Convert base64 to File object
    const response = await fetch(file);
    const blob = await response.blob();
    const imageFile = new File([blob], 'image.jpg', { type: blob.type });
    
    // Ultra aggressive compression settings
    const options = {
      maxSizeMB: 0.05, // 50KB max - very aggressive
      maxWidthOrHeight: 800, // Smaller dimensions
      useWebWorker: true,
      initialQuality: 0.1, // 10% quality - ultra low
      fileType: 'image/jpeg', // Try JPEG for better compression
    };
    
    console.log(`📏 Original size: ${(imageFile.size / 1024).toFixed(2)}KB`);
    
    const compressedFile = await imageCompression(imageFile, options);
    
    console.log(`✅ Compressed size: ${(compressedFile.size / 1024).toFixed(2)}KB`);
    
    // Calculate size reduction properly
    const sizeReduction = ((imageFile.size - compressedFile.size) / imageFile.size) * 100;
    console.log(`📉 Size reduction: ${sizeReduction.toFixed(1)}%`);
    
    // Convert back to base64
    const compressedBase64 = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(compressedFile);
    });
    
    return compressedBase64;
  } catch (error) {
    console.error('❌ Compression failed:', error);
    return file; // Return original if compression fails
  }
};

const uploadImagesToGitHub = async (images: any[], slug: string) => {
    const uploadedImages = [];
    
    for (const [index, image] of images.entries()) {
      try {
        console.log(`🗜️ Compressing image ${index + 1}/${images.length}`);
        
        // Compress image first
        const compressedImage = await compressImage(image.base64Data);
        
        // Convert base64 to blob
        const base64Data = compressedImage.split(',')[1];
        const imageBuffer = Buffer.from(base64Data, 'base64');
        
        // Generate proper filename: article-title-001, article-title-002, etc.
        const imageNumber = String(index + 1).padStart(3, '0');
        const filename = `images/${slug}/${slug}-${imageNumber}.webp`;
        console.log(`📤 Uploading image: ${filename}`);
        
        // Upload via our API endpoint
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
        // Continue with other images even if one fails
      }
    }
    
    return uploadedImages;
  };

  const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .substring(0, 50); // Limit length
};

const generateMarkdown = (delta: any, title: string, slug: string, uploadedImages: any[]): string => {
  console.log('📄 Generating markdown file...');
  
  // Create frontmatter with metadata
  const frontmatter = {
    title: title,
    slug: slug,
    date: new Date().toISOString().split('T')[0],
    images: uploadedImages.map(img => img.publicUrl)
  };
  
  // Convert frontmatter to YAML
  const yamlFrontmatter = `---
${Object.entries(frontmatter)
  .map(([key, value]) => {
    if (Array.isArray(value)) {
      return `${key}:\n${value.map(v => `  - "${v}"`).join('\n')}`;
    }
    return `${key}: "${value}"`;
  })
  .join('\n')}
---

`;

  // Convert Delta to markdown with proper image references
  let markdown = yamlFrontmatter;
  let imageIndex = 0;
  
  if (delta.ops) {
    delta.ops.forEach((op: any) => {
      if (typeof op.insert === 'string') {
        markdown += op.insert;
      } else if (op.insert && typeof op.insert === 'object') {
        if ('image' in op.insert) {
          // Replace base64 image with proper markdown image reference
          if (imageIndex < uploadedImages.length) {
            const uploadedImage = uploadedImages[imageIndex];
            markdown += `![Image ${imageIndex + 1}](${uploadedImage.publicUrl})\n\n`;
            imageIndex++;
          }
        }
      }
    });
  }
  
  console.log('✅ Markdown generated successfully');
  console.log(`📝 Generated ${imageIndex} image references`);
  return markdown;
};

const publishMarkdownToGitHub = async (slug: string, markdown: string): Promise<void> => {
  console.log('📤 Publishing markdown file to GitHub...');
  
  const filename = `articles/${slug}.md`;
  
  const response = await fetch('/api/upload-image', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      filename: filename,
      content: Buffer.from(markdown).toString('base64'),
    }),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Markdown upload error: ${errorData.error}`);
  }
  
  console.log('✅ Markdown file published successfully');
};

const handlePublish = async () => {
    if (!quillRef.current) return;
    
    setPublishingState('uploading');
    
    try {
      console.log('🚀 Starting publish process...');
      
      const quill = quillRef.current.getEditor();
      const delta = quill.getContents();
      
      // Generate clean slug from title
      const slug = generateSlug(articleTitle) || `article-${Date.now()}`;
      console.log('📝 Article slug:', slug);
      
      // Extract images from Delta
      const images = extractImagesFromDelta(delta);
      console.log('🔍 Found images to upload:', images.length);
      
      // Upload images to GitHub with proper naming
      const uploadedImages = await uploadImagesToGitHub(images, slug);
      console.log('✅ Uploaded images:', uploadedImages.length);
      
      // Show detailed results
      uploadedImages.forEach((img, index) => {
        console.log(`🖼️ Image ${index + 1}:`, img.publicUrl);
      });
      
      // Generate markdown file with proper image references
      console.log('📄 Generating markdown content...');
      const markdown = generateMarkdown(delta, articleTitle, slug, uploadedImages);
      console.log('📝 Markdown preview:', markdown.substring(0, 200) + '...');
      
      // Publish markdown file to GitHub
      await publishMarkdownToGitHub(slug, markdown);
      
      setPublishingState('success');
      console.log('🎉 Publish complete! Article published successfully.');
      console.log(`📂 Check your GitHub repo: articles/${slug}.md`);
      
    } catch (error) {
      console.error('❌ Publish failed:', error);
      setPublishingState('failed');
    }
  };

  useEffect(() => {
    if (!mounted) return;
    
    const timer = setTimeout(() => {
      const quill = quillRef.current?.getEditor();
      if (quill) {
        console.log('Quill editor found, setting up listener');

        const handleTextChange = (delta: any, oldDelta: any, source: string) => {
          if (source === 'user') {
            console.log('Content changed by user!');
            
            const quill = quillRef.current?.getEditor();
            if (!quill) return;
            
            // Get current full content and extract all images
            const currentContent = quill.getContents();
            const allImages = extractImagesFromDelta(currentContent);
            
            // Just set queue to all current images
            setImageQueue(allImages);
            console.log('Images in queue:', allImages.length);
          }
        };
        
        quill.on('text-change', handleTextChange);
        
        return () => {
          quill.off('text-change', handleTextChange);
        };
      } else {
        console.log('Quill editor not found');
      }
    }, 100); 
    
    return () => clearTimeout(timer);
  }, [mounted]);

  // Add this useEffect to track queue changes
  useEffect(() => {
    console.log('Queue updated - Total images:', imageQueue.length);
  }, [imageQueue]);

  if (!mounted) {
    return (
      <div className={styles.quillEditorLoading}>
        Loading editor...
      </div>
    );
  }

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <div className={`${styles.quillEditor} quillEditor`}>
      <input
        type="text"
        value={articleTitle}
        onChange={(e) => {
          setArticleTitle(e.target.value);
          onTitleChange?.(e.target.value);
        }}
        placeholder="Title"
        className={styles.titleInput}
      />
      
      <div className={styles.editorHeader}>
        <button 
          onClick={handlePublish}
          disabled={publishingState !== 'draft'}
          className={`${styles.publishButton} ${styles[publishingState]}`}
        >
          {publishingState === 'draft' && 'Publish'}
          {publishingState === 'uploading' && 'Publishing...'}
          {publishingState === 'success' && 'Published'}
          {publishingState === 'failed' && 'Failed - Retry'}
        </button>
      </div>
      
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Tell your story..."}
        modules={modules}
        style={{ minHeight: "400px" }}
      />
    </div>
  );
}
