"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Menu, X, ArrowLeft } from "lucide-react";
import Link from "next/link";

// Blog content structure
const blogContent = {
  title:
    "How to Tailor Your Resume to Any Job Description Using AI (2025 Guide)",
  date: "Updated January 2025",
  intro:
    "Most job seekers send the same resume to every role, and ATS systems filter them out instantly. Recruiters expect resumes that match the job description — the skills, keywords, responsibilities, and achievements they care about.",
  subtitle:
    "AI now makes this process fast, accurate, and stress-free. Instead of manually rewriting your resume for every application, AI tools tailor your content, match keywords, analyse skill gaps, and rewrite weak bullet points while keeping your original formatting.",
  sections: [
    {
      id: "why-tailoring-matters",
      title: "Why Tailoring Your Resume Matters",
      content: [
        {
          text: "Before AI tools existed, tailoring a resume meant manually rewriting bullet points, scanning job descriptions for keywords, and hoping the resume passed ATS filters.",
        },
        {
          text: "Today, hiring systems rely heavily on keyword matching, skills alignment, experience relevance, formatting compatibility, and job match scores.",
        },
        {
          text: "A tailored resume ranks higher in ATS, appears more relevant to recruiters, and gives you a measurable advantage over other applicants.",
        },
      ],
    },
    {
      id: "how-ai-tailors",
      title: "How AI Tailors Your Resume Step-by-Step",
      steps: [
        {
          step: "1",
          title: "Upload Your Resume",
          description:
            "Modern AI resume generators import your resume in seconds while keeping your formatting intact. Good tools detect every section automatically: work experience, skills, education, certifications, and achievements.",
          highlight:
            "This solves a major user problem: maintain resume formatting AI.",
        },
        {
          step: "2",
          title: "Paste the Job Description",
          description:
            "AI then analyses the role you're applying for. It extracts required skills, preferred skills, responsibilities, tools and software, action verbs, and industry keywords.",
          highlight: "This powers the job description–resume match process.",
        },
        {
          step: "3",
          title: "AI Generates a Job Match Score",
          description:
            "A good tailoring tool shows how well your resume matches the job description. Scores usually measure skill alignment, keyword match, relevance of achievements, industry-specific terms, and ATS compatibility.",
          highlight:
            "This instantly tells you what you're missing before you apply.",
        },
        {
          step: "4",
          title: "AI Highlights Missing Keywords and Skills",
          description:
            "The AI compares your resume to the job description and identifies technical skills you left out, soft skills employers expect, tools or systems mentioned in the role, repetitive or outdated phrasing, and skills gaps affecting your ATS score.",
          highlight:
            "Useful for skills gap analysis and resume skills analysis.",
        },
        {
          step: "5",
          title: "Rewrite Bullet Points Using AI",
          description:
            "AI resume rewriters improve bullet points while keeping your experience authentic. Strong tools can rewrite bullet points only, improve clarity and impact, add measurable results, insert relevant keywords naturally, and remove filler language.",
          highlight:
            "This avoids the common mistake of over-editing or changing your meaning.",
        },
        {
          step: "6",
          title: "AI Tailors Each Section to Match the Job",
          description:
            "AI transforms your general bullet points into relevant, job-specific achievements. The AI keeps your resume's structure and formatting intact.",
          example: {
            original: "Managed customer enquiries and solved issues daily.",
            tailored:
              "Resolved 40+ customer enquiries per day while maintaining a 95% satisfaction score, aligning with the role's focus on service quality and response speed.",
          },
        },
        {
          step: "7",
          title: "Generate a Tailored Cover Letter Automatically",
          description:
            "After the resume is tailored, AI creates a custom cover letter using your resume, the job description, and the employer's requirements. The letter includes aligned skills, relevant experience, and a professional tone.",
          highlight: "Complete your application with a matching cover letter.",
        },
        {
          step: "8",
          title: "Export Your Resume in Its Original Layout",
          description:
            "A major benefit of high-quality AI tailoring tools is that they preserve your original formatting. You can export your resume with the same layout, with only the content updated, in ATS-friendly formatting.",
          highlight: "Keep your original resume format intact.",
        },
      ],
    },
    {
      id: "best-ai-tools",
      title: "Best AI Tools for Tailoring Your Resume to a Job Description",
      tools: [
        {
          rank: 1,
          name: "CVLab",
          tagline: "Best Resume Tailoring Tool",
          description:
            "CVLab is one of the strongest AI platforms for job-description tailoring. It works as a complete job-match system.",
          features: [
            "Resume tailoring tool",
            "Resume keyword scanner",
            "ATS resume checker",
            "AI resume rewriter",
            "Resume analyser AI",
            "Skills gap analysis",
            "AI cover letter generator",
            "Formatting preservation",
          ],
          bestFor: [
            "Complete job-match system",
            "ATS optimization",
            "Professional resume tailoring",
          ],
          highlight: true,
        },
        {
          rank: 2,
          name: "Resume.io",
          tagline: "Quick Editing",
          description:
            "Good for quick editing but limited tailoring capability.",
          features: ["Fast resume editing", "Clean templates", "Easy exports"],
          bestFor: ["Quick edits without deep analysis"],
        },
        {
          rank: 3,
          name: "Zety",
          tagline: "Rewriting Focus",
          description:
            "Helpful for rewriting but lacks deep job-description analysis.",
          features: [
            "Resume rewriting",
            "Writing suggestions",
            "Template options",
          ],
          bestFor: ["Basic rewriting needs"],
        },
        {
          rank: 4,
          name: "Novoresume",
          tagline: "Solid Templates",
          description:
            "Solid templates, basic optimisation, limited AI tailoring.",
          features: [
            "Professional templates",
            "Basic optimization",
            "Clean layouts",
          ],
          bestFor: ["Template-focused users"],
        },
        {
          rank: 5,
          name: "Canva",
          tagline: "Creative Roles",
          description:
            "Useful for creative roles but not built for ATS tailoring.",
          features: [
            "Design flexibility",
            "Visual templates",
            "Branding tools",
          ],
          bestFor: ["Creative and design positions"],
        },
      ],
    },
    {
      id: "when-to-tailor",
      title: "When Should You Tailor Your Resume?",
      content: [
        {
          text: "Use tailored resumes when applying for competitive roles, jobs with strict requirements, ATS-heavy industries, tech, finance, healthcare, consulting, remote positions, graduate or intern roles, and promotions or higher-level roles.",
        },
      ],
      useCases: [
        "Competitive roles",
        "Jobs with strict requirements",
        "ATS-heavy industries",
        "Tech, finance, healthcare, consulting",
        "Remote positions",
        "Graduate or intern roles",
        "Promotions or higher-level roles",
      ],
      warning: "Generic resumes rarely survive ATS scans.",
    },
    {
      id: "common-mistakes",
      title: "Common Mistakes When Tailoring a Resume",
      mistakes: [
        "Stuffing keywords unnaturally",
        "Changing your experience too much",
        "Using long, unclear bullet points",
        "Over-designing resumes that break ATS",
        "Forgetting to update skills and tools",
        "Not tailoring soft skills",
      ],
      solution:
        "AI solves these issues by keeping your writing natural, structured, and aligned with what recruiters want.",
    },
    {
      id: "how-to-tailor-today",
      title: "How to Tailor Your Resume with AI Today",
      content: [
        {
          text: "A strong tailoring workflow should follow these steps to maximize your chances of landing interviews.",
        },
      ],
      workflow: [
        "Upload your resume",
        "Paste the job description",
        "Check your job match score",
        "Review missing keywords",
        "Rewrite weak bullet points",
        "Fill skills gaps",
        "Generate a tailored cover letter",
        "Export your resume in ATS-friendly format",
      ],
      cta: "Tools like CVLab automate all of this.",
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
                          <p className="text-base text-white/60 md:text-lg">
                            {item.text}
                          </p>
                        </div>
                      ))}
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
                                  {step.highlight}
                                </p>
                              )}

                              {step.example && (
                                <div className="mt-4 space-y-3">
                                  <div className="rounded-xl bg-white/5 p-4">
                                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-white/40">
                                      Original
                                    </p>
                                    <p className="text-sm text-white/60">
                                      {step.example.original}
                                    </p>
                                  </div>
                                  <div className="rounded-xl bg-cyan-500/10 p-4">
                                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-cyan-300/60">
                                      AI-Tailored
                                    </p>
                                    <p className="text-sm text-white/80">
                                      {step.example.tailored}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Tools list */}
                  {section.tools && (
                    <div className="space-y-6">
                      {section.tools.map((tool, toolIndex) => (
                        <motion.div
                          key={tool.rank}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: toolIndex * 0.1 }}
                          className={`group relative rounded-3xl border p-[1px] backdrop-blur-sm transition-all ${
                            tool.highlight
                              ? "border-cyan-500/40 bg-gradient-to-br from-cyan-500/20 to-blue-500/20"
                              : "border-white/5 bg-white/5 hover:border-white/10 hover:bg-white/10"
                          }`}
                        >
                          <div className="rounded-3xl bg-black/60 p-6 md:p-8">
                            <div
                              className={`mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${
                                tool.highlight
                                  ? "bg-cyan-500/20 text-cyan-300"
                                  : "bg-white/10 text-white/60"
                              }`}
                            >
                              #{tool.rank}
                              {tool.highlight && (
                                <span className="text-xs">• Recommended</span>
                              )}
                            </div>

                            <h3 className="mb-1 text-xl font-semibold text-white md:text-2xl">
                              {tool.name}
                            </h3>
                            <p className="mb-4 text-sm font-medium text-cyan-300">
                              {tool.tagline}
                            </p>
                            <p className="mb-6 text-base text-white/60">
                              {tool.description}
                            </p>

                            <div className="mb-6">
                              <h4 className="mb-3 text-sm font-semibold tracking-wide text-white/80">
                                Key Features
                              </h4>
                              <ul className="grid gap-2 sm:grid-cols-2">
                                {tool.features.map((feature, featureIndex) => (
                                  <li
                                    key={featureIndex}
                                    className="flex items-start gap-2 text-sm text-white/60"
                                  >
                                    <ChevronRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-cyan-500/60" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="mb-2 text-sm font-semibold tracking-wide text-white/80">
                                Best For
                              </h4>
                              <ul className="space-y-1">
                                {tool.bestFor.map((item, itemIndex) => (
                                  <li
                                    key={itemIndex}
                                    className="flex items-center gap-2 text-sm text-white/60"
                                  >
                                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-500/60" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Use cases list */}
                  {section.useCases && (
                    <div className="mt-6 rounded-2xl border border-white/5 bg-white/5 p-6 md:p-8">
                      <ul className="grid gap-3 sm:grid-cols-2">
                        {section.useCases.map((useCase, useCaseIndex) => (
                          <li
                            key={useCaseIndex}
                            className="flex items-center gap-2 text-sm text-white/60 md:text-base"
                          >
                            <ChevronRight className="h-4 w-4 flex-shrink-0 text-cyan-500" />
                            {useCase}
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

                  {/* Mistakes list */}
                  {section.mistakes && (
                    <div className="space-y-6">
                      <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 md:p-8">
                        <h4 className="mb-4 text-sm font-semibold tracking-wide text-red-300/80">
                          Avoid These Mistakes
                        </h4>
                        <ul className="grid gap-3 sm:grid-cols-2">
                          {section.mistakes.map((mistake, mistakeIndex) => (
                            <li
                              key={mistakeIndex}
                              className="flex items-center gap-2 text-sm text-white/60"
                            >
                              <X className="h-4 w-4 flex-shrink-0 text-red-400/60" />
                              {mistake}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {section.solution && (
                        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">
                          <p className="text-sm text-cyan-300/80 md:text-base">
                            ✓ {section.solution}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Workflow list */}
                  {section.workflow && (
                    <div className="mt-6">
                      <div className="rounded-2xl border border-white/5 bg-white/5 p-6 md:p-8">
                        <h4 className="mb-4 text-sm font-semibold tracking-wide text-white/80">
                          Your Tailoring Workflow
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
                      {section.cta && (
                        <div className="mt-8">
                          <p className="mb-6 text-lg font-medium text-white">
                            {section.cta}
                          </p>
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
                      )}
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
