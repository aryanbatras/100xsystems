'use client';

import drwnioLibrary from '../../../public/assets/exclidraw/drwnio.json';
import softwareArchitectureLibrary from '../../../public/assets/exclidraw/software-architecture.json';
import systemDesignTemplateLibrary from '../../../public/assets/exclidraw/system-design-template.json';
import systemDesignLibrary from '../../../public/assets/exclidraw/system-design.json';
import technologyLogosLibrary from '../../../public/assets/exclidraw/technology-logos.json';
import wardleyMapsSymbolsLibrary from '../../../public/assets/exclidraw/wardley-maps-symbols.json';
import styles from '../_styles/css/excalidraw-excalidraw.module.css';
import dynamic from 'next/dynamic';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { BiExport } from 'react-icons/bi';
import { MdOutlineFullscreen, MdOutlineFullscreenExit } from 'react-icons/md';
import { SiZenbrowser } from 'react-icons/si';
/**
 * ## Excalidraw
 *
 * Excalidraw feature module.
 * Contains all components, types, and logic for the excalidraw domain.
 *
 * @packageDocumentation
 * @module excalidraw
 */

;



// ============================================================
// Source: Excalidraw.tsx
// ============================================================
const Excalidraw = dynamic(
  async () => {
    const { Excalidraw: ExcalidrawComponent } = await import('@excalidraw/excalidraw');
    return ExcalidrawComponent;
  },
  {
    ssr: false,
    loading: () => (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '500px',
        color: '#facc15',
        fontSize: '18px',
        fontWeight: '600',
        backgroundColor: '#1a1a1a'
      }}>
        Loading Excalidraw...
      </div>
    )
  }
);

