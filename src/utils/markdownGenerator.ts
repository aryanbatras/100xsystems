import { UploadedImage } from '../hooks/useImageProcessing';

export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .substring(0, 50);
};

export const generateMarkdown = (delta: any, title: string, slug: string, uploadedImages: UploadedImage[]): string => {
  console.log('📄 Generating markdown file...');
  
  const frontmatter = {
    title: title,
    slug: slug,
    date: new Date().toISOString().split('T')[0],
    images: uploadedImages.map(img => img.publicUrl)
  };
  
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

  let markdown = yamlFrontmatter;
  let imageIndex = 0;
  
  if (delta.ops) {
    delta.ops.forEach((op: any) => {
      if (typeof op.insert === 'string') {
        markdown += op.insert;
      } else if (op.insert && typeof op.insert === 'object') {
        if ('image' in op.insert) {
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

export const publishMarkdownToGitHub = async (slug: string, markdown: string): Promise<void> => {
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
