import React from 'react';
import ReactMarkdown from 'react-markdown';
import { PathNode } from '../../application/path/pathTypes';
import styles from '../_styles/components/path/PathContent.module.css';;

interface PathContentProps {
  node: PathNode | null;
}

export const PathContent: React.FC<PathContentProps> = ({ node }) => {
  if (!node) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>📚</div>
        <h2>Select a topic to start learning</h2>
        <p>Choose from the navigation tree on the left to explore learning content</p>
      </div>
    );
  }

  return (
    <div className={styles.contentContainer}>
      <header className={styles.contentHeader}>
        <div className={styles.breadcrumb}>
          <span className={styles.breadcrumbItem}>Path</span>
          {node.path && node.path.split('/').map((segment, index) => (
            <React.Fragment key={segment}>
              <span className={styles.breadcrumbSeparator}>/</span>
              <span className={styles.breadcrumbItem}>{segment}</span>
            </React.Fragment>
          ))}
        </div>
        
        <h1 className={styles.contentTitle}>{node.title}</h1>
        
        {node.description && (
          <p className={styles.contentDescription}>{node.description}</p>
        )}
        
        <div className={styles.contentMeta}>
          <span className={styles.metaItem}>
            Level {node.level}
          </span>
          {node.children.length > 0 && (
            <span className={styles.metaItem}>
              {node.children.length} subtopics
            </span>
          )}
        </div>
      </header>

      <main className={styles.contentMain}>
        <div className={styles.markdownContent}>
          <ReactMarkdown
            components={{
              h1: ({children}) => <h1 className={styles.heading1}>{children}</h1>,
              h2: ({children}) => <h2 className={styles.heading2}>{children}</h2>,
              h3: ({children}) => <h3 className={styles.heading3}>{children}</h3>,
              h4: ({children}) => <h4 className={styles.heading4}>{children}</h4>,
              h5: ({children}) => <h5 className={styles.heading5}>{children}</h5>,
              h6: ({children}) => <h6 className={styles.heading6}>{children}</h6>,
              p: ({children}) => <p className={styles.paragraph}>{children}</p>,
              ul: ({children}) => <ul className={styles.list}>{children}</ul>,
              ol: ({children}) => <ol className={styles.orderedList}>{children}</ol>,
              li: ({children}) => <li className={styles.listItem}>{children}</li>,
              blockquote: ({children}) => <blockquote className={styles.blockquote}>{children}</blockquote>,
              code: ({className, children}) => {
                const match = /language-(\w+)/.exec(className || '');
                return match ? (
                  <pre className={styles.codeBlock}><code className={className}>{children}</code></pre>
                ) : (
                  <code className={styles.inlineCode}>{children}</code>
                );
              },
              pre: ({children}) => <pre className={styles.codeBlock}>{children}</pre>,
              a: ({href, children}) => (
                <a href={href} className={styles.link} target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              ),
              strong: ({children}) => <strong className={styles.bold}>{children}</strong>,
              em: ({children}) => <em className={styles.italic}>{children}</em>
            }}
          >
            {node.content}
          </ReactMarkdown>
        </div>
      </main>
    </div>
  );
};
