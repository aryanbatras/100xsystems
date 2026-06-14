import React from 'react';
import { PathNode } from '../../../application/path/pathTypes';
import styles from '../../_styles/components/path/PathTree.module.css';;

interface PathTreeProps {
  node: PathNode;
  onNodeSelect: (node: PathNode) => void;
  selectedNode: PathNode | null;
  expandedNodes: Set<string>;
  onToggleExpand: (nodeId: string) => void;
  level?: number;
}

export const PathTree: React.FC<PathTreeProps> = ({
  node,
  onNodeSelect,
  selectedNode,
  expandedNodes,
  onToggleExpand,
  level = 0
}) => {
  const hasChildren = node.children.length > 0;
  const isExpanded = expandedNodes.has(node.id);
  const isSelected = selectedNode?.id === node.id;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren) {
      onToggleExpand(node.id);
    }
  };

  const handleSelect = () => {
    onNodeSelect(node);
  };

  return (
    <div className={styles.treeNode} style={{ paddingLeft: `${level * 24}px` }}>
      <div 
        className={`${styles.nodeHeader} ${isSelected ? styles.selected : ''}`}
        onClick={handleSelect}
      >
        {hasChildren && (
          <button 
            className={`${styles.expandButton} ${isExpanded ? styles.expanded : ''}`}
            onClick={handleToggle}
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            ▼
          </button>
        )}
        
        {!hasChildren && (
          <div className={styles.expandButton} />
        )}
        
        <div className={styles.nodeContent}>
          <h3 className={styles.nodeTitle}>{node.title}</h3>
          {node.description && (
            <p className={styles.nodeDescription}>{node.description}</p>
          )}
        </div>
        
        {hasChildren && (
          <span className={styles.childCount}>
            {node.children.length} {node.children.length === 1 ? 'topic' : 'topics'}
          </span>
        )}
      </div>

      {hasChildren && isExpanded && (
        <div className={styles.children}>
          {node.children.map((child) => (
            <PathTree
              key={child.id}
              node={child}
              onNodeSelect={onNodeSelect}
              selectedNode={selectedNode}
              expandedNodes={expandedNodes}
              onToggleExpand={onToggleExpand}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};
