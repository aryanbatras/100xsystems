/**
 * ## Presentation: HTML to Quill Parser
 *
 * Parses published HTML back into Quill editor format.
 * Handles session storage for cross-page data transfer,
 * metadata extraction, and conversion logging.
 *
 * @packageDocumentation
 */

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { HtmlToDeltaConverter } from '../../infrastructure/converters/htmlToDeltaConverter';
import styles from '../../presentation/_styles/pages/parser.module.css';

const CustomQuillEditor = dynamic(() => import("../../presentation/editor/CustomQuillEditor"), {
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

  useEffect(() => {
    if (hasProcessedSessionStorage) return;

    const storedHtml = sessionStorage.getItem('parserHtml');

    if (storedHtml) {
      setHtmlInput(storedHtml);
      setHasProcessedSessionStorage(true);
      sessionStorage.removeItem('parserHtml');

      setTimeout(() => {
        handleEditClick(storedHtml);
      }, 100);
    } else {
      setHasProcessedSessionStorage(true);
    }
  }, [hasProcessedSessionStorage]);

  const addLog = (message: string) => {
    setConversionLog(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const handleEditClick = (event?: React.MouseEvent<HTMLButtonElement> | string) => {
    const contentToProcess = typeof event === 'string' ? event : htmlInput;

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

      setEditorDelta(parsed.content);
      setShowEditor(true);
    } catch (error) {
      addLog(`❌ Error during conversion: ${error}`);
    }
  };

  const handleContentChange = (content: string) => {
    addLog(`📝 Editor content updated (${content.length} characters)`);
    setEditorDelta(content);
  };

  const handleTitleChange = (title: string) => {
    addLog(`📝 Title updated: "${title}"`);
  };

  return (
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
  );
}
