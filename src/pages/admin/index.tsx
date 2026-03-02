import { useState } from "react";
import dynamic from 'next/dynamic';
import styles from './Admin.module.css';

// Dynamically import QuillEditor with SSR disabled
const QuillEditor = dynamic(() => import("../../components/editor/QuillEditor"), {
  ssr: false,
  loading: () => <div>Loading editor...</div>
});

export default function Admin() {
    const [value, setValue] = useState('');
    const [title, setTitle] = useState('');
    
    const handleChange = (newValue: string) => {
        setValue(newValue);
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
                        placeholder="Write your article here..." 
                    />
                </main>
            </div>
        </div>
    );
}