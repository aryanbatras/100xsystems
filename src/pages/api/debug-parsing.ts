import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { slug = 'aaa' } = req.query;
    
    console.log('🧪 === DEBUG PARSING TEST START ===');
    console.log(`📂 Testing article: ${slug}`);
    
    // Step 1: Load the HTML
    const loadResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/load-html?slug=${slug}`);
    
    if (!loadResponse.ok) {
      return res.status(500).json({ error: 'Failed to load HTML' });
    }
    
    const loadData = await loadResponse.json();
    console.log(`📄 HTML loaded successfully (${loadData.html.length} characters)`);
    
    // Step 2: Parse the HTML with full debugging
    console.log('🔄 Starting HTML parsing...');
    const { HtmlToDeltaConverter } = await import('../../core/infrastructure/HtmlToDeltaConverter');
    
    const parsed = HtmlToDeltaConverter.parseHtml(loadData.html);
    const delta = HtmlToDeltaConverter.convertToDelta(loadData.html);
    
    console.log('🧪 === DEBUG PARSING TEST END ===');
    
    return res.status(200).json({
      success: true,
      results: {
        slug,
        htmlLength: loadData.html.length,
        contentLength: parsed.content.length,
        imagesCount: parsed.images.length,
        hasMetadata: !!parsed.metadata,
        deltaOperations: delta.ops?.length || 0,
        metadata: parsed.metadata,
        images: parsed.images,
        contentPreview: parsed.content.substring(0, 500),
        htmlPreview: loadData.html.substring(0, 1000)
      }
    });
    
  } catch (error) {
    console.error('❌ Debug parsing failed:', error);
    return res.status(500).json({ 
      error: 'Debug parsing failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
