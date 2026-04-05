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
