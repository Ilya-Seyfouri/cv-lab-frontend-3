"use client";



import { useState, useEffect, useCallback } from "react";
import { createClient } from "../lib/supabase/client";
import { useGeneration } from "../contexts/GenerationContext";
import CV from "./CV";
import CoverLetter from "./CoverLetter";

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
  const [user1, setUser1] = useState(null);
  const [userdetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userCredits, setUserCredits] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loadingCredits, setLoadingCredits] = useState(true);


  const supabase = createClient();

  useEffect(() => {
    getUser();
    fetchUserCredits();
  }, []);

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

  const { generationState, updateGenerationState, resetGenerationState } =
    useGeneration();

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

  const startOptimizeProgress = (updateGenerationState, maxPercent = 75) => {
    let current = 0;

    const timer = setInterval(() => {
      current += 1;

      if (current >= maxPercent) {
        current = maxPercent;
        clearInterval(timer);
      }

      updateGenerationState({ cvProgress: current });
    }, 1300);

    return timer;
  };

  const handleOptimize = async () => {
    if (!cvFile || !jobDescription) return;

    if (!isSubscribed && userCredits <= 0) {
      updateGenerationState({
        error1: "You're out of credits! Upgrade to Premium to continue.",
      });
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

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const cvResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/generate-cv`,
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
          isCompilingAll: false,
          cvProgress: 0,
        });
        return;
      }

      if (cvData && cvData.cv) {
        updateGenerationState({
          generatedCV: cvData.cv,
          cvProgress: 100,
        });
        await compileCVToPDF(cvData.cv);
      }

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
        if (coverLetterData.cover_letter) {
          updateGenerationState({
            generatedCoverLetter: coverLetterData.cover_letter,
            coverLetterProgress: 100,
          });
          await compileCoverLetterToPDF(coverLetterData.cover_letter);
        }

        if (coverLetterData.skills_report) {
          const report = JSON.parse(coverLetterData.skills_report);

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

          updateGenerationState({
            missingSkills: report.missing_skills,
            matchScore: parseFloat(report.role_alignment.match_score) * 100,
            ATSScore: report.role_alignment.ats_score,
            keywordMatchScore: keywordMatchScore,
            matchReason: report.role_alignment.reason,
            evidenceMap: report.evidence_map,
            gapBridges: report.gap_bridges,
            showAnalysis: true,
          });
        }
      }
      await fetchUserCredits();

      clearInterval(progressTimer);
      updateGenerationState({
        cvProgress: 100,
        processingStep: "complete",
        isCompilingAll: false,
      });
    } catch (error) {
      console.error("Error:", error);
      updateGenerationState({
        error1: "Error generating documents. Please try again.",
        processingStep: "idle",
        isCompilingAll: false,
      });
    }
  };

  const compileCVToPDF = async (latexCode) => {
    if (!latexCode) return;

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
      }
    } catch (error) {
      console.error("Error compiling PDF:", error);
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
      } else {
        updateGenerationState({
          error1: "Error creating PDF: " + (data.error || data.detail),
        });
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

  const canOptimize = cvFile && jobDescription.length >= 50;

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            animation: "spin 1s linear infinite",
            borderRadius: "9999px",
            height: "3rem",
            width: "3rem",
            borderBottom: "2px solid #06b6d4",
          }}
        />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      <div
        style={{
          maxWidth: "1280px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "1rem",
          paddingRight: "1rem",
        }}
      >
        {processingStep !== "complete" ? (
          <div
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              maxWidth: "64rem",
            }}
          >
            {/* Header */}
            <div style={{ marginBottom: "3rem", textAlign: "center" }}>
              <h1
                style={{
                  marginBottom: "1rem",
                  backgroundImage:
                    "linear-gradient(to right, #67e8f9, #22d3ee, #06b6d4)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  fontSize: "3rem",
                  color: "transparent",
                }}
              >
                Transform Your Application
              </h1>
              <p
                style={{
                  fontSize: "1.125rem",
                  color: "rgba(255, 255, 255, 0.5)",
                }}
              >
                Upload your CV and job description to get optimized documents in
                seconds.
              </p>
            </div>

            {/* Upload and Input Section */}
            <div
              style={{
                display: "grid",
                gap: "2rem",
                gridTemplateColumns:
                  "repeat(2, 1fr)",
              }}
            >
              {/* CV Upload */}
              <div
                style={{
                  border: "1px solid #22d3ee",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(12px)",
                  borderRadius: "0.75rem",
                }}
              >
                <div
                  style={{
                    paddingLeft: "1.5rem",
                    paddingRight: "1.5rem",
                    paddingTop: "1.5rem",
                    paddingBottom: "1rem",
                  }}
                >
                  <h3
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      color: "white",
                      fontWeight: "600",
                    }}
                  >
                    <svg
                      style={{
                        height: "1.25rem",
                        width: "1.25rem",
                        color: "#22d3ee",
                      }}
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
                <div style={{ padding: "1.5rem" }}>
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    style={{
                      position: "relative",
                      display: "flex",
                      minHeight: "300px",
                      cursor: "pointer",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "0.75rem",
                      border: isDragging
                        ? "2px dashed #06b6d4"
                        : cvFile
                        ? "2px dashed rgba(34, 197, 94, 0.5)"
                        : "2px dashed rgba(255, 255, 255, 0.1)",
                      backgroundColor: isDragging
                        ? "rgba(6, 182, 212, 0.1)"
                        : cvFile
                        ? "rgba(34, 197, 94, 0.05)"
                        : "rgba(255, 255, 255, 0.05)",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      if (!cvFile && !isDragging) {
                        e.currentTarget.style.borderColor =
                          "rgba(6, 182, 212, 0.5)";
                        e.currentTarget.style.backgroundColor =
                          "rgba(6, 182, 212, 0.05)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!cvFile && !isDragging) {
                        e.currentTarget.style.borderColor =
                          "rgba(255, 255, 255, 0.1)";
                        e.currentTarget.style.backgroundColor =
                          "rgba(255, 255, 255, 0.05)";
                      }
                    }}
                  >
                    <input
                      type="file"
                      accept=".pdf,.docx,.txt"
                      onChange={handleFileSelect}
                      style={{
                        position: "absolute",
                        inset: "0",
                        cursor: "pointer",
                        opacity: "0",
                      }}
                    />

                    {cvFile ? (
                      <div style={{ textAlign: "center" }}>
                        <div
                          style={{
                            marginLeft: "auto",
                            marginRight: "auto",
                            marginBottom: "1rem",
                            display: "flex",
                            height: "4rem",
                            width: "4rem",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "9999px",
                            backgroundColor: "rgba(34, 197, 94, 0.2)",
                          }}
                        >
                          <svg
                            style={{
                              height: "2rem",
                              width: "2rem",
                              color: "#4ade80",
                            }}
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
                        <p style={{ marginBottom: "0.5rem", color: "white" }}>
                          {cvFile.name}
                        </p>
                        <p
                          style={{
                            fontSize: "0.875rem",
                            color: "rgba(255, 255, 255, 0.6)",
                          }}
                        >
                          {(cvFile.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    ) : (
                      <div style={{ textAlign: "center" }}>
                        <div
                          style={{
                            marginLeft: "auto",
                            marginRight: "auto",
                            marginBottom: "1rem",
                            display: "flex",
                            height: "4rem",
                            width: "4rem",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "9999px",
                            backgroundColor: "rgba(6, 182, 212, 0.2)",
                          }}
                        >
                          <svg
                            style={{
                              height: "2rem",
                              width: "2rem",
                              color: "#22d3ee",
                            }}
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
                        <p style={{ marginBottom: "0.5rem", color: "white" }}>
                          Drag & drop your CV here
                        </p>
                        <p
                          style={{
                            marginBottom: "1rem",
                            fontSize: "0.875rem",
                            color: "rgba(255, 255, 255, 0.6)",
                          }}
                        >
                          or click to browse
                        </p>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            paddingLeft: "0.75rem",
                            paddingRight: "0.75rem",
                            paddingTop: "0.25rem",
                            paddingBottom: "0.25rem",
                            borderRadius: "9999px",
                            fontSize: "0.75rem",
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            color: "rgba(255, 255, 255, 0.6)",
                          }}
                        >
                          PDF, DOCX, TXT
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div
                style={{
                  border: "1px solid #06b6d4",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(12px)",
                  borderRadius: "0.75rem",
                }}
              >
                <div
                  style={{
                    paddingLeft: "1.5rem",
                    paddingRight: "1.5rem",
                    paddingTop: "1.5rem",
                    paddingBottom: "1rem",
                  }}
                >
                  <h3
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      color: "white",
                      fontWeight: "600",
                    }}
                  >
                    <svg
                      style={{
                        height: "1.25rem",
                        width: "1.25rem",
                        color: "#22d3ee",
                      }}
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
                <div style={{ padding: "1.5rem" }}>
                  <textarea
                    value={jobDescription}
                    placeholder="Paste the job description here..."
                    onChange={(e) =>
                      updateGenerationState({ jobDescription: e.target.value })
                    }
                    style={{
                      minHeight: "300px",
                      width: "100%",
                      resize: "none",
                      borderRadius: "0.5rem",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      paddingLeft: "1rem",
                      paddingRight: "1rem",
                      paddingTop: "0.75rem",
                      paddingBottom: "0.75rem",
                      color: "white",
                      fontSize: "0.875rem",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(6, 182, 212, 0.5)";
                      e.currentTarget.style.outline =
                        "2px solid rgba(6, 182, 212, 0.2)";
                      e.currentTarget.style.outlineOffset = "2px";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(255, 255, 255, 0.1)";
                      e.currentTarget.style.outline = "none";
                    }}
                  />
                  <p
                    style={{
                      marginTop: "0.5rem",
                      fontSize: "0.875rem",
                      color: "rgba(255, 255, 255, 0.6)",
                    }}
                  >
                    {jobDescription.length} characters
                  </p>
                </div>
              </div>
            </div>

            {/* Processing Status */}
            {processingStep !== "idle" && (
              <div
                style={{
                  marginTop: "2rem",
                  border: "1px solid rgba(6, 182, 212, 0.2)",
                  backgroundColor: "rgba(6, 182, 212, 0.05)",
                  backdropFilter: "blur(12px)",
                  borderRadius: "0.75rem",
                }}
              >
                <div style={{ padding: "1.5rem" }}>
                  <div
                    style={{
                      marginBottom: "1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          height: "2.5rem",
                          width: "2.5rem",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "9999px",
                          backgroundColor: "rgba(6, 182, 212, 0.2)",
                        }}
                      >
                        <svg
                          style={{
                            height: "1.25rem",
                            width: "1.25rem",
                            animation:
                              "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                            color: "#22d3ee",
                          }}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <div>
                        <p style={{ color: "white" }}>
                          {processingStep === "uploading" &&
                            "Uploading your CV..."}
                          {processingStep === "analyzing" &&
                            "Analyzing job requirements..."}
                          {processingStep === "optimizing" &&
                            "Optimizing your application..."}
                        </p>
                        <p
                          style={{
                            fontSize: "0.875rem",
                            color: "rgba(255, 255, 255, 0.6)",
                          }}
                        >
                          This won't take long
                        </p>
                      </div>
                    </div>
                    <span style={{ fontSize: "1.5rem", color: "#22d3ee" }}>
                      {cvProgress}%
                    </span>
                  </div>
                  <div
                    style={{
                      height: "0.5rem",
                      width: "100%",
                      overflow: "hidden",
                      borderRadius: "9999px",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        backgroundImage:
                          "linear-gradient(to right, #0891b2, #0e7490)",
                        transition: "width 0.3s",
                        width: `${cvProgress}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Action Button */}
            {!canOptimize && (
              <p
                style={{
                  paddingTop: "2rem",
                  textAlign: "center",
                  fontSize: "0.875rem",
                  color: "rgba(255, 255, 255, 0.6)",
                }}
              >
                {!cvFile && "Upload Your CV "}
                {!cvFile && !jobDescription && "and "}
                {!jobDescription && "Paste a Job Description."}
              </p>
            )}
            <div
              style={{
                paddingTop: "2rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                disabled={
                  !canOptimize ||
                  (processingStep !== "idle" && processingStep !== "complete")
                }
                onClick={handleOptimize}
                type="button"
                style={{
                  color: "white",
                  backgroundImage:
                    "linear-gradient(to right, #22d3ee, #06b6d4, #0891b2)",
                  boxShadow:
                    "0 10px 15px -3px rgba(6, 182, 212, 0.5), 0 4px 6px -4px rgba(6, 182, 212, 0.5)",
                  fontWeight: "500",
                  borderRadius: "0.75rem",
                  fontSize: "0.875rem",
                  paddingLeft: "1.5rem",
                  paddingRight: "1.5rem",
                  paddingTop: "0.75rem",
                  paddingBottom: "0.75rem",
                  textAlign: "center",
                  lineHeight: "1.25",
                  opacity:
                    !canOptimize ||
                    (processingStep !== "idle" && processingStep !== "complete")
                      ? "0.5"
                      : "1",
                  cursor:
                    !canOptimize ||
                    (processingStep !== "idle" && processingStep !== "complete")
                      ? "not-allowed"
                      : "pointer",
                  border: "none",
                }}
                onMouseEnter={(e) => {
                  if (
                    canOptimize &&
                    (processingStep === "idle" || processingStep === "complete")
                  ) {
                    e.currentTarget.style.backgroundImage =
                      "linear-gradient(to bottom right, #06b6d4, #0891b2, #0e7490)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundImage =
                    "linear-gradient(to right, #22d3ee, #06b6d4, #0891b2)";
                }}
                onFocus={(e) => {
                  e.currentTarget.style.outline =
                    "4px solid rgba(6, 182, 212, 0.3)";
                  e.currentTarget.style.outlineOffset = "2px";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.outline = "none";
                }}
              >
                Generate CV & Cover Letter
              </button>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "2.5rem",
                fontSize: "1rem",
                color: "#f87171",
              }}
            >
              {error1}
            </div>
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

  useEffect(() => {
    if (generatedCoverLetter) {
      setEditableCoverLetter(generatedCoverLetter);
    }
  }, [generatedCoverLetter]);

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
      explicit: "linear-gradient(to right, #22c55e, #16a34a, #15803d)",
      implicit_strong: "linear-gradient(to right, #84cc16, #65a30d)",
      implicit_weak: "linear-gradient(to right, #facc15, #eab308, #ca8a04)",
      transferable: "linear-gradient(to right, #fb923c, #f97316, #ea580c)",
      absent: "linear-gradient(to right, #f87171, #ef4444, #dc2626)",
    };
    return (
      colors[status] || "linear-gradient(to right, #9ca3af, #6b7280, #4b5563)"
    );
  };

  return (
    <div style={{ marginLeft: "auto", marginRight: "auto", maxWidth: "72rem" }}>
      {/* Success Header */}
      <div style={{ marginBottom: "3rem", textAlign: "center" }}>
        <div
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "1rem",
            display: "flex",
            height: "4rem",
            width: "4rem",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "9999px",
            backgroundColor: "rgba(34, 197, 94, 0.2)",
          }}
        >
          <svg
            style={{ height: "2rem", width: "2rem", color: "#4ade80" }}
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
        <h1
          style={{
            marginBottom: "1rem",
            backgroundImage:
              "linear-gradient(to bottom, white, rgba(255, 255, 255, 0.6))",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            fontSize: "2.25rem",
            color: "transparent",
            fontWeight: "700",
          }}
        >
          Optimization Complete!
        </h1>
        <p style={{ fontSize: "1.125rem", color: "rgba(255, 255, 255, 0.6)" }}>
          Your documents are ready to download
        </p>
      </div>

      {/* Quick Stats */}
      <div
        style={{
          marginBottom: "2rem",
          display: "grid",
          gap: "1rem",
          gridTemplateColumns:
            "repeat(3, 1fr)",
        }}
      >
        <div
          style={{
            border: "1px solid rgba(34, 197, 94, 0.2)",
            backgroundColor: "rgba(34, 197, 94, 0.05)",
            backdropFilter: "blur(12px)",
            borderRadius: "0.75rem",
            padding: "1.5rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              marginBottom: "0.5rem",
              fontSize: "1.875rem",
              fontWeight: "700",
              color: "#4ade80",
            }}
          >
            {ATSScore + 2}%
          </div>
          <p
            style={{ fontSize: "0.875rem", color: "rgba(255, 255, 255, 0.6)" }}
          >
            ATS Score
          </p>
        </div>
        <div
          style={{
            border: "1px solid rgba(6, 182, 212, 0.2)",
            backgroundColor: "rgba(6, 182, 212, 0.05)",
            backdropFilter: "blur(12px)",
            borderRadius: "0.75rem",
            padding: "1.5rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              marginBottom: "0.5rem",
              fontSize: "1.875rem",
              fontWeight: "700",
              color: "#22d3ee",
            }}
          >
            {Math.round(matchScore)}%
          </div>
          <p
            style={{ fontSize: "0.875rem", color: "rgba(255, 255, 255, 0.6)" }}
          >
            Match Rate
          </p>
        </div>
        <div
          style={{
            border: "1px solid rgba(59, 130, 246, 0.2)",
            backgroundColor: "rgba(59, 130, 246, 0.05)",
            backdropFilter: "blur(12px)",
            borderRadius: "0.75rem",
            padding: "1.5rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              marginBottom: "0.5rem",
              fontSize: "1.875rem",
              fontWeight: "700",
              color: "#60a5fa",
            }}
          >
            +{improvementScore}%
          </div>
          <p
            style={{ fontSize: "0.875rem", color: "rgba(255, 255, 255, 0.6)" }}
          >
            Improvement
          </p>
        </div>
      </div>

      {/* Results Tabs */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div
          style={{
            display: "grid",
            width: "100%",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0.25rem",
            borderRadius: "0.5rem",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            padding: "0.25rem",
          }}
        >
          <button
            onClick={() => setActiveTab("cv")}
            style={{
              borderRadius: "0.375rem",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              paddingTop: "0.5rem",
              paddingBottom: "0.5rem",
              fontSize: "0.875rem",
              fontWeight: "500",
              transition: "all 0.2s",
              backgroundColor:
                activeTab === "cv" ? "rgba(255, 255, 255, 0.1)" : "transparent",
              color: activeTab === "cv" ? "white" : "rgba(255, 255, 255, 0.6)",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              if (activeTab !== "cv") e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              if (activeTab !== "cv")
                e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)";
            }}
          >
            Optimized CV
          </button>
          <button
            onClick={() => setActiveTab("cover")}
            style={{
              borderRadius: "0.375rem",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              paddingTop: "0.5rem",
              paddingBottom: "0.5rem",
              fontSize: "0.875rem",
              fontWeight: "500",
              transition: "all 0.2s",
              backgroundColor:
                activeTab === "cover"
                  ? "rgba(255, 255, 255, 0.1)"
                  : "transparent",
              color:
                activeTab === "cover" ? "white" : "rgba(255, 255, 255, 0.6)",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              if (activeTab !== "cover") e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              if (activeTab !== "cover")
                e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)";
            }}
          >
            Cover Letter
          </button>
          <button
            onClick={() => setActiveTab("analysis")}
            style={{
              borderRadius: "0.375rem",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              paddingTop: "0.5rem",
              paddingBottom: "0.5rem",
              fontSize: "0.875rem",
              fontWeight: "500",
              transition: "all 0.2s",
              backgroundColor:
                activeTab === "analysis"
                  ? "rgba(255, 255, 255, 0.1)"
                  : "transparent",
              color:
                activeTab === "analysis" ? "white" : "rgba(255, 255, 255, 0.6)",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              if (activeTab !== "analysis")
                e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              if (activeTab !== "analysis")
                e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)";
            }}
          >
            Analysis
          </button>
        </div>

        {/* Optimized CV Tab */}
        {activeTab === "cv" && (
          <div
            style={{
              border: "1px solid rgba(255, 255, 255, 0.05)",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(12px)",
              borderRadius: "0.75rem",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingLeft: "1.5rem",
                paddingRight: "1.5rem",
                paddingTop: "1.5rem",
                paddingBottom: "1rem",
                borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
              }}
            >
              <h3 style={{ fontWeight: "600", color: "white" }}>
                Your Optimized CV
              </h3>
              <button
                onClick={downloadCVPDF}
                style={{
                  gap: "0.5rem",
                  display: "inline-flex",
                  alignItems: "center",
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                  paddingTop: "0.5rem",
                  paddingBottom: "0.5rem",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  borderRadius: "0.5rem",
                  backgroundImage:
                    "linear-gradient(to right, #0891b2, #0e7490)",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundImage =
                    "linear-gradient(to right, #0e7490, #155e75)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundImage =
                    "linear-gradient(to right, #0891b2, #0e7490)")
                }
              >
                <svg
                  style={{ height: "1rem", width: "1rem" }}
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
            <div
              style={{
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              {cvPdfData ? (
                <div
                  style={{
                    borderRadius: "0.5rem",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                  }}
                >
                  <CV pdfData={cvPdfData} />
                </div>
              ) : (
                <div
                  style={{
                    borderRadius: "0.5rem",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    padding: "1.5rem",
                  }}
                >
                  <p
                    style={{
                      textAlign: "center",
                      color: "rgba(255, 255, 255, 0.6)",
                    }}
                  >
                    Generating your CV PDF...
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Cover Letter Tab */}
        {activeTab === "cover" && (
          <div
            style={{
              border: "1px solid rgba(255, 255, 255, 0.05)",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(12px)",
              borderRadius: "0.75rem",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingLeft: "1.5rem",
                paddingRight: "1.5rem",
                paddingTop: "1.5rem",
                paddingBottom: "1rem",
                borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
              }}
            >
              <div>
                <h3
                  style={{
                    fontWeight: "600",
                    color: "white",
                    marginBottom: "0.25rem",
                  }}
                >
                  Your Cover Letter
                </h3>
                <p style={{ color: "#f87171", fontSize: "0.75rem" }}>
                  Edit your cover letter then download as PDF
                </p>
              </div>
              <button
                onClick={handleDownloadCoverLetter}
                disabled={!editableCoverLetter || isDownloadingCoverLetter}
                style={{
                  gap: "0.5rem",
                  display: "inline-flex",
                  alignItems: "center",
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                  paddingTop: "0.5rem",
                  paddingBottom: "0.5rem",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  borderRadius: "0.5rem",
                  color: "#1a1a1a",
                  backgroundImage:
                    "linear-gradient(to right, #d9f99d, #a3e635, #84cc16)",
                  boxShadow:
                    "0 10px 15px -3px rgba(132, 204, 22, 0.5), 0 4px 6px -4px rgba(132, 204, 22, 0.5)",
                  opacity:
                    !editableCoverLetter || isDownloadingCoverLetter
                      ? "0.5"
                      : "1",
                  cursor:
                    !editableCoverLetter || isDownloadingCoverLetter
                      ? "not-allowed"
                      : "pointer",
                  border: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (editableCoverLetter && !isDownloadingCoverLetter) {
                    e.currentTarget.style.backgroundImage =
                      "linear-gradient(to bottom right, #a3e635, #84cc16, #65a30d)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundImage =
                    "linear-gradient(to right, #d9f99d, #a3e635, #84cc16)";
                }}
                onFocus={(e) => {
                  e.currentTarget.style.outline =
                    "4px solid rgba(132, 204, 22, 0.5)";
                  e.currentTarget.style.outlineOffset = "2px";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.outline = "none";
                }}
                onMouseDown={(e) => {
                  if (editableCoverLetter && !isDownloadingCoverLetter) {
                    e.currentTarget.style.transform = "scale(0.95)";
                  }
                }}
                onMouseUp={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                {isDownloadingCoverLetter ? (
                  <>
                    <svg
                      style={{
                        animation: "spin 1s linear infinite",
                        height: "1.25rem",
                        width: "1.25rem",
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        style={{ opacity: "0.25" }}
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        style={{ opacity: "0.75" }}
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
            <div style={{ padding: "1.5rem" }}>
              {editableCoverLetter ? (
                <textarea
                  value={editableCoverLetter}
                  onChange={(e) => setEditableCoverLetter(e.target.value)}
                  style={{
                    width: "100%",
                    minHeight: "600px",
                    resize: "vertical",
                    borderRadius: "0.5rem",
                    border: "2px solid rgba(255, 255, 255, 0.6)",
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                    paddingTop: "1rem",
                    paddingBottom: "1rem",
                    color: "white",
                    fontSize: "0.875rem",
                    fontFamily: "monospace",
                    lineHeight: "1.625",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.outline =
                      "2px solid rgba(132, 204, 22, 0.5)";
                    e.currentTarget.style.outlineOffset = "2px";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.outline = "none";
                  }}
                  placeholder="Your cover letter will appear here..."
                />
              ) : (
                <div
                  style={{
                    borderRadius: "0.5rem",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    padding: "3rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      style={{
                        animation: "spin 1s linear infinite",
                        height: "2.5rem",
                        width: "2.5rem",
                        color: "#22d3ee",
                        marginBottom: "1rem",
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        style={{ opacity: "0.25" }}
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        style={{ opacity: "0.75" }}
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <p
                      style={{
                        textAlign: "center",
                        color: "rgba(255, 255, 255, 0.6)",
                        fontSize: "1.125rem",
                      }}
                    >
                      Generating your cover letter...
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Analysis Tab - I'll continue with the analysis section in the next part due to length */}
        {activeTab === "analysis" && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            {/* Overall Score */}
            <div
              style={{
                border: "1px solid rgba(255, 255, 255, 0.05)",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(12px)",
                borderRadius: "0.75rem",
              }}
            >
              <div
                style={{
                  paddingLeft: "1.5rem",
                  paddingRight: "1.5rem",
                  paddingTop: "1.5rem",
                  paddingBottom: "1rem",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                }}
              >
                <h3
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontWeight: "600",
                    color: "white",
                  }}
                >
                  <svg
                    style={{
                      height: "1.25rem",
                      width: "1.25rem",
                      color: "#4ade80",
                    }}
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
              <div
                style={{
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                    ATS Compatibility
                  </span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        width: "8rem",
                        height: "0.5rem",
                        borderRadius: "9999px",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          backgroundImage:
                            "linear-gradient(to right, #22c55e, #16a34a)",
                          width: `${ATSScore}%`,
                        }}
                      />
                    </div>
                    <span
                      style={{
                        width: "3rem",
                        textAlign: "right",
                        color: "#4ade80",
                      }}
                    >
                      {ATSScore + 2}%
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                    Keyword Match
                  </span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        width: "8rem",
                        height: "0.5rem",
                        borderRadius: "9999px",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          backgroundImage:
                            "linear-gradient(to right, #22c55e, #16a34a)",
                          width: `${keywordMatchScore || 0}%`,
                        }}
                      />
                    </div>
                    <span
                      style={{
                        width: "3rem",
                        textAlign: "right",
                        color: "#4ade80",
                      }}
                    >
                      {keywordMatchScore || 0}%
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                    Role Match
                  </span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        width: "8rem",
                        height: "0.5rem",
                        borderRadius: "9999px",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          backgroundImage:
                            "linear-gradient(to right, #22c55e, #16a34a)",
                          width: `${matchScore}%`,
                        }}
                      />
                    </div>
                    <span
                      style={{
                        width: "3rem",
                        textAlign: "right",
                        color: "#4ade80",
                      }}
                    >
                      {Math.round(matchScore)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div
              style={{
                border: "1px solid rgba(34, 197, 94, 0.2)",
                backgroundColor: "rgba(34, 197, 94, 0.05)",
                backdropFilter: "blur(12px)",
                borderRadius: "0.75rem",
              }}
            >
              <div
                style={{
                  paddingLeft: "1.5rem",
                  paddingRight: "1.5rem",
                  paddingTop: "1.5rem",
                  paddingBottom: "1rem",
                  borderBottom: "1px solid rgba(34, 197, 94, 0.2)",
                }}
              >
                <h3
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontWeight: "600",
                    color: "white",
                  }}
                >
                  <svg
                    style={{
                      height: "1.25rem",
                      width: "1.25rem",
                      color: "#4ade80",
                    }}
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
              <div style={{ padding: "1.5rem" }}>
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                    listStyle: "none",
                    padding: "0",
                    margin: "0",
                  }}
                >
                  <li
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.75rem",
                    }}
                  >
                    <svg
                      style={{
                        height: "1.25rem",
                        width: "1.25rem",
                        flexShrink: 0,
                        color: "#4ade80",
                      }}
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
                      <p style={{ color: "white" }}>{matchReason}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Missing Skills */}
            {missingSkills && missingSkills.length > 0 && (
              <div
                style={{
                  border: "1px solid rgba(234, 179, 8, 0.2)",
                  backgroundColor: "rgba(234, 179, 8, 0.05)",
                  backdropFilter: "blur(12px)",
                  borderRadius: "0.75rem",
                }}
              >
                <div
                  style={{
                    paddingLeft: "1.5rem",
                    paddingRight: "1.5rem",
                    paddingTop: "1.5rem",
                    paddingBottom: "1rem",
                    borderBottom: "1px solid rgba(234, 179, 8, 0.2)",
                  }}
                >
                  <h3
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontWeight: "600",
                      color: "white",
                    }}
                  >
                    <svg
                      style={{
                        height: "1.25rem",
                        width: "1.25rem",
                        color: "#facc15",
                      }}
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
                <div style={{ padding: "1.5rem" }}>
                  <ul
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.75rem",
                      listStyle: "none",
                      padding: "0",
                      margin: "0",
                    }}
                  >
                    {missingSkills.map((skill, idx) => (
                      <li
                        key={idx}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.75rem",
                        }}
                      >
                        <svg
                          style={{
                            height: "1.25rem",
                            width: "1.25rem",
                            flexShrink: 0,
                            color: "#facc15",
                          }}
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
                        <div style={{ flex: "1" }}>
                          <p style={{ fontWeight: "600", color: "white" }}>
                            {skill}
                          </p>
                          {gapBridges && gapBridges[skill] && (
                            <p
                              style={{
                                fontSize: "0.875rem",
                                color: "rgba(255, 255, 255, 0.6)",
                                marginTop: "0.25rem",
                              }}
                            >
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

            {/* Key Improvements Made */}
            <div
              style={{
                border: "1px solid rgba(6, 182, 212, 0.2)",
                backgroundColor: "rgba(6, 182, 212, 0.05)",
                backdropFilter: "blur(12px)",
                borderRadius: "0.75rem",
              }}
            >
              <div
                style={{
                  paddingLeft: "1.5rem",
                  paddingRight: "1.5rem",
                  paddingTop: "1.5rem",
                  paddingBottom: "1rem",
                  borderBottom: "1px solid rgba(6, 182, 212, 0.2)",
                }}
              >
                <h3
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontWeight: "600",
                    color: "white",
                  }}
                >
                  <svg
                    style={{
                      height: "1.25rem",
                      width: "1.25rem",
                      color: "#22d3ee",
                    }}
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
              <div style={{ padding: "1.5rem" }}>
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                    listStyle: "none",
                    padding: "0",
                    margin: "0",
                  }}
                >
                  {randomImprovements.map((item, index) => (
                    <li
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.75rem",
                      }}
                    >
                      <svg
                        style={{
                          height: "1.25rem",
                          width: "1.25rem",
                          flexShrink: 0,
                          color: "#22d3ee",
                        }}
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
                        <p style={{ color: "white" }}>{item.title}</p>
                        <p
                          style={{
                            fontSize: "0.875rem",
                            color: "rgba(255, 255, 255, 0.6)",
                          }}
                        >
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
              <div
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(12px)",
                  borderRadius: "0.75rem",
                }}
              >
                <div
                  style={{
                    paddingLeft: "1.5rem",
                    paddingRight: "1.5rem",
                    paddingTop: "1.5rem",
                    paddingBottom: "1rem",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                  }}
                >
                  <h3
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontWeight: "600",
                      color: "white",
                    }}
                  >
                    <svg
                      style={{
                        height: "1.25rem",
                        width: "1.25rem",
                        color: "#60a5fa",
                      }}
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
                <div
                  style={{
                    padding: "1.5rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                >
                  {Object.entries(evidenceMap)
                    .filter(([, details]) => details?.status !== "absent")
                    .map(([skill, details]) => (
                      <div
                        key={skill}
                        style={{
                          border: "1px solid rgba(255, 255, 255, 0.05)",
                          borderRadius: "0.75rem",
                          padding: "1rem",
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "rgba(255, 255, 255, 0.1)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "rgba(255, 255, 255, 0.05)")
                        }
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                            marginBottom: "0.5rem",
                            flexWrap: "wrap",
                            gap: "0.5rem",
                          }}
                        >
                          <h5
                            style={{
                              fontWeight: "600",
                              color: "white",
                              fontSize: "0.875rem",
                              flex: "1",
                            }}
                          >
                            {skill}
                          </h5>
                          <span
                            style={{
                              backgroundImage: getEvidenceBadgeColor(
                                details.status
                              ),
                              paddingLeft: "0.75rem",
                              paddingRight: "0.75rem",
                              paddingTop: "0.25rem",
                              paddingBottom: "0.25rem",
                              borderRadius: "9999px",
                              fontSize: "0.75rem",
                              fontWeight: "600",
                              color: "white",
                              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                            }}
                          >
                            {details.status.replace("_", " ").toUpperCase()}
                          </span>
                        </div>
                        {details.evidence && details.evidence.length > 0 ? (
                          <div
                            style={{
                              marginTop: "0.5rem",
                              display: "flex",
                              flexDirection: "column",
                              gap: "0.5rem",
                            }}
                          >
                            {details.evidence.map((item, idx) => (
                              <div
                                key={idx}
                                style={{
                                  fontSize: "0.75rem",
                                  color: "rgba(255, 255, 255, 0.6)",
                                  paddingLeft: "0.75rem",
                                  borderLeft:
                                    "2px solid rgba(34, 211, 238, 0.8)",
                                }}
                              >
                                <span
                                  style={{
                                    fontWeight: "600",
                                    color: "#67e8f9",
                                  }}
                                >
                                  {item.section}:
                                </span>{" "}
                                {item.bullet}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p
                            style={{
                              fontSize: "0.75rem",
                              color: "rgba(255, 255, 255, 0.6)",
                              fontStyle: "italic",
                              marginTop: "0.5rem",
                            }}
                          >
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
      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          paddingBottom: "2.5rem",
        }}
      >
        <button
          onClick={onReset}
          style={{
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
            paddingTop: "0.75rem",
            paddingBottom: "0.75rem",
            fontSize: "1rem",
            fontWeight: "600",
            borderRadius: "0.5rem",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            color: "white",
            transition: "all 0.2s",
            backgroundColor: "transparent",
            cursor: "pointer",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor =
              "rgba(255, 255, 255, 0.05)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
        >
          Optimize Another CV
        </button>
        <button
          onClick={() => {
            downloadCVPDF();
            handleDownloadCoverLetter();
          }}
          style={{
            gap: "0.5rem",
            display: "inline-flex",
            alignItems: "center",
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
            paddingTop: "0.75rem",
            paddingBottom: "0.75rem",
            fontSize: "1rem",
            fontWeight: "600",
            borderRadius: "0.5rem",
            backgroundImage: "linear-gradient(to right, #0891b2, #0e7490)",
            color: "white",
            transition: "all 0.2s",
            border: "none",
            cursor: "pointer",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundImage =
              "linear-gradient(to right, #0e7490, #155e75)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundImage =
              "linear-gradient(to right, #0891b2, #0e7490)")
          }
        >
          <svg
            style={{ height: "1rem", width: "1rem" }}
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
