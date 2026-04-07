export interface ObsidianNode {
  id: string;
  label: string;
  title?: string;
  type: 'note' | 'tag' | 'folder' | 'attachment';
  color?: {
    background: string;
    border: string;
    highlight: string;
    hover: string;
  };
  size?: number;
  font?: {
    color: string;
    size: number;
    face: string;
  };
  borderWidth?: number;
  shape?: 'dot' | 'square' | 'triangle' | 'star' | 'database' | 'box' | 'ellipse' | 'circle' | 'icon';
  image?: string;
  value?: number;
  level?: number;
  x?: number;
  y?: number;
  fixed?: {
    x?: boolean;
    y?: boolean;
  };
  physics?: boolean;
  hidden?: boolean;
  chosen?: {
    node?: boolean;
    edge?: boolean;
  };
  chosenValue?: number;
  scaling?: {
    min?: number;
    max?: number;
    label?: {
      enabled?: boolean;
      min?: number;
      max?: number;
      maxVisible?: number;
      drawThreshold?: number;
    };
  };
}

export interface ObsidianEdge {
  id: string;
  from: string;
  to: string;
  label?: string;
  type: 'link' | 'backlink' | 'tag' | 'hierarchy';
  color?: {
    color: string;
    highlight: string;
    hover: string;
  };
  width?: number;
  length?: number;
  dashes?: boolean | number[];
  arrows?: {
    to?: {
      enabled: boolean;
      scaleFactor?: number;
      type?: 'arrow' | 'bar' | 'circle' | 'curve' | 'box' | 'crow' | 'diamond' | 'inv_curve' | 'inv_triangle' | 'triangle' | 'vee';
    };
    from?: {
      enabled: boolean;
      scaleFactor?: number;
      type?: 'arrow' | 'bar' | 'circle' | 'curve' | 'box' | 'crow' | 'diamond' | 'inv_curve' | 'inv_triangle' | 'triangle' | 'vee';
    };
    middle?: {
      enabled: boolean;
      scaleFactor?: number;
      type?: 'arrow' | 'bar' | 'circle' | 'curve' | 'box' | 'crow' | 'diamond' | 'inv_curve' | 'inv_triangle' | 'triangle' | 'vee';
    };
  };
  smooth?: {
    enabled: boolean;
    type?: 'continuous' | 'discrete' | 'diagonalCross' | 'straightCross' | 'horizontal' | 'vertical' | 'curvedCW' | 'curvedCCW';
    roundness?: number;
    forceDirection?: 'none' | 'horizontal' | 'vertical' | 'radial';
  };
  physics?: boolean;
  hidden?: boolean;
  chosen?: {
    edge?: boolean;
  };
  chosenValue?: number;
  value?: number;
  selfReferenceSize?: number;
  selfReference?: {
    size?: number;
    angle?: number;
    render?: 'circle' | 'loop';
  };
}

export interface ObsidianGraphData {
  nodes: ObsidianNode[];
  edges: ObsidianEdge[];
}

export interface ObsidianGraphOptions {
  nodes: {
    shape: string;
    size: number;
    font: {
      color: string;
      size: number;
      face: string;
    };
    borderWidth: number;
    borderWidthSelected: number;
    color: {
      border: string;
      background: string;
      highlight: {
        border: string;
        background: string;
      };
      hover: {
        border: string;
        background: string;
      };
    };
    scaling: {
      min: number;
      max: number;
    };
  };
  edges: {
    width: number;
    color: {
      color: string;
      highlight: string;
      hover: string;
    };
    smooth: {
      enabled: boolean;
      type: string;
      roundness: number;
    };
    arrows: {
      to: {
        enabled: boolean;
        scaleFactor: number;
      };
    };
  };
  physics: {
    enabled: boolean;
    stabilization: {
      enabled: boolean;
      iterations: number;
      updateInterval: number;
    };
    barnesHut: {
      gravitationalConstant: number;
      centralGravity: number;
      springLength: number;
      springConstant: number;
      damping: number;
      avoidOverlap: number;
    };
  };
  interaction: {
    hover: boolean;
    tooltipDelay: number;
    hideEdgesOnDrag: boolean;
    hideNodesOnDrag: boolean;
    navigationButtons: boolean;
    keyboard: boolean;
  };
  layout: {
    improvedLayout: boolean;
    clusterThreshold: number;
  };
}

export interface GraphEventHandlers {
  select?: (params: { nodes: string[]; edges: string[] }) => void;
  click?: (params: { nodes: string[]; edges: string[]; event: MouseEvent }) => void;
  doubleClick?: (params: { nodes: string[]; edges: string[]; event: MouseEvent }) => void;
  hoverNode?: (params: { node: string }) => void;
  blurNode?: (params: { node: string }) => void;
  hoverEdge?: (params: { edge: string }) => void;
  blurEdge?: (params: { edge: string }) => void;
  dragStart?: (params: { nodes: string[]; event: MouseEvent }) => void;
  dragging?: (params: { nodes: string[]; event: MouseEvent }) => void;
  dragEnd?: (params: { nodes: string[]; event: MouseEvent }) => void;
  zoom?: (params: { scale: number; pointer: { x: number; y: number } }) => void;
  showPopup?: (params: { id: string; dom: HTMLElement }) => void;
  hidePopup?: () => void;
}

export interface ObsidianGraphControls {
  zoomIn: () => void;
  zoomOut: () => void;
  fit: () => void;
  togglePhysics: () => void;
  resetView: () => void;
  focusNode: (nodeId: string) => void;
  getNetwork: () => any;
}
