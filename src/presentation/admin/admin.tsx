import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import styles from '../_styles/components/admin/Admin.module.css';;
import { ArticleUpdater } from '../../infrastructure/articleUpdater';
import { useArticleUpdate } from '../../application/hooks';
import { QuillDelta, ArticleMetadata } from '../../application/types/shared.types';

// Dynamically import QuillEditor with SSR disabled
const CustomQuillEditor = dynamic(() => import("../editor/CustomQuillEditor"), {
  ssr: false,
  loading: () => <div className={styles.loading}>Loading editor...</div>
});

interface AdminProps {
  initialContent?: string;
  initialTitle?: string;
  mode?: 'create' | 'edit';
  slug?: string;
}

export default function Admin({ 
  initialContent = "", 
  initialTitle = "",
  mode = 'create',
  slug
}: AdminProps) {
  const router = useRouter();
  const [value, setValue] = useState(initialContent);
  const [title, setTitle] = useState(initialTitle);
  const [existingMetadata, setExistingMetadata] = useState<ArticleMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(mode === 'edit');
  
  const { handleUpdate, updateState, isUpdating, updateResult, resetUpdateState } = useArticleUpdate({
    slug: slug || '',
    title,
    existingMetadata: existingMetadata || undefined
  });

  useEffect(() => {
    if (mode === 'edit' && slug && !initialContent) {
      loadExistingArticle(slug);
    }
  }, [mode, slug, initialContent]);

  const loadExistingArticle = async (articleSlug: string) => {
    setIsLoading(true);
    try {
      const articleData = await ArticleUpdater.loadExistingArticle(articleSlug);
      
      if (articleData) {
        setValue(articleData.html);
        setTitle(articleData.metadata?.title || '');
        setExistingMetadata(articleData.metadata);
        setIsEditMode(true);
      } else {
        // Optionally redirect to create mode or show error
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (content: string) => {
    setValue(content);
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleSave = async (quillRef: any) => {
    if (!quillRef?.current || !slug) return;

    try {
      const quill = quillRef.current.getEditor();
      const delta = quill.getContents();
      
      const result = await handleUpdate(delta);
      
      if (result.success) {
        // Show success message or redirect
      } else {
        // Show error message
      }
    } catch (error) {
    }
  };

  if (isLoading) {
    return (
      <div className={styles.adminContainer}>
        <div className={styles.loadingContainer}>
          <div className={styles.loading}>Loading article...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      <div className={styles.adminWrapper}>
        <header className={styles.adminHeader}>
          <h1>
            {isEditMode ? 'Edit Article' : 'Create New Article'}
          </h1>
          {isEditMode && existingMetadata && (
            <div className={styles.articleInfo}>
              <span>Slug: {existingMetadata.slug}</span>
              <span>Created: {existingMetadata.date}</span>
            </div>
          )}
        </header>
        
        <main className={styles.adminMain}>
          <CustomQuillEditor 
            value={value} 
            onChange={handleChange} 
            title={title}
            onTitleChange={handleTitleChange}
            placeholder="         Tell your story..." 
            mode={isEditMode ? 'edit' : 'create'}
            onSave={isEditMode ? handleSave : undefined}
            saveState={updateState}
            isSaving={isUpdating}
            saveResult={updateResult}
            onResetSave={resetUpdateState}
          />
        </main>
      </div>
    </div>
  );
}
