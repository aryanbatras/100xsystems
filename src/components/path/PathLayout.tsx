import React, { useEffect } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { FiChevronRight, FiFolder } from 'react-icons/fi';
import { IoBookOutline } from "react-icons/io5";
import { PathNode } from '../../application/path/pathTypes';
import { useTableOfContents } from '../../contexts/TableOfContentsContext';
import styles from '../../styles/components/path/PathLayout.module.css';;

interface PathLayoutProps {
  node: PathNode;
}

export const PathLayout: React.FC<PathLayoutProps> = ({ node }) => {
  const { setTocItems, setActiveSection, setIsGlobalTocVisible } = useTableOfContents();

  // Clear TOC when viewing a path node (parent with subfolders)
  useEffect(() => {
    setTocItems([]);
    setActiveSection('');
    setIsGlobalTocVisible(false);
  }, [node.path, setTocItems, setActiveSection, setIsGlobalTocVisible]);
  const formatTitle = (title: string): string => {
    return title
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getSubfolderPath = (childPath: string): string => {
    // Just use the child's full path directly
    return `/path/${childPath}`;
  };

  const getBreadcrumbPath = (segment: string, index: number, allSegments: string[]): string => {
    if (index === 0) return '/path';
    const pathUpToSegment = allSegments.slice(0, index + 1).join('/');
    return `/path/${pathUpToSegment}`;
  };

  return (
    <div className={styles.pathLayout}>
      <div className={styles.pathHeader}>
        <div className={styles.breadcrumb}>
          <Link href="/path" className={styles.breadcrumbItem}>
            Path
          </Link>
          {node.path && node.path.split('/').map((segment, index, array) => {
            const isLast = index === array.length - 1;
            
            return (
              <React.Fragment key={segment}>
                <span className={styles.breadcrumbSeparator}>/</span>
                <Link 
                  href={getBreadcrumbPath(segment, index, array)}
                  className={`${styles.breadcrumbItem} ${isLast ? styles.active : ''}`}
                >
                  {segment}
                </Link>
              </React.Fragment>
            );
          })}
        </div>
        
        <h1 className={styles.pathTitle}>{node.title}</h1>
        
        {node.description && (
          <div className={styles.pathDescription}>
            <ReactMarkdown>{node.description}</ReactMarkdown>
          </div>
        )}
      </div>

      <div className={styles.modulesContainer}>
        <h2 className={styles.subfoldersTitle}>
          {node.children.length > 0 ? 'Modules' : 'Content'}
        </h2>
        
        <div className={styles.modulesList}>
          {node.children.map((child, index) => (
            <div key={child.id} className={styles.moduleSection}>
              <Link
                href={getSubfolderPath(child.path || child.id)}
                className={styles.moduleLink}
              >
                <div className={styles.moduleHeader}>
                  {/* <div className={styles.moduleIcon}>
                    <FiFolder size={20} />
                  </div> */}
                  <div className={styles.moduleInfo}>
                    <h3 className={styles.moduleTitle}>
                      <span className={styles.moduleNumber}>{index + 1}</span>
                      {child.title}
                    </h3>
                    {child.description && (
                      <p className={styles.moduleDescription}>{child.description}</p>
                    )}
                  </div>
                  <div className={styles.moduleArrow}>
                    <FiChevronRight size={16} />
                  </div>
                </div>
              </Link>
              
              {child.children && child.children.length > 0 && (
                <div className={styles.lessonsList}>
                  {child.children.map((lesson) => (
                    <Link
                      key={lesson.id}
                      href={getSubfolderPath(lesson.path || lesson.id)}
                      className={styles.lessonItem}
                    >
                      <div className={styles.lessonIcon}>
                        <IoBookOutline size={14} />
                      </div>
                      <span className={styles.lessonTitle}>{lesson.title}</span>
                      <div className={styles.lessonArrow}>
                        <FiChevronRight size={14} />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {node.content && (
        <div className={styles.pathContent}>
          <h2 className={styles.contentTitle}>About This Path</h2>
          <div className={styles.contentBody}>
            <ReactMarkdown>{node.content}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};
