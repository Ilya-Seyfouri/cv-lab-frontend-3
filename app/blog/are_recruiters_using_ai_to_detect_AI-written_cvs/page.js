"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Menu, X, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import heroImage from "../../../images/graduate_job_market_2026_what_students_need_to_know.png";

// Blog content structure
const blogContent = {
  title: "Are Recruiters Using AI to Detect AI-Written CVs?",
  date: "January 2025",
  category: "Career Insights",
  readTime: "6 min read",

  intro: [
    "Yes — and it's becoming more common across the UK job market.",
    "As more students and graduates use AI tools to help write their CVs, recruiters are responding by introducing AI detection and language-analysis tools into their hiring process. These tools are designed to spot CVs that sound overly generic or mass-produced, especially those written entirely by AI.",
    "Recruiters aren't trying to ban AI — but they are trying to filter out low-effort applications.",
  ],

  sections: [
    {
      id: "how-detection-works",
      title: "How AI CV Detection Tools Work",
      content: [
        "AI detection systems don't check which tool you used. Instead, they analyse how your CV is written.",
        "They look for patterns such as:",
      ],
      list: [
        "Repeated sentence structures",
        "Over-polished but vague wording",
        "Heavy use of buzzwords with no examples",
        "Skills listed without explanation or results",
      ],
      afterList:
        "CVs created using tools like ChatGPT, Claude, or Google Gemini — and not edited by the student — often share the same language patterns. This makes them easier for systems to flag.",
    },
    {
      id: "why-rejected",
      title: "Why Generic AI CVs Get Rejected",
      content: [
        "Recruiters review hundreds, sometimes thousands, of CVs. When many applications sound almost identical, it becomes difficult to tell candidates apart.",
        "According to Prospects UK, over two-thirds of large employers have noticed a rise in AI-generated or AI-assisted CVs, leading many to tighten their screening process. Some employers now automatically reject CVs that appear too generic before a human even reads them.",
        "From a recruiter's point of view, generic CVs raise concerns:",
      ],
      list: [
        "They don't clearly show how skills were gained",
        "They avoid specific examples or achievements",
        "They suggest the candidate may struggle to explain their experience in an interview",
      ],
    },
    {
      id: "is-ai-bad",
      title: "Is Using AI on Your CV a Bad Idea?",
      content: [
        "No — using AI is not the problem.",
        "The issue is submitting a CV that looks like it was copied and pasted straight from an AI tool.",
        "Many recruiters openly accept that students use AI for:",
      ],
      list: [
        "Improving grammar and spelling",
        "Structuring their CV properly",
        "Matching keywords to job descriptions",
      ],
      afterList:
        "What they don't want to see is a CV that lacks personality, detail, or proof of real experience.",
    },
    {
      id: "use-ai-smartly",
      title: "How Students Can Use AI Without Getting Flagged",
      content: [
        "If you choose to use AI, use it smartly.",
        "Here's how to stay safe:",
      ],
      list: [
        "Always rewrite AI content in your own words",
        "Add specific examples from your studies, jobs, or placements",
        "Include numbers or results where possible",
        'Avoid vague phrases like "excellent communication skills" without proof',
        "Make sure you can explain everything on your CV in an interview",
      ],
      afterList:
        "When AI is used as a support tool, not a replacement, your CV is far less likely to be flagged by detection systems.",
    },
  ],

  conclusion: {
    title: "Final Thoughts: Sound Human, Not Perfect",
    content: [
      "In 2026, the strongest student CVs are not the most polished — they are the most authentic.",
      "AI can help you write faster and smarter, but recruiters still want to see your story, your effort, and your understanding of the role. A CV that sounds human, specific, and honest will always perform better than one that sounds perfect but empty.",
    ],
  },
};

// Table of Contents
const tocItems = blogContent.sections.map((section) => ({
  id: section.id,
  title: section.title,
}));

