"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Menu, X, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import image32 from "../../../images/maintain_cv_formatting_with_ai.png";
import Image from "next/image";

// Blog content structure
const blogContent = {
  title:
    "ATS Resume Checkers and Keyword Scanners: Do They Really Work?",
  date: "Updated January 2025",
  intro:
    "If you're applying for jobs online, you've already gone through an ATS — whether you know it or not. Applicant Tracking Systems scan every resume before a human recruiter ever sees it. They filter out candidates who don't match the job description closely enough or who haven't formatted their resume properly.",
  subtitle:
    "Because of this, ATS resume checkers and resume keyword scanners have become popular tools for job seekers. But do they actually work? And do they really help you get past the filters?",
  sections: [
    {
      id: "what-is-ats-checker",
      title: "What Is an ATS Resume Checker?",
      content: [
        {
          text: "An ATS resume checker is a tool that simulates how Applicant Tracking Systems analyse your resume. It looks for:",
        },
      ],
      features: [
        "Required keywords",
        "Skills alignment",
        "Formatting issues",
        "Missing sections",
        "ATS readability",
        "Job match scores",
      ],
      conclusion:
        "These tools help you understand whether your resume can pass an ATS filter before you apply.",
      keywords:
        "Relevant keywords: ats resume checker, ats resume tool, ats cv checker, ats resume scan.",
    },
    {
      id: "what-is-keyword-scanner",
      title: "What Is a Resume Keyword Scanner?",
      content: [
        {
          text: "A resume keyword scanner checks your resume for keywords that appear in the job description. It highlights what's missing so you can add relevant terms.",
        },
        {
          subtitle: "Keyword scanners look for:",
          text: "",
        },
      ],
      scannerFeatures: [
        "Technical skills",
        "Soft skills",
        "Software tools",
        "Certifications",
        "Action verbs",
        "Industry terminology",
      ],
      keywords: "Keywords supported: resume keyword scanner, cv keyword scanner.",
    },
    {
      id: "how-ats-works",
      title: "How ATS Systems Actually Work",
      content: [
        {
          text: "Understanding this helps you use ATS tools correctly.",
        },
        {
          text: "ATS systems don't read resumes like a human. Instead, they:",
        },
      ],
      process: [
        "Break your resume into sections",
        "Extract keywords and skills",
        "Compare them against the job description",
        "Assign a relevance score",
        "Rank candidates",
        "Filter out weak matches",
      ],
      warning:
        "If your resume is missing key terms or uses the wrong formatting, the system will likely reject it.",
      conclusion: "This is why job match scores and keyword scanners matter.",
    },
    {
      id: "do-they-work",
      title: "Do ATS Checkers and Keyword Scanners Actually Work?",
      intro: "Short answer: Yes — when used correctly.",
      subtitle: "Here's how.",
      benefits: [
        {
          number: "1",
          title: "ATS Checkers Accurately Detect Formatting Issues",
          description: "Most rejections happen because resumes are not ATS friendly.",
          subheading: "A good ATS resume checker can detect:",
          items: [
            "Headers ATS can't read",
            "Columns that break parsing",
            "Tables that hide content",
            "Images in place of text",
            "Incorrect file formats",
            "Hidden characters",
            "Missing section titles",
          ],
          conclusion: "Fixing these alone can drastically improve your ATS score.",
        },
        {
          number: "2",
          title: "Keyword Scanners Accurately Identify Missing Skills",
          description:
            "Most job seekers fail because they assume they've added the right keywords.",
          subheading: "Keyword scanners test this precisely by:",
          items: [
            "Comparing your resume with the job description",
            "Finding missing hard skills",
            "Finding missing soft skills",
            "Highlighting tool-specific gaps",
            "Showing where your skills appear too infrequently",
          ],
          conclusion: "This directly supports job description—resume matching.",
        },
        {
          number: "3",
          title: "AI Tools Improve Accuracy Over Manual Keyword Matching",
          description:
            "With AI, resume matching becomes more advanced. AI resume analysers can:",
          items: [
            "Recognise synonyms",
            "Understand context",
            "Detect related skills",
            "Identify measurable achievements",
            "Rewrite weak bullet points",
          ],
          conclusion:
            "This is far more accurate than manual keyword checks or older scanning tools.",
          keywords: "Keywords: resume analyser ai, resume rewriter ai.",
        },
        {
          number: "4",
          title: "ATS Checkers Predict Your ATS Resume Score",
          description:
            "Many tools now generate a score showing how likely your resume is to pass ATS.",
          subheading: "ATS resume score factors include:",
          items: [
            "Keyword match score",
            "Skills alignment",
            "Content relevance",
            "Formatting quality",
            "Section structure",
            "Readability",
            "File compatibility",
          ],
          conclusion:
            "If your ats resume score is low, your application is unlikely to reach a recruiter.",
        },
      ],
    },
    {
      id: "what-they-cant-do",
      title: "What ATS Checkers Can't Do",
      intro: "To keep expectations real:",
      limitations: [
        {
          title: "They don't guarantee a job",
          description: "ATS compliance gets you seen, not hired.",
        },
        {
          title: "They can't fix bad content automatically",
          description: "You still need to tailor your resume to the job.",
        },
        {
          title: "They don't understand the deeper story",
          description:
            "A human recruiter looks for impact, clarity, and progression.",
        },
      ],
      conclusion: "This is why pairing ATS tools with AI rewriting is the strongest strategy.",
    },
    {
      id: "keyword-scanner-shortfalls",
      title: "Where Keyword Scanners Fall Short",
      intro: "Some keyword scanners:",
      issues: [
        "Recommend too many irrelevant keywords",
        "Encourage keyword stuffing",
        "Miss soft skills",
        "Misread complex job descriptions",
      ],
      conclusion:
        "This is why modern AI resume keyword scanners — which understand context — perform better.",
    },
    {
      id: "best-way-to-use",
      title: "The Best Way to Use ATS Resume Checkers",
      content: [
        {
          text: "ATS tools are most effective when you use them as part of a workflow:",
        },
      ],
      workflow: [
        "Upload your resume",
        "Paste the job description",
        "Run keyword scan",
        "Identify missing skills",
        "Use AI to rewrite weak bullet points",
        "Fix formatting issues",
        "Re-check ATS score",
        "Export your optimised resume",
      ],
      conclusion: "This ensures your resume is both ATS-ready and job-specific.",
    },
    {
      id: "cvlab-solution",
      title: "CVLab: ATS Checking + Keyword Scanning + Tailoring in One Tool",
      intro: "CVLab combines several tools into one:",
      tool: {
        name: "CVLab",
        features: [
          "ATS resume checker",
          "Resume keyword scanner",
          "Job match score",
          "Resume analyser AI",
          "Skills gap analysis",
          "AI resume rewriting",
          "Cover letter generator from job description",
          "Formatting preservation",
        ],
        description:
          "It reads your resume like an ATS, matches it to the job description, rewrites content for relevance, and boosts your keyword alignment — all without breaking your formatting.",
      },
    },
    {
      id: "final-verdict",
      title: "So, Do ATS Resume Checkers and Keyword Scanners Work?",
      intro: "Yes — but only if you:",
      requirements: [
        "Tailor your resume to the job description",
        "Add the right keywords naturally",
        "Fix ATS formatting",
        "Improve weak bullet points",
        "Analyse skill gaps",
        "Use AI to refine your content",
      ],
      conclusions: [
        "ATS tools help you get past filtering.",
        "Keyword scanners help you align with the job posting.",
        "AI rewriting helps you sound professional and relevant.",
      ],
      finalStatement:
        "Together, they significantly increase your chances of getting interviews.",
    },
  ],
};

