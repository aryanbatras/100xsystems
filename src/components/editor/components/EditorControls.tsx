import { useEffect } from 'react';
import { log } from "../../../lib/logger";
import styles from "../../../styles/components/editor/CustomQuillEditor.module.css";;

interface TitleInputProps {
  articleTitle: string;
  onTitleChange: (title: string) => void;
  readOnly?: boolean;
}

export function TitleInput({ articleTitle, onTitleChange, readOnly = false }: TitleInputProps) {
  return (
    <input
      type="text"
      value={articleTitle}
      onChange={(e) => onTitleChange(e.target.value)}
      placeholder="Title"
      className={styles.titleInput}
      readOnly={readOnly}
    />
  );
}

interface ControlButtonsProps {
  onPublishClick?: () => void;
  onSaveClick?: () => void;
  publishingState?: 'draft' | 'uploading' | 'success' | 'failed';
  saveState?: 'draft' | 'uploading' | 'success' | 'failed';
  onTerminalToggle: () => void;
  isTerminalVisible: boolean;
  onLivePreviewToggle: () => void;
  isLivePreviewVisible: boolean;
  isContainerMode: boolean;
  onViewModeToggle: () => void;
  mode?: 'create' | 'edit' | 'parser';
  isSaving?: boolean;
}

export function ControlButtons({
  onPublishClick,
  onSaveClick,
  publishingState = 'draft',
  saveState = 'draft',
  onTerminalToggle,
  isTerminalVisible,
  onLivePreviewToggle,
  isLivePreviewVisible,
  isContainerMode,
  onViewModeToggle,
  mode = 'create',
  isSaving = false,
}: ControlButtonsProps) {
  
  const handlePublishClick = () => {
    log('🚀 Publish button clicked', 'info');
    onPublishClick?.();
  };

  const handleSaveClick = () => {
    log('💾 Save button clicked', 'info');
    onSaveClick?.();
  };

  const handleLivePreviewToggle = () => {
    onLivePreviewToggle();
    log(`👁️ Live preview ${!isLivePreviewVisible ? 'opened' : 'closed'}`, 'info');
  };

  return (
    <>
      {/* Open Terminal Button - Only show when terminal is closed */}
      {!isTerminalVisible && (
        <div className={styles.openTerminalContainer}>
          <button
            onClick={onTerminalToggle}
            className={styles.openTerminalButton}
            title="Open terminal"
          >
            OPEN TERMINAL
          </button>
        </div>
      )}

      {/* Open Live Preview Button - Only show when preview is closed */}
      {!isLivePreviewVisible && (
        <div className={styles.openPreviewContainer}>
          <button
            onClick={handleLivePreviewToggle}
            className={styles.openPreviewButton}
            title="Open live preview"
          >
            LIVE PREVIEW
          </button>
        </div>
      )}

      {/* View Mode Toggle Button */}
      <div className={styles.viewModeContainer}>
        <button
          onClick={onViewModeToggle}
          className={styles.viewModeButton}
          title={isContainerMode ? "Switch to full page view" : "Switch to container view"}
        >
          {isContainerMode ? "FULL PAGE" : "CONTAINER"}
        </button>
      </div>

      {/* Action Button - Save or Publish */}
      <div className={styles.publishButtonContainer}>
        {mode === 'edit' || mode === 'parser' ? (
          <button
            onClick={handleSaveClick}
            disabled={isSaving || saveState === 'uploading'}
            className={`${styles.publishButton} ${styles[saveState]}`}
          >
            {saveState === 'draft' && "Save"}
            {saveState === 'uploading' && "Saving..."}
            {saveState === 'success' && "Saved"}
            {saveState === 'failed' && "Failed"}
          </button>
        ) : (
          <button
            onClick={handlePublishClick}
            disabled={publishingState !== "draft"}
            className={`${styles.publishButton} ${styles[publishingState]}`}
          >
            {publishingState === "draft" && "Publish"}
            {publishingState === "uploading" && "Publishing..."}
            {publishingState === "success" && "Published"}
            {publishingState === "failed" && "Failed"}
          </button>
        )}
      </div>
    </>
  );
}
