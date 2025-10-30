"use client";
import { useState, useEffect } from "react";
import { createClient } from "../lib/supabase/client";
import CV from "./CV";
import CoverLetter from "./CoverLetter";

export default function Home() {
  const [user1, setUser1] = useState(null);
  const [userdetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [jobDescription, setJobDescription] = useState("");
  const [userCV, setUserCV] = useState("");
  const [cvFile, setCvFile] = useState(null);
  const [error1, setError1] = useState("");
  // Missing Skills State
  const [missingSkills, setMissingSkills] = useState([]);
  const [isAnalyzingSkills, setIsAnalyzingSkills] = useState(false);
  const [cvProgress, setCvProgress] = useState(0);
  const [coverLetterProgress, setCoverLetterProgress] = useState(0);

  // CV States
  const [generatedCV, setGeneratedCV] = useState("");
  const [isGeneratingCV, setIsGeneratingCV] = useState(false);
  const [cvPdfData, setCvPdfData] = useState(null);
  const [isCompilingCV, setIsCompilingCV] = useState(false);

  // Cover Letter States
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState("");
  const [isGeneratingCoverLetter, setIsGeneratingCoverLetter] = useState(false);
  const [coverLetterPdfData, setCoverLetterPdfData] = useState(null);
  const [isCompilingCoverLetter, setIsCompilingCoverLetter] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserDetails(user);
      if (user) {
        await fetchUserDetail(user.id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserDetail = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();
      if (error) {
        console.error("Error fetching profile:", error);
        return;
      }
      setUser1(data);
    } catch (error) {
      console.log(error);
    }
  };

  // NEW: Progress simulation function
  const simulateProgress = (setProgress, duration = 30000) => {
    setProgress(1);
    const interval = 100; // Update every 100ms
    const steps = duration / interval;
    const increment = 98 / steps; // Go from 1% to 99%

    let currentProgress = 1;
    const timer = setInterval(() => {
      currentProgress += increment;
      if (currentProgress >= 99) {
        setProgress(99);
        clearInterval(timer);
      } else {
        setProgress(Math.floor(currentProgress));
      }
    }, interval);

    return timer;
  };

  const simulateProgress2 = (setProgress, duration = 8000) => {
    setProgress(1);
    const interval = 100; // Update every 100ms
    const steps = duration / interval;
    const increment = 98 / steps; // Go from 1% to 99%

    let currentProgress = 1;
    const timer = setInterval(() => {
      currentProgress += increment;
      if (currentProgress >= 99) {
        setProgress(99);
        clearInterval(timer);
      } else {
        setProgress(Math.floor(currentProgress));
      }
    }, interval);

    return timer;
  };
  2;

  // CV Upload Handlers
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setCvFile(file);
      uploadCV(file);
      setError1("");
    } else {
      setError1("Please upload a PDF file");
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setCvFile(file);
      uploadCV(file);
      setError1("");
    } else {
      setError1("Please upload a PDF file");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const uploadCV = async (file) => {
    if (!file) {
      setError1("Please select a CV file first");
      return;
    }

    setError1("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/upload-cv`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setUserCV(data.extracted_text);
    } catch (error) {
      console.error("Error uploading CV:", error);
      setError1("Error uploading CV. Please try again.");
    }
  };

  const analyzeSkills = async () => {
    if (!jobDescription.trim() || !userCV) {
      return; // Silently skip if inputs aren't ready
    }

    setIsAnalyzingSkills(true);
    setMissingSkills([]);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/analyze-skills`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            job_description: jobDescription,
            user_cv: userCV,
          }),
        }
      );

      const data = await response.json();

      if (data.missing_skills && data.missing_skills.length > 0) {
        setMissingSkills(data.missing_skills);
      }
    } catch (error) {
      console.error("Error analyzing skills:", error);
      // Fail silently - don't block CV generation
    } finally {
      setIsAnalyzingSkills(false);
    }
  };

  // Generate CV
  const generateCV = async () => {
    if (!jobDescription.trim()) {
      setError1("Please enter a job description");
      return;
    }

    if (!userCV) {
      setError1("Please upload your CV first");
      return;
    }

    if (!user1 || user1.credits_remaining <= 0) {
      setError1("You don't have enough credits to generate a CV");
      return;
    }

    setError1("");
    setIsGeneratingCV(true);
    const progressTimer = simulateProgress(setCvProgress);

    await analyzeSkills();

    setCvPdfData(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/generate-cv`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            job_description: jobDescription,
            user_cv: userCV,
          }),
        }
      );

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error("Non-JSON response from /generate-cv:", text);
        setError1(
          "Unexpected response from server. Check browser console for details."
        );
        return;
      }

      if (data && data.error) {
        console.warn("Server returned an error object:", data);
        const missing = data.missing_fields
          ? ` Missing: ${data.missing_fields.join(", ")}`
          : "";
        setError1(`Could not generate CV: ${data.error}.${missing}`);
        setGeneratedCV("");
        return;
      }

      if (data && data.cv) {
        setError1("");

        setGeneratedCV(data.cv);
        console.log(data.cv);
        clearInterval(progressTimer);
        setCvProgress(100);
        await compileCVToPDF(data.cv);
        await supabase
          .from("profiles")
          .update({ credits_remaining: user1.credits_remaining - 1 })
          .eq("id", user1.id);
      } else {
        console.error("Unexpected JSON shape from /generate-cv:", data);
        setError1(
          "Server returned unexpected data. Check console for details."
        );
        setGeneratedCV("");
        clearInterval(progressTimer);
        setCvProgress(0);
      }
    } catch (error) {
      console.error("Error generating CV:", error);
      alert("Error generating CV. Please try again.");
    } finally {
      setIsGeneratingCV(false);
      clearInterval(progressTimer);
      setCvProgress(0);
    }
  };

  const deleteCV = () => {
    setCvFile(null);
    setUserCV("");
    setError1("");
  };

  const compileCVToPDF = async (latexCode) => {
    if (!latexCode) {
      alert("No CV content to compile");
      return;
    }

    setIsCompilingCV(true);
    setError1("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/compile-latex`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            latex_code: latexCode,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setCvPdfData(data.pdf);
      } else {
        setError1("Error compiling PDF: " + data.detail);
      }
    } catch (error) {
      console.error("Error compiling PDF:", error);
      setError1("Error compiling PDF. Please try again.");
    } finally {
      setIsCompilingCV(false);
    }
  };

  const downloadCVPDF = () => {
    if (!cvPdfData) return;

    setError1("");

    const byteCharacters = atob(cvPdfData);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "tailored-cv.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  // Generate Cover Letter
  const generateCoverLetter = async () => {
    if (!jobDescription.trim()) {
      setError1("Please enter a job description");
      return;
    }

    if (!userCV) {
      setError1("Please upload your CV first");
      return;
    }

    if (!user1 || user1.credits_remaining <= 0) {
      setError1("You don't have enough credits to generate a CV");
      return;
    }
    setError1("");

    setIsGeneratingCoverLetter(true);
    const progressTimer = simulateProgress2(setCoverLetterProgress);

    setCoverLetterPdfData(null); // Clear previous PDF

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/generate-cover-letter`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            job_description: jobDescription,
            user_cv: userCV,
          }),
        }
      );

      const data = await response.json();

      if (data && data.cover_letter) {
        setError1("");

        setGeneratedCoverLetter(data.cover_letter);
        clearInterval(progressTimer);
        setCoverLetterProgress(100);
        await supabase
          .from("profiles")
          .update({ credits_remaining: user1.credits_remaining - 1 })
          .eq("id", user1.id);
      } else {
        setError1("Error generating cover letter");
      }
    } catch (error) {
      console.error("Error generating cover letter:", error);
      setError1("Error generating cover letter. Please try again.");
    } finally {
      setIsGeneratingCoverLetter(false);
    }
  };

  const compileCoverLetterToPDF = async () => {
    if (!generatedCoverLetter) {
      setError1("Please generate a cover letter first");
      return;
    }

    setIsCompilingCoverLetter(true);
    setError1("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/generate-cover-letter-pdf`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cover_letter: generatedCoverLetter,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setError1("");

        setCoverLetterPdfData(data.pdf);
      } else {
        setError1("Error creating PDF: " + (data.error || data.detail));
      }
    } catch (error) {
      console.error("Error creating cover letter PDF:", error);
      setError1("Error creating PDF. Please try again.");
    } finally {
      setIsCompilingCoverLetter(false);
    }
  };

  const downloadCoverLetterPDF = () => {
    if (!coverLetterPdfData) return;

    setError1("");

    const byteCharacters = atob(coverLetterPdfData);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "cover-letter.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <section id="cv">
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}

          <div>
            {error1 ? (
              <div className="py-5">
                <div className="flex justify-center">
                  <div className="border-0 py-4 lg:py-4 text-md px-25 lg:px-20 rounded-xl text-center bg-red-500/20 text-red-400">
                    {error1}
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-12"></div>
            )}
          </div>
          <div className="pt-2">
            <div className="bg-gray-200 border-0 border-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl text-black font-semibold mb-4">
                Upload Your CV
              </h2>
              <div
                onDrop={handleFileDrop}
                onDragOver={handleDragOver}
                className="border-2 border-dashed border-gray-500 rounded-lg p-8 text-center hover:border-blue-500 transition-colors"
              >
                {cvFile ? (
                  <div className="flex flex-col items-center relative">
                    {/* X button to delete CV */}
                    <button
                      onClick={deleteCV}
                      className="absolute top-0 right-0 text-gray-800 hover:text-red-500 rounded-full p-1 transition-colors"
                      aria-label="Delete CV"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>

                    <svg
                      className="w-16 h-16 text-green-500 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-black font-medium">{cvFile.name}</p>
                    <p className="text-black text-sm mt-2">
                      CV uploaded successfully
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-black mb-2">
                      Drag and drop your CV (PDF) here
                    </p>
                    <p className="text-gray-800 text-sm mb-4">or</p>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="cv-upload"
                    />
                    <label
                      htmlFor="cv-upload"
                      className="inline-block px-4 py-2 border-gray-500 border text-black rounded-md hover:bg-gray-100 cursor-pointer"
                    >
                      Browse Files
                    </label>
                  </>
                )}
              </div>
            </div>

            {/* Job Description Section */}
            <div className="bg-gray-200 rounded-lg shadow p-6 mb-6">
              <label className="block text-lg text-black font-semibold mb-2">
                Job Description
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                className="w-full text-black h-60 p-3 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Generate Buttons */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={generateCV}
                disabled={isGeneratingCV || isCompilingCV}
                className="flex-1 px-6 py-3 bg-blue-600  hover:bg-blue-700 disabled:bg-gray-400 
            disabled:cursor-not-allowed flex items-center justify-center gap-2
            text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br
              focus:outline-none shadow-lg
             shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 text-md rounded-lg 
               text-center me-2 mb-2 font-semibold active:scale-95 transition-transform"
              >
                {isGeneratingCV ? (
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
                    Generating CV...
                  </>
                ) : isCompilingCV ? (
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
                    Compiling PDF...
                  </>
                ) : (
                  "Generate CV"
                )}
              </button>

              <button
                onClick={generateCoverLetter}
                disabled={isGeneratingCoverLetter}
                className="flex-1 px-6 py-3 bg-purple-600  hover:bg-purple-700
             disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2
             text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 
             hover:bg-gradient-to-br focus:outline-none shadow-lg shadow-purple-500/50 dark:shadow-lg
               dark:shadow-purple-800/80 font-semibold rounded-lg text-md text-center me-2 mb-2
               active:scale-95 transition-transform"
              >
                {isGeneratingCoverLetter ? (
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
                    Generating...
                  </>
                ) : (
                  "Generate Cover Letter"
                )}
              </button>
            </div>

            {/* NEW: Progress Bar for CV Generation */}
            {isGeneratingCV && cvProgress > 0 && (
              <div className="mb-6">
                <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 h-full transition-all duration-300 ease-out"
                    style={{ width: `${cvProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2 text-center">
                  Generating your tailored CV... {cvProgress}%
                </p>
              </div>
            )}

            {/* NEW: Progress Bar for Cover Letter Generation */}
            {isGeneratingCoverLetter && coverLetterProgress > 0 && (
              <div className="mb-6">
                <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 h-full transition-all duration-300 ease-out"
                    style={{ width: `${coverLetterProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2 text-center">
                  Generating your cover letter... {coverLetterProgress}%
                </p>
              </div>
            )}

            {/* Missing Skills Warning */}
            {missingSkills.length > 0 && (
              <div className="bg-yellow-50 border-l-4 py-4 px-4 mt-20 rounded-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-yellow-800">
                      Missing Skills Detected
                    </p>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p className="mb-2">
                        The following skills from the job description were not
                        found in your CV:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {missingSkills.map((skill, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-400 text-white"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <p className="mt-3 text-xs italic">
                        💡 Consider highlighting relevant experience with these
                        skills if applicable.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CV Component - Only shows PDF preview */}
            <CV pdfData={cvPdfData} onDownload={downloadCVPDF} />

            {/* Cover Letter Component - Only shows generated letter and PDF */}
            <CoverLetter
              generatedCoverLetter={generatedCoverLetter}
              setGeneratedCoverLetter={setGeneratedCoverLetter}
              coverLetterPdfData={coverLetterPdfData}
              onCompileToPDF={compileCoverLetterToPDF}
              onDownload={downloadCoverLetterPDF}
              isCompiling={isCompilingCoverLetter}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
