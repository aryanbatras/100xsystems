declare module 'react-graph-vis' {
  import { ComponentType, CSSProperties } from 'react';

  interface GraphProps {
    graph: {
      nodes: any[];
      edges: any[];
    };
    options: any;
    events?: {
      [key: string]: (params: any) => void;
    };
    getNetwork?: (network: any) => void;
    style?: CSSProperties;
  }

  const Graph: ComponentType<GraphProps>;

  export default Graph;
}
