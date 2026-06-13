import { log } from "../../../shared/utils/logger";
import ReactQuill from "react-quill-new";

export const createTableMatchers = () => {
  const Quill = ReactQuill.Quill;
  const Delta = Quill.import('delta');
  const Clipboard = Quill.import('modules/clipboard') as any;

  return [
    ['TABLE', (node: Node, delta: any, scroll: any) => {
      const htmlContent = (node as HTMLElement).innerHTML;
      
      const tempContainer = document.createElement('div');
      const tempEditor = new Quill(tempContainer);
      const tempClipboard = new Clipboard(tempEditor, {});
      
      const convertedDelta = tempClipboard.convert({ html: htmlContent, text: '' });
      
      return new Delta(convertedDelta.ops).concat(new Delta().insert('\n\n'));
    }],
    ['TR', (node: Node, delta: any, scroll: any) => {
      const htmlContent = (node as HTMLElement).innerHTML;
      
      const tempContainer = document.createElement('div');
      const tempEditor = new Quill(tempContainer);
      const tempClipboard = new Clipboard(tempEditor, {});
      
      const convertedDelta = tempClipboard.convert({ html: htmlContent, text: '' });
      
      return new Delta(convertedDelta.ops).concat(new Delta().insert('\n'));
    }],
    ['TD', (node: Node, delta: any, scroll: any) => {
      const htmlContent = (node as HTMLElement).innerHTML;
      
      const tempContainer = document.createElement('div');
      const tempEditor = new Quill(tempContainer);
      const tempClipboard = new Clipboard(tempEditor, {});
      
      const convertedDelta = tempClipboard.convert({ html: htmlContent, text: '' });
      
      return new Delta(convertedDelta.ops).concat(new Delta().insert(' | '));
    }],
    ['TH', (node: Node, delta: any, scroll: any) => {
      const htmlContent = (node as HTMLElement).innerHTML;
      
      const tempContainer = document.createElement('div');
      const tempEditor = new Quill(tempContainer);
      const tempClipboard = new Clipboard(tempEditor, {});
      
      const convertedDelta = tempClipboard.convert({ html: htmlContent, text: '' });
      
      return new Delta(convertedDelta.ops).concat(new Delta().insert(' | '));
    }]
  ];
};

export const setupClipboardHandlers = (editor: any, ReactQuill: any) => {
  editor.root.addEventListener('paste', (e: ClipboardEvent) => {
    if (e.clipboardData?.getData('text/html')) {
      log('� HTML content pasted', 'info');
    }
  });
  
  let lastLength = 0;
  editor.on('text-change', (delta: any, oldDelta: any, source: string) => {
    const currentLength = editor.getText().length;
    if (source === 'user' && currentLength > lastLength + 100) {
      log('� Large content change detected (possible paste)', 'info');
    }
    lastLength = currentLength;
  });

  log('✅ Clipboard handlers setup complete', 'success');
};
