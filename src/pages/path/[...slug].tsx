import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { GetStaticPropsContext } from 'next';
import { PathContent, PathNode } from '../../application/path/pathTypes';
import { PathParser } from '../../application/path/pathParser';
import { PathLayout } from '../../presentation/features/path.feature';
import { ContentLayout } from '../../presentation/features/path.feature';
import styles from '../../presentation/_styles/css/path-_slug_.module.css';

interface PathPageProps {
  pathContent: PathContent;
  currentNode: PathNode;
  slug: string[];
}

export default function PathPage({ pathContent, currentNode, slug }: PathPageProps) {
  const isPathNode = currentNode.subfolders && currentNode.subfolders.length > 0;
  const pathString = slug.join('/');

  return (
    <>
      <Head>
        <title>{currentNode.title} - Learning Paths - 100x Systems</title>
        <meta name="description" content={currentNode.description || `Explore ${currentNode.title} in our structured learning paths`} />
        <meta property="og:title" content={`${currentNode.title} - Learning Paths - 100x Systems`} />
        <meta property="og:description" content={currentNode.description || `Explore ${currentNode.title} in our structured learning paths`} />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={styles.pathPage}>
        {isPathNode ? (
          <PathLayout 
            node={currentNode} 
          />
        ) : (
          <ContentLayout 
            node={currentNode} 
          />
        )}
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const parser = new PathParser();
    const pathContent = await parser.parsePathContent();
    
    const paths: { params: { slug: string[] } }[] = [];
    
    // Generate all possible paths recursively
    const generatePaths = (node: PathNode) => {
      // Add current node path if it's not root and has a valid path
      if (node.path && node.path !== '') {
        const pathSegments = node.path.split('/').filter(segment => segment !== '');
        paths.push({
          params: { slug: pathSegments }
        });
      }
      
      // Generate paths for ALL children (both folders and leaf nodes)
      node.children.forEach(child => {
        generatePaths(child);
      });
    };
    
    // Start with root and generate all paths
    generatePaths(pathContent.root);


    return {
      paths,
      fallback: false // Pure static generation
    };

  } catch (error) {
    return {
      paths: [],
      fallback: false
    };
  }
};

export const getStaticProps: GetStaticProps<PathPageProps> = async ({ params }) => {
  try {
    const slug = (params as { slug?: string[] })?.slug || [];
    const pathString = slug.join('/');
    
    const parser = new PathParser();
    const pathContent = await parser.parsePathContent();
    
    // Find current node based on slug
    const findNodeByPath = (node: PathNode, targetPath: string[], currentIndex: number = 0): PathNode | null => {
      // If we've reached the end of the path, return current node
      if (currentIndex === targetPath.length) {
        return node;
      }
      
      const currentSegment = targetPath[currentIndex];
      
      // Search for the child that matches the current path segment
      for (const child of node.children) {
        const childPathSegments = child.path ? child.path.split('/').filter(s => s !== '') : [];
        
        // Check if this child matches the current segment
        if (child.id === currentSegment || 
            childPathSegments[childPathSegments.length - 1] === currentSegment ||
            child.title.toLowerCase() === currentSegment.toLowerCase()) {
          // Found matching child, continue searching with next segment
          return findNodeByPath(child, targetPath, currentIndex + 1);
        }
      }
      
      // No matching child found
      return null;
    };
    
    const currentNode = findNodeByPath(pathContent.root, slug);
    
    if (!currentNode) {
      return {
        notFound: true
      };
    }


    return {
      props: {
        pathContent,
        currentNode,
        slug
      },
      revalidate: 3600 // Revalidate every hour
    };

  } catch (error) {
    const slug = (params as { slug?: string[] })?.slug || [];
    return {
      notFound: true
    };
  }
};
