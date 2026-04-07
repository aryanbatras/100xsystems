declare module 'react-graph-vis' {
  import { Component } from 'react';
  
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
    style?: React.CSSProperties;
  }
  
  const Graph: React.ComponentType<GraphProps>;
  
  export default Graph;
}
