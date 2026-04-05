import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { PathNode } from '../../core/path/pathTypes';
import { useTableOfContents } from '../../contexts/TableOfContentsContext';
import { TableOfContents } from './TableOfContents';
import styles from '../../styles/components/path/ContentLayout.module.css';;

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
  const { setTocItems, setActiveSection, setIsGlobalTocVisible, tocItems, activeSection } = useTableOfContents();
  const contentRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const generateToc = () => {
      // Advanced markdown parser that ignores code blocks
      const markdownLines = node.content.split('\n');
      const headings: Array<{level: number, title: string, line: number}> = [];
      
      let inCodeBlock = false;
      let codeBlockFence = '';
      
      markdownLines.forEach((line, index) => {
        const trimmedLine = line.trim();
        
        // Track code blocks
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
        
        // Skip processing if inside code block
        if (inCodeBlock) {
          return;
        }
        
        // Only process headings if not in code block
        const match = line.match(/^(#{1,6})\s+(.+)$/);
        if (match) {
          const level = match[1].length;
          const title = match[2].trim();
          headings.push({ level, title, line: index });
        }
      });

      const items: TocItem[] = [];
      const stack: TocItem[] = [];

      headings.forEach((heading, index) => {
        // Generate consistent ID that matches heading ID generation
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

  // Mobile detection and global TOC visibility
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Show global TOC when TOC items are available
  useEffect(() => {
    if (tocItems.length > 0) {
      setIsGlobalTocVisible(true);
    } else {
      setIsGlobalTocVisible(false);
    }
  }, [tocItems, setIsGlobalTocVisible]);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const headings = contentRef.current.querySelectorAll('h1, h2, h3');
      const scrollPosition = window.scrollY + 120; // Adjusted offset for better tracking

      let currentHeading = '';
      let closestDistance = Infinity;

      headings.forEach((heading) => {
        const element = heading as HTMLElement;
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const distance = Math.abs(elementTop - scrollPosition);
        
        // Only consider headings that are actually in view or above
        if (elementTop <= scrollPosition + 200 && distance < closestDistance) {
          closestDistance = distance;
          currentHeading = element.id;
        }
      });

      // If no heading found, use the first one
      if (!currentHeading && headings.length > 0) {
        currentHeading = (headings[0] as HTMLElement).id;
      }

      setActiveSection(currentHeading);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [tocItems]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = -900; // Reduced offset for better positioning
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      
      // Let scroll tracking handle active section update naturally
      // when user reaches the target section
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
    <div className={styles.contentLayout}>
      <div className={styles.breadcrumb}>
        <Link href="/path" className={styles.breadcrumbItem}>
          Path
        </Link>
        {node.path && node.path.split('/').map((segment, index, array) => {
          const fullPath = array.slice(0, index + 1).join('/');
          const isLast = index === array.length - 1;
          
          return (
            <React.Fragment key={segment}>
              <span className={styles.breadcrumbSeparator}>/</span>
              <Link 
                href={getBreadcrumbPath(fullPath)}
                className={`${styles.breadcrumbItem} ${isLast ? styles.active : ''}`}
              >
                {segment}
              </Link>
            </React.Fragment>
          );
        })}
      </div>

      {/* Mobile TOC - appears before article content */}
      <TableOfContents 
        tocItems={tocItems}
        activeSection={activeSection}
        onSectionClick={scrollToSection}
        isMobile={isMobile}
      />

      <div className={styles.layoutContainer}>
        <main className={styles.mainContent} ref={contentRef}>
          {/* <header className={styles.contentHeader}>
            <h1 className={styles.contentTitle}>{node.title}</h1>
            {node.description && (
              <p className={styles.contentDescription}>{node.description}</p>
            )}
          </header> */}

          <article className={styles.article}>
            <ReactMarkdown
              components={{
                h1: ({children}) => {
                  const headingId = getHeadingId(1, children);
                  return <h1 id={headingId} className={styles.heading1}>{children}</h1>;
                },
                h2: ({children}) => {
                  const headingId = getHeadingId(2, children);
                  return <h2 id={headingId} className={styles.heading2}>{children}</h2>;
                },
                h3: ({children}) => {
                  const headingId = getHeadingId(3, children);
                  return <h3 id={headingId} className={styles.heading3}>{children}</h3>;
                },
                p: ({children}) => <p className={styles.paragraph}>{children}</p>,
                ul: ({children}) => <ul className={styles.list}>{children}</ul>,
                ol: ({children}) => <ol className={styles.orderedList}>{children}</ol>,
                li: ({children}) => <li className={styles.listItem}>{children}</li>,
                blockquote: ({children}) => <blockquote className={styles.blockquote}>{children}</blockquote>,
                code: ({className, children}) => {
                  const match = /language-(\w+)/.exec(className || '');
                  return match ? (
                    <SyntaxHighlighter
                      style={tomorrow}
                      language={match[1]}
                      PreTag="div"
                      className={styles.codeBlock}
                      showLineNumbers
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={styles.inlineCode}>{children}</code>
                  );
                },
                pre: ({children}) => <div className={styles.codeWrapper}>{children}</div>,
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
          </article>
        </main>

        <aside className={styles.sidebar}>
          {/* Desktop TOC removed - global TOC handles it */}
        </aside>
      </div>
    </div>
  );
};
