"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Menu, X, ArrowLeft } from "lucide-react";
import Link from "next/link";

// Blog content structure
const blogContent = {
  title:
    "AI Resume Matchers Explained: How Job Description–Resume Matching Really Works",
  date: "Updated January 2025",
  intro:
    "Most job seekers send the same resume to every application, then wonder why they aren't getting interviews. The truth is simple: your resume probably doesn't match the job description well enough.",
  subtitle:
    "Modern hiring relies heavily on Applicant Tracking Systems (ATS). These systems compare your resume against the job posting and filter out anyone who doesn't match the required skills, keywords, and responsibilities.",
  sections: [
    {
      id: "what-is-ai-matcher",
      title: "What Is an AI Resume Matcher?",
      content: [
        {
          text: "An AI resume matcher is a tool that compares your resume directly against a job description to measure alignment.",
        },
        {
          subtitle: "It answers questions like:",
          text: "",
        },
      ],
      questions: [
        "Does your resume match the job requirements?",
        "Which skills or keywords are missing?",
        "How relevant is your experience?",
        "What is your job match score?",
        "How can you improve your resume for this specific role?",
      ],
      keywords:
        "Related keywords: resume matcher ai, cv matcher ai, job description resume match, resume job match tool.",
    },
    {
      id: "how-matching-works",
      title: "How AI Resume Matching Works (Step-by-Step)",
      steps: [
        {
          step: "1",
          title: "The Tool Reads the Job Description",
          description:
            "AI extracts essential details, including: required skills, preferred skills, technical tools and software, responsibilities, industry keywords, and action verbs and phrasing.",
          highlight:
            'This becomes the "target profile" your resume needs to match.',
        },
        {
          step: "2",
          title: "The Tool Scans Your Resume",
          description:
            "Next, the AI scans every part of your resume: experience, bullet points, skills, certifications, software/tools, achievements, and education.",
          highlight:
            "It identifies what's relevant, what's missing, and what needs improvement.",
          keywords:
            "Keywords supported: resume keyword scanner, cv keyword scanner.",
        },
        {
          step: "3",
          title: "AI Compares the Two Documents",
          description:
            "The resume matcher compares your resume directly against the job description. It looks for: keyword overlap, skill alignment, relevant responsibilities, past experience similar to job duties, missing or weak areas, and ATS formatting issues.",
          highlight: "This creates the foundation for your job match score.",
        },
        {
          step: "4",
          title: "AI Generates a Job Match Score",
          description:
            "This score indicates how well your resume matches the job posting. It usually includes: skill match percentage, keyword match percentage, experience relevance, ATS readability, and overall match rating.",
          highlight:
            "If your job match score is low, your resume is unlikely to be shortlisted.",
          keywords: "Keywords: job match score resume, resume job match tool.",
        },
        {
          step: "5",
          title: "AI Identifies Missing Keywords and Skills",
          description:
            "You'll get a clear list of what the job requires that your resume doesn't include.",
          examples: [
            "Missing technical tools",
            "Missing soft skills",
            "Missing certifications",
            "Missing role-specific tasks",
          ],
          keywords:
            "Used for keywords like: resume skills analysis, skills gap analysis resume.",
        },
        {
          step: "6",
          title: "AI Suggests Tailored Improvements",
          description:
            "A good resume matcher ai doesn't just analyse — it helps you fix issues.",
          features: [
            "Rewrite bullet points",
            "Insert missing keywords naturally",
            "Strengthen action verbs",
            "Link your experience to the job's responsibilities",
            "Rewrite content only (while keeping your formatting)",
          ],
          keywords:
            "Relevant search terms: rewrite resume content only, rewrite bullet points ai, improve resume bullet points.",
        },
        {
          step: "7",
          title: "AI Checks ATS Compatibility",
          description:
            "Even a perfectly matched resume can fail ATS if the formatting is wrong.",
          checks: [
            "Incorrect headers",
            "Non-readable sections",
            "Keyword stuffing",
            "Formatting problems",
            "Missing core sections",
            "ATS issues with templates",
          ],
          keywords:
            "This step uses: ats resume checker, ats resume scan, ats cv tool.",
        },
      ],
    },
    {
      id: "why-more-effective",
      title: "Why AI Resume Matching Is More Effective Than Manual Editing",
      benefits: [
        {
          title: "Humans miss important keywords",
          description:
            "AI doesn't. It reads the job description the way ATS does.",
        },
        {
          title: "AI is faster",
          description:
            "Manual tailoring can take 30–60 minutes per application. AI does it in under a minute.",
        },
        {
          title: "AI improves clarity and structure",
          description:
            "It rewrites your content cleanly while preserving meaning.",
        },
        {
          title: "AI personalises each application",
          description:
            "You get a unique, tailored version of your resume for each job.",
        },
        {
          title: "AI improves your ATS score",
          description:
            "Most candidates fail here. With automated optimisation, you bypass the biggest barrier.",
        },
      ],
    },
    {
      id: "what-makes-good-matcher",
      title: "What Makes a Good AI Resume Matcher?",
      content: [
        {
          text: "A powerful tool should include:",
        },
      ],
      features: [
        "Job description analysis",
        "Resume comparison",
        "Job match score",
        "Keyword detection",
        "Skills gap analysis",
        "Bullet point rewriting",
        "ATS resume checking",
        "Formatting preservation",
        "Cover letter generation",
      ],
      warning: "If your tool can't do these, it's not a true resume matcher.",
    },
    {
      id: "best-matcher-2025",
      title: "Best AI Resume Matcher in 2025",
      tool: {
        name: "CVLab",
        subtitle: "Complete Job Description–Resume Matching",
        description:
          "CVLab is one of the strongest AI resume matchers for tailoring your resume to any job description.",
        features: [
          "Resume matcher AI",
          "Job match score tracking",
          "Resume keyword scanner",
          "ATS resume checker",
          "AI rewriting for bullet points and sections",
          "Skills gap analysis",
          "Cover letter generation from job descriptions",
          "Formatting preservation",
        ],
        conclusion:
          "Instead of guessing what recruiters want, CVLab shows you exactly how to align your resume with the job posting.",
      },
    },
    {
      id: "how-to-use",
      title: "How to Use an AI Resume Matcher Effectively",
      content: [
        {
          text: "You can repeat this workflow for every application with almost no effort.",
        },
      ],
      workflow: [
        "Upload your resume",
        "Paste the job description",
        "Review your job match score",
        "Add missing keywords and skills",
        "Use AI to rewrite weak bullet points",
        "Fix ATS issues",
        "Generate a matching cover letter",
        "Export your tailored resume",
      ],
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
    <div className="min-h-screen bg-black text-white">
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
              <p className="text-base text-white/60 md:text-lg">
                {blogContent.intro}
              </p>
              <p className="mt-4 text-base text-white/60 md:text-lg">
                {blogContent.subtitle}
              </p>

              {/* Intro highlights */}
              <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">
                <h3 className="mb-4 text-lg font-semibold text-white">
                  AI resume matchers fix this problem.
                </h3>
                <p className="text-base text-white/70">
                  They analyse your resume, analyse the job description,
                  calculate a job match score, show you what you're missing, and
                  help you tailor your resume in minutes.
                </p>
              </div>
              <p className="mt-6 text-base text-white/60 md:text-lg">
                This guide breaks down how AI resume matching actually works,
                why it's so effective, and how you can use it to get more
                interviews.
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

                  {/* Questions list */}
                  {section.questions && (
                    <div className="mt-6 space-y-3">
                      {section.questions.map((question, qIndex) => (
                        <div
                          key={qIndex}
                          className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/5 p-4"
                        >
                          <ChevronRight className="mt-1 h-5 w-5 flex-shrink-0 text-cyan-500" />
                          <p className="text-base text-white/70">{question}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Keywords tag */}
                  {section.keywords && (
                    <div className="mt-6 rounded-xl bg-white/5 p-4">
                      <p className="text-sm italic text-white/50">
                        {section.keywords}
                      </p>
                    </div>
                  )}

                  {/* Steps */}
                  {section.steps && (
                    <div className="space-y-6">
                      {section.steps.map((step, stepIndex) => (
                        <motion.div
                          key={step.step}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.4,
                            delay: stepIndex * 0.05,
                          }}
                          className="group relative rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-cyan-500/20 hover:bg-white/10"
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
                              <span className="text-sm font-bold text-cyan-300">
                                {step.step}
                              </span>
                            </div>
                            <div className="flex-1">
                              <h3 className="mb-2 text-lg font-semibold text-white">
                                {step.title}
                              </h3>
                              <p className="text-sm text-white/60 md:text-base">
                                {step.description}
                              </p>

                              {step.highlight && (
                                <p className="mt-3 text-sm font-medium text-cyan-300/80">
                                  💡 {step.highlight}
                                </p>
                              )}

                              {step.examples && (
                                <div className="mt-4">
                                  <p className="mb-2 text-sm font-semibold text-white/80">
                                    Examples:
                                  </p>
                                  <ul className="space-y-2">
                                    {step.examples.map((example, exIndex) => (
                                      <li
                                        key={exIndex}
                                        className="flex items-center gap-2 text-sm text-white/60"
                                      >
                                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-500/60" />
                                        {example}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {step.features && (
                                <div className="mt-4">
                                  <p className="mb-2 text-sm font-semibold text-white/80">
                                    It can:
                                  </p>
                                  <ul className="space-y-2">
                                    {step.features.map((feature, fIndex) => (
                                      <li
                                        key={fIndex}
                                        className="flex items-center gap-2 text-sm text-white/60"
                                      >
                                        <ChevronRight className="h-4 w-4 flex-shrink-0 text-cyan-500/60" />
                                        {feature}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {step.checks && (
                                <div className="mt-4">
                                  <p className="mb-2 text-sm font-semibold text-white/80">
                                    AI checks for:
                                  </p>
                                  <ul className="grid gap-2 sm:grid-cols-2">
                                    {step.checks.map((check, cIndex) => (
                                      <li
                                        key={cIndex}
                                        className="flex items-center gap-2 text-sm text-white/60"
                                      >
                                        <X className="h-4 w-4 flex-shrink-0 text-red-400/60" />
                                        {check}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {step.keywords && (
                                <div className="mt-4 rounded-lg bg-white/5 p-3">
                                  <p className="text-xs italic text-white/50">
                                    {step.keywords}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Benefits list */}
                  {section.benefits && (
                    <div className="space-y-4">
                      {section.benefits.map((benefit, bIndex) => (
                        <motion.div
                          key={bIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: bIndex * 0.1 }}
                          className="rounded-xl border border-white/5 bg-white/5 p-5"
                        >
                          <h3 className="mb-2 flex items-center gap-2 text-base font-semibold text-white">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/20 text-xs font-bold text-cyan-300">
                              {bIndex + 1}
                            </span>
                            {benefit.title}
                          </h3>
                          <p className="ml-8 text-sm text-white/60">
                            {benefit.description}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Features list */}
                  {section.features && (
                    <div className="mt-6 rounded-2xl border border-white/5 bg-white/5 p-6 md:p-8">
                      <ul className="grid gap-3 sm:grid-cols-2">
                        {section.features.map((feature, fIndex) => (
                          <li
                            key={fIndex}
                            className="flex items-center gap-2 text-sm text-white/60 md:text-base"
                          >
                            <ChevronRight className="h-4 w-4 flex-shrink-0 text-cyan-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      {section.warning && (
                        <p className="mt-6 rounded-xl bg-yellow-500/10 p-4 text-sm font-medium text-yellow-300/80">
                          ⚠️ {section.warning}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Tool showcase */}
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
                          ⭐ Recommended
                        </div>

                        <h3 className="mb-1 text-xl font-semibold text-white md:text-2xl">
                          {section.tool.name}
                        </h3>
                        <p className="mb-4 text-sm font-medium text-cyan-300">
                          {section.tool.subtitle}
                        </p>
                        <p className="mb-6 text-base text-white/60">
                          {section.tool.description}
                        </p>

                        <div className="mb-6">
                          <h4 className="mb-3 text-sm font-semibold tracking-wide text-white/80">
                            It includes:
                          </h4>
                          <ul className="grid gap-2 sm:grid-cols-2">
                            {section.tool.features.map((feature, fIndex) => (
                              <li
                                key={fIndex}
                                className="flex items-start gap-2 text-sm text-white/60"
                              >
                                <ChevronRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-cyan-500/60" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="rounded-xl bg-cyan-500/10 p-4">
                          <p className="text-sm text-white/80">
                            {section.tool.conclusion}
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

                  {/* Workflow list */}
                  {section.workflow && (
                    <div className="mt-6">
                      <div className="rounded-2xl border border-white/5 bg-white/5 p-6 md:p-8">
                        <h4 className="mb-4 text-sm font-semibold tracking-wide text-white/80">
                          Your Resume Matching Workflow
                        </h4>
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
                      <div className="mt-6 rounded-xl bg-cyan-500/10 p-4">
                        <p className="text-sm text-cyan-300/90">
                          ✨ {section.content[0].text}
                        </p>
                      </div>
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
