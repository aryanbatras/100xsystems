'use client';

import { PathNode, PathContent as PathContentType } from '../../application/path/pathTypes';
import { useTableOfContents } from './contexts.feature';
import contentLayoutStyles from '../_styles/css/path-contentlayout.module.css';
import globalTocStyles from '../_styles/css/path-globaltableofcontents.module.css';
import pathContentStyles from '../_styles/css/path-pathcontent.module.css';
import pathExplorerStyles from '../_styles/css/path-pathexplorer.module.css';
import pathLayoutStyles from '../_styles/css/path-pathlayout.module.css';
import pathTreeStyles from '../_styles/css/path-pathtree.module.css';
import tableOfContentsStyles from '../_styles/css/path-tableofcontents.module.css';
import { cn } from '@/application/lib/utils';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { FiChevronRight, FiFolder } from 'react-icons/fi';
import { IoBookOutline } from 'react-icons/io5';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
/**
 * ## Path
 *
 * Path feature module.
 * Contains all components, types, and logic for the path domain.
 *
 * @packageDocumentation
 * @module path
 */

;



// ============================================================
// Source: ContentLayout.tsx
interface TocItem {
  id: string;
  title: string;
  level: number;
  children: TocItem[];
}

interface ContentLayoutProps {
  node: PathNode;
}

