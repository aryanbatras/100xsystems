import { useState } from "react";
import dynamic from 'next/dynamic';
import styles from './Admin.module.css';

// Dynamically import QuillEditor with SSR disabled
const CustomQuillEditor = dynamic(() => import("../editor/CustomQuillEditor"), {
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
        <main className={styles.adminMain}>
          <CustomQuillEditor 
            value={value} 
            onChange={handleChange} 
            title={title}
            onTitleChange={handleTitleChange}
            placeholder="         Tell your story..." 
          />
        </main>
      </div>
    </div>
  );
}
