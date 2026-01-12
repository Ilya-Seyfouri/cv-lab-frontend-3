"use client";

import { createContext, useContext, useState, useCallback } from "react";

const GenerationContext = createContext();

export function GenerationProvider({ children }) {
  // All generation-related state consolidated here
  const [generationState, setGenerationState] = useState({
    // CV Upload state
    jobDescription: "",
    userCV: "",
    cvFile: null,
    isDragging: false,

    // Generation progress state
    isCompilingAll: false,
    isGeneratingCV: false,
    isGeneratingCoverLetter: false,
    isCompilingCV: false,
    isCompilingCoverLetter: false,
    cvProgress: 0,
    coverLetterProgress: 0,
    processingStep: "idle", // "idle" | "uploading" | "analyzing" | "optimizing" | "complete"

    // Generated content
    generatedCV: "",
    generatedCoverLetter: "",
    cvPdfData: null,
    coverLetterPdfData: null,

    // Analysis results
    matchScore: 0,
    matchReason: "",
    ATSScore: 0,
    keywordMatchScore: 0,
    evidenceMap: {},
    missingSkills: [],
    gapBridges: {},
    showAnalysis: false,

    // Error handling
    error1: "",
  });

  // ✅ NEW: Track when a new generation is saved
  const [lastGenerationTime, setLastGenerationTime] = useState(null);

  // Update function with merge behavior
  const updateGenerationState = useCallback((updates) => {
    setGenerationState((prev) => ({ ...prev, ...updates }));
  }, []);

  // ✅ NEW: Call this after saving a generation to trigger refetch in Account
  const markNewGeneration = useCallback(() => {
    setLastGenerationTime(Date.now());
  }, []);

  // Reset function to clear all generation data
  const resetGenerationState = useCallback(() => {
    setGenerationState({
      jobDescription: "",
      userCV: "",
      cvFile: null,
      isDragging: false,
      ATSScore: 0,
      isCompilingAll: false,
      isGeneratingCV: false,
      keywordMatchScore: 0,
      isGeneratingCoverLetter: false,
      isCompilingCV: false,
      isCompilingCoverLetter: false,
      cvProgress: 0,
      coverLetterProgress: 0,
      processingStep: "idle",
      generatedCV: "",
      generatedCoverLetter: "",
      cvPdfData: null,
      coverLetterPdfData: null,
      matchScore: 0,
      matchReason: "",
      evidenceMap: {},
      missingSkills: [],
      gapBridges: {},
      showAnalysis: false,
      error1: "",
    });
  }, []);

  return (
    <GenerationContext.Provider
      value={{
        generationState,
        updateGenerationState,
        resetGenerationState,
        lastGenerationTime, // ✅ NEW
        markNewGeneration, // ✅ NEW
      }}
    >
      {children}
    </GenerationContext.Provider>
  );
}

export function useGeneration() {
  const context = useContext(GenerationContext);
  if (!context) {
    throw new Error("useGeneration must be used within GenerationProvider");
  }
  return context;
}
