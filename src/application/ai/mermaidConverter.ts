/**
 * ## AI Diagram: Mermaid Converter
 *
 * Converts AI-generated diagram descriptions into Mermaid
 * syntax. Supports flowchart, sequence diagram, and
 * class diagram generation.
 *
 * @packageDocumentation
 */

export interface ConversionResult {
  elements: any[];
  files?: any;
  success: boolean;
  error?: string;
}

export class MermaidConverter {
  /**
   * Apply proper colors to Excalidraw elements based on theme
   */
  private applyColorStyles(elements: any[], theme: string = 'dark'): any[] {
    console.log('🎨 Applying color styles to', elements.length, 'elements for theme:', theme);
    
    return elements.map(element => {
      const styledElement = { ...element };
      
      // Define color schemes for light and dark themes
      const lightThemeColors = {
        rectangle: { stroke: '#1e40af', fill: '#dbeafe', text: '#1e40af' },      // Dark blue text on light blue
        ellipse: { stroke: '#047857', fill: '#d1fae5', text: '#047857' },        // Dark green text on light green  
        diamond: { stroke: '#b91c1c', fill: '#fee2e2', text: '#b91c1c' },         // Dark red text on light red
        arrow: { stroke: '#374151', text: '#374151' },                           // Medium gray
        text: { stroke: '#111827', text: '#111827' },                           // Very dark text
        default: { stroke: '#4f46e5', fill: '#e0e7ff', text: '#4f46e5' }        // Darker indigo text on light indigo
      };
      
      const darkThemeColors = {
        rectangle: { stroke: '#93c5fd', fill: '#1e3a8a', text: '#93c5fd' },      // Light blue text on dark blue
        ellipse: { stroke: '#6ee7b7', fill: '#064e3b', text: '#6ee7b7' },        // Light green text on dark green
        diamond: { stroke: '#fca5a5', fill: '#7f1d1d', text: '#fca5a5' },        // Light red text on dark red
        arrow: { stroke: '#d1d5db', text: '#d1d5db' },                           // Light gray
        text: { stroke: '#f9fafb', text: '#f9fafb' },                           // Very light text
        default: { stroke: '#c4b5fd', fill: '#312e81', text: '#c4b5fd' }        // Light indigo text on dark indigo
      };
      
      const colors = theme === 'dark' ? darkThemeColors : lightThemeColors;
      
      // Apply colors based on element type
      switch (element.type) {
        case 'rectangle':
          styledElement.strokeColor = colors.rectangle.stroke;
          styledElement.backgroundColor = colors.rectangle.fill;
          styledElement.strokeWidth = 3; // Thicker strokes for better visibility
          break;
        case 'ellipse':
          styledElement.strokeColor = colors.ellipse.stroke;
          styledElement.backgroundColor = colors.ellipse.fill;
          styledElement.strokeWidth = 3;
          break;
        case 'diamond':
          styledElement.strokeColor = colors.diamond.stroke;
          styledElement.backgroundColor = colors.diamond.fill;
          styledElement.strokeWidth = 3;
          break;
        case 'arrow':
        case 'line':
          styledElement.strokeColor = colors.arrow.stroke;
          styledElement.strokeWidth = 3;
          break;
        case 'text':
          styledElement.strokeColor = colors.text.text;
          styledElement.backgroundColor = 'transparent';
          styledElement.color = colors.text.text;
          styledElement.fontSize = 16; // Larger text for better readability
          styledElement.fontFamily = 'Inter, sans-serif'; // Clean font
          break;
        default:
          styledElement.strokeColor = colors.default.stroke;
          styledElement.backgroundColor = colors.default.fill;
          styledElement.strokeWidth = 3;
      }
      
      // Apply general styling
      styledElement.fillStyle = 'solid';
      styledElement.opacity = 100;
      styledElement.roughness = 1;
      
      console.log('🎨 Styled element:', {
        type: styledElement.type,
        theme: theme,
        strokeColor: styledElement.strokeColor,
        backgroundColor: styledElement.backgroundColor
      });
      
      return styledElement;
    });
  }

