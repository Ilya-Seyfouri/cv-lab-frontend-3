"use client";

export default function CV({ pdfData, onDownload }) {
  if (!pdfData) return null;

  return (
    <div className="bg-transparent rounded-lg shadow">
      <div className="flex justify-end items-center ">
        
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
