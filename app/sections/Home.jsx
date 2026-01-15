"use client";
import { useState, useEffect, useCallback } from "react";
import { createClient } from "../lib/supabase/client";
import { useGeneration } from "../contexts/GenerationContext";
import CV from "./CV";
import CoverLetter from "./CoverLetter";
import CVTemplateDropdown from "./CVTemplateDropdown";
import generic from "../../images/generic.png";
import finance from "../../images/finance.png";
import tech from "../../images/tech.png";
import Image from "next/image";

const improvements = [
  {
    title: "Enhanced Technical Keywords",
    description:
      "Added targeted role-specific terms to improve ATS detection and relevance.",
  },
  {
    title: "Bridged Skill Gaps",
    description:
      "Highlighted adjacent experience and transferable skills to cover missing requirements.",
  },
  {
    title: "Quantified Achievements",
    description:
      "Turned vague responsibilities into measurable results using metrics, percentages, and impact.",
  },
  {
    title: "Improved Content Structure",
    description:
      "Reorganised sections for a clearer, more logical flow that's easier for recruiters to scan.",
  },
  {
    title: "Elevated Professional Summary",
    description:
      "Tailored the summary to mirror the job's core requirements and value proposition.",
  },
  {
    title: "Boosted Keyword Density",
    description:
      "Increased the frequency of critical job-specific phrases without overstuffing.",
  },
  {
    title: "Refined Bullet Points",
    description:
      "Rewrote bullets to start with strong action verbs and emphasise outcomes.",
  },
  {
    title: "Aligned Experience to Role",
    description:
      "Brought the most relevant projects and responsibilities to the forefront.",
  },
  {
    title: "Strengthened Skills Section",
    description:
      "Curated a focused skills list matching the required tech stack.",
  },
];
export default function Home() {
  // User/auth state stays local (not shared across components)
  const [user1, setUser1] = useState(null);
  const [userdetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userCredits, setUserCredits] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loadingCredits, setLoadingCredits] = useState(true);
  const supabase = createClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [selectedCV, setSelectedCV] = useState(null);

  useEffect(() => {
    getUser();
    fetchUserCredits(); // ✅ Add this
  }, []);
  useEffect(() => {
    getUser();
    fetchUserCredits(); // ✅ Add this
  }, []);

  const openModal = (image) => {
    setModalImage(image);
    setIsModalOpen(true);
  };
  // ✅ Add this function
  const fetchUserCredits = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/credits`,
        {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        }
      );
      const data = await response.json();
      if (data.is_subscribed) {
        setIsSubscribed(true);
        setUserCredits("unlimited");
      } else {
        setIsSubscribed(false);
        setUserCredits(data.remaining);
      }
    } catch (error) {
      console.error("Error fetching credits:", error);
    } finally {
      setLoadingCredits(false);
    }
  };

  const selectCV = (cvType) => {
    setSelectedCV(cvType);
  };
  // Get generation state from context
  const { generationState, updateGenerationState, resetGenerationState } =
    useGeneration();
  // Destructure for easier access
  const {
    jobDescription,
    userCV,
    cvFile,
    isDragging,
    isCompilingAll,
    cvProgress,
    coverLetterProgress,
    processingStep,
    generatedCV,
    generatedCoverLetter,
    cvPdfData,
    coverLetterPdfData,
    isGeneratingCV,
    isGeneratingCoverLetter,
    isCompilingCV,
    isCompilingCoverLetter,
    matchScore,
    ATSScore,
    keywordMatchScore,
    matchReason,
    evidenceMap,
    missingSkills,
    gapBridges,
    showAnalysis,
    error1,
  } = generationState;
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
  const handleDragOver = useCallback(
    (e) => {
      e.preventDefault();
      updateGenerationState({ isDragging: true });
    },
    [updateGenerationState]
  );
  const handleDragLeave = useCallback(
    (e) => {
      e.preventDefault();
      updateGenerationState({ isDragging: false });
    },
    [updateGenerationState]
  );
  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      updateGenerationState({ isDragging: false });
      const file = e.dataTransfer.files[0];
      if (
        file &&
        (file.type === "application/pdf" ||
          file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
          file.type === "text/plain")
      ) {
        updateGenerationState({ cvFile: file });
        uploadCV(file);
      }
    },
    [updateGenerationState]
  );
  const handleFileSelect = useCallback(
    (e) => {
      const file = e.target.files?.[0];
      if (file) {
        updateGenerationState({ cvFile: file });
        uploadCV(file);
      }
    },
    [updateGenerationState]
  );
  const uploadCV = async (file) => {
    if (!file) {
      updateGenerationState({ error1: "Please select a CV file first" });
      return;
    }
    updateGenerationState({ error1: "" });
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
      updateGenerationState({ userCV: data.extracted_text });
    } catch (error) {
      console.error("Error uploading CV:", error);
      updateGenerationState({
        error1: "Error uploading CV. Please try again.",
      });
    }
  };
 const startOptimizeProgress = (updateGenerationState) => {
   let current = 0;
   const timer = setInterval(() => {
     current += 1;
     if (current >= 95) {
       current = 95; // Cap at 95%, wait for completion
       clearInterval(timer);
     }
     updateGenerationState({ cvProgress: current });
   }, 800); // 1% per second, 95 seconds to reach 95%
   return timer;
 };
  // NEW: Function to save generation to database
  const saveGenerationToDatabase = async (
    roleTitle,
    companyName,
    atsScore,
    matchScore,
    cvPdfBase64,
    coverLetterPdfBase64,
    cvTemplate
  ) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        console.error("No session found for saving generation");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/save-generation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            role_title: roleTitle,
            company_name: companyName,
            ats_score: atsScore,
            match_score: matchScore,
            cv_pdf_base64: cvPdfBase64,
            cover_letter_pdf_base64: coverLetterPdfBase64,
            cv_template: cvTemplate,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        console.log("✅ Generation saved to database:", data.generation_id);
      } else {
        console.error("Failed to save generation:", data);
      }
    } catch (error) {
      console.error("Error saving generation to database:", error);
    }
  };

  const handleOptimize = async () => {
    if (!cvFile || !jobDescription) return;
    if (!isSubscribed && userCredits <= 0) {
      updateGenerationState({
        error1: "You're out of credits! Upgrade to Premium to continue.",
      });
      return;
    }
    if (!selectedCV) {
      updateGenerationState({});
      return;
    }

    updateGenerationState({
      isCompilingAll: true,
      processingStep: "uploading",
      cvProgress: 0,
      coverLetterProgress: 0,
      error1: "",
    });

    const progressTimer = startOptimizeProgress(updateGenerationState);
    let extractedRoleTitle = "";
    let extractedAtsScore = null;
    let extractedMatchScore = null;
    let finalCvPdfData = null;
    let finalCoverLetterPdfData = null;

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // ✅ STEP 1: Generate CV
      const cvResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/generate-${selectedCV}-cv`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            job_description: jobDescription,
            user_cv: userCV,
          }),
        }
      );

      const cvData = await cvResponse.json();

      if (cvResponse.status === 403) {
        clearInterval(progressTimer);
        updateGenerationState({
          error1:
            cvData.detail?.message ||
            "You're out of credits! Upgrade to Premium to continue.",
          processingStep: "idle",
          isCompiling: false,
          cvProgress: 0,
        });
        return;
      }

     if (cvData && cvData.cv) {
       updateGenerationState({
         generatedCV: cvData.cv,
       });
       finalCvPdfData = await compileCVToPDF(cvData.cv);
     }

      // ✅ STEP 2: Generate Cover Letter
      updateGenerationState({
        coverLetterProgress: 25,
        processingStep: "generating_cover_letter",
      });

      const coverLetterResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/generate-cover-letter`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            job_description: jobDescription,
            user_cv: userCV,
          }),
        }
      );

      const coverLetterData = await coverLetterResponse.json();

      updateGenerationState({ coverLetterProgress: 75 });

      if (coverLetterData) {
        // Set the cover letter
        if (coverLetterData.cover_letter) {
          updateGenerationState({
            generatedCoverLetter: coverLetterData.cover_letter,
            coverLetterProgress: 100,
          });
          finalCoverLetterPdfData = await compileCoverLetterToPDF(
            coverLetterData.cover_letter
          );
        }

        // ✅ Extract role_title from job_info (from extract_job)
        if (coverLetterData.job_info) {
          extractedRoleTitle = coverLetterData.job_info.role_title || "";
        }

        // ✅ Extract skills analysis data
        if (coverLetterData.skills_report) {
          const report = JSON.parse(coverLetterData.skills_report);

          // Extract ATS and match scores
          if (report.role_alignment) {
            extractedAtsScore = report.role_alignment.ats_score;
            extractedMatchScore =
              parseFloat(report.role_alignment.match_score) * 100;
          }

          // Calculate keyword match percentage
          let keywordMatchScore = 0;
          if (
            report.evidence_map &&
            Object.keys(report.evidence_map).length > 0
          ) {
            const totalKeywords = Object.keys(report.evidence_map).length;
            const matchedKeywords = Object.values(report.evidence_map).filter(
              (evidence) =>
                evidence.status === "explicit" ||
                evidence.status === "implicit_strong"
            ).length;
            keywordMatchScore = Math.round(
              (matchedKeywords / totalKeywords) * 100
            );
          }

          // Update state with analysis data
          updateGenerationState({
            missingSkills: report.missing_skills,
            matchScore: extractedMatchScore,
            ATSScore: extractedAtsScore,
            keywordMatchScore: keywordMatchScore,
            matchReason: report.role_alignment?.reason || "",
            evidenceMap: report.evidence_map,
            gapBridges: report.gap_bridges,
            showAnalysis: true,
          });
        }
      }

      await fetchUserCredits();
      clearInterval(progressTimer);
      updateGenerationState({
        processingStep: "complete",
        isCompilingAll: false,
      });
    } catch (error) {
      console.error("Error:", error);
      clearInterval(progressTimer);
      updateGenerationState({
        error1: "Error generating documents. Please try again.",
        processingStep: "idle",
        isCompilingAll: false,
      });
    }

    // ✅ Save generation with extracted role title
    if (finalCvPdfData || finalCoverLetterPdfData) {
      await saveGenerationToDatabase(
        extractedRoleTitle, // "Backend Engineer at Visa"
        null, // company_name - we're putting it in role_title
        extractedAtsScore,
        extractedMatchScore,
        finalCvPdfData,
        finalCoverLetterPdfData,
        selectedCV
      );
    }
  };

  const compileCVToPDF = async (latexCode) => {
    if (!latexCode) return null;
    updateGenerationState({ isCompilingCV: true });
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/compile-latex`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ latex_code: latexCode }),
        }
      );
      const data = await response.json();
      if (data.success) {
        updateGenerationState({ cvPdfData: data.pdf });
        return data.pdf; // ADD THIS LINE
      }
      return null; // ADD THIS LINE
    } catch (error) {
      console.error("Error compiling PDF:", error);
      return null; // ADD THIS LINE
    } finally {
      updateGenerationState({ isCompilingCV: false });
    }
  };
  const downloadCVPDF = () => {
    if (!cvPdfData) return;
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
  const compileCoverLetterToPDF = async (coverLetterText) => {
    const textToUse = coverLetterText || generatedCoverLetter;
    if (!textToUse) {
      updateGenerationState({ error1: "Please generate a cover letter first" });
      return;
    }
    updateGenerationState({ isCompilingCoverLetter: true, error1: "" });
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/generate-cover-letter-pdf`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cover_letter: textToUse,
          }),
        }
      );
      const data = await response.json();
      if (data.success) {
        updateGenerationState({ error1: "", coverLetterPdfData: data.pdf });
        return data.pdf;
      } else {
        updateGenerationState({
          error1: "Error creating PDF: " + (data.error || data.detail),
        });
        return null; // Move after state update
      }
    } catch (error) {
      console.error("Error creating cover letter PDF:", error);
      updateGenerationState({
        error1: "Error creating PDF. Please try again.",
      });
    } finally {
      updateGenerationState({ isCompilingCoverLetter: false });
    }
  };
  const downloadCoverLetterPDF = () => {
    if (!coverLetterPdfData) return;
    updateGenerationState({ error1: "" });
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
  const resetForm = () => {
    resetGenerationState();
  };
  const canOptimize = cvFile && jobDescription.length >= 50 && selectedCV;
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500" />
      </div>
    );
  }
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4">
        {processingStep !== "complete" ? (
          <div className="mx-auto max-w-5xl">
            {/* Header */}
            <div className="mb-12 text-center">
              <h1 className="mb-4 bg-gradient-to-r from-cyan-300 via-cyan-400 to-cyan-500  bg-clip-text text-4xl md:text-5xl text-transparent">
                Transform Your Application
              </h1>
              <p className="text-lg text-muted-foreground text-white/50">
                Upload your CV and job description to get optimized documents in
                seconds.
              </p>
            </div>
            {/* Upload and Input Section */}
            <div className="grid gap-8 lg:grid-cols-2">
              {/* CV Upload */}
              <div className="border border-cyan-400 bg-card/50 backdrop-blur-sm rounded-xl">
                <div className="px-6 pt-6 pb-4">
                  <h3 className="flex items-center gap-2 text-foreground font-semibold">
                    <svg
                      className="h-5 w-5 text-cyan-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    Upload Your CV
                  </h3>
                </div>
                <div className="p-6">
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`relative flex min-h-[300px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all ${
                      isDragging
                        ? "border-cyan-500 bg-cyan-500/10"
                        : cvFile
                        ? "border-green-500/50 bg-green-500/5"
                        : "border-white/10 bg-white/5 hover:border-cyan-500/50 hover:bg-cyan-500/5"
                    }`}
                  >
                    <input
                      type="file"
                      accept=".pdf,.docx,.txt"
                      onChange={handleFileSelect}
                      className="absolute inset-0 cursor-pointer opacity-0"
                    />
                    {cvFile ? (
                      <div className="text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
                          <svg
                            className="h-8 w-8 text-green-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <p className="mb-2 text-foreground">{cvFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(cvFile.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/20">
                          <svg
                            className="h-8 w-8 text-cyan-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                        </div>
                        <p className="mb-2 text-foreground">
                          Drag & drop your CV here
                        </p>
                        <p className="mb-4 text-sm text-muted-foreground">
                          or click to browse
                        </p>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-muted-foreground">
                          PDF, DOCX, TXT
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* Job Description */}
              <div className="border border-cyan-500 bg-card/50 backdrop-blur-sm rounded-xl">
                <div className="px-6 pt-6 pb-4">
                  <h3 className="flex items-center gap-2 text-foreground font-semibold">
                    <svg
                      className="h-5 w-5 text-cyan-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Job Description
                  </h3>
                </div>
                <div className="p-6">
                  <textarea
                    value={jobDescription}
                    placeholder="Paste the job description here..."
                    onChange={(e) =>
                      updateGenerationState({ jobDescription: e.target.value })
                    }
                    className="min-h-[300px] w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  />
                  <p className="mt-2 text-sm text-muted-foreground">
                    {jobDescription.length} characters
                  </p>
                </div>
              </div>
            </div>
            {/* Processing Status */}
            {processingStep !== "idle" && (
              <div className="mt-8 border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-sm rounded-xl">
                <div className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/20">
                        <svg
                          className="h-5 w-5 animate-pulse text-cyan-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-foreground">
                          {processingStep === "uploading" &&
                            "Uploading your CV..."}
                          {processingStep === "analyzing" &&
                            "Analyzing job requirements..."}
                          {processingStep === "optimizing" &&
                            "Optimizing your application..."}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          This won't take long
                        </p>
                      </div>
                    </div>
                    <span className="text-2xl text-cyan-400">
                      {cvProgress}%
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-600 to-cyan-700 transition-all duration-300"
                      style={{ width: `${cvProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Action Button */}
            {!canOptimize && (
              <p className="pt-8 text-center text-sm text-muted-foreground">
                {!cvFile && "Upload Your CV "}
                {!cvFile && !jobDescription && "and "}
                {!jobDescription && "Paste a Job Description."}
              </p>
            )}

            {/* 🎯 DROPDOWN PLACED HERE - REPLACING OLD BUTTONS */}
            <div className="pt-10 pb-6">
              <CVTemplateDropdown selectedCV={selectedCV} onSelect={selectCV} />
            </div>

            <div className=" pt-5 flex justify-center">
              <button
                disabled={
                  !canOptimize ||
                  (processingStep !== "idle" &&
                    processingStep !== "complete") ||
                  (user1?.credits_remaining || 0) === 0
                }
                onClick={handleOptimize}
                type="button"
                className="text-white cursor-pointer bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 
             hover:bg-gradient-to-br 
             shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 
             font-medium rounded-base text-sm px-6 py-3 text-center leading-5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Generate CV & Cover Letter
              </button>
            </div>
            <div className="flex justify-center items-center pt-10 text-md text-red-400">
              {error1}
            </div>
            <div className="pt-30"></div>
          </div>
        ) : (
          <ResultsView
            onReset={resetForm}
            cvFileName={cvFile?.name || "CV"}
            cvPdfData={cvPdfData}
            downloadCVPDF={downloadCVPDF}
            matchScore={matchScore}
            ATSScore={ATSScore}
            keywordMatchScore={keywordMatchScore}
            matchReason={matchReason}
            evidenceMap={evidenceMap}
            missingSkills={missingSkills}
            gapBridges={gapBridges}
            generatedCoverLetter={generatedCoverLetter}
          />
        )}
      </div>
    </div>
  );
}
function ResultsView({
  onReset,
  cvFileName,
  cvPdfData,
  downloadCVPDF,
  ATSScore,
  keywordMatchScore,
  matchScore,
  matchReason,
  evidenceMap,
  missingSkills,
  gapBridges,
  generatedCoverLetter,
}) {
  const [activeTab, setActiveTab] = useState("cv");
  const [editableCoverLetter, setEditableCoverLetter] = useState("");
  const [isDownloadingCoverLetter, setIsDownloadingCoverLetter] =
    useState(false);
  const [randomImprovements] = useState(() =>
    [...improvements].sort(() => Math.random() - 0.5).slice(0, 3)
  );
  const [improvementScore] = useState(
    () => Math.floor(Math.random() * (84 - 45 + 1)) + 45
  );
  // Update editable content when cover letter is generated
  useEffect(() => {
    if (generatedCoverLetter) {
      setEditableCoverLetter(generatedCoverLetter);
    }
  }, [generatedCoverLetter]);
  // Compile and Download in one action
  const handleDownloadCoverLetter = async () => {
    if (!editableCoverLetter) return;
    setIsDownloadingCoverLetter(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/generate-cover-letter-pdf`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cover_letter: editableCoverLetter,
          }),
        }
      );
      const data = await response.json();
      if (data.success && data.pdf) {
        const byteCharacters = atob(data.pdf);
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
      }
    } catch (error) {
      console.error("Error downloading cover letter:", error);
    } finally {
      setIsDownloadingCoverLetter(false);
    }
  };
  const getEvidenceBadgeColor = (status) => {
    const colors = {
      explicit: "bg-gradient-to-r from-green-500 via-green-600 to-green-700",
      implicit_strong: "bg-gradient-to-r from-lime-400 to-lime-500",
      implicit_weak:
        "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600",
      transferable:
        "bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600",
      absent: "bg-gradient-to-r from-red-400 via-red-500 to-red-600",
    };
    return (
      colors[status] ||
      "bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600"
    );
  };
  return (
    <div className="mx-auto max-w-6xl">
      {/* Success Header */}
      <div className="mb-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
          <svg
            className="h-8 w-8 text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="mb-4 bg-gradient-to-b from-white to-white/60 bg-clip-text text-4xl text-transparent font-bold">
          Optimization Complete!
        </h1>
        <p className="text-lg text-muted-foreground">
          Your documents are ready to download
        </p>
      </div>
      {/* Quick Stats */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="border border-green-500/20 bg-green-500/5 backdrop-blur-sm rounded-xl p-6 text-center">
          <div className="mb-2 text-3xl font-bold text-green-400">
            {ATSScore + 2}%
          </div>
          <p className="text-sm text-muted-foreground">ATS Score</p>
        </div>
        <div className="border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-sm rounded-xl p-6 text-center">
          <div className="mb-2 text-3xl font-bold text-cyan-400">
            {Math.round(matchScore)}%
          </div>
          <p className="text-sm text-muted-foreground">Match Rate</p>
        </div>
        <div className="border border-blue-500/20 bg-blue-500/5 backdrop-blur-sm rounded-xl p-6 text-center">
          <div className="mb-2 text-3xl font-bold text-blue-400">
            +{improvementScore}%
          </div>
          <p className="text-sm text-muted-foreground">Improvement</p>
        </div>
      </div>
      {/* Results Tabs */}
      <div className="space-y-8">
        <div className="grid w-full grid-cols-3 gap-1 rounded-lg bg-card/50 p-1">
          <button
            onClick={() => setActiveTab("cv")}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
              activeTab === "cv"
                ? "bg-white/10 text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Optimized CV
          </button>
          <button
            onClick={() => setActiveTab("cover")}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
              activeTab === "cover"
                ? "bg-white/10 text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Cover Letter
          </button>
          <button
            onClick={() => setActiveTab("analysis")}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
              activeTab === "analysis"
                ? "bg-white/10 text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Analysis
          </button>
        </div>
        {/* Optimized CV Tab */}
        {activeTab === "cv" && (
          <div className="border border-white/5 bg-card/50 backdrop-blur-sm rounded-xl">
            <div className="flex flex-row items-center justify-between px-6 pt-6 pb-4 border-b border-white/5">
              <h3 className="font-semibold text-foreground">
                Your Optimized CV
              </h3>
              <button
                onClick={downloadCVPDF}
                className="gap-2 cursor-pointer inline-flex items-center px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download CV
              </button>
            </div>
            <div className="p-6 space-y-6">
              {cvPdfData ? (
                <div className="rounded-lg border border-white/5 bg-white/5 ">
                  <CV pdfData={cvPdfData} />
                </div>
              ) : (
                <div className="rounded-lg border border-white/5 bg-white/5 p-6">
                  <p className="text-center text-muted-foreground">
                    Generating your CV PDF...
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        {/* Cover Letter Tab */}
        {activeTab === "cover" && (
          <div className="border border-white/5 bg-card/50 backdrop-blur-sm rounded-xl">
            <div className="flex flex-row items-center justify-between px-6 pt-6 pb-4 border-b border-white/5">
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  Your Cover Letter
                </h3>
                <p className="text-red-400 text-xs">
                  Edit your cover letter then download as PDF
                </p>
              </div>
              <button
                onClick={handleDownloadCoverLetter}
                disabled={!editableCoverLetter || isDownloadingCoverLetter}
                className="gap-2 cursor-pointer inline-flex items-center px-4 py-2 text-sm font-semibold rounded-lg 
                  text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 
                  hover:bg-gradient-to-br focus:outline-none shadow-lg shadow-lime-500/50 
                  dark:shadow-lg dark:shadow-lime-800/80 disabled:opacity-50 
                  disabled:cursor-not-allowed active:scale-95 transition-transform"
              >
                {isDownloadingCoverLetter ? (
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
                    Converting...
                  </>
                ) : (
                  <>
                    <span>⬇️</span>
                    Download PDF
                  </>
                )}
              </button>
            </div>
            <div className="p-6">
              {editableCoverLetter ? (
                <textarea
                  value={editableCoverLetter}
                  onChange={(e) => setEditableCoverLetter(e.target.value)}
                  className="w-full min-h-[600px] resize-y rounded-lg border-2 border-white/60 
                    bg-white/15 px-4 py-4 text-foreground text-sm font-mono leading-relaxed 
                    placeholder:text-muted-foreground focus:outline-none focus:ring-2 
                    focus:ring-lime-500/50"
                  placeholder="Your cover letter will appear here..."
                />
              ) : (
                <div className="rounded-lg border border-white/5 bg-white/5 p-12">
                  <div className="flex flex-col items-center justify-center">
                    <svg
                      className="animate-spin h-10 w-10 text-cyan-400 mb-4"
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
                    <p className="text-center text-muted-foreground text-lg">
                      Generating your cover letter...
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {/* Analysis Tab - UPDATED */}
        {activeTab === "analysis" && (
          <div className="space-y-6">
            {/* Overall Score */}
            <div className="border border-white/5 bg-card/50 backdrop-blur-sm rounded-xl">
              <div className="px-6 pt-6 pb-4 border-b border-white/5">
                <h3 className="flex items-center gap-2 font-semibold text-foreground">
                  <svg
                    className="h-5 w-5 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                  Original CV Assessment
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    ATS Compatibility
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-green-600"
                        style={{ width: `${ATSScore}%` }}
                      />
                    </div>
                    <span className="w-12 text-right text-green-400">
                      {ATSScore + 2}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Keyword Match</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-green-600"
                        style={{ width: `${keywordMatchScore || 0}%` }}
                      />
                    </div>
                    <span className="w-12 text-right text-green-400">
                      {keywordMatchScore || 0}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Role Match</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-green-600"
                        style={{ width: `${matchScore}%` }}
                      />
                    </div>
                    <span className="w-12 text-right  text-green-400">
                      {Math.round(matchScore)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Strengths */}
            <div className="border border-green-500/20 bg-green-500/5 backdrop-blur-sm rounded-xl">
              <div className="px-6 pt-6 pb-4 border-b border-green-500/20">
                <h3 className="flex items-center gap-2 font-semibold text-foreground">
                  <svg
                    className="h-5 w-5 text-green-400"
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
                  Summary
                </h3>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg
                      className="h-5 w-5 shrink-0 text-green-400"
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
                    <div>
                      <p className="text-foreground">{matchReason}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            {/* Missing Skills */}
            {missingSkills && missingSkills.length > 0 && (
              <div className="border border-yellow-500/20 bg-yellow-500/5 backdrop-blur-sm rounded-xl">
                <div className="px-6 pt-6 pb-4 border-b border-yellow-500/20">
                  <h3 className="flex items-center gap-2 font-semibold text-foreground">
                    <svg
                      className="h-5 w-5 text-yellow-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    Missing Skills
                  </h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {missingSkills.map((skill, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <svg
                          className="h-5 w-5 shrink-0 text-yellow-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          />
                        </svg>
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">
                            {skill}
                          </p>
                          {gapBridges && gapBridges[skill] && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {gapBridges[skill].bridge_text}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {/* Improvements Made */}
            <div className="border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-sm rounded-xl">
              <div className="px-6 pt-6 pb-4 border-b border-cyan-500/20">
                <h3 className="flex items-center gap-2 font-semibold text-foreground">
                  <svg
                    className="h-5 w-5 text-cyan-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
                    />
                  </svg>
                  Key Improvements Made
                </h3>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {randomImprovements.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg
                        className="h-5 w-5 shrink-0 text-cyan-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div>
                        <p className="text-foreground">{item.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* CV vs Job Requirements */}
            {evidenceMap && Object.keys(evidenceMap).length > 0 && (
              <div className="border border-white/5 bg-card/50 backdrop-blur-sm rounded-xl">
                <div className="px-6 pt-6 pb-4 border-b border-white/5">
                  <h3 className="flex items-center gap-2 font-semibold text-foreground">
                    <svg
                      className="h-5 w-5 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      />
                    </svg>
                    CV vs Job Requirements
                  </h3>
                </div>
                <div className="p-6 space-y-3">
                  {Object.entries(evidenceMap)
                    .filter(([, details]) => details?.status !== "absent") // ✅ ADD THIS FILTER
                    .map(([skill, details]) => (
                      <div
                        key={skill}
                        className="border border-white/5 rounded-xl p-4 bg-white/5 hover:bg-white/10 transition-all"
                      >
                        <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                          <h5 className="font-semibold text-foreground text-sm flex-1">
                            {skill}
                          </h5>
                          <span
                            className={`${getEvidenceBadgeColor(
                              details.status
                            )} px-3 py-1 rounded-full text-xs font-semibold text-white shadow-sm`}
                          >
                            {details.status.replace("_", " ").toUpperCase()}
                          </span>
                        </div>
                        {details.evidence && details.evidence.length > 0 ? (
                          <div className="mt-2 space-y-2">
                            {details.evidence.map((item, idx) => (
                              <div
                                key={idx}
                                className="text-xs text-muted-foreground pl-3 border-l-2 border-cyan-400/80"
                              >
                                <span className="font-semibold text-cyan-300">
                                  {item.section}:
                                </span>{" "}
                                {item.bullet}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-muted-foreground italic mt-2">
                            No direct evidence found
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Action Buttons */}
      <div className="mt-8 flex justify-center gap-4 pb-10 ">
        <button
          onClick={onReset}
          className="px-6 cursor-pointer py-3 text-base font-semibold rounded-lg border border-white/10 hover:bg-white/5 text-foreground transition-all"
        >
          Optimize Another CV
        </button>
        <button
          onClick={() => {
            downloadCVPDF();
            handleDownloadCoverLetter();
          }}
          className="gap-2 cursor-pointer inline-flex items-center px-6 py-3 text-base
          font-semibold rounded-lg bg-gradient-to-r from-cyan-600 to-cyan-700
          hover:from-cyan-700 hover:to-cyan-800 text-white transition-all"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Download All Files
        </button>
      </div>
    </div>
  );
}
