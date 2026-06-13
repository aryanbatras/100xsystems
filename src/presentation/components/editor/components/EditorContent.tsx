import { useEffect, useRef } from "react";
import ReactQuill from "react-quill-new";
import { log } from "../../../../infrastructure/utils/logger";
import { setupClipboardHandlers } from "../modules/clipboardHandlers";

interface EditorContentProps {
  value: string;
  onChange: (content: string, delta: any, source: string, editor: any) => void;
  modules: any;
  placeholder?: string;
  mounted: boolean;
  onWheel: (e: React.WheelEvent<HTMLDivElement>) => void;
  isContainerMode: boolean;
  styles: any;
  onQuillRefReady: (ref: ReactQuill) => void;
}

export default function EditorContent({
  value,
  onChange,
  modules,
  placeholder,
  mounted,
  onWheel,
  isContainerMode,
  styles,
  onQuillRefReady,
}: EditorContentProps) {
  const quillRef = useRef<ReactQuill>(null);

  // Pass the ref to parent when ready
  useEffect(() => {
    if (quillRef.current) {
      onQuillRefReady(quillRef.current);
    }
  }, [mounted, onQuillRefReady]);

  // Enhanced clipboard handlers for ReactQuill
  useEffect(() => {
    if (!mounted || !quillRef.current) return;

    const editor = quillRef.current.getEditor();
    setupClipboardHandlers(editor, ReactQuill);
  }, [mounted]);

  return (
    <div 
      className={`${styles.editorContainer} ${isContainerMode ? styles.containerMode : styles.fullPageMode}`}
      onWheel={onWheel}
    >
      <ReactQuill
        ref={quillRef}
        theme="bubble"
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder={placeholder || " "}
        style={{ minHeight: "500px" }}
      />
    </div>
  );
}
