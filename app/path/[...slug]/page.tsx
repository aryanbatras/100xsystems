import { Metadata } from 'next';
import { PathContent, PathNode } from '@/application/path/pathTypes';
import { PathParser } from '@/application/path/pathParser';
import { PathLayout, ContentLayout } from '@/presentation/features/path.feature';
import styles from '@/presentation/_styles/css/path-_slug_.module.css';

interface PathPageProps {
  params: Promise<{ slug: string[] }>;
}

async function getPathContent(): Promise<PathContent> {
  const parser = new PathParser();
  return await parser.parsePathContent();
}

function findNodeByPath(node: PathNode, targetPath: string[], currentIndex: number = 0): PathNode | null {
  if (currentIndex === targetPath.length) return node;
  const currentSegment = targetPath[currentIndex];
  for (const child of node.children) {
    const childPathSegments = child.path ? child.path.split('/').filter(s => s !== '') : [];
    if (child.id === currentSegment || childPathSegments[childPathSegments.length - 1] === currentSegment || child.title.toLowerCase() === currentSegment.toLowerCase()) {
      return findNodeByPath(child, targetPath, currentIndex + 1);
    }
  }
  return null;
}

export async function generateStaticParams() {
  try {
    const parser = new PathParser();
    const pathContent = await parser.parsePathContent();
    const paths: { slug: string[] }[] = [];

    const generatePaths = (node: PathNode) => {
      if (node.path && node.path !== '') {
        const pathSegments = node.path.split('/').filter(segment => segment !== '');
        paths.push({ slug: pathSegments });
      }
      node.children.forEach(child => generatePaths(child));
    };

    generatePaths(pathContent.root);
    return paths;
  } catch (error) {
    return [];
  }
}

export default async function PathSlugPage({ params }: PathPageProps) {
  const { slug } = await params;
  const pathContent = await getPathContent();
  const currentNode = findNodeByPath(pathContent.root, slug);

  if (!currentNode) {
    return <div>Page not found</div>;
  }

  const isPathNode = currentNode.subfolders && currentNode.subfolders.length > 0;

  return (
    <div className={styles.pathPage}>
      {isPathNode ? (
        <PathLayout node={currentNode} />
      ) : (
        <ContentLayout node={currentNode} />
      )}
    </div>
  );
}
