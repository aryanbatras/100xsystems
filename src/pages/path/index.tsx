import { GetStaticProps } from 'next';
import Head from 'next/head';
import { PathExplorer } from '../../components/path/PathExplorer';
import { PathContent } from '../../application/path/pathTypes';
import { PathParser } from '../../application/path/pathParser';
import styles from '../../styles/pages/path/index.module.css';

interface PathProps {
  pathContent: PathContent;
}

export default function Path({ pathContent }: PathProps) {
  return (
    <>
      <Head>
        <title>Learning Paths - 100x Systems</title>
        <meta name="description" content="Structured learning paths for comprehensive skill development. Explore programming fundamentals, system design, and advanced topics." />
        <meta property="og:title" content="Learning Paths - 100x Systems" />
        <meta property="og:description" content="Structured learning paths for comprehensive skill development. Explore programming fundamentals, system design, and advanced topics." />
        <meta property="og:type" content="website" />
      </Head>

      <div className={styles.pathContainer}>
        <div className={styles.pathWrapper}>
          <PathExplorer pathContent={pathContent} />
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const parser = new PathParser();
    const pathContent = await parser.parsePathContent();
    

    return {
      props: {
        pathContent
      },
      revalidate: 3600 // Revalidate every hour
    };

  } catch (error) {
    
    // Return fallback content
    const fallbackContent: PathContent = {
      root: {
        id: 'root',
        path: '',
        title: 'Learning Paths',
        description: 'Structured learning content is currently unavailable',
        content: '# Learning Paths\n\nThe learning paths are currently being updated. Please check back later.',
        subfolders: [],
        children: [],
        level: 0,
        isExpanded: true
      },
      allNodes: {
        'root': {
          id: 'root',
          path: '',
          title: 'Learning Paths',
          description: 'Structured learning content is currently unavailable',
          content: '# Learning Paths\n\nThe learning paths are currently being updated. Please check back later.',
          subfolders: [],
          children: [],
          level: 0,
          isExpanded: true
        }
      },
      totalNodes: 1,
      maxDepth: 0
    };

    return {
      props: {
        pathContent: fallbackContent
      },
      revalidate: 600 // Try again in 10 minutes
    };
  }
};