// Table of Contents items
const tocItems = blogContent.sections.map((section) => ({
  id: section.id,
  title: section.title,
}));

export default function BlogPost() {
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
      {/* Background gradient effects */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="absolute top-1/3 right-0 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 left-0 h-[400px] w-[400px] rounded-full bg-cyan-400/5 blur-3xl" />
      </div>

      {/* Mobile TOC Toggle */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-black/90 backdrop-blur-sm transition-all hover:border-cyan-500/40 lg:hidden"
      >
        {mobileMenuOpen ? (
          <X className="h-6 w-6 text-cyan-300" />
        ) : (
          <Menu className="h-6 w-6 text-cyan-300" />
        )}
      </button>

      {/* Mobile TOC Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-24 right-6 z-50 w-72 rounded-2xl border border-white/10 bg-black/95 p-4 backdrop-blur-sm lg:hidden"
        >
          <h3 className="mb-3 text-sm font-semibold text-cyan-300">
            Table of Contents
          </h3>
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
                <ChevronRight
                  className={`h-4 w-4 transition-transform ${
                    activeSection === item.id
                      ? "text-cyan-300"
                      : "text-white/30"
                  }`}
                />
                <span className="line-clamp-1">{item.title}</span>
              </button>
            ))}
          </nav>
        </motion.div>
      )}

      <div className="container mx-auto max-w-6xl px-4 py-12 lg:py-20">
        {/* Back to blog link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-cyan-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </motion.div>

        <div className="flex gap-12">
          {/* Desktop Sidebar TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 w-64">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm"
              >
                <h3 className="mb-4 text-sm font-semibold tracking-wide text-cyan-300">
                  Table of Contents
                </h3>
                <nav className="space-y-1">
                  {tocItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      onClick={() => scrollToSection(item.id)}
                      className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-all ${
                        activeSection === item.id
                          ? "bg-cyan-500/10 text-cyan-300"
                          : "text-white/60 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <ChevronRight
                        className={`h-4 w-4 flex-shrink-0 transition-transform ${
                          activeSection === item.id
                            ? "translate-x-1 text-cyan-300"
                            : "text-white/30"
                        }`}
                      />
                      <span className="line-clamp-2">{item.title}</span>
                    </motion.button>
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
              <p className="mb-4 text-sm font-semibold tracking-wide text-cyan-300">
                {blogContent.date}
              </p>
              <h1 className="mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-3xl font-semibold leading-tight text-transparent md:text-4xl lg:text-5xl">
                {blogContent.title}
              </h1>
              
              <div className="mb-8 overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src={image32}
                  alt="ATS resume formatting and keyword scanning illustration"
                  className="w-full h-120 object-cover"
                />
              </div>
              <p className="text-base text-white/60 md:text-lg">
                {blogContent.intro}
              </p>
              <p className="mt-4 text-base text-white/60 md:text-lg">
                {blogContent.subtitle}
              </p>
              <p className="mt-6 text-base text-white/60 md:text-lg">
                This guide explains what ATS checkers do, how they work, what
                they get right, what they miss, and how to use them properly to
                increase your interview chances.
              </p>
            </motion.header>

            {/* Blog Sections */}
            <div className="space-y-16">
              {blogContent.sections.map((section) => (
                <motion.section
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="scroll-mt-24"
                >
                  <h2 className="mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-2xl font-semibold text-transparent md:text-3xl">
                    {section.title}
                  </h2>

                  {/* Intro text */}
                  {section.intro && (
                    <p className="mb-4 text-base text-white/60 md:text-lg">
                      {section.intro}
                    </p>
                  )}

                  {section.subtitle && (
                    <p className="mb-6 text-base font-medium text-white/80 md:text-lg">
                      {section.subtitle}
                    </p>
                  )}

                  {/* Regular content */}
                  {section.content && (
                    <div className="space-y-4">
                      {section.content.map((item, index) => (
                        <div key={index}>
                          {item.subtitle && (
                            <h3 className="mb-2 text-lg font-semibold text-white md:text-xl">
                              {item.subtitle}
                            </h3>
                          )}
                          {item.text && (
                            <p className="text-base text-white/60 md:text-lg">
                              {item.text}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Features list */}
                  {section.features && (
                    <div className="mt-6 rounded-2xl border border-white/5 bg-white/5 p-6">
                      <ul className="grid gap-3 sm:grid-cols-2">
                        {section.features.map((feature, fIndex) => (
                          <li
                            key={fIndex}
                            className="flex items-center gap-2 text-sm text-white/60 md:text-base"
                          >
                            <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-cyan-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      {section.conclusion && (
                        <p className="mt-4 text-sm text-white/70">
                          {section.conclusion}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Scanner features */}
                  {section.scannerFeatures && (
                    <div className="mt-6 rounded-2xl border border-white/5 bg-white/5 p-6">
                      <ul className="grid gap-3 sm:grid-cols-2">
                        {section.scannerFeatures.map((feature, fIndex) => (
                          <li
                            key={fIndex}
                            className="flex items-center gap-2 text-sm text-white/60 md:text-base"
                          >
                            <ChevronRight className="h-4 w-4 flex-shrink-0 text-cyan-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Process steps */}
                  {section.process && (
                    <div className="mt-6">
                      <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
                        <ol className="space-y-3">
                          {section.process.map((item, itemIndex) => (
                            <li
                              key={itemIndex}
                              className="flex items-center gap-3 text-sm text-white/60 md:text-base"
                            >
                              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-xs font-semibold text-cyan-300">
                                {itemIndex + 1}
                              </span>
                              {item}
                            </li>
                          ))}
                        </ol>
                      </div>
                      {section.warning && (
                        <div className="mt-4 rounded-xl bg-yellow-500/10 p-4">
                          <p className="text-sm font-medium text-yellow-300/80">
                            ⚠️ {section.warning}
                          </p>
                        </div>
                      )}
                      {section.conclusion && (
                        <p className="mt-4 text-base text-white/70">
                          {section.conclusion}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Benefits (numbered sections) */}
                  {section.benefits && (
                    <div className="space-y-6">
                      {section.benefits.map((benefit, bIndex) => (
                        <motion.div
                          key={bIndex}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: bIndex * 0.1 }}
                          className="rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm"
                        >
                          <div className="mb-3 flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
                              <span className="text-sm font-bold text-cyan-300">
                                {benefit.number}
                              </span>
                            </div>
                            <h3 className="text-lg font-semibold text-white">
                              {benefit.title}
                            </h3>
                          </div>
                          <p className="mb-4 text-sm text-white/60 md:text-base">
                            {benefit.description}
                          </p>

                          {benefit.subheading && (
                            <p className="mb-3 text-sm font-semibold text-white/80">
                              {benefit.subheading}
                            </p>
                          )}

                          {benefit.items && (
                            <ul className="mb-4 space-y-2">
                              {benefit.items.map((item, iIndex) => (
                                <li
                                  key={iIndex}
                                  className="flex items-center gap-2 text-sm text-white/60"
                                >
                                  <ChevronRight className="h-4 w-4 flex-shrink-0 text-cyan-500/60" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          )}

                          <p className="text-sm font-medium text-cyan-300/80">
                            {benefit.conclusion}
                          </p>

                          {benefit.keywords && (
                            <div className="mt-3 rounded-lg bg-white/5 p-3">
                              <p className="text-xs italic text-white/50">
                                {benefit.keywords}
                              </p>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Limitations */}
                  {section.limitations && (
                    <div className="space-y-4">
                      {section.limitations.map((limitation, lIndex) => (
                        <div
                          key={lIndex}
                          className="rounded-xl border border-red-500/20 bg-red-500/5 p-5"
                        >
                          <h3 className="mb-2 flex items-center gap-2 text-base font-semibold text-white">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/20 text-xs font-bold text-red-300">
                              {lIndex + 1}
                            </span>
                            {limitation.title}
                          </h3>
                          <p className="ml-8 text-sm text-white/60">
                            {limitation.description}
                          </p>
                        </div>
                      ))}
                      {section.conclusion && (
                        <div className="mt-6 rounded-xl bg-cyan-500/10 p-4">
                          <p className="text-sm text-cyan-300/90">
                            💡 {section.conclusion}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Issues list */}
                  {section.issues && (
                    <div className="mt-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6">
                      <ul className="space-y-3">
                        {section.issues.map((issue, iIndex) => (
                          <li
                            key={iIndex}
                            className="flex items-center gap-2 text-sm text-white/60"
                          >
                            <X className="h-4 w-4 flex-shrink-0 text-yellow-400/60" />
                            {issue}
                          </li>
                        ))}
                      </ul>
                      {section.conclusion && (
                        <p className="mt-4 text-sm font-medium text-cyan-300/80">
                          ✓ {section.conclusion}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Workflow */}
                  {section.workflow && (
                    <div className="mt-6">
                      <div className="rounded-2xl border border-white/5 bg-white/5 p-6 md:p-8">
                        <ol className="space-y-3">
                          {section.workflow.map((item, itemIndex) => (
                            <li
                              key={itemIndex}
                              className="flex items-center gap-3 text-sm text-white/60 md:text-base"
                            >
                              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-xs font-semibold text-cyan-300">
                                {itemIndex + 1}
                              </span>
                              {item}
                            </li>
                          ))}
                        </ol>
                      </div>
                      {section.conclusion && (
                        <div className="mt-4 rounded-xl bg-cyan-500/10 p-4">
                          <p className="text-sm text-cyan-300/90">
                            ✓ {section.conclusion}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* CVLab Tool showcase */}
                  {section.tool && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="group relative rounded-3xl border border-cyan-500/40 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-[1px] backdrop-blur-sm"
                    >
                      <div className="rounded-3xl bg-black/60 p-6 md:p-8">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-cyan-500/20 px-3 py-1 text-sm font-semibold text-cyan-300">
                          ⭐ All-in-One Solution
                        </div>

                        <h3 className="mb-6 text-xl font-semibold text-white md:text-2xl">
                          {section.tool.name}
                        </h3>

                        <div className="mb-6">
                          <ul className="grid gap-2 sm:grid-cols-2">
                            {section.tool.features.map((feature, fIndex) => (
                              <li
                                key={fIndex}
                                className="flex items-start gap-2 text-sm text-white/60"
                              >
                                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-cyan-500/60" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="rounded-xl bg-cyan-500/10 p-4">
                          <p className="text-sm text-white/80">
                            {section.tool.description}
                          </p>
                        </div>

                        <div className="mt-6">
                          <motion.a
                            href="#"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-3 font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:shadow-cyan-500/40"
                          >
                            Try CVLab for Free
                            <ChevronRight className="h-5 w-5" />
                          </motion.a>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Requirements list */}
                  {section.requirements && (
                    <div className="mt-6 rounded-2xl border border-white/5 bg-white/5 p-6 md:p-8">
                      <ul className="space-y-3">
                        {section.requirements.map((req, rIndex) => (
                          <li
                            key={rIndex}
                            className="flex items-center gap-3 text-sm text-white/60 md:text-base"
                          >
                            <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-cyan-500" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Conclusions */}
                  {section.conclusions && (
                    <div className="mt-6 space-y-3">
                      {section.conclusions.map((conclusion, cIndex) => (
                        <div
                          key={cIndex}
                          className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4"
                        >
                          <p className="text-sm font-medium text-cyan-300">
                            {conclusion}
                          </p>
                        </div>
                      ))}
                      {section.finalStatement && (
                        <div className="mt-6 rounded-2xl border border-cyan-500/40 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-6">
                          <p className="text-center text-base font-semibold text-white md:text-lg">
                            {section.finalStatement}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Keywords */}
                  {section.keywords && (
                    <div className="mt-6 rounded-xl bg-white/5 p-4">
                      <p className="text-sm italic text-white/50">
                        {section.keywords}
                      </p>
                    </div>
                  )}
                </motion.section>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}