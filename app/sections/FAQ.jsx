"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function FAQ() {
  const w = typeof window === "undefined" ? 0 : window.innerWidth;

  const faqs = [
    {
      question: "How does it work?",
      answer:
        "Our AI analyzes your CV and the target job description using natural language processing. It identifies key skills, experience, and phrasing that match the employer's expectations, then rewrites and optimizes your CV and cover letter for maximum alignment.",
    },
    {
      question: "How is it different from ChatGPT?",
      answer:
        "Unlike ChatGPT, our platform is specialized for job applications. It uses proprietary algorithms trained on real-world hiring data to tailor CVs and cover letters specifically for applicant tracking systems (ATS) and recruiter preferences.",
    },
    {
      question: "How does the CV tailoring process work?",
      answer:
        "You upload your existing CV and paste the job description. The AI compares both, highlights gaps, and automatically rewrites your CV to emphasize relevant skills, experience, and keywords while keeping it professional and ATS-friendly.",
    },
    {
      question: "How does the Cover Letter feature work?",
      answer:
        "The AI drafts a personalized cover letter based on your CV and the job description. It ensures your tone, achievements, and motivation match the company's culture and role requirements. You can fine-tune the letter manually afterward.",
    },
    {
      question: "How does the mock interview feature work?",
      answer:
        "The mock interview tool simulates real interview scenarios using AI-generated questions based on the role and industry. You can answer verbally or in writing, and the AI provides instant feedback on your responses, confidence, and structure.",
    },
    {
      question: "What industries or job markets does it support?",
      answer:
        "Our AI supports a wide range of industries — from tech, finance, and healthcare to creative roles and academia. It's trained on thousands of job postings and adapts automatically to different sectors and seniority levels.",
    },
    {
      question: "Is there a free version?",
      answer:
        "Yes. You can try the platform for free with limited features such as one CV and cover letter optimization. Premium plans unlock unlimited tailoring, advanced analytics, and full mock interview simulations.",
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <>
      <section id="faq" style={{ scrollMarginTop: "3.75rem" }}>
        <div
          style={{
            maxWidth: "1280px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div
            style={{
              paddingTop: w >= 1024 ? "3.75rem" : "7.5rem",
              paddingBottom: w >= 1024 ? "7.5rem" : "7.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: w >= 1024 ? "0" : "1rem",
              paddingRight: w >= 1024 ? "0" : "1rem",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <h2
                style={{
                  fontSize: w >= 1024 ? "3.75rem" : "2.25rem",
                }}
              >
                We've got the answers
              </h2>
            </div>
            <div
              style={{
                paddingTop: w >= 1024 ? "2rem" : "1rem",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize: w >= 1024 ? "1.5rem" : "1.125rem",
                  color: "rgba(255, 255, 255, 0.5)",
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                  paddingBottom: w >= 1024 ? "1.25rem" : "0",
                }}
              >
                Discover everything you need to know about CV Lab.
              </p>
            </div>
            <div
              style={{
                marginTop: w >= 1024 ? "3rem" : "2rem",
                display: "flex",
                flexDirection: "column",
                gap: w >= 1024 ? "1.5rem" : "1rem",
                width: "100%",
                maxWidth: "56rem",
                paddingLeft: w >= 1024 ? "0" : "1rem",
                paddingRight: w >= 1024 ? "0" : "1rem",
              }}
            >
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  style={{
                    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                    paddingBottom: w >= 1024 ? "1.5rem" : "1rem",
                    paddingTop: w >= 1024 ? "1.25rem" : "0.75rem",
                    paddingLeft: w >= 1024 ? "1.25rem" : "0.75rem",
                    paddingRight: w >= 1024 ? "1.25rem" : "0.75rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: w >= 1024 ? "center" : "flex-start",
                      gap: "1rem",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      setSelectedIndex(selectedIndex === index ? null : index)
                    }
                  >
                    <h3
                      style={{
                        fontWeight: "600",
                        fontSize: w >= 1024 ? "1.125rem" : "1rem",
                        textAlign: "left",
                        paddingRight: "0.5rem",
                        color: "white",
                      }}
                    >
                      {faq.question}
                    </h3>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={w >= 1024 ? "24" : "20"}
                      height={w >= 1024 ? "24" : "20"}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        color: "#22d3ee",
                        flexShrink: 0,
                        transition: "transform 0.3s",
                        transform:
                          selectedIndex === index
                            ? "rotate(45deg)"
                            : "rotate(0deg)",
                      }}
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </div>
                  <AnimatePresence>
                    {selectedIndex === index && (
                      <motion.div
                        initial={{ height: 0, marginTop: 0 }}
                        animate={{
                          height: "auto",
                          marginTop: 16,
                        }}
                        exit={{
                          height: 0,
                          marginTop: 0,
                        }}
                        style={{ overflow: "hidden" }}
                      >
                        <p
                          style={{
                            color: "rgba(255, 255, 255, 0.5)",
                            fontSize: w >= 1024 ? "1rem" : "0.875rem",
                            lineHeight: "1.625",
                          }}
                        >
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
