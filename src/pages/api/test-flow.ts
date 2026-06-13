import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    
    // Step 1: Test listing articles
    const listResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/list-articles`);
    const listData = await listResponse.json();
    
    if (!listData.success || !listData.articles || listData.articles.length === 0) {
      return res.status(500).json({ 
        error: 'Failed to list articles', 
        details: listData 
      });
    }
    
    const firstArticle = listData.articles[0];
    
    // Step 2: Test loading HTML for first article
    const loadResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/load-html?slug=${firstArticle}`);
    const loadData = await loadResponse.json();
    
    if (!loadResponse.ok || !loadData.html) {
      return res.status(500).json({ 
        error: 'Failed to load article HTML', 
        details: loadData 
      });
    }
    
    
    // Step 3: Test HTML parsing
    const { HtmlToDeltaConverter } = await import('../../infrastructure/converters/htmlToDeltaConverter');
    
    try {
      const parsed = HtmlToDeltaConverter.parseHtml(loadData.html);
      const delta = HtmlToDeltaConverter.convertToDelta(loadData.html);
      
      
      return res.status(200).json({
        success: true,
        message: 'Complete flow test successful',
        results: {
          articlesCount: listData.articles.length,
          testArticle: firstArticle,
          htmlLength: loadData.html.length,
          contentLength: parsed.content.length,
          imagesCount: parsed.images.length,
          hasMetadata: !!parsed.metadata,
          deltaOperations: delta.ops?.length || 0,
          metadata: parsed.metadata
        }
      });
      
    } catch (parseError) {
      return res.status(500).json({ 
        error: 'HTML parsing failed', 
        details: parseError instanceof Error ? parseError.message : 'Unknown error'
      });
    }
    
  } catch (error) {
    return res.status(500).json({ 
      error: 'Test flow failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
