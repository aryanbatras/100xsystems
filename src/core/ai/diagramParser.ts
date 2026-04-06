import { ExcalidrawElementSkeleton, DiagramRequest, EnhancedChatResponse, DiagramValidationResult } from './diagramTypes';
import { DiagramValidator } from './diagramValidator';
import { DIAGRAM_KEYWORDS } from './diagramConfig';
import { MermaidParser, ParsedMermaidResponse } from './mermaidParser';
import { MermaidConverter } from './mermaidConverter';

export class DiagramParser {
  private validator: DiagramValidator;
  private mermaidParser: MermaidParser;
  private mermaidConverter: MermaidConverter;

  constructor() {
    this.validator = new DiagramValidator();
    this.mermaidParser = new MermaidParser();
    this.mermaidConverter = new MermaidConverter();
  }

  /**
   * Parse AI response and extract diagram data
   */
  async parseAIResponse(aiContent: string, theme: string = 'dark'): Promise<EnhancedChatResponse> {
    try {
      console.log('🔍 Parsing AI response:', aiContent.substring(0, 200) + '...');
      
      // First check if it's a Mermaid response
      const mermaidResult = this.mermaidParser.parseAIResponse(aiContent);
      if (mermaidResult.hasMermaid && mermaidResult.mermaidSyntax) {
        console.log('🐳 Mermaid diagram detected, converting to Excalidraw...');
        return await this.handleMermaidResponse(mermaidResult, theme);
      }
      
      // Clean up content
      const cleanedContent = this.cleanAIContent(aiContent);
      
      // Try to extract JSON from response
      const jsonMatch = this.extractJSON(cleanedContent);
      
      if (!jsonMatch) {
        console.log('❌ No JSON found in AI response');
        return { content: cleanedContent };
      }

      console.log('📄 Found JSON:', jsonMatch.substring(0, 200) + '...');
      
      const parsed = JSON.parse(jsonMatch);
      console.log('✅ Parsed JSON structure:', {
        hasContent: !!parsed.content,
        hasDiagram: !!parsed.diagram,
        diagramType: parsed.diagram?.diagramType,
        elementCount: parsed.diagram?.elements?.length || 0
      });
      
      // Validate structure
      if (parsed.diagram?.elements) {
        const validation = this.validator.validate(parsed.diagram.elements);
        
        console.log('🔍 Diagram validation result:', {
          isValid: validation.isValid,
          errorCount: validation.errors.length,
          warningCount: validation.warnings.length,
          validElementCount: validation.elements.length
        });
        
        if (!validation.isValid) {
          console.error('❌ Diagram validation failed:', validation.errors);
          return { 
            content: this.createErrorMessage(validation.errors, cleanedContent),
            diagram: {
              type: 'diagram',
              diagramType: parsed.diagram.diagramType || 'custom',
              elements: validation.elements, // Use only valid elements
              description: parsed.diagram.description || 'Diagram with validation errors',
              title: parsed.diagram.title
            }
          };
        }

        console.log('✅ Valid diagram parsed successfully');
        return {
          content: parsed.content || cleanedContent,
          diagram: {
            type: 'diagram',
            diagramType: parsed.diagram.diagramType || 'custom',
            elements: validation.elements,
            description: parsed.diagram.description || 'Generated diagram',
            title: parsed.diagram.title
          },
          actions: parsed.actions
        };
      }
      
      return { content: cleanedContent };
    } catch (error) {
      console.error('❌ Failed to parse diagram from AI response:', error);
      return { content: aiContent };
    }
  }

  /**
   * Handle Mermaid response conversion to Excalidraw
   */
  private async handleMermaidResponse(mermaidResult: ParsedMermaidResponse, theme: string = 'dark'): Promise<EnhancedChatResponse> {
    try {
      console.log('🐳 === HANDLING MERMAID RESPONSE ===');
      console.log('🐳 Mermaid syntax:', mermaidResult.mermaidSyntax);
      console.log('🐳 Theme:', theme);
      
      // Convert Mermaid to Excalidraw elements with theme-aware colors
      const conversionResult = await this.mermaidConverter.convertToExcalidraw(mermaidResult.mermaidSyntax!, 16, theme);
      
      if (!conversionResult.success) {
        console.error('❌ Mermaid conversion failed:', conversionResult.error);
        return {
          content: `${mermaidResult.content}\n\n⚠️ **Mermaid Conversion Failed**: ${conversionResult.error}\n\n**Raw Mermaid Syntax:**\n\`\`\`mermaid\n${mermaidResult.mermaidSyntax}\n\`\`\``,
          diagram: undefined
        };
      }
      
      console.log('✅ Mermaid conversion successful:', conversionResult.elements.length, 'elements');
      
      return {
        content: mermaidResult.content,
        diagram: {
          type: 'diagram',
          diagramType: 'flowchart', // Use valid type from the union
          elements: conversionResult.elements,
          description: mermaidResult.description || 'Generated from Mermaid',
          title: mermaidResult.title
        }
      };
    } catch (error) {
      console.error('❌ Failed to handle Mermaid response:', error);
      return {
        content: `${mermaidResult.content}\n\n⚠️ **Mermaid Processing Error**: ${error instanceof Error ? error.message : 'Unknown error'}\n\n**Raw Mermaid Syntax:**\n\`\`\`mermaid\n${mermaidResult.mermaidSyntax}\n\`\`\``,
        diagram: undefined
      };
    }
  }

