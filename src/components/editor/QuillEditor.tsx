import { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import styles from "./QuillEditor.module.css";
import { useImageQueue } from "../../hooks/useImageQueue";
import { usePublishing, PublishingState } from "../../hooks/usePublishing";

export interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  title?: string;
  onTitleChange?: (title: string) => void;
}

export default function QuillEditor({value,onChange,placeholder,title,onTitleChange,}: QuillEditorProps) {
  
  const [mounted, setMounted] = useState(false);
  const [articleTitle, setArticleTitle] = useState(title || "");

  const { imageQueue, quillRef } = useImageQueue(mounted);
  const { publishingState, handlePublish } = usePublishing(articleTitle);

  useEffect(() => setMounted(true), []);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      ["link", "image"],
      ["clean"],
    ],
  };

  if (!mounted) {
    return <div className={styles.quillEditorLoading}>Loading editor...</div>;
  }

  return (
    <div className={`${styles.quillEditor} quillEditor`}>
      <input
        type="text"
        value={articleTitle}
        onChange={(e) => {
          setArticleTitle(e.target.value);
          onTitleChange?.(e.target.value);
        }}
        placeholder="Title"
        className={styles.titleInput}
      />

      <div className={styles.editorHeader}>
        <button
          onClick={() => handlePublish(quillRef)}
          disabled={publishingState !== "draft"}
          className={`${styles.publishButton} ${styles[publishingState]}`}
        >
          {publishingState === "draft" && "Publish"}
          {publishingState === "uploading" && "Publishing..."}
          {publishingState === "success" && "Published"}
          {publishingState === "failed" && "Failed - Retry"}
        </button>
      </div>

      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Tell your story..."}
        modules={modules}
        style={{ minHeight: "400px" }}
      />
    </div>
  );
}