export const ContentLayout: React.FC<ContentLayoutProps> = ({ node }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeSection, setActiveSection] = useState<string>('');

  // Generate TOC from markdown headings
  useEffect(() => {
    const generateToc = () => {
      const markdownLines = node.content.split('\n');
      const headings: Array<{level: number, title: string, line: number}> = [];
      
      let inCodeBlock = false;
      let codeBlockFence = '';
      
      markdownLines.forEach((line, index) => {
        const trimmedLine = line.trim();
        
        if (trimmedLine.startsWith('```') || trimmedLine.startsWith('~~~')) {
          if (!inCodeBlock) {
            inCodeBlock = true;
            codeBlockFence = trimmedLine.substring(0, 3);
          } else if (trimmedLine.startsWith(codeBlockFence)) {
            inCodeBlock = false;
            codeBlockFence = '';
          }
          return;
        }
        
        if (inCodeBlock) return;
        
        const match = line.match(/^(#{1,6})\s+(.+)$/);
        if (match) {
          const level = match[1].length;
          const title = match[2].trim();
          headings.push({ level, title, line: index });
        }
      });

      const items: TocItem[] = [];
      const stack: TocItem[] = [];

      headings.forEach((heading) => {
        const baseId = heading.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
        const id = `heading-${heading.level}-${baseId}`;
        
        const item: TocItem = {
          id,
          title: heading.title,
          level: heading.level,
          children: []
        };

        while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
          stack.pop();
        }

        if (stack.length === 0) {
          items.push(item);
        } else {
          stack[stack.length - 1].children.push(item);
        }

        stack.push(item);
      });

      setTocItems(items);
    };

    generateToc();
  }, [node.content]);

  // Scroll tracking — highlight active section in outline — highlight active section in outline
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const headings = contentRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const scrollPosition = window.scrollY + 120;

      let currentHeading = '';
      let closestDistance = Infinity;

      headings.forEach((heading) => {
        const element = heading as HTMLElement;
        const elementTop = element.getBoundingClientRect().top + window.scrollY;
        const distance = Math.abs(elementTop - scrollPosition);
        
        if (elementTop <= scrollPosition + 200 && distance < closestDistance) {
          closestDistance = distance;
          currentHeading = element.id;
        }
      });

      if (!currentHeading && headings.length > 0) {
        currentHeading = (headings[0] as HTMLElement).id;
      }

      setActiveSection(currentHeading);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const getBreadcrumbPath = (path: string): string => {
    if (path === '') return '/path';
    return `/path/${path}`;
  };

  const getHeadingId = (level: number, text: React.ReactNode): string => {
    const headingText = typeof text === 'string' ? text : '';
    // Generate consistent ID based on heading text and level
    const baseId = headingText.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
    return `heading-${level}-${baseId}`;
  };

  return (
    <div className={cn(pathLayoutStyles.contentLayout, 'max-w-[1400px] p-0')}>
      {/* Padding wrapper for breadcrumb + mobile outline area */}
      <div className="px-8 pt-16">
        {/* Breadcrumb */}
        <div className={pathLayoutStyles.breadcrumb}>
          <Link href="/path" className={pathLayoutStyles.breadcrumbItem}>
            Path
          </Link>
          {node.path && node.path.split('/').map((segment, index, array) => {
            const fullPath = array.slice(0, index + 1).join('/');
            const isLast = index === array.length - 1;
          
            return (
              <React.Fragment key={segment}>
                <span className={pathLayoutStyles.breadcrumbSeparator}>/</span>
                <Link 
                  href={getBreadcrumbPath(fullPath)}
                  className={`${pathLayoutStyles.breadcrumbItem} ${isLast ? pathLayoutStyles.active : ''}`}
                >
                  {segment}
                </Link>
              </React.Fragment>
            );
          })}
        </div>

        {/* Mobile Outline — full width, all items visible, no scroll */}
        {tocItems.length > 0 && (
          <div className="block md:hidden border-b border-border mb-8">
            <Outline
              tocItems={tocItems}
              activeSection={activeSection}
              onSectionClick={scrollToSection}
            />
          </div>
        )}
      </div>

      {/* Desktop: flex row | Mobile: stacked */}
      <div className="md:flex">
        <main className="flex-1 min-w-0 px-8 pb-16" ref={contentRef}>
          <article className={pathLayoutStyles.article}>
            <ReactMarkdown
              components={{
                h1: ({children}) => {
                  const headingId = getHeadingId(1, children);
                  return <h1 id={headingId} className={pathLayoutStyles.heading1}>{children}</h1>;
                },
                h2: ({children}) => {
                  const headingId = getHeadingId(2, children);
                  return <h2 id={headingId} className={pathLayoutStyles.heading2}>{children}</h2>;
                },
                h3: ({children}) => {
                  const headingId = getHeadingId(3, children);
                  return <h3 id={headingId} className={pathLayoutStyles.heading3}>{children}</h3>;
                },
                p: ({children}) => <p className={pathLayoutStyles.paragraph}>{children}</p>,
                ul: ({children}) => <ul className={pathLayoutStyles.list}>{children}</ul>,
                ol: ({children}) => <ol className={pathLayoutStyles.orderedList}>{children}</ol>,
                li: ({children}) => <li className={pathLayoutStyles.listItem}>{children}</li>,
                blockquote: ({children}) => <blockquote className={pathLayoutStyles.blockquote}>{children}</blockquote>,
                code: ({className, children}) => {
                  const match = /language-(\w+)/.exec(className || '');
                  return match ? (
                    <SyntaxHighlighter
                      style={tomorrow}
                      language={match[1]}
                      PreTag="div"
                      className={pathLayoutStyles.codeBlock}
                      showLineNumbers
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={pathLayoutStyles.inlineCode}>{children}</code>
                  );
                },
                pre: ({children}) => <div className={pathLayoutStyles.codeWrapper}>{children}</div>,
                a: ({href, children}) => (
                  <a href={href} className={pathLayoutStyles.link} target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                ),
                strong: ({children}) => <strong className={pathLayoutStyles.bold}>{children}</strong>,
                em: ({children}) => <em className={pathLayoutStyles.italic}>{children}</em>
              }}
            >
              {node.content}
            </ReactMarkdown>
          </article>
        </main>

        {/* Desktop Outline Sidebar — 30vw, sticky, full height, scrollable */}
        {tocItems.length > 0 && (
          <aside className="hidden md:block md:w-[30vw] md:max-w-[320px] lg:max-w-[360px] h-screen sticky top-0 overflow-y-auto border-l border-border bg-white shrink-0">
            <Outline
              tocItems={tocItems}
              activeSection={activeSection}
              onSectionClick={scrollToSection}
            />
          </aside>
        )}
      </div>
    </div>
  );
};


// ============================================================
// Source: Outline.tsx
interface OutlineProps {
  tocItems: TocItem[];
  activeSection: string;
  onSectionClick: (id: string) => void;
  className?: string;
}