  /**
   * Check if user is requesting a diagram
   */
  isDiagramRequest(content: string): boolean {
    const lowerContent = content.toLowerCase();
    return DIAGRAM_KEYWORDS.some(keyword => lowerContent.includes(keyword));
  }

  /**
   * Check if user is specifically requesting a Mermaid diagram
   */
  isMermaidRequest(content: string): boolean {
    return this.mermaidParser.isMermaidRequest(content);
  }

  /**
   * Convert ExcalidrawElementSkeleton to Excalidraw elements
   * This will be used after importing convertToExcalidrawElements from @excalidraw/excalidraw
   */
  async convertToExcalidraw(elements: ExcalidrawElementSkeleton[]): Promise<any[]> {
    try {
      // Dynamic import to avoid SSR issues
      const { convertToExcalidrawElements } = await import('@excalidraw/excalidraw');
      
      console.log('🔄 Converting elements to Excalidraw format:', elements.length, 'elements');
      console.log('📝 Input elements:', elements);
      
      // The elements are already in the correct ExcalidrawElementSkeleton format
      // Let Excalidraw handle colors automatically based on theme
      const result = convertToExcalidrawElements(elements as any[], { regenerateIds: true });
      
      console.log('✅ Converted to Excalidraw elements:', result.length, 'elements');
      console.log('📝 Output elements:', result);
      
      return result;
    } catch (error) {
      console.error('❌ Failed to convert with convertToExcalidrawElements:', error);
      
      // Fallback: try to use elements directly as a last resort
      console.log('🔄 Using fallback direct element mapping...');
      try {
        const fallbackElements = elements.map(element => {
          const fallback: any = {
            id: element.id || `element-${Date.now()}-${Math.random()}`,
            type: element.type,
            x: element.x,
            y: element.y,
            width: element.width || 200,
            height: element.height || 100,
            strokeColor: element.strokeColor || '#000000',
            backgroundColor: element.backgroundColor || '#ffffff',
            fillStyle: 'solid',
            strokeWidth: element.strokeWidth || 2,
            roughness: 0,
            opacity: 100
          };
          
          if (element.text) {
            fallback.text = element.text;
            fallback.fontSize = element.fontSize || 16;
            fallback.fontFamily = 1;
            fallback.textAlign = 'center';
            fallback.verticalAlign = 'middle';
          }
          
          if (element.label) {
            fallback.text = element.label.text;
            fallback.fontSize = element.label.fontSize || 16;
            fallback.fontFamily = 1;
            fallback.textAlign = 'center';
            fallback.verticalAlign = 'middle';
          }
          
          return fallback;
        });
        
        console.log('✅ Fallback conversion successful:', fallbackElements.length, 'elements');
        return fallbackElements;
      } catch (fallbackError) {
        console.error('❌ Fallback conversion also failed:', fallbackError);
        return [];
      }
    }
  }

  /**
   * Validate diagram elements
   */
  validateDiagram(elements: ExcalidrawElementSkeleton[]): DiagramValidationResult {
    return this.validator.validate(elements);
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
   * Create error message for invalid diagrams
   */
  private createErrorMessage(errors: string[], originalContent: string): string {
    const errorSummary = errors.slice(0, 3).join(', ');
    const moreErrors = errors.length > 3 ? ` and ${errors.length - 3} more issues` : '';
    
    return `${originalContent}\n\n⚠️ **Diagram Generation Issues**: ${errorSummary}${moreErrors}. I've created a partial diagram. Please ask me to fix specific issues if needed.`;
  }

  /**
   * Extract diagram type from user request
   */
  extractDiagramType(content: string): string {
    const lowerContent = content.toLowerCase();
    
    if (lowerContent.includes('flowchart') || lowerContent.includes('flow')) {
      return 'flowchart';
    } else if (lowerContent.includes('system') || lowerContent.includes('architecture')) {
      return 'system-design';
    } else if (lowerContent.includes('sequence')) {
      return 'sequence';
    } else if (lowerContent.includes('network')) {
      return 'network';
    } else if (lowerContent.includes('structure') || lowerContent.includes('layout')) {
      return 'architecture';
    }
    
    return 'custom';
  }

  /**
   * Generate diagram request context for AI
   */
  generateDiagramContext(userContent: string): string {
    const diagramType = this.extractDiagramType(userContent);
    
    return `
User is requesting a diagram of type: ${diagramType}
Original request: "${userContent}"

Please generate a valid JSON response following the ExcalidrawElementSkeleton specification.
Focus on creating a clear, well-structured diagram that effectively communicates the concept.
`;
  }

  /**
   * Repair common diagram issues
   */
  repairDiagram(elements: ExcalidrawElementSkeleton[]): ExcalidrawElementSkeleton[] {
    return elements.map((element, index) => {
      const repaired = { ...element };
      
      // Ensure all elements have required properties
      if (!repaired.type) {
        return null; // Remove invalid elements
      }
      
      // Auto-generate ID if missing
      if (!repaired.id) {
        repaired.id = `element-${index}`;
      }
      
      // Set default dimensions for shapes
      if (['rectangle', 'ellipse', 'diamond'].includes(repaired.type)) {
        if (!repaired.width) repaired.width = 200;
        if (!repaired.height) repaired.height = 100;
      }
      
      // Set default colors
      if (!repaired.strokeColor) {
        repaired.strokeColor = '#1971c2';
      }
      
      if (!repaired.backgroundColor && ['rectangle', 'ellipse', 'diamond'].includes(repaired.type)) {
        repaired.backgroundColor = '#a5d8ff';
      }
      
      return repaired;
    }).filter(Boolean) as ExcalidrawElementSkeleton[];
  }
}
