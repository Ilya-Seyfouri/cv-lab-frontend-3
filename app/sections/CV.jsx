"use client";

export default function CV({ pdfData, onDownload }) {
  if (!pdfData) return null;

  return (
    <div className="bg-transparent rounded-lg shadow p-6 pt-25 mb-6">
      <div className="flex justify-end items-center mb-4 pb-2">
        <button
          onClick={onDownload}
          className="px-4 py-2 bg-blue-600  hover:bg-blue-700 flex items-center gap-2
          text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
          hover:bg-gradient-to-br focus:outline-none
           shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-semibold
           rounded-lg text-sm text-center active:scale-95 transition-transform "
        >
          <span>⬇️</span>
          Download PDF
        </button>
      </div>
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <iframe
          src={`data:application/pdf;base64,${pdfData}`}
          className="w-full h-[600px]"
          title="CV Preview"
        />
      </div>
    </div>
  );
}
