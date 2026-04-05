import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import '@excalidraw/excalidraw/index.css';

const ExcalidrawComponent = dynamic(
  async () => (await import('../../components/excalidraw/Excalidraw')).default,
  { ssr: false }
);

export default function TestPage() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullscreenToggle = (fullscreen: boolean) => {
    setIsFullscreen(!isFullscreen); // Toggle the current state
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
      // Hide all competing elements with multiple selectors
      const elementsToHide = [
        'nav',
        '[class*="chatButton"]',
        'header',
        'footer',
        '[class*="ChatButton"]',
        '[data-testid*="chat"]',
        '[id*="chat"]',
        '[aria-label*="chat"]',
        'button[class*="fixed"]',
        'div[class*="fixed"][style*="bottom"]',
        '[class*="whatsappFloat"]',
        '[class*="whatsapp"]',
        'a[href*="whatsapp"]',
        '[aria-label*="WhatsApp"]'
      ];
      
      elementsToHide.forEach(selector => {
        const elements = document.querySelectorAll(selector) as NodeListOf<HTMLElement>;
        elements.forEach(el => {
          if (el && el.style) {
            el.style.display = 'none';
          }
        });
      });
    } else {
      document.body.style.overflow = '';
      // Show all elements
      const elementsToShow = [
        'nav',
        '[class*="chatButton"]',
        'header',
        'footer',
        '[class*="ChatButton"]',
        '[data-testid*="chat"]',
        '[id*="chat"]',
        '[aria-label*="chat"]',
        'button[class*="fixed"]',
        'div[class*="fixed"][style*="bottom"]',
        '[class*="whatsappFloat"]',
        '[class*="whatsapp"]',
        'a[href*="whatsapp"]',
        '[aria-label*="WhatsApp"]'
      ];
      
      elementsToShow.forEach((selector: string) => {
        const elements = document.querySelectorAll(selector) as NodeListOf<HTMLElement>;
        elements.forEach(el => {
          if (el && el.style) {
            el.style.display = '';
          }
        });
      });
    }

    return () => {
      document.body.style.overflow = '';
      // Cleanup: show all elements
      const elementsToShow = [
        'nav',
        '[class*="chatButton"]',
        'header',
        'footer',
        '[class*="ChatButton"]',
        '[data-testid*="chat"]',
        '[id*="chat"]',
        '[aria-label*="chat"]',
        'button[class*="fixed"]',
        'div[class*="fixed"][style*="bottom"]',
        '[class*="whatsappFloat"]',
        '[class*="whatsapp"]',
        'a[href*="whatsapp"]',
        '[aria-label*="WhatsApp"]'
      ];
      
      elementsToShow.forEach((selector: string) => {
        const elements = document.querySelectorAll(selector) as NodeListOf<HTMLElement>;
        elements.forEach(el => {
          if (el && el.style) {
            el.style.display = '';
          }
        });
      });
    };
  }, [isFullscreen]);

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
          Excalidraw Integration Test
        </div>
      )}
      
      <div style={{ 
        flex: isFullscreen ? 1 : 1,
        padding: isFullscreen ? '0' : '0 20px 20px',
        minHeight: 0
      }}>
        <ExcalidrawComponent 
          height={isFullscreen ? '100vh' : '100%'}
          width={isFullscreen ? '100vw' : '100%'}
          theme="dark"
          zenModeEnabled={true}
          autoFocus={true}
          name="System Design Diagram"
          onFullscreenToggle={handleFullscreenToggle}
          isFullscreen={isFullscreen}
          onSceneChange={(elements, appState, files) => {
            console.log('Excalidraw scene changed:', { 
              elementCount: elements.length, 
              theme: appState.theme,
              zenMode: appState.zenModeEnabled 
            });
          }}
          onExport={(data) => {
            console.log('Excalidraw export:', data);
          }}
        />
      </div>
    </div>
  );
}