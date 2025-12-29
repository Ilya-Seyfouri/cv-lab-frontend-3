"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Menu,
  X,
  ArrowLeft,
  Check,
  Search,
  Target,
  Zap,
  FileText,
  Settings,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";

// Blog content structure
const blogContent = {
  title:
    "Resume Skills Analysis: How AI Finds Gaps, Keywords and ATS Requirements",
  date: "Updated January 2025",
  intro:
    "Most resumes fail because they don't showcase the right skills. Not because the candidate doesn't have them — but because they aren't written clearly, aren't aligned with the job description, or don't fit what ATS systems look for.",
  subtitle:
    "This is where AI resume skills analysis comes in. AI can scan your resume, compare it to the job description, identify missing skills, highlight keyword gaps, detect ATS issues, and rewrite your bullet points to match employer expectations. This guide explains exactly how AI performs skills analysis, why it matters, and how to use it to get more interviews.",
  sections: [
    {
      id: "what-is-skills-analysis",
      title: "What Is Resume Skills Analysis?",
      content: [
        {
          text: "Resume skills analysis is the process of examining your resume to identify skills gaps and opportunities. AI enhances this by analysing thousands of job descriptions and industry patterns, generating highly accurate suggestions.",
        },
      ],
      analysisPoints: [
        "Technical skills",
        "Soft skills",
        "Industry-specific skills",
        "Missing or outdated skills",
        "Skills mentioned in the job description",
        "Skills ATS expects",
        "Gaps compared to similar candidates",
      ],
    },
    {
      id: "why-skills-matter",
      title: "Why Skills Matter More Than Ever",
      content: [
        {
          text: "Recruiters and ATS systems both focus heavily on skills. If your resume doesn't include these skills — in the right format and phrasing — your chances drop sharply. AI skills analysis fixes this by finding what's missing and helping you add it properly.",
        },
      ],
      whatATSLooksFor: [
        "Required skills",
        "Preferred skills",
        "Tools and software",
        "Domain knowledge",
        "Measurable achievements tied to skills",
      ],
    },
    {
      id: "how-ai-performs-analysis",
      title: "How AI Performs Resume Skills Analysis (Step-by-Step)",
      steps: [
        {
          step: "1",
          title: "Scanning Your Resume for Existing Skills",
          icon: "Search",
          description:
            "AI reviews bullet points, skills sections, job titles, certifications, tools mentioned, and education details. It extracts hard skills and soft skills automatically.",
          examples: [
            "Python",
            "Stakeholder management",
            "Figma",
            "Forecasting",
          ],
        },
        {
          step: "2",
          title: "Scanning the Job Description for Required Skills",
          icon: "Target",
          description:
            "AI then reads the job description and pulls out required skills such as technical tools, software platforms, methodologies, soft skills, industry terminology, and preferred qualifications.",
          highlight: "This becomes the target skillset.",
        },
        {
          step: "3",
          title: "Comparing the Two (Skills Gap Analysis)",
          icon: "Zap",
          description:
            "AI identifies skills you already have, skills you haven't mentioned, skills the job requires that your resume lacks, and skills you've listed but not demonstrated clearly.",
          highlight:
            "If you're missing core skills from the job description, your match score and ATS score will both be low.",
        },
        {
          step: "4",
          title: "Highlighting Missing Keywords",
          icon: "FileText",
          description:
            "Beyond skills, AI also identifies missing keywords such as tools (SQL, HubSpot, AWS), frameworks (Agile, Scrum), responsibilities (budget management, user research), and industry terms.",
        },
        {
          step: "5",
          title: "Analysing ATS Requirements",
          icon: "Settings",
          description:
            "AI resume analysers check whether the skills are presented in an ATS-readable format. The tool reviews keyword placement, section headers, formatting, duplicates, missing ATS-friendly phrasing, and inconsistencies.",
          example: {
            note: 'ATS prefers "Project Management" over "Managed Projects."',
          },
        },
        {
          step: "6",
          title: "Rewriting Bullet Points to Include Skills",
          icon: "RefreshCw",
          description:
            "After identifying skills and keywords you need, AI can rewrite bullet points to integrate them naturally.",
          beforeAfter: {
            before: "Worked on customer queries daily.",
            after:
              "Resolved 40+ customer queries daily using CRM software, improving satisfaction scores and strengthening communication skills.",
          },
          benefits: [
            "Adds measurable impact",
            "Adds missing hard skills and soft skills",
            "Aligns with job description phrasing",
            "Keeps your original meaning",
          ],
        },
        {
          step: "7",
          title: "Rebuilding Your Skills Section",
          icon: "Target",
          description:
            "AI can reorganise your skills section to make it ATS-friendly, relevant to the job, categorised into hard and soft skills, focused on priority items, and free from outdated or generic skills.",
          highlight:
            "This ensures your skills section is not only accurate — but strategic.",
        },
      ],
    },
    {
      id: "what-skills-analysed",
      title: "What Skills Does AI Analyse?",
      skillCategories: [
        {
          title: "Hard Skills",
          description: "Role-specific skills like:",
          items: [
            "Programming languages",
            "Analytics tools",
            "Finance software",
            "Design tools",
            "Technical certifications",
          ],
        },
        {
          title: "Soft Skills",
          description: "These matter more when backed by examples:",
          items: [
            "Communication",
            "Leadership",
            "Problem-solving",
            "Time management",
            "Team coordination",
          ],
        },
        {
          title: "Industry & Domain Skills",
          description: "Specialised knowledge for your field:",
          items: [
            "Healthcare compliance (nurses)",
            "Wireframing (designers)",
            "Forecasting (finance roles)",
            "Agile methodology (project managers)",
          ],
        },
        {
          title: "Tools & Technologies",
          description:
            "AI lists the exact tools mentioned in the job description and checks whether you've included them.",
          items: [],
        },
      ],
    },
    {
      id: "good-analysis-tool",
      title: "What Makes a Good AI Resume Skills Analysis Tool?",
      content: [
        {
          text: "The best tools combine skills analysis with full resume tailoring. Look for a tool that includes all essential features.",
        },
      ],
      features: [
        "Skills extraction",
        "Skills gap analysis",
        "Job description matching",
        "Keyword detection",
        "Bullet point rewriting",
        "ATS compatibility checks",
        "Ability to keep your formatting",
        "Actionable recommendations",
      ],
    },
    {
      id: "best-tool-cvlab",
      title: "Best Tool for Resume Skills Analysis: CVLab",
      content: [
        {
          text: "CVLab reads your resume like an ATS, matches it to the job description, identifies missing skills, and rewrites sections to strengthen your application. CVLab keeps your original formatting intact while improving your content.",
        },
      ],
      cvlabFeatures: [
        "Resume skills analysis",
        "Skills gap detection",
        "Keyword scanning",
        "Job-match scoring",
        "ATS resume checker",
        "AI resume rewriter",
        "AI cover letter writer",
      ],
      highlight: true,
    },
    {
      id: "when-to-use",
      title: "When Should You Use Skills Analysis?",
      content: [
        {
          text: "Every tailored resume benefits from a targeted skills upgrade.",
        },
      ],
      useCases: [
        "Applying for competitive roles",
        "Switching industries",
        "Updating an old resume",
        "Preparing for interviews",
        "Tailoring your resume to multiple jobs",
        "Unsure why you aren't getting callbacks",
      ],
      cta: "Use AI skills analysis to ensure your resume showcases exactly what employers are looking for.",
    },
  ],
};

