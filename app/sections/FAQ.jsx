"use client";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
export default function FAQ() {
  const faqs = [
    {
      question: "How does it work?",
      answer:
        "Our AI reads your CV and the job description side by side. Unlike general AI tools, it’s purpose-built for CVs and ATS. It understands what the employer is looking for, reshapes your experience to match, and rewrites your CV and cover letter so they’re fully aligned and ready for ATS screening.",
    },
    {
      question: "How is it different from ChatGPT?",
      answer:
        "Unlike ChatGPT, our platform is specialized for job applications. It uses proprietary algorithms trained on real-world hiring data to tailor CVs and cover letters specifically for applicant tracking systems (ATS) and recruiter preferences.",
    },
    {
      question: "How does the CV tailoring process work?",
      answer:
        "You upload your CV and paste the job description. Our AI compares them side by side, spots what matters most for that role, and rewrites your CV to highlight your most relevant skills and experience while keeping it professional and ATS-friendly.",
    },
    {
      question: "How does the Cover Letter feature work?",
      answer:
        "Our AI uses your CV and the job description to draft a tailored cover letter for that specific role. It highlights your most relevant experience, explains why you’re a strong fit, and keeps the tone professional. You can review and edit the letter before sending.",
    },
    {
      question: "How does the skills analysis feature work?",
      answer:
      "Our AI reviews your CV against the job description and generates a detailed skills-match assessment. You’ll receive metrics such as ATS Compatibility, Keyword Match, and Role Match, along with a breakdown of missing or under-represented skills. For each gap, we provide clear, role-specific guidance on how to strengthen your CV, highlight transferable experience, and improve keyword alignment. You’ll also receive a structured summary, key improvements made, and a side-by-side comparison of your CV against the job’s core requirements."    },
    {
      question: "What industries or job markets does it support?",
      answer:
        "Our AI works across a wide range of industries – from tech, finance and healthcare to creative roles and academia. It’s trained on real job postings and adapts to different sectors and seniority levels, so whether you’re applying for an internship or a senior role, it can tailor your CV accordingly.",
    },
    {
      question: "Is there a free version?",
      answer:
        "Yes. You can start with a free plan that lets you try CV and cover letter optimisation on a limited number of applications. When you’re ready, paid plans unlock more tokens, and ongoing ATS-focused optimisation for every role you apply for.",
    },
  ];
  const [selectedIndex, setSelectedIndex] = useState(null);
  return (
    <>
      <section id="faq" className="scroll-mt-15">
        <div className="container">
          <div className="pt-30 lg:pt-15 pb-30 lg:pb-30 flex flex-col justify-center items-center px-4 lg:px-0">
            <div className="text-center">
              <h2 className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text font-semibold text-transparent text-4xl lg:text-6xl leading-normal pb-1">
                We've got the answers
              </h2>
            </div>
            <div className="pt-1 text-center">
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