const ExcalidrawComponent: React.FC<ExcalidrawProps> = ({
  initialData,
  onSceneChange,
  onExport,
  height = '80vh',
  width = '100%',
  theme = 'dark',
  zenModeEnabled = true,
  autoFocus = true,
  name = 'System Design Diagram',
  onFullscreenToggle,
  isFullscreen
}) => {
  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawAPI | null>(null);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [elementCount, setElementCount] = useState(0);
  const [isZenMode, setIsZenMode] = useState(zenModeEnabled);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const prevInitialDataRef = useRef<any>(null);

  // Update Excalidraw scene when initialData changes
  useEffect(() => {
    if (excalidrawAPI && initialData && initialData !== prevInitialDataRef.current) {
      console.log('🔄 === EXCALIDRAW INITIAL DATA CHANGED ===');
      console.log('🔄 New elements:', initialData.elements?.length || 0);
      
      // Update the scene with new elements
      if (initialData.elements && initialData.elements.length > 0) {
        excalidrawAPI.updateScene({
          elements: initialData.elements,
          appState: initialData.appState || {}
        });
        
        console.log('✅ Excalidraw scene updated with new elements');
      }
      
      prevInitialDataRef.current = initialData;
    }
  }, [excalidrawAPI, initialData]);

  // Update library when API is ready - using imported libraries
  useEffect(() => {
    if (excalidrawAPI) {
      console.log('Loading all libraries...');
      
      try {
        // Handle different library versions with comprehensive safety
        const systemDesignItems = Array.isArray(systemDesignLibrary?.library) ? systemDesignLibrary.library : [];
        const softwareArchitectureItems = Array.isArray(softwareArchitectureLibrary?.library) ? softwareArchitectureLibrary.library : [];
        const drwnioItems = Array.isArray(drwnioLibrary?.library) ? drwnioLibrary.library : [];
        const systemDesignTemplateItems = Array.isArray(systemDesignTemplateLibrary?.library) ? systemDesignTemplateLibrary.library : [];
        const technologyLogosItems = Array.isArray(technologyLogosLibrary?.library) ? technologyLogosLibrary.library : [];
        const wardleyMapsSymbolsItems = Array.isArray(wardleyMapsSymbolsLibrary?.library) ? wardleyMapsSymbolsLibrary.library : [];
        
        const allLibraries = [
          ...systemDesignItems,
          ...softwareArchitectureItems,
          ...drwnioItems,
          ...systemDesignTemplateItems,
          ...technologyLogosItems,
          ...wardleyMapsSymbolsItems
        ].filter(Boolean); // Filter out any undefined/null items
        
        console.log('Combined libraries:', allLibraries.length, 'items');
        console.log('System Design:', systemDesignItems.length, 'items');
        console.log('Software Architecture:', softwareArchitectureItems.length, 'items');
        console.log('Drwnio:', drwnioItems.length, 'items');
        console.log('System Design Template:', systemDesignTemplateItems.length, 'items');
        console.log('Technology Logos:', technologyLogosItems.length, 'items');
        console.log('Wardley Maps Symbols:', wardleyMapsSymbolsItems.length, 'items');
        
        // Use setTimeout to prevent blocking
        setTimeout(() => {
          try {
            excalidrawAPI.updateLibrary({
              libraryItems: allLibraries as any
            });
            console.log('All libraries updated successfully');
          } catch (error) {
            console.error('Failed to update libraries:', error);
          }
        }, 100);
      } catch (error) {
        console.error('Error loading libraries:', error);
      }
    }
  }, [excalidrawAPI]);

  const handleExcalidrawAPI = useCallback((api: any) => {
    setExcalidrawAPI(api);
  }, []);

  const handleChange = useCallback((elements: readonly any[], appState: any, files: any) => {
    setElementCount(elements?.filter((el: any) => !el.isDeleted).length || 0);
    
    if (onSceneChange) {
      onSceneChange(elements, appState, files);
    }
  }, [onSceneChange]);

  const exportAs = useCallback(async (format: 'png' | 'svg' | 'json' | 'excalidraw') => {
    if (!excalidrawAPI) return;

    try {
      const elements = excalidrawAPI.getSceneElements();
      const appState = excalidrawAPI.getAppState();
      const files = excalidrawAPI.getFiles();

      const exportData: ExportData = {
        elements,
        appState,
        files,
        format
      };

      if (format === 'json' || format === 'excalidraw') {
        const dataStr = JSON.stringify({ elements, appState, files }, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${name}.${format === 'excalidraw' ? 'excalidraw' : 'json'}`;
        link.click();
        URL.revokeObjectURL(url);
      } else if (format === 'png' || format === 'svg') {
        if (typeof window !== 'undefined') {
          const canvas = document.querySelector('.excalidraw__canvas') as HTMLCanvasElement;
          if (canvas && format === 'png') {
            canvas.toBlob((blob) => {
              if (blob) {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `${name}.png`;
                link.click();
                URL.revokeObjectURL(url);
              }
            });
          }
        }
      }

      if (onExport) {
        onExport(exportData);
      }

      setShowExportMenu(false);
      
      if (excalidrawAPI.setToast) {
        excalidrawAPI.setToast({
          message: `Diagram exported as ${format.toUpperCase()}`,
          closable: true,
          duration: 3000
        });
      }
    } catch (error) {
      console.error('Export failed:', error);
      if (excalidrawAPI && excalidrawAPI.setToast) {
        excalidrawAPI.setToast({
          message: 'Export failed. Please try again.',
          closable: true,
          duration: 5000
        });
      }
    }
  }, [excalidrawAPI, name]);

  const toggleFullscreen = useCallback(() => {
    if (onFullscreenToggle) {
      onFullscreenToggle(!isFullscreen);
    }
  }, [onFullscreenToggle, isFullscreen]);

  const toggleZen = useCallback(() => {
    setIsZenMode(!isZenMode);
  }, [isZenMode]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (wrapperRef.current?.contains(e.target as Node)) {
        e.stopPropagation();
        e.preventDefault();
      }
    };

    const wrapper = wrapperRef.current;
    if (wrapper) {
      wrapper.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (wrapper) {
        wrapper.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <div className={styles.excalidrawContainer} style={{ height, width }}>
      <div className={styles.excalidrawWrapper} ref={wrapperRef}>
        <Excalidraw
          excalidrawAPI={handleExcalidrawAPI}
          onChange={handleChange}
          theme={theme}
          zenModeEnabled={isZenMode}
          autoFocus={autoFocus}
          initialData={initialData}
          onLibraryChange={(items) => {
            console.log('Library updated:', items);
          }}
          UIOptions={{
            canvasActions: {
              changeViewBackgroundColor: false,
              clearCanvas: true,
              loadScene: true,
              saveToActiveFile: true,
              toggleTheme: false,
              saveAsImage: true,
              export: {
                saveFileToDisk: false,
                onExportToBackend: undefined,
                renderCustomUI: undefined
              }
            },
            tools: {
              image: true
            },
            dockedSidebarBreakpoint: 768
          }}
        />
        
        <div className={styles.excalidrawControls}>
          <button 
            className={styles.controlButton}
            onClick={() => setShowExportMenu(!showExportMenu)}
          >
            <BiExport style={{ color: '#ffffff', fontSize: '16px' }} />
          </button>
          <button 
            className={styles.controlButton}
            onClick={toggleZen}
          >
            <SiZenbrowser style={{ color: '#ffffff', fontSize: '16px' }} />
          </button>
          {onFullscreenToggle && (
            <button 
              className={styles.controlButton}
              onClick={toggleFullscreen}
            >
              {isFullscreen ? (
                <MdOutlineFullscreenExit style={{ color: '#ffffff', fontSize: '16px' }} />
              ) : (
                <MdOutlineFullscreen style={{ color: '#ffffff', fontSize: '16px' }} />
              )}
            </button>
          )}
        </div>

        {showExportMenu && (
          <div className={styles.exportMenu}>
            <div className={styles.exportMenuItem} onClick={() => exportAs('png')}>
              Export as PNG
            </div>
            <div className={styles.exportMenuItem} onClick={() => exportAs('svg')}>
              Export as SVG
            </div>
            <div className={styles.exportMenuItem} onClick={() => exportAs('json')}>
              Export as JSON
            </div>
            <div className={styles.exportMenuItem} onClick={() => exportAs('excalidraw')}>
              Export as Excalidraw
            </div>
          </div>
        )}

        {/* <div className={styles.sceneInfo}>
          Elements: <span>{elementCount}</span> | Theme: <span>{theme}</span> | Zen: <span>{zenModeEnabled ? 'ON' : 'OFF'}</span>
        </div> */}
      </div>
    </div>
  );
};

export default ExcalidrawComponent;


// ============================================================
// Source: ExcalidrawTypes.ts
// ============================================================
export interface ExcalidrawInitialData {
  elements?: any[];
  appState?: any;
  libraryItems?: any[];
  scrollToContent?: boolean;
}

export interface ExportData {
  elements: any[];
  appState: any;
  files: any;
  format: 'png' | 'svg' | 'json' | 'excalidraw';
}

export interface ExcalidrawProps {
  initialData?: any;
  onSceneChange?: (elements: readonly any[], appState: any, files: any) => void;
  onExport?: (data: ExportData) => void;
  height?: string;
  width?: string;
  theme?: 'light' | 'dark';
  zenModeEnabled?: boolean;
  autoFocus?: boolean;
  name?: string;
  onFullscreenToggle?: (isFullscreen: boolean) => void;
  isFullscreen?: boolean;
}

export interface ExcalidrawAPI {
  updateScene: (scene: any) => void;
  updateLibrary: (opts: any) => Promise<any>;
  addFiles: (files: any) => void;
  resetScene: (opts?: { resetLoadingState?: boolean }) => void;
  getSceneElementsIncludingDeleted: () => any[];
  getSceneElements: () => any[];
  getAppState: () => any;
  history: {
    clear: () => void;
  };
  scrollToContent: (target?: any, opts?: any) => void;
  refresh: () => void;
  setToast: (toast: any) => void;
  id: string;
  getFiles: () => any;
  setActiveTool: (tool: any) => void;
  setCursor: (cursor: string) => void;
  resetCursor: () => void;
  toggleSidebar: (opts: any) => boolean;
  onChange: (callback: any) => () => void;
  onPointerDown: (callback: any) => () => void;
  onPointerUp: (callback: any) => () => void;
}
