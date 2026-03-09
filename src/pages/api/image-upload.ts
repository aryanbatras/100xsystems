import { NextApiRequest, NextApiResponse } from 'next';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

interface ImageUploadResponse {
  success: boolean;
  url?: string;
  filename?: string;
  error?: string;
}

// GitHub repository configuration
const GITHUB_OWNER = process.env.GITHUB_OWNER || '100xsystems';
const GITHUB_REPO = process.env.GITHUB_REPO || '100x-storage';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ImageUploadResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const file = req.body;

    if (!file) {
      return res.status(400).json({ success: false, error: 'No file provided' });
    }

    // Generate unique filename
    const fileExtension = file.originalFilename?.split('.').pop() || 'jpg';
    const uniqueFilename = `${uuidv4()}.${fileExtension}`;
    const filePath = `chat-images/${uniqueFilename}`;

    if (GITHUB_TOKEN && GITHUB_OWNER && GITHUB_REPO) {
      // Upload to GitHub repository
      try {
        // Convert file buffer to base64
        const base64Content = Buffer.from(file.buffer).toString('base64');
        
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
              content: base64Content,
              branch: 'main'
            })
          }
        );

        if (!githubResponse.ok) {
          const errorData = await githubResponse.json();
          console.error('GitHub upload error:', errorData);
          throw new Error('Failed to upload to GitHub');
        }

        const githubData = await githubResponse.json();
        const rawUrl = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/main/${filePath}`;

        return res.status(200).json({
          success: true,
          url: rawUrl,
          filename: uniqueFilename
        });

      } catch (githubError) {
        console.error('GitHub upload failed, falling back to local storage:', githubError);
        
        // Fallback to local storage
        return await uploadLocally(file, uniqueFilename, res);
      }

    } else {
      // Local storage fallback
      return await uploadLocally(file, uniqueFilename, res);
    }

  } catch (error) {
    console.error('Image upload error:', error);
    
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

async function uploadLocally(
  file: any, 
  filename: string, 
  res: NextApiResponse<ImageUploadResponse>
) {
  try {
    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'public', 'uploads', 'chat-images');
    await mkdir(uploadsDir, { recursive: true });

    // Write file to local storage
    const filePath = join(uploadsDir, filename);
    await writeFile(filePath, Buffer.from(file.buffer));

    // Return public URL
    const publicUrl = `/uploads/chat-images/${filename}`;

    return res.status(200).json({
      success: true,
      url: publicUrl,
      filename
    });

  } catch (localError) {
    console.error('Local storage failed:', localError);
    return res.status(500).json({
      success: false,
      error: 'Both GitHub and local storage failed'
    });
  }
}