// Table of Contents items
const tocItems = blogContent.sections.map((section) => ({
  id: section.id,
  title: section.title,
}));

// Icon mapping
const iconMap = {
  Search: Search,
  Target: Target,
  Zap: Zap,
  FileText: FileText,
  Settings: Settings,
  RefreshCw: RefreshCw,
};

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
                          <p className="text-base text-white/60 md:text-lg">
                            {item.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Analysis points */}
                  {section.analysisPoints && (
                    <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">
                      <ul className="grid gap-2 sm:grid-cols-2">
                        {section.analysisPoints.map((point, pointIndex) => (
                          <li
                            key={pointIndex}
                            className="flex items-center gap-2 text-sm text-white/70 md:text-base"
                          >
                            <Search className="h-4 w-4 flex-shrink-0 text-cyan-500" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* What ATS looks for */}
                  {section.whatATSLooksFor && (
                    <div className="mt-6 rounded-2xl border border-white/5 bg-white/5 p-6">
                      <h4 className="mb-4 text-sm font-semibold tracking-wide text-white/80">
                        Hiring software reads your resume looking for:
                      </h4>
                      <ul className="grid gap-2 sm:grid-cols-2">
                        {section.whatATSLooksFor.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="flex items-center gap-2 text-sm text-white/60"
                          >
                            <Target className="h-4 w-4 flex-shrink-0 text-cyan-500/60" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Steps with icons */}
                  {section.steps && (
                    <div className="space-y-6">
                      {section.steps.map((step, stepIndex) => {
                        const IconComponent = iconMap[step.icon] || Search;
                        return (
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
                              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
                                <IconComponent className="h-5 w-5 text-cyan-300" />
                              </div>
                              <div className="flex-1">
                                <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-cyan-300/60">
                                  Step {step.step}
                                </div>
                                <h3 className="mb-2 text-lg font-semibold text-white">
                                  {step.title}
                                </h3>
                                <p className="text-sm text-white/60 md:text-base">
                                  {step.description}
                                </p>

                                {/* Examples as tags */}
                                {step.examples && (
                                  <div className="mt-4 flex flex-wrap gap-2">
                                    {step.examples.map((example, exIndex) => (
                                      <span
                                        key={exIndex}
                                        className="inline-flex rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300"
                                      >
                                        {example}
                                      </span>
                                    ))}
                                  </div>
                                )}

                                {step.highlight && (
                                  <p className="mt-3 text-sm font-medium text-cyan-300/80">
                                    ✓ {step.highlight}
                                  </p>
                                )}

                                {/* Example note */}
                                {step.example && step.example.note && (
                                  <div className="mt-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 p-3">
                                    <p className="text-sm text-yellow-300/80">
                                      💡 {step.example.note}
                                    </p>
                                  </div>
                                )}

                                {/* Before/After */}
                                {step.beforeAfter && (
                                  <div className="mt-4 space-y-3">
                                    <div className="rounded-xl bg-red-500/5 border border-red-500/10 p-4">
                                      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-red-300/60">
                                        Original
                                      </p>
                                      <p className="text-sm text-white/60 italic">
                                        &ldquo;{step.beforeAfter.before}&rdquo;
                                      </p>
                                    </div>
                                    <div className="rounded-xl bg-cyan-500/10 border border-cyan-500/20 p-4">
                                      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-cyan-300/60">
                                        AI-Enhanced
                                      </p>
                                      <p className="text-sm text-white/80">
                                        &ldquo;{step.beforeAfter.after}&rdquo;
                                      </p>
                                    </div>
                                  </div>
                                )}

                                {/* Benefits */}
                                {step.benefits && (
                                  <div className="mt-4">
                                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/40">
                                      The AI:
                                    </p>
                                    <ul className="grid gap-1 sm:grid-cols-2">
                                      {step.benefits.map((benefit, bIndex) => (
                                        <li
                                          key={bIndex}
                                          className="flex items-center gap-2 text-sm text-white/60"
                                        >
                                          <Check className="h-3 w-3 flex-shrink-0 text-cyan-500/60" />
                                          {benefit}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}

                  {/* Skill Categories */}
                  {section.skillCategories && (
                    <div className="grid gap-6 sm:grid-cols-2">
                      {section.skillCategories.map((category, catIndex) => (
                        <motion.div
                          key={catIndex}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: catIndex * 0.1 }}
                          className="rounded-2xl border border-white/5 bg-white/5 p-6"
                        >
                          <h4 className="mb-2 text-lg font-semibold text-white">
                            {category.title}
                          </h4>
                          <p className="mb-4 text-sm text-white/50">
                            {category.description}
                          </p>
                          {category.items.length > 0 && (
                            <ul className="space-y-2">
                              {category.items.map((item, itemIndex) => (
                                <li
                                  key={itemIndex}
                                  className="flex items-center gap-2 text-sm text-white/60"
                                >
                                  <ChevronRight className="h-4 w-4 flex-shrink-0 text-cyan-500/60" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Features list */}
                  {section.features && (
                    <div className="mt-6 rounded-2xl border border-white/5 bg-white/5 p-6">
                      <ul className="grid gap-3 sm:grid-cols-2">
                        {section.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-center gap-2 text-sm text-white/70 md:text-base"
                          >
                            <Check className="h-4 w-4 flex-shrink-0 text-cyan-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* CVLab features */}
                  {section.cvlabFeatures && (
                    <div
                      className={`mt-6 rounded-2xl border p-6 md:p-8 ${
                        section.highlight
                          ? "border-cyan-500/40 bg-gradient-to-br from-cyan-500/10 to-blue-500/10"
                          : "border-white/5 bg-white/5"
                      }`}
                    >
                      <h4 className="mb-4 text-sm font-semibold tracking-wide text-cyan-300">
                        CVLab integrates:
                      </h4>
                      <ul className="grid gap-3 sm:grid-cols-2">
                        {section.cvlabFeatures.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-center gap-2 text-sm text-white/70 md:text-base"
                          >
                            <ChevronRight className="h-4 w-4 flex-shrink-0 text-cyan-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Use cases with CTA */}
                  {section.useCases && (
                    <div className="mt-6 rounded-2xl border border-white/5 bg-white/5 p-6 md:p-8">
                      <h4 className="mb-4 text-sm font-semibold tracking-wide text-white/80">
                        Use it when:
                      </h4>
                      <ul className="grid gap-3 sm:grid-cols-2">
                        {section.useCases.map((useCase, useCaseIndex) => (
                          <li
                            key={useCaseIndex}
                            className="flex items-center gap-2 text-sm text-white/60 md:text-base"
                          >
                            <Check className="h-4 w-4 flex-shrink-0 text-cyan-500" />
                            {useCase}
                          </li>
                        ))}
                      </ul>
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
