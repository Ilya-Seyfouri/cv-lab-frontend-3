"use client";

import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function FAQ() {
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
      <section id="faq" className="scroll-mt-15">
        <div className="container">
          <div className="pt-30 lg:pt-15 pb-30 lg:pb-30 flex flex-col justify-center items-center px-4 lg:px-0">
            <div className="text-center">
              <h2 className="text-4xl lg:text-6xl">We've got the answers</h2>
            </div>
            <div className="pt-4 lg:pt-8 text-center">
              <p className="text-lg lg:text-2xl text-white/50 px-4 lg:pb-5">
                Discover everything you need to know about CV Lab.
              </p>
            </div>
            <div className="mt-8 lg:mt-12 flex flex-col gap-4 lg:gap-6 w-full max-w-4xl px-4 lg:px-0">
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className="border-b border-white/10 pb-4 lg:pb-6 py-3 lg:py-5"
                >
                  <div
                    className="flex justify-between items-start lg:items-center gap-4 cursor-pointer"
                    onClick={() =>
                      setSelectedIndex(selectedIndex === index ? null : index)
                    }
                  >
                    <h3 className="font-semibold text-base lg:text-lg text-left pr-2">
                      {faq.question}
                    </h3>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={twMerge(
                        "feather feather-plus text-cyan-400 flex-shrink-0 transition duration-300 lg:w-6 lg:h-6",
                        selectedIndex == index && "rotate-45"
                      )}
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
                        className={twMerge("overflow-hidden")}
                      >
                        <p className="text-white/50 text-sm lg:text-base leading-relaxed">
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