  /**
   * Convert Mermaid syntax to Excalidraw elements using @excalidraw/mermaid-to-excalidraw
   */
  async convertToExcalidraw(mermaidSyntax: string, fontSize: number = 16, theme: string = 'dark'): Promise<ConversionResult> {
    try {
      console.log(' === MERMAID TO EXCALIDRAW CONVERSION START ===');
      console.log(' Input Mermaid syntax:', mermaidSyntax);
      console.log(' Font size:', fontSize);
      
      // Dynamic import to avoid SSR issues
      console.log(' Importing conversion libraries...');
      const { parseMermaidToExcalidraw } = await import('@excalidraw/mermaid-to-excalidraw');
      const { convertToExcalidrawElements } = await import('@excalidraw/excalidraw');
      
      console.log(' Libraries imported successfully');
      
      // Step 1: Parse Mermaid to skeleton elements
      console.log(' Step 1: Parsing Mermaid to skeleton elements...');
      const skeletonResult = await parseMermaidToExcalidraw(mermaidSyntax);
      
      console.log(' Skeleton parsing result:', {
        hasElements: !!skeletonResult.elements,
        elementCount: skeletonResult.elements?.length || 0,
        hasFiles: !!skeletonResult.files,
        fileCount: Object.keys(skeletonResult.files || {}).length
      });
      
      if (!skeletonResult.elements || skeletonResult.elements.length === 0) {
        console.error(' No elements generated from Mermaid syntax');
        throw new Error('No elements generated from Mermaid syntax');
      }
      
      // Step 2: Convert skeleton to full Excalidraw elements
      console.log(' Step 2: Converting skeleton to Excalidraw elements...');
      const excalidrawElements = convertToExcalidrawElements(skeletonResult.elements);
      
      // Step 3: Apply proper colors for visibility based on theme
      console.log('🎨 Step 3: Applying proper colors for theme:', theme);
      const styledElements = this.applyColorStyles(excalidrawElements, theme);
      
      console.log(' Excalidraw conversion result:', {
        success: styledElements.length > 0,
        elementCount: styledElements.length,
        firstElement: styledElements[0],
        allElements: styledElements
      });
      
      if (!styledElements || styledElements.length === 0) {
        console.error(' Failed to convert skeleton elements to Excalidraw format');
        throw new Error('Failed to convert skeleton elements to Excalidraw format');
      }
      
      console.log(' === CONVERSION SUCCESSFUL ===');
      console.log(' Final result:', {
        totalElements: styledElements.length,
        elements: styledElements.slice(0, 3), // Show first 3 elements
        files: skeletonResult.files
      });
      
      return {
        elements: styledElements,
        files: skeletonResult.files,
        success: true
      };
      
    } catch (error) {
      console.error(' === CONVERSION ERROR ===');
      console.error(' Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : 'No stack trace'
      });
      
      let errorMessage = 'Unknown conversion error';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      // Check for common error patterns
      if (errorMessage.includes('parse') || errorMessage.includes('syntax')) {
        errorMessage = 'Invalid Mermaid syntax. Please check your diagram structure.';
      } else if (errorMessage.includes('convert') || errorMessage.includes('format')) {
        errorMessage = 'Failed to convert Mermaid to Excalidraw format.';
      } else if (errorMessage.includes('import') || errorMessage.includes('module')) {
        errorMessage = 'Mermaid conversion library not available.';
      }
      
      return {
        elements: [],
        success: false,
        error: errorMessage
      };
    }
  }

  /**
   * Check if Mermaid syntax is supported for conversion
   */
  isSupportedMermaidType(mermaidSyntax: string): boolean {
    const lowerSyntax = mermaidSyntax.toLowerCase();
    
    // Check for supported diagram types
    const supportedTypes = [
      'flowchart',
      'graph'
    ];
    
    return supportedTypes.some(type => lowerSyntax.includes(type));
  }

  /**
   * Get supported diagram types for user reference
   */
  getSupportedDiagramTypes(): string[] {
    return [
      'flowchart TD (Top to Down)',
      'flowchart LR (Left to Right)',
      'graph TD (Top to Down)',
      'graph LR (Left to Right)'
    ];
  }

  /**
   * Preprocess Mermaid syntax for better conversion
   */
  preprocessMermaidSyntax(mermaidSyntax: string): string {
    let processed = mermaidSyntax.trim();
    
    // Ensure proper flowchart declaration
    if (!processed.match(/^(flowchart|graph)\s+(TD|LR)/i)) {
      // Default to TD if no direction specified
      if (processed.startsWith('flowchart') || processed.startsWith('graph')) {
        processed = processed.replace(/^(flowchart|graph)/i, '$1 TD');
      } else {
        processed = `flowchart TD\n${processed}`;
      }
    }
    
    // Clean up common syntax issues
    processed = processed
      .replace(/\s*-->\s*/g, ' --> ') // Normalize arrows
      .replace(/\s*<-?->\s*/g, ' <--> ') // Normalize bidirectional arrows
      .replace(/\s*---\s*/g, ' --- ') // Normalize lines
      .replace(/\s*-\.-\>\s*/g, ' -.-> ') // Normalize dotted arrows
      .replace(/\n\s*\n/g, '\n') // Remove empty lines
      .trim();
    
    console.log('🔧 Preprocessed Mermaid syntax:', processed);
    
    return processed;
  }

  /**
   * Get conversion statistics for debugging
   */
  getConversionStats(elements: any[]): { [key: string]: number } {
    const stats: { [key: string]: number } = {};
    
    elements.forEach(element => {
      const type = element.type || 'unknown';
      stats[type] = (stats[type] || 0) + 1;
    });
    
    return stats;
  }

  /**
   * Validate conversion result
   */
  validateConversionResult(result: ConversionResult): { isValid: boolean; issues: string[] } {
    const issues: string[] = [];
    
    if (!result.success) {
      issues.push(result.error || 'Conversion failed');
    }
    
    if (!result.elements || result.elements.length === 0) {
      issues.push('No elements generated');
    }
    
    // Check for valid element structure
    const invalidElements = result.elements.filter(el => 
      !el.id || !el.type || el.x === undefined || el.y === undefined
    );
    
    if (invalidElements.length > 0) {
      issues.push(`${invalidElements.length} elements have invalid structure`);
    }
    
    // Check for reasonable element positions
    const outOfBoundsElements = result.elements.filter(el => 
      el.x < -10000 || el.x > 10000 || el.y < -10000 || el.y > 10000
    );
    
    if (outOfBoundsElements.length > 0) {
      issues.push(`${outOfBoundsElements.length} elements have invalid positions`);
    }
    
    return {
      isValid: issues.length === 0,
      issues
    };
  }
}
