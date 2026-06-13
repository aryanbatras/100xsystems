/**
 * ## AI Diagram: Mermaid Parser
 *
 * Parses Mermaid diagram syntax from AI responses.
 * Extracts diagram definitions, validates syntax, and
 * prepares them for rendering.
 *
 * @packageDocumentation
 */

export interface MermaidResponse {
  content: string;
  mermaidSyntax: string;
  diagramType: string;
  description: string;
  title: string;
}

export interface ParsedMermaidResponse {
  content: string;
  mermaidSyntax?: string;
  diagramType?: string;
  description?: string;
  title?: string;
  hasMermaid: boolean;
  error?: string;
}

export class MermaidParser {
  /**
   * Parse AI response to extract Mermaid data
   */
  parseAIResponse(aiContent: string): ParsedMermaidResponse {
    try {
      console.log('🔍 Parsing AI response for Mermaid:', aiContent.substring(0, 200) + '...');
      
      // Clean up content
      const cleanedContent = this.cleanAIContent(aiContent);
      
      // Try to extract JSON from response
      const jsonMatch = this.extractJSON(cleanedContent);
      
      if (!jsonMatch) {
        console.log('❌ No JSON found in AI response');
        return { content: cleanedContent, hasMermaid: false };
      }

      console.log('📄 Found JSON:', jsonMatch.substring(0, 200) + '...');
      
      const parsed = JSON.parse(jsonMatch) as MermaidResponse;
      console.log('✅ Parsed Mermaid JSON structure:', {
        hasContent: !!parsed.content,
        hasMermaidSyntax: !!parsed.mermaidSyntax,
        diagramType: parsed.diagramType,
        syntaxLength: parsed.mermaidSyntax?.length || 0
      });
      
      // Validate Mermaid syntax
      if (parsed.mermaidSyntax) {
        const validation = this.validateMermaidSyntax(parsed.mermaidSyntax);
        
        console.log('🔍 Mermaid validation result:', {
          isValid: validation.isValid,
          errorCount: validation.errors.length,
          warningCount: validation.warnings.length
        });
        
        if (!validation.isValid) {
          console.error('❌ Mermaid validation failed:', validation.errors);
          return { 
            content: this.createErrorMessage(validation.errors, cleanedContent),
            hasMermaid: false,
            error: validation.errors.join(', ')
          };
        }

        console.log('✅ Valid Mermaid parsed successfully');
        return {
          content: parsed.content || cleanedContent,
          mermaidSyntax: parsed.mermaidSyntax,
          diagramType: parsed.diagramType || 'flowchart',
          description: parsed.description || 'Generated Mermaid diagram',
          title: parsed.title,
          hasMermaid: true
        };
      }
      
      return { content: cleanedContent, hasMermaid: false };
    } catch (error) {
      console.error('❌ Failed to parse Mermaid from AI response:', error);
      return { content: aiContent, hasMermaid: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  /**
   * Validate basic Mermaid syntax
   */
  validateMermaidSyntax(mermaidSyntax: string): { isValid: boolean; errors: string[]; warnings: string[] } {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Basic syntax checks
    if (!mermaidSyntax.trim()) {
      errors.push('Mermaid syntax is empty');
      return { isValid: false, errors, warnings };
    }

    // Check for flowchart declaration
    const lines = mermaidSyntax.split('\n').map(line => line.trim()).filter(line => line);
    const firstLine = lines[0]?.toLowerCase();
    
    if (!firstLine?.includes('flowchart') && !firstLine?.includes('graph')) {
      errors.push('Must start with flowchart or graph declaration');
    }

    // Check for basic node syntax
    const nodePattern = /\w+(\[.*?\]|\(.*?\)|\{.*?\})/g;
    const nodes = mermaidSyntax.match(nodePattern) || [];
    
    if (nodes.length === 0) {
      errors.push('No valid nodes found');
    }

    // Check for connections
    const connectionPattern = /-->|<-?->|---|-\.->|\.\.\./g;
    const connections = mermaidSyntax.match(connectionPattern) || [];
    
    if (nodes.length > 1 && connections.length === 0) {
      warnings.push('Multiple nodes but no connections found');
    }

    // Check for common syntax errors
    if (mermaidSyntax.includes('[') && !mermaidSyntax.includes(']')) {
      errors.push('Unclosed square brackets');
    }
    
    if (mermaidSyntax.includes('(') && !mermaidSyntax.includes(')')) {
      errors.push('Unclosed parentheses');
    }
    
    if (mermaidSyntax.includes('{') && !mermaidSyntax.includes('}')) {
      errors.push('Unclosed curly braces');
    }

    // Check for proper spacing in connections
    const improperSpacing = mermaidSyntax.match(/\w+-->\w+/g);
    if (improperSpacing) {
      warnings.push('Connections should have spaces around arrows (A --> B instead of A-->B)');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Clean AI content by removing markdown code blocks and extra formatting
   */
  private cleanAIContent(content: string): string {
    return content
      .replace(/```json\s*/g, '')
      .replace(/```\s*$/g, '')
      .replace(/```/g, '')
      .trim();
  }

  /**
   * Extract JSON from AI response
   */
  private extractJSON(content: string): string | null {
    // Try to find JSON object in the content
    const jsonStart = content.indexOf('{');
    const jsonEnd = content.lastIndexOf('}');
    
    if (jsonStart === -1 || jsonEnd === -1 || jsonStart >= jsonEnd) {
      return null;
    }

    const jsonStr = content.substring(jsonStart, jsonEnd + 1);
    
    // Validate that it's valid JSON
    try {
      JSON.parse(jsonStr);
      return jsonStr;
    } catch (error) {
      return null;
    }
  }

  /**
   * Create error message for invalid Mermaid
   */
  private createErrorMessage(errors: string[], originalContent: string): string {
    const errorSummary = errors.slice(0, 3).join(', ');
    const moreErrors = errors.length > 3 ? ` and ${errors.length - 3} more issues` : '';
    
    return `${originalContent}\n\n⚠️ **Mermaid Generation Issues**: ${errorSummary}${moreErrors}. Please try rephrasing your request.`;
  }

  /**
   * Extract diagram type from user request
   */
  extractDiagramType(content: string): string {
    const lowerContent = content.toLowerCase();
    
    if (lowerContent.includes('flowchart') || lowerContent.includes('flow')) {
      return 'flowchart';
    } else if (lowerContent.includes('sequence')) {
      return 'sequence';
    } else if (lowerContent.includes('system') || lowerContent.includes('architecture')) {
      return 'system';
    } else if (lowerContent.includes('network')) {
      return 'network';
    } else if (lowerContent.includes('journey') || lowerContent.includes('user')) {
      return 'journey';
    }
    
    return 'flowchart';
  }

  /**
   * Check if user is requesting a Mermaid diagram
   */
  isMermaidRequest(content: string): boolean {
    const mermaidKeywords = ['mermaid', 'flowchart', 'graph'];
    const lowerContent = content.toLowerCase();
    return mermaidKeywords.some(keyword => lowerContent.includes(keyword));
  }

  /**
   * Generate Mermaid request context for AI
   */
  generateMermaidContext(userContent: string): string {
    const diagramType = this.extractDiagramType(userContent);
    
    return `
User is requesting a Mermaid diagram of type: ${diagramType}
Original request: "${userContent}"

Please generate valid JSON response following the MermaidResponse specification.
Focus on creating a clear, well-structured Mermaid diagram that effectively communicates the concept.
Use proper Mermaid syntax that can be converted to Excalidraw.
`;
  }
}
