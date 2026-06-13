/**
 * ## AI Diagram: Type Definitions
 *
 * Core type definitions for AI-to-Excalidraw integration.
 * Defines the data structures for diagram requests, responses,
 * validation results, and Excalidraw element schemas.
 *
 * @packageDocumentation
 */

// Core type definitions for AI-to-Excalidraw integration

export interface ExcalidrawElementSkeleton {
  type: "rectangle" | "ellipse" | "diamond" | "arrow" | "line" | "text" | "frame";
  x: number;
  y: number;
  width?: number;
  height?: number;
  text?: string;
  fontSize?: number;
  label?: {
    text: string;
    textAlign?: "left" | "center" | "right";
    verticalAlign?: "top" | "middle" | "bottom";
    fontSize?: number;
    strokeColor?: string;
  };
  backgroundColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  strokeStyle?: "solid" | "dotted" | "dashed";
  fillStyle?: "solid" | "hachure" | "cross-hatch" | "dots";
  startArrowhead?: "arrow" | "bar" | "dot" | "circle" | "triangle";
  endArrowhead?: "arrow" | "bar" | "dot" | "circle" | "triangle";
  start?: {
    type?: string;
    id?: string;
    text?: string;
  };
  end?: {
    type?: string;
    id?: string;
    text?: string;
  };
  id?: string;
  children?: string[]; // for frames
  name?: string; // for frames
}

export interface DiagramRequest {
  type: "diagram";
  diagramType: "flowchart" | "system-design" | "architecture" | "sequence" | "network" | "custom";
  elements: ExcalidrawElementSkeleton[];
  description: string;
  title?: string;
}

export interface EnhancedChatResponse {
  content: string;
  diagram?: DiagramRequest;
  actions?: Array<{
    type: "create-diagram" | "update-diagram" | "clear-diagram";
    data: any;
  }>;
}

export interface DiagramValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  elements: ExcalidrawElementSkeleton[];
}

export interface DiagramTemplate {
  name: string;
  type: string;
  description: string;
  elements: ExcalidrawElementSkeleton[];
  variables?: Record<string, any>;
}

export interface PositionConstraints {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  gridStep: number;
}

export interface ColorScheme {
  primary: string;
  secondary: string;
  warning: string;
  danger: string;
  success: string;
  background: string;
  text: string;
  border: string;
}

export interface DiagramConfig {
  positionConstraints: PositionConstraints;
  colorScheme: ColorScheme;
  defaultDimensions: {
    rectangle: { width: number; height: number };
    ellipse: { width: number; height: number };
    diamond: { width: number; height: number };
    text: { fontSize: number };
  };
  validation: {
    maxElements: number;
    maxTextLength: number;
    allowedColors: string[];
  };
}
