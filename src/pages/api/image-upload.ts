import { NextApiRequest, NextApiResponse } from 'next';
import { readFile, unlink } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import { formidable, FormidableError } from 'formidable';
import sharp from 'sharp';

// Custom base64 image compression function using Sharp
async function compressBase64Image(base64String: string): Promise<string> {
  try {
    // Convert base64 to buffer
    const imageBuffer = Buffer.from(base64String, 'base64');
    
    // Use Sharp to resize and compress the image
    const compressedBuffer = await sharp(imageBuffer)
      .resize(640, 480, { 
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({ 
        quality: 20, // 80% quality (good compression)
        progressive: true
      })
      .toBuffer();
    
    // Convert back to base64
    return compressedBuffer.toString('base64');
  } catch (error) {
    throw error;
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

interface ImageUploadResponse {
  success: boolean;
  url?: string;
  filename?: string;
  error?: string;
}

// GitHub repository configuration
const GITHUB_OWNER = process.env.GITHUB_USERNAME || '100xsystems';
const GITHUB_REPO = process.env.GITHUB_REPO || '100x-storage';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ImageUploadResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  // Check if GitHub configuration is available
  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    return res.status(500).json({ 
      success: false, 
      error: 'GitHub storage not configured. Please set GITHUB_TOKEN, GITHUB_OWNER, and GITHUB_REPO environment variables.' 
    });
  }

  try {
    const form = formidable({
      maxFileSize: 10 * 1024 * 1024, // 10MB
      keepExtensions: true,
    });

    const [fields, files] = await form.parse(req);
    
    const file = files.file?.[0];
    
    if (!file) {
      return res.status(400).json({ success: false, error: 'No file provided' });
    }

    // Generate unique filename
    const fileExtension = file.originalFilename?.split('.').pop() || 'jpg';
    const uniqueFilename = `${uuidv4()}.${fileExtension}`;
    const filePath = `chat-images/${uniqueFilename}`;

    // Upload to GitHub repository
    try {
      // Read file content and convert to base64
      const fileBuffer = await readFile(file.filepath);
      const originalBase64 = fileBuffer.toString('base64');
      
      // Compress image by 98% before uploading
      let compressedBase64: string;
      
      try {
        // Custom compression for base64 strings
        compressedBase64 = await compressBase64Image(originalBase64);
      } catch (compressionError) {
        compressedBase64 = originalBase64; // Fallback to original if compression fails
      }
      
      // First, try to create the directory (it will fail if it already exists, that's ok)
      try {
        await fetch(
          `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/chat-images/.gitkeep`,
          {
            method: 'PUT',
            headers: {
              'Authorization': `token ${GITHUB_TOKEN}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              message: 'Create chat-images directory',
              content: '',
              branch: 'main'
            })
          }
        );
      } catch (dirError) {
        // Directory might already exist, that's fine
      }
      
      const githubResponse = await fetch(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: `Upload chat image: ${uniqueFilename}`,
            content: compressedBase64, // Use compressed image
            branch: 'main'
          })
        }
      );

      if (!githubResponse.ok) {
        const errorData = await githubResponse.json();
        throw new Error(`GitHub upload failed: ${errorData.message || 'Unknown error'}`);
      }

      const githubData = await githubResponse.json();
      const rawUrl = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/main/${filePath}`;

      // Clean up temporary file
      await unlink(file.filepath);

      return res.status(200).json({
        success: true,
        url: rawUrl,
        filename: uniqueFilename
      });

    } catch (githubError) {
      throw new Error(`GitHub upload failed: ${githubError instanceof Error ? githubError.message : 'Unknown error'}`);
    }

  } catch (error) {
    
    if (error && typeof error === 'object' && 'code' in error) {
      // Formidable error
      const formidableError = error as any;
      return res.status(400).json({ 
        success: false, 
        error: `File upload error: ${formidableError.message || 'Unknown form error'}` 
      });
    }
    
    if (error instanceof Error) {
      return res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
    
    return res.status(500).json({ 
      success: false, 
      error: 'Image upload failed' 
    });
  }
}
