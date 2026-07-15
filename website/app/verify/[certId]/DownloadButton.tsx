'use client';

export function DownloadButton() {
  return (
    <button
      onClick={() => window.print()}
      className="px-6 py-2.5 bg-gray-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors"
    >
      Download PDF
    </button>
  );
}
