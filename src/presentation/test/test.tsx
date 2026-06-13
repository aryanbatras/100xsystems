/**
 * ## Presentation: Test Page
 *
 * Test page for validating the Obsidian Knowledge Graph
 * visualization component with fullscreen toggle.
 *
 * @packageDocumentation
 */

import { useState } from 'react';
import ObsidianKnowledgeGraph from '../../components/graph/ObsidianKnowledgeGraph';

export default function TestPage() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#1a1a1a',
      position: 'relative'
    }}>
      {!isFullscreen && (
        <div style={{
          padding: '50px 20px 20px',
          textAlign: 'center',
          color: 'white',
          fontSize: '32px',
          fontWeight: 'bold'
        }}>
          Obsidian Knowledge Graph Test
        </div>
      )}

      <div style={{
        flex: isFullscreen ? 1 : 1,
        padding: isFullscreen ? '0' : '0 20px 20px',
        minHeight: 0
      }}>
        <ObsidianKnowledgeGraph
          width={isFullscreen ? '100vw' : '100%'}
          height={isFullscreen ? '100vh' : '1000px'}
          showControls={true}
          showSearch={true}
          showStats={true}
          showFilters={true}
          onNodeSelect={(node) => {
            console.log('Node selected:', node);
          }}
          onEdgeSelect={(edge) => {
            console.log('Edge selected:', edge);
          }}
        />
      </div>
    </div>
  );
}
