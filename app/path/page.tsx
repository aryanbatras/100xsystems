import { Metadata } from 'next';
import { PathExplorer } from '@/presentation/features/path.feature';
import { PathContent } from '@/application/path/pathTypes';
import { PathParser } from '@/application/path/pathParser';
import styles from '@/presentation/_styles/css/path-index.module.css';

async function getPathContent(): Promise<PathContent> {
  try {
    const parser = new PathParser();
    return await parser.parsePathContent();
  } catch (error) {
    return {
      root: {
        id: 'root',
        path: '',
        title: 'Learning Paths',
        description: 'Structured learning content is currently unavailable',
        content: '# Learning Paths\n\nThe learning paths are currently being updated. Please check back later.',
        subfolders: [],
        children: [],
        level: 0,
        isExpanded: true,
      },
      allNodes: { root: { id: 'root', path: '', title: 'Learning Paths', description: 'Structured learning content is currently unavailable', content: '# Learning Paths\n\nThe learning paths are currently being updated. Please check back later.', subfolders: [], children: [], level: 0, isExpanded: true } },
      totalNodes: 1,
      maxDepth: 0,
    };
  }
}

export const metadata: Metadata = {
  title: 'Learning Paths - 100x Systems',
  description: 'Structured learning paths for comprehensive skill development. Explore programming fundamentals, system design, and advanced topics.',
  openGraph: {
    title: 'Learning Paths - 100x Systems',
    description: 'Structured learning paths for comprehensive skill development.',
    type: 'website',
  },
};

export default async function PathPage() {
  const pathContent = await getPathContent();

  return (
    <div className={styles.pathContainer}>
      <div className={styles.pathWrapper}>
        <PathExplorer pathContent={pathContent} />
      </div>
    </div>
  );
}
