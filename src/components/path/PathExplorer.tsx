import React, { useState } from 'react';
import { PathNode, PathContent } from '../../application/path/pathTypes';
import { PathLayout } from './PathLayout';
import { ContentLayout } from './ContentLayout';
import styles from '../../styles/components/path/PathExplorer.module.css';;

interface PathExplorerProps {
  pathContent: PathContent;
}

export const PathExplorer: React.FC<PathExplorerProps> = ({ pathContent }) => {
  const [selectedNode, setSelectedNode] = useState<PathNode | null>(pathContent.root);

  const isPathNode = (node: PathNode): boolean => {
    return node.subfolders && node.subfolders.length > 0;
  };

  if (!selectedNode) {
    return (
      <div className={styles.emptyState}>
        <h2>Loading...</h2>
        <p>Please wait while we prepare the content</p>
      </div>
    );
  }

  return (
    <div className={styles.explorer}>
      {isPathNode(selectedNode) ? (
        <PathLayout 
          node={selectedNode} 
        />
      ) : (
        <ContentLayout 
          node={selectedNode} 
        />
      )}
    </div>
  );
};
