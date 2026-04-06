import { DiagramTemplate, ExcalidrawElementSkeleton } from './diagramTypes';

export const DIAGRAM_TEMPLATES: Record<string, DiagramTemplate> = {
  flowchart: {
    name: 'Basic Flowchart',
    type: 'flowchart',
    description: 'Standard flowchart template with start, process, decision, and end elements',
    elements: [
      {
        type: 'ellipse',
        x: 100,
        y: 100,
        width: 180,
        height: 90,
        backgroundColor: '#a5d8ff',
        strokeColor: '#1971c2',
        strokeWidth: 2,
        label: { text: 'Start' },
        id: 'start'
      },
      {
        type: 'rectangle',
        x: 100,
        y: 250,
        width: 200,
        height: 100,
        backgroundColor: '#c0eb75',
        strokeColor: '#2f9e44',
        strokeWidth: 2,
        label: { text: 'Process' },
        id: 'process'
      },
      {
        type: 'diamond',
        x: 100,
        y: 400,
        width: 150,
        height: 150,
        backgroundColor: '#fff3bf',
        strokeColor: '#f08c00',
        strokeWidth: 2,
        label: { text: 'Decision?' },
        id: 'decision'
      },
      {
        type: 'ellipse',
        x: 50,
        y: 600,
        width: 120,
        height: 80,
        backgroundColor: '#ffc9c9',
        strokeColor: '#e03131',
        strokeWidth: 2,
        label: { text: 'No' },
        id: 'end-no'
      },
      {
        type: 'ellipse',
        x: 230,
        y: 600,
        width: 120,
        height: 80,
        backgroundColor: '#d8f5a2',
        strokeColor: '#51cf66',
        strokeWidth: 2,
        label: { text: 'Yes' },
        id: 'end-yes'
      },
      {
        type: 'arrow',
        x: 190,
        y: 190,
        strokeColor: '#1971c2',
        strokeWidth: 2,
        endArrowhead: 'triangle',
        start: { id: 'start' },
        end: { id: 'process' },
        id: 'arrow-1'
      },
      {
        type: 'arrow',
        x: 200,
        y: 350,
        strokeColor: '#1971c2',
        strokeWidth: 2,
        endArrowhead: 'triangle',
        start: { id: 'process' },
        end: { id: 'decision' },
        id: 'arrow-2'
      },
      {
        type: 'arrow',
        x: 125,
        y: 475,
        strokeColor: '#e03131',
        strokeWidth: 2,
        endArrowhead: 'triangle',
        label: { text: 'No' },
        start: { id: 'decision' },
        end: { id: 'end-no' },
        id: 'arrow-3'
      },
      {
        type: 'arrow',
        x: 225,
        y: 475,
        strokeColor: '#51cf66',
        strokeWidth: 2,
        endArrowhead: 'triangle',
        label: { text: 'Yes' },
        start: { id: 'decision' },
        end: { id: 'end-yes' },
        id: 'arrow-4'
      }
    ],
    variables: {
      startText: 'Start',
      processText: 'Process',
      decisionText: 'Decision?',
      yesText: 'Yes',
      noText: 'No'
    }
  },

  systemArchitecture: {
    name: 'System Architecture',
    type: 'system-design',
    description: 'Microservices architecture template with frontend, API gateway, services, and database',
    elements: [
      {
        type: 'ellipse',
        x: 100,
        y: 100,
        width: 150,
        height: 80,
        backgroundColor: '#a5d8ff',
        strokeColor: '#1971c2',
        strokeWidth: 2,
        label: { text: 'User' },
        id: 'user'
      },
      {
        type: 'rectangle',
        x: 300,
        y: 100,
        width: 200,
        height: 100,
        backgroundColor: '#c0eb75',
        strokeColor: '#2f9e44',
        strokeWidth: 2,
        label: { text: 'Frontend\n(React/Vue)' },
        id: 'frontend'
      },
      {
        type: 'rectangle',
        x: 550,
        y: 100,
        width: 200,
        height: 100,
        backgroundColor: '#fff3bf',
        strokeColor: '#f08c00',
        strokeWidth: 2,
        label: { text: 'API Gateway' },
        id: 'gateway'
      },
      {
        type: 'rectangle',
        x: 800,
        y: 50,
        width: 180,
        height: 80,
        backgroundColor: '#fcc2d7',
        strokeColor: '#e03131',
        strokeWidth: 2,
        label: { text: 'Auth Service' },
        id: 'auth-service'
      },
      {
        type: 'rectangle',
        x: 800,
        y: 170,
        width: 180,
        height: 80,
        backgroundColor: '#fcc2d7',
        strokeColor: '#e03131',
        strokeWidth: 2,
        label: { text: 'User Service' },
        id: 'user-service'
      },
      {
        type: 'rectangle',
        x: 800,
        y: 290,
        width: 180,
        height: 80,
        backgroundColor: '#fcc2d7',
        strokeColor: '#e03131',
        strokeWidth: 2,
        label: { text: 'Product Service' },
        id: 'product-service'
      },
      {
        type: 'ellipse',
        x: 1050,
        y: 170,
        width: 150,
        height: 80,
        backgroundColor: '#ffec99',
        strokeColor: '#f08c00',
        strokeWidth: 2,
        label: { text: 'Database' },
        id: 'database'
      },
      {
        type: 'arrow',
        x: 175,
        y: 140,
        strokeColor: '#1971c2',
        strokeWidth: 2,
        endArrowhead: 'triangle',
        start: { id: 'user' },
        end: { id: 'frontend' },
        id: 'arrow-1'
      },
      {
        type: 'arrow',
        x: 400,
        y: 150,
        strokeColor: '#1971c2',
        strokeWidth: 2,
        endArrowhead: 'triangle',
        start: { id: 'frontend' },
        end: { id: 'gateway' },
        id: 'arrow-2'
      },
      {
        type: 'arrow',
        x: 650,
        y: 90,
        strokeColor: '#f08c00',
        strokeWidth: 2,
        endArrowhead: 'triangle',
        start: { id: 'gateway' },
        end: { id: 'auth-service' },
        id: 'arrow-3'
      },
      {
        type: 'arrow',
        x: 650,
        y: 150,
        strokeColor: '#f08c00',
        strokeWidth: 2,
        endArrowhead: 'triangle',
        start: { id: 'gateway' },
        end: { id: 'user-service' },
        id: 'arrow-4'
      },
      {
        type: 'arrow',
        x: 650,
        y: 210,
        strokeColor: '#f08c00',
        strokeWidth: 2,
        endArrowhead: 'triangle',
        start: { id: 'gateway' },
        end: { id: 'product-service' },
        id: 'arrow-5'
      },
      {
        type: 'arrow',
        x: 890,
        y: 90,
        strokeColor: '#e03131',
        strokeWidth: 2,
        endArrowhead: 'triangle',
        start: { id: 'auth-service' },
        end: { id: 'database' },
        id: 'arrow-6'
      },
      {
        type: 'arrow',
        x: 890,
        y: 210,
        strokeColor: '#e03131',
        strokeWidth: 2,
        endArrowhead: 'triangle',
        start: { id: 'user-service' },
        end: { id: 'database' },
        id: 'arrow-7'
      },
      {
        type: 'arrow',
        x: 890,
        y: 290,
        strokeColor: '#e03131',
        strokeWidth: 2,
        endArrowhead: 'triangle',
        start: { id: 'product-service' },
        end: { id: 'database' },
        id: 'arrow-8'
      }
    ],
    variables: {
      userText: 'User',
      frontendText: 'Frontend',
      gatewayText: 'API Gateway',
      authServiceText: 'Auth Service',
      userServiceText: 'User Service',
      productServiceText: 'Product Service',
      databaseText: 'Database'
    }
  },

  sequenceDiagram: {
    name: 'Sequence Diagram',
    type: 'sequence',
    description: 'Sequence diagram template for showing interactions between components',
    elements: [
      {
        type: 'ellipse',
        x: 100,
        y: 50,
        width: 120,
        height: 60,
        backgroundColor: '#a5d8ff',
        strokeColor: '#1971c2',
        strokeWidth: 2,
        label: { text: 'Actor 1' },
        id: 'actor1'
      },
      {
        type: 'ellipse',
        x: 300,
        y: 50,
        width: 120,
        height: 60,
        backgroundColor: '#c0eb75',
        strokeColor: '#2f9e44',
        strokeWidth: 2,
        label: { text: 'System' },
        id: 'system'
      },
      {
        type: 'ellipse',
        x: 500,
        y: 50,
        width: 120,
        height: 60,
        backgroundColor: '#fff3bf',
        strokeColor: '#f08c00',
        strokeWidth: 2,
        label: { text: 'Database' },
        id: 'database'
      },
      {
        type: 'line',
        x: 160,
        y: 110,
        strokeColor: '#1971c2',
        strokeWidth: 2,
        strokeStyle: 'dashed',
        id: 'lifeline1'
      },
      {
        type: 'line',
        x: 360,
        y: 110,
        strokeColor: '#2f9e44',
        strokeWidth: 2,
        strokeStyle: 'dashed',
        id: 'lifeline2'
      },
      {
        type: 'line',
        x: 560,
        y: 110,
        strokeColor: '#f08c00',
        strokeWidth: 2,
        strokeStyle: 'dashed',
        id: 'lifeline3'
      },
      {
        type: 'arrow',
        x: 160,
        y: 150,
        strokeColor: '#1971c2',
        strokeWidth: 2,
        endArrowhead: 'triangle',
        label: { text: 'Request' },
        start: { type: 'text', text: 'Actor 1' },
        end: { type: 'text', text: 'System' },
        id: 'arrow-1'
      },
      {
        type: 'arrow',
        x: 360,
        y: 200,
        strokeColor: '#2f9e44',
        strokeWidth: 2,
        endArrowhead: 'triangle',
        label: { text: 'Query' },
        start: { type: 'text', text: 'System' },
        end: { type: 'text', text: 'Database' },
        id: 'arrow-2'
      },
      {
        type: 'arrow',
        x: 560,
        y: 250,
        strokeColor: '#f08c00',
        strokeWidth: 2,
        strokeStyle: 'dashed',
        endArrowhead: 'triangle',
        label: { text: 'Data' },
        start: { type: 'text', text: 'Database' },
        end: { type: 'text', text: 'System' },
        id: 'arrow-3'
      },
      {
        type: 'arrow',
        x: 360,
        y: 300,
        strokeColor: '#2f9e44',
        strokeWidth: 2,
        strokeStyle: 'dashed',
        endArrowhead: 'triangle',
        label: { text: 'Response' },
        start: { type: 'text', text: 'System' },
        end: { type: 'text', text: 'Actor 1' },
        id: 'arrow-4'
      }
    ],
    variables: {
      actor1Text: 'Actor 1',
      systemText: 'System',
      databaseText: 'Database',
      requestText: 'Request',
      queryText: 'Query',
      dataText: 'Data',
      responseText: 'Response'
    }
  },

  networkDiagram: {
    name: 'Network Diagram',
    type: 'network',
    description: 'Network topology diagram with servers, clients, and connections',
    elements: [
      {
        type: 'rectangle',
        x: 100,
        y: 100,
        width: 150,
        height: 100,
        backgroundColor: '#a5d8ff',
        strokeColor: '#1971c2',
        strokeWidth: 2,
        label: { text: 'Client 1' },
        id: 'client1'
      },
      {
        type: 'rectangle',
        x: 100,
        y: 250,
        width: 150,
        height: 100,
        backgroundColor: '#a5d8ff',
        strokeColor: '#1971c2',
        strokeWidth: 2,
        label: { text: 'Client 2' },
        id: 'client2'
      },
      {
        type: 'rectangle',
        x: 350,
        y: 175,
        width: 200,
        height: 120,
        backgroundColor: '#c0eb75',
        strokeColor: '#2f9e44',
        strokeWidth: 2,
        label: { text: 'Load Balancer' },
        id: 'loadbalancer'
      },
      {
        type: 'rectangle',
        x: 600,
        y: 100,
        width: 150,
        height: 100,
        backgroundColor: '#fff3bf',
        strokeColor: '#f08c00',
        strokeWidth: 2,
        label: { text: 'Server 1' },
        id: 'server1'
      },
      {
        type: 'rectangle',
        x: 600,
        y: 250,
        width: 150,
        height: 100,
        backgroundColor: '#fff3bf',
        strokeColor: '#f08c00',
        strokeWidth: 2,
        label: { text: 'Server 2' },
        id: 'server2'
      },
      {
        type: 'ellipse',
        x: 850,
        y: 175,
        width: 150,
        height: 80,
        backgroundColor: '#ffc9c9',
        strokeColor: '#e03131',
        strokeWidth: 2,
        label: { text: 'Database' },
        id: 'database'
      },
      {
        type: 'arrow',
        x: 175,
        y: 150,
        strokeColor: '#1971c2',
        strokeWidth: 2,
        endArrowhead: 'triangle',
        start: { id: 'client1' },
        end: { id: 'loadbalancer' },
        id: 'arrow-1'
      },
      {
        type: 'arrow',
        x: 175,
        y: 250,
        strokeColor: '#1971c2',
        strokeWidth: 2,
        endArrowhead: 'triangle',
        start: { id: 'client2' },
        end: { id: 'loadbalancer' },
        id: 'arrow-2'
      },
      {
        type: 'arrow',
        x: 450,
        y: 150,
        strokeColor: '#2f9e44',
        strokeWidth: 2,
        endArrowhead: 'triangle',
        start: { id: 'loadbalancer' },
        end: { id: 'server1' },
        id: 'arrow-3'
      },
      {
        type: 'arrow',
        x: 450,
        y: 250,
        strokeColor: '#2f9e44',
        strokeWidth: 2,
        endArrowhead: 'triangle',
        start: { id: 'loadbalancer' },
        end: { id: 'server2' },
        id: 'arrow-4'
      },
      {
        type: 'arrow',
        x: 675,
        y: 150,
        strokeColor: '#f08c00',
        strokeWidth: 2,
        endArrowhead: 'triangle',
        start: { id: 'server1' },
        end: { id: 'database' },
        id: 'arrow-5'
      },
      {
        type: 'arrow',
        x: 675,
        y: 250,
        strokeColor: '#f08c00',
        strokeWidth: 2,
        endArrowhead: 'triangle',
        start: { id: 'server2' },
        end: { id: 'database' },
        id: 'arrow-6'
      }
    ],
    variables: {
      client1Text: 'Client 1',
      client2Text: 'Client 2',
      loadBalancerText: 'Load Balancer',
      server1Text: 'Server 1',
      server2Text: 'Server 2',
      databaseText: 'Database'
    }
  }
};

export class DiagramTemplateManager {
  static getTemplate(type: string): DiagramTemplate | null {
    return DIAGRAM_TEMPLATES[type] || null;
  }

  static getAllTemplates(): DiagramTemplate[] {
    return Object.values(DIAGRAM_TEMPLATES);
  }

  static getTemplateNames(): string[] {
    return Object.keys(DIAGRAM_TEMPLATES);
  }

  static customizeTemplate(template: DiagramTemplate, variables: Record<string, any>): DiagramTemplate {
    const customizedElements = template.elements.map(element => {
      const newElement = { ...element };
      
      // Replace text content
      if (newElement.text && variables[newElement.text]) {
        newElement.text = variables[newElement.text];
      }
      
      if (newElement.label?.text && variables[newElement.label.text]) {
        newElement.label = { ...newElement.label, text: variables[newElement.label.text] };
      }
      
      return newElement;
    });

    return {
      ...template,
      elements: customizedElements,
      variables: { ...template.variables, ...variables }
    };
  }

  static createCustomTemplate(name: string, type: string, elements: ExcalidrawElementSkeleton[]): DiagramTemplate {
    return {
      name,
      type,
      description: `Custom ${type} diagram`,
      elements
    };
  }
}