export const Outline: React.FC<OutlineProps> = ({
  tocItems,
  activeSection,
  onSectionClick,
  className,
}) => {
  if (tocItems.length === 0) return null;

  const renderItem = (item: TocItem, depth: number = 0) => {
    const isActive = activeSection === item.id;
    return (
      <div key={item.id}>
        <button
          type="button"
          onClick={() => onSectionClick(item.id)}
          className={cn(
            'w-full text-left transition-all duration-150 relative',
            'text-sm leading-relaxed',
            isActive
              ? 'text-accent font-medium bg-accent-bg'
              : 'text-fg-secondary hover:text-fg hover:bg-surface-secondary',
          )}
          style={{
            paddingTop: '10px',
            paddingBottom: '10px',
            paddingRight: '16px',
            paddingLeft: `${depth * 16 + 20}px`,
          }}
        >
          {/* Active indicator bar */}
          <span
            className={cn(
              'absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full transition-all duration-150',
              isActive ? 'bg-accent opacity-100' : 'bg-transparent',
            )}
          />
          {item.title}
        </button>
        {item.children.length > 0 && (
          <div>
            {item.children.map((child) => renderItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className={cn('flex flex-col', className)}>
      <div className="px-5 py-4 border-b border-border">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-fg-muted">
          On this page
        </h3>
      </div>
      <div className="flex-1 py-2 overflow-y-auto">
        {tocItems.map((item) => renderItem(item))}
      </div>
    </nav>
  );
};


// ============================================================
// Source: GlobalTableOfContents.tsx
interface GlobalTableOfContentsProps {
  tocItems: TocItem[];
  activeSection: string;
  onSectionClick: (id: string) => void;
  isVisible: boolean;
}

export const GlobalTableOfContents: React.FC<GlobalTableOfContentsProps> = ({ 
  tocItems, 
  activeSection, 
  onSectionClick,
  isVisible 
}) => {
  const [isSticky, setIsSticky] = useState(false);
  const tocRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    
    if (!contentRef.current) return;
    
    const currentScroll = contentRef.current.scrollTop;
    const newScrollTop = currentScroll + e.deltaY;
    const maxScroll = contentRef.current.scrollHeight - contentRef.current.clientHeight;
    
    contentRef.current.scrollTop = Math.max(0, Math.min(maxScroll, newScrollTop));
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!tocRef.current) return;

      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show when scrolled down 100px, hide when near bottom of content
      const scrollPercentage = (scrollPosition + viewportHeight) / documentHeight;
      const shouldShow = scrollPosition > 100 && scrollPercentage < 0.90; // Hide when 90% scrolled
      setIsSticky(shouldShow);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Removed auto-scrolling to prevent flickering and jittering
  // Users can now scroll manually for better UX

  const renderTocItem = (item: TocItem, depth: number = 0) => (
    <div key={item.id} className={pathLayoutStyles.tocItem}>
      <button
        className={`${pathLayoutStyles.tocLink} ${activeSection === item.id ? pathLayoutStyles.active : ''}`}
        onClick={() => {
          onSectionClick(item.id);
        }}
        style={{ paddingLeft: `${depth * 1 + 0.5}rem` }}
        data-section-id={item.id}
        type="button"
      >
        {item.title}
      </button>
      {item.children.length > 0 && (
        <div className={pathLayoutStyles.tocSublist}>
          {item.children.map(child => renderTocItem(child, depth + 1))}
        </div>
      )}
    </div>
  );

  if (!isVisible || tocItems.length === 0) return null;

  return (
    <div 
      ref={tocRef}
      className={`${pathLayoutStyles.globalToc} ${isSticky ? pathLayoutStyles.globalTocSticky : pathLayoutStyles.globalTocHidden}`}
    >
      <div className={pathLayoutStyles.globalTocContent} ref={contentRef} onWheel={handleWheel}>
        {tocItems.map(item => renderTocItem(item))}
      </div>
    </div>
  );
};


// ============================================================
// Source: PathContent.tsx
// ============================================================
interface PathContentProps {
  node: PathNode | null;
}

export const PathContent: React.FC<PathContentProps> = ({ node }) => {
  if (!node) {
    return (
      <div className={pathLayoutStyles.emptyState}>
        <div className={pathLayoutStyles.emptyIcon}>📚</div>
        <h2>Select a topic to start learning</h2>
        <p>Choose from the navigation tree on the left to explore learning content</p>
      </div>
    );
  }

  return (
    <div className={pathLayoutStyles.contentContainer}>
      <header className={pathLayoutStyles.contentHeader}>
        <div className={pathLayoutStyles.breadcrumb}>
          <span className={pathLayoutStyles.breadcrumbItem}>Path</span>
          {node.path && node.path.split('/').map((segment, index) => (
            <React.Fragment key={segment}>
              <span className={pathLayoutStyles.breadcrumbSeparator}>/</span>
              <span className={pathLayoutStyles.breadcrumbItem}>{segment}</span>
            </React.Fragment>
          ))}
        </div>
        
        <h1 className={pathLayoutStyles.contentTitle}>{node.title}</h1>
        
        {node.description && (
          <p className={pathLayoutStyles.contentDescription}>{node.description}</p>
        )}
        
        <div className={pathLayoutStyles.contentMeta}>
          <span className={pathLayoutStyles.metaItem}>
            Level {node.level}
          </span>
          {node.children.length > 0 && (
            <span className={pathLayoutStyles.metaItem}>
              {node.children.length} subtopics
            </span>
          )}
        </div>
      </header>

      <main className={pathLayoutStyles.contentMain}>
        <div className={pathLayoutStyles.markdownContent}>
          <ReactMarkdown
            components={{
              h1: ({children}) => <h1 className={pathLayoutStyles.heading1}>{children}</h1>,
              h2: ({children}) => <h2 className={pathLayoutStyles.heading2}>{children}</h2>,
              h3: ({children}) => <h3 className={pathLayoutStyles.heading3}>{children}</h3>,
              h4: ({children}) => <h4 className={pathLayoutStyles.heading4}>{children}</h4>,
              h5: ({children}) => <h5 className={pathLayoutStyles.heading5}>{children}</h5>,
              h6: ({children}) => <h6 className={pathLayoutStyles.heading6}>{children}</h6>,
              p: ({children}) => <p className={pathLayoutStyles.paragraph}>{children}</p>,
              ul: ({children}) => <ul className={pathLayoutStyles.list}>{children}</ul>,
              ol: ({children}) => <ol className={pathLayoutStyles.orderedList}>{children}</ol>,
              li: ({children}) => <li className={pathLayoutStyles.listItem}>{children}</li>,
              blockquote: ({children}) => <blockquote className={pathLayoutStyles.blockquote}>{children}</blockquote>,
              code: ({className, children}) => {
                const match = /language-(\w+)/.exec(className || '');
                return match ? (
                  <pre className={pathLayoutStyles.codeBlock}><code className={className}>{children}</code></pre>
                ) : (
                  <code className={pathLayoutStyles.inlineCode}>{children}</code>
                );
              },
              pre: ({children}) => <pre className={pathLayoutStyles.codeBlock}>{children}</pre>,
              a: ({href, children}) => (
                <a href={href} className={pathLayoutStyles.link} target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              ),
              strong: ({children}) => <strong className={pathLayoutStyles.bold}>{children}</strong>,
              em: ({children}) => <em className={pathLayoutStyles.italic}>{children}</em>
            }}
          >
            {node.content}
          </ReactMarkdown>
        </div>
      </main>
    </div>
  );
};


// ============================================================
// Source: PathExplorer.tsx
// ============================================================
interface PathExplorerProps {
  pathContent: PathContentType;
}

export const PathExplorer: React.FC<PathExplorerProps> = ({ pathContent }) => {
  const [selectedNode, setSelectedNode] = useState<PathNode | null>(pathContent.root);

  const isPathNode = (node: PathNode): boolean => {
    return node.subfolders && node.subfolders.length > 0;
  };

  if (!selectedNode) {
    return (
      <div className={pathLayoutStyles.emptyState}>
        <h2>Loading...</h2>
        <p>Please wait while we prepare the content</p>
      </div>
    );
  }

  return (
    <div className={pathLayoutStyles.explorer}>
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


// ============================================================
// Source: PathLayout.tsx
// ============================================================
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
    <div className={pathLayoutStyles.pathLayout}>
      <div className={pathLayoutStyles.pathHeader}>
        <div className={pathLayoutStyles.breadcrumb}>
          <Link href="/path" className={pathLayoutStyles.breadcrumbItem}>
            Path
          </Link>
          {node.path && node.path.split('/').map((segment, index, array) => {
            const isLast = index === array.length - 1;
            
            return (
              <React.Fragment key={segment}>
                <span className={pathLayoutStyles.breadcrumbSeparator}>/</span>
                <Link 
                  href={getBreadcrumbPath(segment, index, array)}
                  className={`${pathLayoutStyles.breadcrumbItem} ${isLast ? pathLayoutStyles.active : ''}`}
                >
                  {segment}
                </Link>
              </React.Fragment>
            );
          })}
        </div>
        
        <h1 className={pathLayoutStyles.pathTitle}>{node.title}</h1>
        
        {node.description && (
          <div className={pathLayoutStyles.pathDescription}>
            <ReactMarkdown>{node.description}</ReactMarkdown>
          </div>
        )}
      </div>

      <div className={pathLayoutStyles.modulesContainer}>
        <h2 className={pathLayoutStyles.subfoldersTitle}>
          {node.children.length > 0 ? 'Modules' : 'Content'}
        </h2>
        
        <div className={pathLayoutStyles.modulesList}>
          {node.children.map((child, index) => (
            <div key={child.id} className={pathLayoutStyles.moduleSection}>
              <Link
                href={getSubfolderPath(child.path || child.id)}
                className={pathLayoutStyles.moduleLink}
              >
                <div className={pathLayoutStyles.moduleHeader}>
                  {/* <div className={pathLayoutStyles.moduleIcon}>
                    <FiFolder size={20} />
                  </div> */}
                  <div className={pathLayoutStyles.moduleInfo}>
                    <h3 className={pathLayoutStyles.moduleTitle}>
                      <span className={pathLayoutStyles.moduleNumber}>{index + 1}</span>
                      {child.title}
                    </h3>
                    {child.description && (
                      <p className={pathLayoutStyles.moduleDescription}>{child.description}</p>
                    )}
                  </div>
                  <div className={pathLayoutStyles.moduleArrow}>
                    <FiChevronRight size={16} />
                  </div>
                </div>
              </Link>
              
              {child.children && child.children.length > 0 && (
                <div className={pathLayoutStyles.lessonsList}>
                  {child.children.map((lesson) => (
                    <Link
                      key={lesson.id}
                      href={getSubfolderPath(lesson.path || lesson.id)}
                      className={pathLayoutStyles.lessonItem}
                    >
                      <div className={pathLayoutStyles.lessonIcon}>
                        <IoBookOutline size={14} />
                      </div>
                      <span className={pathLayoutStyles.lessonTitle}>{lesson.title}</span>
                      <div className={pathLayoutStyles.lessonArrow}>
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
        <div className={pathLayoutStyles.pathContent}>
          <h2 className={pathLayoutStyles.contentTitle}>About This Path</h2>
          <div className={pathLayoutStyles.contentBody}>
            <ReactMarkdown>{node.content}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};


// ============================================================
// Source: PathTree.tsx
// ============================================================
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
    <div className={pathLayoutStyles.treeNode} style={{ paddingLeft: `${level * 24}px` }}>
      <div 
        className={`${pathLayoutStyles.nodeHeader} ${isSelected ? pathLayoutStyles.selected : ''}`}
        onClick={handleSelect}
      >
        {hasChildren && (
          <button 
            className={`${pathLayoutStyles.expandButton} ${isExpanded ? pathLayoutStyles.expanded : ''}`}
            onClick={handleToggle}
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            ▼
          </button>
        )}
        
        {!hasChildren && (
          <div className={pathLayoutStyles.expandButton} />
        )}
        
        <div className={pathLayoutStyles.nodeContent}>
          <h3 className={pathLayoutStyles.nodeTitle}>{node.title}</h3>
          {node.description && (
            <p className={pathLayoutStyles.nodeDescription}>{node.description}</p>
          )}
        </div>
        
        {hasChildren && (
          <span className={pathLayoutStyles.childCount}>
            {node.children.length} {node.children.length === 1 ? 'topic' : 'topics'}
          </span>
        )}
      </div>

      {hasChildren && isExpanded && (
        <div className={pathLayoutStyles.children}>
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


// ============================================================
// Source: TableOfContents.tsx
interface TableOfContentsProps {
  tocItems: TocItem[];
  activeSection: string;
  onSectionClick: (id: string) => void;
  isMobile?: boolean;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ 
  tocItems, 
  activeSection, 
  onSectionClick,
  isMobile = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const renderTocItem = (item: TocItem, depth: number = 0) => (
    <li key={item.id} className={pathLayoutStyles.tocItem}>
      <button
        className={`${pathLayoutStyles.tocLink} ${item.children.length > 0 ? pathLayoutStyles.bold : ''}`}
        onClick={() => onSectionClick(item.id)}
        style={{ paddingLeft: `${depth * 1.75 + 0.5}rem` }}
      >
        {item.title}
      </button>
      {item.children.length > 0 && (
        <ul className={pathLayoutStyles.tocSublist}>
          {item.children.map(child => renderTocItem(child, depth + 1))}
        </ul>
      )}
    </li>
  );

  if (!isMobile) {
    return null;
  }

  return (
    <div className={pathLayoutStyles.mobileToc}>
      <button 
        className={pathLayoutStyles.mobileTocTitle}
        onClick={() => setIsOpen(!isOpen)}
      >
        Contents
        <span style={{ 
          fontSize: '0.75rem',
          marginLeft: '0.5rem',
          transition: 'transform 0.2s ease',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
        }}>▼</span>
      </button>
      
      {isOpen && (
        <div className={pathLayoutStyles.mobileTocContainer}>
          <nav className={pathLayoutStyles.mobileToc}>
            <ul className={pathLayoutStyles.tocList}>
              {tocItems.map(item => renderTocItem(item))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};
