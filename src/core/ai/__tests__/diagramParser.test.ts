// Simple test for diagram parser functionality
import { DiagramParser } from '../diagramParser';

// Mock test data
const mockAIResponse = `{
  "content": "Here's a simple flowchart",
  "diagram": {
    "type": "diagram",
    "diagramType": "flowchart",
    "elements": [
      {
        "type": "ellipse",
        "x": 100,
        "y": 100,
        "width": 180,
        "height": 90,
        "backgroundColor": "#a5d8ff",
        "strokeColor": "#1971c2",
        "strokeWidth": 2,
        "label": {"text": "Start"}
      },
      {
        "type": "rectangle",
        "x": 100,
        "y": 250,
        "width": 200,
        "height": 100,
        "backgroundColor": "#c0eb75",
        "strokeColor": "#2f9e44",
        "strokeWidth": 2,
        "label": {"text": "Process"}
      },
      {
        "type": "arrow",
        "x": 190,
        "y": 190,
        "strokeColor": "#1971c2",
        "strokeWidth": 2,
        "endArrowhead": "triangle",
        "start": {"type": "ellipse"},
        "end": {"type": "rectangle"}
      }
    ],
    "description": "Simple flowchart example"
  }
}`;

// Test function
export function testDiagramParser() {
  console.log('🧪 Testing Diagram Parser...');
  
  const parser = new DiagramParser();
  
  // Test diagram request detection
  const isDiagramRequest = parser.isDiagramRequest("Create a flowchart for user login");
  console.log('✅ Diagram request detection:', isDiagramRequest);
  
  // Test AI response parsing
  const parsed = parser.parseAIResponse(mockAIResponse);
  console.log('✅ Parsed response:', {
    hasContent: !!parsed.content,
    hasDiagram: !!parsed.diagram,
    elementCount: parsed.diagram?.elements.length || 0
  });
  
  // Test diagram validation
  if (parsed.diagram) {
    const validation = parser.validateDiagram(parsed.diagram.elements);
    console.log('✅ Diagram validation:', {
      isValid: validation.isValid,
      errorCount: validation.errors.length,
      warningCount: validation.warnings.length
    });
  }
  
  console.log('🎉 Diagram Parser test completed!');
  return true;
}

// Run test if this file is executed directly
if (typeof window === 'undefined' && require.main === module) {
  testDiagramParser();
}
