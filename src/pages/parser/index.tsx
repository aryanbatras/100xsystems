import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { HtmlToDeltaConverter } from '../../core/infrastructure/HtmlToDeltaConverter';
import styles from './Parser.module.css';
import { ProtectedRoute } from '../../components/auth/ProtectedRoute';

const CustomQuillEditor = dynamic(() => import("../../components/editor/CustomQuillEditor"), {
  ssr: false,
  loading: () => <div className={styles.loading}>Loading editor...</div>
});

export default function ParserPage() {
  const [htmlInput, setHtmlInput] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [extractedContent, setExtractedContent] = useState('');
  const [editorDelta, setEditorDelta] = useState<any>(null);
  const [metadata, setMetadata] = useState<any>(null);
  const [conversionLog, setConversionLog] = useState<string[]>([]);
  const [hasProcessedSessionStorage, setHasProcessedSessionStorage] = useState(false);

  // Check for HTML content from sessionStorage on component mount
  useEffect(() => {
    console.log('🔍 === PARSER SESSION STORAGE DEBUG START ===');
    
    // Only process sessionStorage once
    if (hasProcessedSessionStorage) {
      console.log('⚠️ SessionStorage already processed, skipping...');
      console.log('🔍 === PARSER SESSION STORAGE DEBUG END ===');
      return;
    }
    
    const storedHtml = sessionStorage.getItem('parserHtml');
    console.log('📊 sessionStorage.getItem result:', !!storedHtml);
    console.log('📏 Stored HTML length:', storedHtml?.length || 0);
    
    if (storedHtml) {
      console.log('📝 First 300 chars of stored HTML:', storedHtml.substring(0, 300));
      console.log('📝 Last 300 chars of stored HTML:', storedHtml.substring(storedHtml.length - 300));
      
      setHtmlInput(storedHtml);
      console.log('✅ HTML set in state');
      
      // Mark as processed BEFORE clearing
      setHasProcessedSessionStorage(true);
      
      // Clear the stored HTML so it doesn't persist on refresh
      sessionStorage.removeItem('parserHtml');
      console.log('🗑️ sessionStorage cleared');
      
      // Automatically trigger the edit process
      console.log('⏰ Scheduling automatic edit trigger...');
      setTimeout(() => {
        console.log('🔄 Triggering handleEditClick with stored HTML...');
        handleEditClick(storedHtml); // Pass the HTML directly to avoid state issues
      }, 100);
    } else {
      console.log('⚠️ No HTML found in sessionStorage');
      setHasProcessedSessionStorage(true);
    }
    
    console.log('🔍 === PARSER SESSION STORAGE DEBUG END ===');
  }, [hasProcessedSessionStorage]);

  const addLog = (message: string) => {
    setConversionLog(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const handleEditClick = (event?: React.MouseEvent<HTMLButtonElement> | string) => {
    // If the first parameter is a string (from sessionStorage), use it directly
    // If it's an event (from button click), use the htmlInput state
    const contentToProcess = typeof event === 'string' ? event : htmlInput;
    
    console.log('🔄 === HANDLE EDIT CLICK DEBUG START ===');
    console.log('📏 htmlInput state length:', htmlInput.length);
    console.log('📏 event type:', typeof event);
    console.log('📏 contentToProcess length:', contentToProcess.length);
    console.log('📝 First 200 chars of contentToProcess:', contentToProcess.substring(0, 200));
    
    addLog('Starting HTML to Quill conversion...');
    
    try {
      const parsed = HtmlToDeltaConverter.parseHtml(contentToProcess);
      const delta = HtmlToDeltaConverter.convertToDelta(contentToProcess);
      
      setMetadata(parsed.metadata);
      setExtractedContent(parsed.content);
      
      if (parsed.metadata) {
        addLog(`✅ Metadata extracted: ${parsed.metadata.title}`);
        addLog(`📅 Date: ${parsed.metadata.date}`);
        addLog(`🖼️ Images found: ${parsed.metadata.images?.length || 0}`);
      } else {
        addLog('⚠️ No metadata found in HTML');
      }
      
      addLog(`📝 Content length: ${parsed.content.length} characters`);
      addLog(`🔄 Delta operations: ${delta.ops?.length || 0}`);
      addLog('✅ Ready to load into Quill editor');
      
      // Use extracted HTML content directly for editor
      setEditorDelta(parsed.content);
      setShowEditor(true);
      
      console.log('🔄 === HANDLE EDIT CLICK DEBUG END ===');
    } catch (error) {
      console.log('❌ Error during conversion:', error);
      addLog(`❌ Error during conversion: ${error}`);
    }
  };

  const handleContentChange = (content: string) => {
    addLog(`📝 Editor content updated (${content.length} characters)`);
    // Update the editor delta state to allow editing
    setEditorDelta(content);
  };

  const handleTitleChange = (title: string) => {
    addLog(`📝 Title updated: "${title}"`);
  };

  return (
    <ProtectedRoute requireAdmin={true}>
      <div className={styles.parserContainer}>
        <div className={styles.parserWrapper}>
          <header className={styles.parserHeader}>
            <h1>HTML to Quill Parser</h1>
            <p>Paste published HTML to convert it back to Quill editor format</p>
          </header>

          <main className={styles.parserMain}>
            {!showEditor ? (
              <div className={styles.inputSection}>
                <div className={styles.inputHeader}>
                  <h2>HTML Input</h2>
                  <button 
                    onClick={handleEditClick}
                    disabled={!htmlInput.trim()}
                    className={styles.editButton}
                  >
                    Edit
                  </button>
                </div>
                <textarea
                  value={htmlInput}
                  onChange={(e) => setHtmlInput(e.target.value)}
                  placeholder="Paste your published HTML here..."
                  className={styles.htmlTextarea}
                  rows={20}
                />
              </div>
            ) : (
              <div className={styles.editorSection}>
                <div className={styles.metadataPanel}>
                  <h3>Extracted Information</h3>
                  {metadata && (
                    <div className={styles.metadataInfo}>
                      <p><strong>Title:</strong> {metadata.title}</p>
                      <p><strong>Slug:</strong> {metadata.slug}</p>
                      <p><strong>Date:</strong> {metadata.date}</p>
                      <p><strong>Images:</strong> {metadata.images?.length || 0}</p>
                      {metadata.images && metadata.images.length > 0 && (
                        <div className={styles.imageList}>
                          <strong>Image URLs:</strong>
                          <ul>
                            {metadata.images.map((url: string, index: number) => (
                              <li key={index}><a href={url} target="_blank" rel="noopener noreferrer">{url}</a></li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className={styles.editorContainer}>
                  <CustomQuillEditor 
                    value={editorDelta || ''}
                    onChange={handleContentChange}
                    title={metadata?.title || ''}
                    onTitleChange={metadata ? () => {} : handleTitleChange}
                    placeholder="Content loaded from HTML..."
                    mode="parser"
                    titleReadOnly={!!metadata}
                  />
                </div>
              </div>
            )}

            {conversionLog.length > 0 && (
              <div className={styles.logPanel}>
                <h3>Conversion Log</h3>
                <div className={styles.logContent}>
                  {conversionLog.map((log, index) => (
                    <div key={index} className={styles.logEntry}>{log}</div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
