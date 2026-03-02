import { useState } from "react";
import dynamic from 'next/dynamic';
import styles from './Admin.module.css';

// Dynamically import QuillEditor with SSR disabled
const QuillEditor = dynamic(() => import("../editor/QuillEditor"), {
  ssr: false,
  loading: () => <div className={styles.loading}>Loading editor...</div>
});

interface AdminProps {
  initialContent?: string;
  initialTitle?: string;
}

export default function Admin({ initialContent = "", initialTitle = "" }: AdminProps) {
  const [value, setValue] = useState(initialContent);
  const [title, setTitle] = useState(initialTitle);

  const handleChange = (content: string) => {
    setValue(content);
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  return (
    <div className={styles.adminContainer}>
      <div className={styles.adminWrapper}>
        <header className={styles.adminHeader}>
          <h1 className={styles.adminTitle}>New Story</h1>
          <p className={styles.adminSubtitle}>Share your ideas with the world</p>
        </header>
        
        <main className={styles.adminMain}>
          <QuillEditor 
            value={value} 
            onChange={handleChange} 
            title={title}
            onTitleChange={handleTitleChange}
            placeholder="Tell your story..." 
          />
        </main>
      </div>
    </div>
  );
}
