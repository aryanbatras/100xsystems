"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MermaidConverter = void 0;
class MermaidConverter {
    /**
     * Convert Mermaid syntax to Excalidraw elements using @excalidraw/mermaid-to-excalidraw
     */
    async convertToExcalidraw(mermaidSyntax, fontSize = 16) {
        try {
            console.log(' === MERMAID TO EXCALIDRAW CONVERSION START ===');
            console.log(' Input Mermaid syntax:', mermaidSyntax);
            console.log(' Font size:', fontSize);
            // Dynamic import to avoid SSR issues
            console.log(' Importing conversion libraries...');
            const { parseMermaidToExcalidraw } = await Promise.resolve().then(() => require('@excalidraw/mermaid-to-excalidraw'));
            const { convertToExcalidrawElements } = await Promise.resolve().then(() => require('@excalidraw/excalidraw'));
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
            console.log(' Excalidraw conversion result:', {
                success: excalidrawElements.length > 0,
                elementCount: excalidrawElements.length,
                firstElement: excalidrawElements[0],
                allElements: excalidrawElements
            });
            if (!excalidrawElements || excalidrawElements.length === 0) {
                console.error(' Failed to convert skeleton elements to Excalidraw format');
                throw new Error('Failed to convert skeleton elements to Excalidraw format');
            }
            console.log(' === CONVERSION SUCCESSFUL ===');
            console.log(' Final result:', {
                totalElements: excalidrawElements.length,
                elements: excalidrawElements.slice(0, 3), // Show first 3 elements
                files: skeletonResult.files
            });
            return {
                elements: excalidrawElements,
                files: skeletonResult.files,
                success: true
            };
        }
        catch (error) {
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
            }
            else if (errorMessage.includes('convert') || errorMessage.includes('format')) {
                errorMessage = 'Failed to convert Mermaid to Excalidraw format.';
            }
            else if (errorMessage.includes('import') || errorMessage.includes('module')) {
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
    isSupportedMermaidType(mermaidSyntax) {
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
    getSupportedDiagramTypes() {
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
    preprocessMermaidSyntax(mermaidSyntax) {
        let processed = mermaidSyntax.trim();
        // Ensure proper flowchart declaration
        if (!processed.match(/^(flowchart|graph)\s+(TD|LR)/i)) {
            // Default to TD if no direction specified
            if (processed.startsWith('flowchart') || processed.startsWith('graph')) {
                processed = processed.replace(/^(flowchart|graph)/i, '$1 TD');
            }
            else {
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
    getConversionStats(elements) {
        const stats = {};
        elements.forEach(element => {
            const type = element.type || 'unknown';
            stats[type] = (stats[type] || 0) + 1;
        });
        return stats;
    }
    /**
     * Validate conversion result
     */
    validateConversionResult(result) {
        const issues = [];
        if (!result.success) {
            issues.push(result.error || 'Conversion failed');
        }
        if (!result.elements || result.elements.length === 0) {
            issues.push('No elements generated');
        }
        // Check for valid element structure
        const invalidElements = result.elements.filter(el => !el.id || !el.type || el.x === undefined || el.y === undefined);
        if (invalidElements.length > 0) {
            issues.push(`${invalidElements.length} elements have invalid structure`);
        }
        // Check for reasonable element positions
        const outOfBoundsElements = result.elements.filter(el => el.x < -10000 || el.x > 10000 || el.y < -10000 || el.y > 10000);
        if (outOfBoundsElements.length > 0) {
            issues.push(`${outOfBoundsElements.length} elements have invalid positions`);
        }
        return {
            isValid: issues.length === 0,
            issues
        };
    }
}
exports.MermaidConverter = MermaidConverter;
