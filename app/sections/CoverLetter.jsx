"use client";

export default function CoverLetter({
  generatedCoverLetter,
  setGeneratedCoverLetter,
  coverLetterPdfData,
  onCompileToPDF,
  onDownload,
  isCompiling,
}) {
  if (!generatedCoverLetter) return null;

  return (
    <>
      {/* Generated Cover Letter Section */}
      <div className="border-transparent rounded-2xl shadow p-6 mb-6">
        <div className="flex justify-end items-center mb-4 pt-10 pb-2 ">
          <button
            onClick={onCompileToPDF}
            disabled={isCompiling}
            className="px-4 py-2 bg-green-600 
             hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed 
             flex items-center gap-2
             text-gray-900 bg-gradient-to-r from-lime-200
              via-lime-400 to-lime-500 hover:bg-gradient-to-br 
              focus:outline-none active:scale-95 transition-transform shadow-lg shadow-lime-500/50
                dark:shadow-lg dark:shadow-lime-800/80 font-semibold
                rounded-lg text-sm  text-center me-2 mb-2"
          >
            {isCompiling ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Compiling...
              </>
            ) : (
              "Convert to PDF"
            )}
          </button>
        </div>
        <textarea
          value={generatedCoverLetter}
          onChange={(e) => setGeneratedCoverLetter(e.target.value)}
          className="w-full text-white bg-white/15 h-106 p-4 border-2 border-white/60 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          placeholder="Your cover letter will appear here..."
        />
      </div>

      {/* Cover Letter PDF Preview */}
      {coverLetterPdfData && (
        <div className="bg-transparent border-0 rounded-lg shadow p-6 pt-15 mb-6">
          <div className="flex justify-end items-center mb-4 pb-2">
            <button
              onClick={onDownload}
              className="px-4 py-2 bg-blue-600  hover:bg-blue-700 flex items-center gap-2
          text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
          hover:bg-gradient-to-br active:scale-95 transition-transform focus:outline-none 
           shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-semibold
           rounded-lg text-sm text-center"
            >
              <span>⬇️</span>
              Download PDF
            </button>
          </div>
          <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
            <iframe
              src={`data:application/pdf;base64,${coverLetterPdfData}`}
              className="w-full h-[600px]"
              title="Cover Letter Preview"
            />
          </div>
        </div>
      )}
    </>
  );
}
