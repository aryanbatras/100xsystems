/**
 * ## AI Diagram: Validator
 *
 * Validates AI-generated diagram elements against constraints.
 * Ensures elements are within bounds, properly formatted,
 * and meet quality standards before rendering.
 *
 * @packageDocumentation
 */

import { ExcalidrawElementSkeleton, DiagramValidationResult, DiagramConfig } from './diagram.types';
import { DIAGRAM_CONFIG } from './diagramConfig';

export class DiagramValidator {
  private config: DiagramConfig;

  constructor(config?: DiagramConfig) {
    this.config = config || DIAGRAM_CONFIG;
  }

  validate(elements: ExcalidrawElementSkeleton[]): DiagramValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const validElements: ExcalidrawElementSkeleton[] = [];

    // Very simple validation - just check basic structure
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const elementErrors: string[] = [];
      
      // Check required properties
      if (!element.type) {
        elementErrors.push('Element type is required');
      }

      if (typeof element.x !== 'number') {
        elementErrors.push('Element x coordinate must be a number');
      }

      if (typeof element.y !== 'number') {
        elementErrors.push('Element y coordinate must be a number');
      }

      if (elementErrors.length === 0) {
        validElements.push(element);
      } else {
        for (const error of elementErrors) {
          errors.push(error);
        }
      }
    }

    const result: DiagramValidationResult = {
      isValid: errors.length === 0,
      errors: errors,
      warnings: warnings,
      elements: validElements
    };
    
    return result;
  }

  private validateElement(element: any, index: number): { isValid: boolean; errors: string[]; warnings: string[] } {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check required properties
    if (!element.type) {
      errors.push('Element type is required');
    }

    if (typeof element.x !== 'number') {
      errors.push('Element x coordinate must be a number');
    }

    if (typeof element.y !== 'number') {
      errors.push('Element y coordinate must be a number');
    }

    // Validate type-specific properties
    if (element.type === 'text') {
      if (!element.text) {
        errors.push('Element text is required for text elements');
      }
    } else if (['rectangle', 'ellipse', 'diamond'].includes(element.type)) {
      // Don't require labels for shapes - they're optional
      if (element.width && typeof element.width !== 'number') {
        errors.push(`${element.type} width must be a number`);
      }

      if (element.height && typeof element.height !== 'number') {
        errors.push(`${element.type} height must be a number`);
      }
    } else if (element.type === 'arrow') {
      if (!element.start || !element.end) {
        warnings.push('Arrow elements should have start and end points for better binding');
      }
    }

    // Check position bounds
    if (element.x < this.config.positionConstraints.minX || element.x > this.config.positionConstraints.maxX) {
      errors.push(`Element x coordinate ${element.x} out of bounds [${this.config.positionConstraints.minX}, ${this.config.positionConstraints.maxX}]`);
    }

    if (element.y < this.config.positionConstraints.minY || element.y > this.config.positionConstraints.maxY) {
      errors.push(`Element y coordinate ${element.y} out of bounds [${this.config.positionConstraints.minY}, ${this.config.positionConstraints.maxY}]`);
    }

    // Check grid alignment (only for shapes that need alignment)
    if (['rectangle', 'ellipse', 'diamond'].includes(element.type)) {
      if (element.x % this.config.positionConstraints.gridStep !== 0) {
        errors.push(`Element x coordinate ${element.x} not aligned to ${this.config.positionConstraints.gridStep}px grid`);
      }

      if (element.y % this.config.positionConstraints.gridStep !== 0) {
        errors.push(`Element y coordinate ${element.y} not aligned to ${this.config.positionConstraints.gridStep}px grid`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  private validateShape(element: ExcalidrawElementSkeleton, index: number, errors: string[]): void {
    // Check dimensions
    if (element.width && (element.width < 50 || element.width > 500)) {
      errors.push(`Element ${index}: width ${element.width} out of range [50, 500]`);
    }

    if (element.height && (element.height < 30 || element.height > 400)) {
      errors.push(`Element ${index}: height ${element.height} out of range [30, 400]`);
    }

    // Validate colors
    this.validateColors(element, index, errors);

    // Validate text/label
    if (element.label) {
      if (!element.label.text || element.label.text.trim().length === 0) {
        errors.push(`Element ${index}: label text is required for shapes`);
      } else if (element.label.text.length > this.config.validation.maxTextLength) {
        errors.push(`Element ${index}: label text too long (${element.label.text.length} chars, max: ${this.config.validation.maxTextLength})`);
      }
    }
  }

  private validateConnection(element: ExcalidrawElementSkeleton, index: number, errors: string[]): void {
    // Validate colors
    this.validateColors(element, index, errors);

    // Validate arrowheads
    if (element.type === 'arrow') {
      const validArrowheads = ['arrow', 'bar', 'dot', 'circle', 'triangle', 'none'];
      if (element.startArrowhead && !validArrowheads.includes(element.startArrowhead)) {
        errors.push(`Element ${index}: invalid startArrowhead "${element.startArrowhead}"`);
      }
      if (element.endArrowhead && !validArrowheads.includes(element.endArrowhead)) {
        errors.push(`Element ${index}: invalid endArrowhead "${element.endArrowhead}"`);
      }
    }

    // Validate label
    if (element.label && element.label.text && element.label.text.length > 20) {
      errors.push(`Element ${index}: arrow label too long (${element.label.text.length} chars, max: 20)`);
    }
  }

  private validateText(element: ExcalidrawElementSkeleton, index: number, errors: string[]): void {
    if (!element.text || element.text.trim().length === 0) {
      errors.push(`Element ${index}: text is required for text elements`);
    } else if (element.text.length > this.config.validation.maxTextLength) {
      errors.push(`Element ${index}: text too long (${element.text.length} chars, max: ${this.config.validation.maxTextLength})`);
    }

    // Validate font size
    if (element.fontSize && (element.fontSize < 10 || element.fontSize > 32)) {
      errors.push(`Element ${index}: fontSize ${element.fontSize} out of range [10, 32]`);
    }

    // Validate color
    if (element.strokeColor && !this.isValidColor(element.strokeColor)) {
      errors.push(`Element ${index}: invalid strokeColor "${element.strokeColor}"`);
    }
  }

  private validateFrame(element: ExcalidrawElementSkeleton, index: number, errors: string[]): void {
    if (!element.children || element.children.length === 0) {
      errors.push(`Element ${index}: frame must have children`);
    }

    if (element.name && element.name.length > 50) {
      errors.push(`Element ${index}: frame name too long (${element.name.length} chars, max: 50)`);
    }
  }

  private validateColors(element: ExcalidrawElementSkeleton, index: number, errors: string[]): void {
    if (element.backgroundColor && !this.isValidColor(element.backgroundColor)) {
      errors.push(`Element ${index}: invalid backgroundColor "${element.backgroundColor}"`);
    }

    if (element.strokeColor && !this.isValidColor(element.strokeColor)) {
      errors.push(`Element ${index}: invalid strokeColor "${element.strokeColor}"`);
    }

    if (element.label?.strokeColor && !this.isValidColor(element.label.strokeColor)) {
      errors.push(`Element ${index}: invalid label strokeColor "${element.label.strokeColor}"`);
    }
  }

  private isValidColor(color: string): boolean {
    // Check if it's a valid hex color
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return hexRegex.test(color) && this.config.validation.allowedColors.includes(color);
  }

  private validateArrowBindings(elements: ExcalidrawElementSkeleton[]): string[] {
    const errors: string[] = [];
    const arrows = elements.filter(el => el.type === 'arrow');
    const elementIds = elements.filter(el => el.id).map(el => el.id!);
    const elementTypes = new Map(elements.map(el => [el.id, el.type]));

    arrows.forEach((arrow, index) => {
      if (arrow.start?.id && !elementIds.includes(arrow.start.id)) {
        errors.push(`Arrow ${index}: start.id "${arrow.start.id}" not found`);
      }

      if (arrow.end?.id && !elementIds.includes(arrow.end.id)) {
        errors.push(`Arrow ${index}: end.id "${arrow.end.id}" not found`);
      }

      if (arrow.start?.type && arrow.end?.type) {
        // Validate type-based connections
        const validTypes = ['rectangle', 'ellipse', 'diamond', 'text'];
        if (!validTypes.includes(arrow.start.type)) {
          errors.push(`Arrow ${index}: invalid start.type "${arrow.start.type}"`);
        }
        if (!validTypes.includes(arrow.end.type)) {
          errors.push(`Arrow ${index}: invalid end.type "${arrow.end.type}"`);
        }
      }
    });

    return errors;
  }

  private checkOverlappingElements(elements: ExcalidrawElementSkeleton[]): string[] {
    const warnings: string[] = [];
    const shapes = elements.filter(el => ['rectangle', 'ellipse', 'diamond'].includes(el.type));

    for (let i = 0; i < shapes.length; i++) {
      for (let j = i + 1; j < shapes.length; j++) {
        const el1 = shapes[i];
        const el2 = shapes[j];

        if (this.elementsOverlap(el1, el2)) {
          warnings.push(`Elements ${i} and ${j} may overlap at (${el1.x}, ${el1.y}) and (${el2.x}, ${el2.y})`);
        }
      }
    }

    return warnings;
  }

  private elementsOverlap(el1: ExcalidrawElementSkeleton, el2: ExcalidrawElementSkeleton): boolean {
    const width1 = el1.width || this.config.defaultDimensions.rectangle.width;
    const height1 = el1.height || this.config.defaultDimensions.rectangle.height;
    const width2 = el2.width || this.config.defaultDimensions.rectangle.width;
    const height2 = el2.height || this.config.defaultDimensions.rectangle.height;

    return !(el1.x + width1 <= el2.x || el2.x + width2 <= el1.x || el1.y + height1 <= el2.y || el2.y + height2 <= el1.y);
  }
}