export default function AIDetectionCVs() {
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = blogContent.sections.map((s) => s.id);
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-5">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="absolute top-1/3 right-0 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      {/* Mobile TOC Toggle */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-black/90 backdrop-blur-sm hover:border-cyan-500/40 lg:hidden"
      >
        {mobileMenuOpen ? (
          <X className="h-6 w-6 text-cyan-300" />
        ) : (
          <Menu className="h-6 w-6 text-cyan-300" />
        )}
      </button>

      {/* Mobile TOC */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-24 right-6 z-50 w-72 rounded-2xl border border-white/10 bg-black/95 p-4 backdrop-blur-sm lg:hidden"
        >
          <h3 className="mb-3 text-sm font-semibold text-cyan-300">Contents</h3>
          <nav className="space-y-2">
            {tocItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-all ${
                  activeSection === item.id
                    ? "bg-cyan-500/10 text-cyan-300"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <ChevronRight className="h-4 w-4 flex-shrink-0" />
                <span className="line-clamp-2">{item.title}</span>
              </button>
            ))}
          </nav>
        </motion.div>
      )}

      <div className="container mx-auto max-w-6xl px-4 py-12 lg:py-20">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-md px-2 text-white/60 hover:text-cyan-300"
          >
            <ArrowLeft className="h-6 w-6" />
            Back to Blog
          </Link>
        </motion.div>

        <div className="flex gap-12">
          {/* Desktop TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 w-64">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm"
              >
                <h3 className="mb-4 text-sm font-semibold text-cyan-300">
                  Contents
                </h3>
                <nav className="space-y-1">
                  {tocItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-all ${
                        activeSection === item.id
                          ? "bg-cyan-500/10 text-cyan-300"
                          : "text-white/60 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <ChevronRight
                        className={`h-4 w-4 flex-shrink-0 transition-transform ${
                          activeSection === item.id ? "translate-x-1" : ""
                        }`}
                      />
                      <span className="line-clamp-2">{item.title}</span>
                    </button>
                  ))}
                </nav>
              </motion.div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="min-w-0 flex-1">
            {/* Header */}
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <div className="mb-4 flex items-center gap-3 text-sm">
                <span className="rounded-full bg-cyan-500/10 px-3 py-1 font-semibold text-cyan-300">
                  {blogContent.category}
                </span>
                <span className="text-white/40">{blogContent.date}</span>
                <span className="text-white/40">•</span>
                <span className="text-white/40">{blogContent.readTime}</span>
              </div>

              <h1 className="mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-3xl font-semibold leading-tight text-transparent md:text-4xl lg:text-5xl">
                {blogContent.title}
              </h1>

              {/* Hero Image */}
              <div className="mb-8 overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src={heroImage}
                  alt="AI CV Detection by Recruiters"
                  className="w-full h-100 object-cover"
                />
              </div>

              {/* Intro */}
              <div className="space-y-4">
                {blogContent.intro.map((paragraph, index) => (
                  <p key={index} className="text-base text-white/60 md:text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.header>

            {/* Sections */}
            <div className="space-y-12">
              {blogContent.sections.map((section) => (
                <motion.section
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                  className="scroll-mt-24"
                >
                  <h2 className="mb-4 bg-gradient-to-b from-white to-white/60 bg-clip-text text-2xl font-semibold text-transparent md:text-3xl">
                    {section.title}
                  </h2>

                  <div className="space-y-4">
                    {section.content.map((paragraph, pIndex) => (
                      <p
                        key={pIndex}
                        className="text-base text-white/60 md:text-lg leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}

                    {section.list && (
                      <>
                        <ul className="my-4 space-y-2 pl-1">
                          {section.list.map((item, itemIndex) => (
                            <li
                              key={itemIndex}
                              className="flex items-start gap-3 text-base text-white/60 md:text-lg"
                            >
                              <ChevronRight className="mt-1 h-5 w-5 flex-shrink-0 text-cyan-500" />
                              {item}
                            </li>
                          ))}
                        </ul>
                        {section.afterList && (
                          <p className="text-base text-white/60 md:text-lg leading-relaxed">
                            {section.afterList}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </motion.section>
              ))}

              {/* Conclusion */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="scroll-mt-24 rounded-2xl border border-white/5 bg-white/5 p-6 md:p-8"
              >
                <h2 className="mb-4 bg-gradient-to-b from-white to-white/60 bg-clip-text text-2xl font-semibold text-transparent md:text-3xl">
                  {blogContent.conclusion.title}
                </h2>
                <div className="space-y-4">
                  {blogContent.conclusion.content.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-base text-white/60 md:text-lg leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.section>

              <div className="pt-5"></div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
