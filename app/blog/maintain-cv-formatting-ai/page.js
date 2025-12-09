"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Menu,
  X,
  ArrowLeft,
  ArrowDown,
  Check,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";

// Blog content structure
const blogContent = {
  title: "Maintain CV Formatting With AI: Fix Content, Not Your Layout",
  date: "Updated January 2025",
  intro:
    "Most AI CV tools fix your writing but destroy your formatting. They change your layout, move your sections, alter fonts, break your spacing, or force you into a template you never wanted.",
  subtitle:
    "Modern CV optimisation tools now solve this by improving your content only — while keeping your original format exactly intact. This guide explains how AI can rewrite and optimise your CV without touching the structure, helping you stay ATS-friendly and professionally presented.",
  sections: [
    {
      id: "why-formatting-matters",
      title: "Why CV Formatting Should Stay the Same",
      content: [
        {
          text: "Your CV layout matters for both readability and ATS performance. This is why the ability to maintain your CV format matters just as much as improving the content.",
        },
      ],
      risks: [
        "ATS parsing errors",
        "Unreadable layouts",
        "Lost sections",
        "Misaligned bullet points",
        "Missing keywords",
        "Confused recruiters",
      ],
      benefits: [
        "Clear section separation",
        "Easy reading for recruiters",
        "Clean parsing for ATS systems",
        "A professional, consistent look",
      ],
    },
    {
      id: "what-ai-should-improve",
      title: "What AI Should Improve — Without Changing Your Layout",
      content: [
        {
          text: "A strong CV optimiser AI focuses on improving your content while leaving your design untouched. These upgrades increase your job match score without touching your design.",
        },
      ],
      improvements: [
        "Strengthening bullet points",
        "Adding keywords from the job description",
        "Improving clarity and tone",
        "Rewriting vague lines",
        "Highlighting measurable achievements",
        "Replacing weak verbs",
        "Aligning skills with the role",
        "Improving your summary/profile section",
      ],
    },
    {
      id: "what-ai-should-not-change",
      title: "What AI Should NOT Change",
      content: [
        {
          text: "If the goal is formatting preservation, AI should never touch your structure. You want content improvements only, not a redesign.",
        },
      ],
      doNotChange: [
        "Alter your headings",
        "Move your sections",
        "Remove spacing",
        "Change fonts or alignment",
        "Add columns or tables",
        "Introduce new formatting styles",
        "Break your bullet formatting",
      ],
    },
    {
      id: "how-ai-improves",
      title: "How AI Improves Your CV While Keeping the Layout Intact",
      steps: [
        {
          step: "1",
          title: "Upload Your Current CV",
          description:
            'The AI scans your structure, headings, bullet points, spacing and layout. It locks this in as the "template" and preserves it.',
        },
        {
          step: "2",
          title: "Paste the Job Description",
          description:
            "AI extracts required skills, preferred skills, tools and technologies, job-specific keywords, and role responsibilities. This allows accurate tailoring without altering your layout.",
        },
        {
          step: "3",
          title: "AI Analyses Your Content for Weaknesses",
          description:
            "The tool checks for missing keywords, vague statements, outdated phrasing, irrelevant content, weak verbs, skills gaps, and ATS issues.",
        },
        {
          step: "4",
          title: "AI Rewrites Content Inside Your Layout",
          description:
            "This is the key step. AI generates stronger bullet points, summaries, and skill descriptions while keeping everything in the exact same place.",
          example: {
            before: "Assisted the team with day-to-day tasks.",
            after:
              "Supported daily team operations, coordinating schedules, documentation, and communications to improve workflow efficiency.",
          },
          highlight: "The formatting doesn't change — only the text improves.",
        },
        {
          step: "5",
          title: "AI Adds Keywords Naturally",
          description:
            "Based on the job description, AI inserts keywords into bullet points, skills section, summaries, and role descriptions. This improves ATS performance without stuffing.",
        },
        {
          step: "6",
          title: "Export the Updated CV in the Same Layout",
          description:
            "You receive a polished CV that looks exactly the same, reads much better, scores higher in ATS, matches the job description, includes all key skills, and stays professionally formatted.",
        },
      ],
    },
    {
      id: "before-after-examples",
      title: "Before-and-After Examples (Same Formatting, Better Writing)",
      content: [
        {
          text: "Formatting stays identical — only the content becomes stronger.",
        },
      ],
      examples: [
        {
          before: "Worked on customer enquiries.",
          after:
            "Managed customer enquiries through CRM systems, resolving 40–60 cases daily and improving satisfaction metrics.",
        },
        {
          before: "Responsible for writing reports.",
          after:
            "Produced weekly analytical reports using Excel and Power BI, supporting operational decision-making across departments.",
        },
      ],
    },
    {
      id: "why-some-tools-break",
      title:
        "Why Some AI Tools Break Formatting (And Why You Should Avoid Them)",
      content: [
        {
          text: "If a tool can't respect your existing format, it shouldn't be used for professional applications. You want a tool that edits the text, not the layout.",
        },
      ],
      problems: [
        "Force you into a template",
        "Convert your CV into a new layout",
        "Remove spacing",
        "Mix up bullet lists",
        "Break ATS parsing",
      ],
    },
    {
      id: "best-tool-cvlab",
      title: "Best Tool for Formatting-Safe CV Improvements: CVLab",
      content: [
        {
          text: "CVLab is built specifically for rewriting your CV content while keeping your layout untouched. Your structure stays the same. Your CV becomes significantly stronger and more relevant.",
        },
      ],
      features: [
        "AI rewriting (content only)",
        "Bullet point improvements",
        "Keyword optimisation",
        "Skills gap analysis",
        "ATS resume checking",
        "Job match scoring",
        "AI cover letter generation",
      ],
      highlight: true,
    },
    {
      id: "how-to-use-cvlab",
      title: "How to Use CVLab to Maintain Formatting While Improving Content",
      content: [
        {
          text: "Simple, clean, effective.",
        },
      ],
      workflow: [
        "Upload your CV",
        "Paste the job description",
        "Run a content analysis",
        "Review rewritten bullet points",
        "Add missing skills and keywords",
        "Check ATS results",
        "Export in your original formatting",
      ],
    },
    {
      id: "final-thoughts",
      title: "Final Thoughts",
      content: [
        {
          text: "Great formatting is valuable. Great content is essential. AI now allows you to improve your CV's content — clarity, keywords, achievements, relevance — without altering the structure you've already perfected.",
        },
      ],
      benefits: [
        "Better bullet points",
        "Stronger keywords",
        "Clearer writing",
        "ATS-friendly content",
        "Job-specific tailoring",
        "Formatting safety",
      ],
      cta: "AI content-only rewriting is the best approach in 2025.",
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

                  {/* Risks and Benefits side by side */}
                  {section.risks && section.benefits && (
                    <div className="mt-6 grid gap-6 md:grid-cols-2">
                      {/* Risks */}
                      <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
                        <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold tracking-wide text-red-300/80">
                          <AlertTriangle className="h-4 w-4" />
                          When Formatting Breaks
                        </h4>
                        <ul className="space-y-2">
                          {section.risks.map((risk, riskIndex) => (
                            <li
                              key={riskIndex}
                              className="flex items-center gap-2 text-sm text-white/60"
                            >
                              <X className="h-4 w-4 flex-shrink-0 text-red-400/60" />
                              {risk}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Benefits */}
                      <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">
                        <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold tracking-wide text-cyan-300/80">
                          <Check className="h-4 w-4" />
                          Strong Formatting Ensures
                        </h4>
                        <ul className="space-y-2">
                          {section.benefits.map((benefit, benefitIndex) => (
                            <li
                              key={benefitIndex}
                              className="flex items-center gap-2 text-sm text-white/60"
                            >
                              <ChevronRight className="h-4 w-4 flex-shrink-0 text-cyan-500/60" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Improvements list */}
                  {section.improvements && (
                    <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">
                      <ul className="grid gap-2 sm:grid-cols-2">
                        {section.improvements.map((improvement, impIndex) => (
                          <li
                            key={impIndex}
                            className="flex items-center gap-2 text-sm text-white/60"
                          >
                            <Check className="h-4 w-4 flex-shrink-0 text-cyan-500" />
                            {improvement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Do Not Change list */}
                  {section.doNotChange && (
                    <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
                      <ul className="grid gap-2 sm:grid-cols-2">
                        {section.doNotChange.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="flex items-center gap-2 text-sm text-white/60"
                          >
                            <X className="h-4 w-4 flex-shrink-0 text-red-400/60" />
                            {item}
                          </li>
                        ))}
                      </ul>
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

                              {step.example && (
                                <div className="mt-4 space-y-3">
                                  <div className="rounded-xl bg-red-500/5 border border-red-500/10 p-4">
                                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-red-300/60">
                                      Before
                                    </p>
                                    <p className="text-sm text-white/60 italic">
                                      &ldquo;{step.example.before}&rdquo;
                                    </p>
                                  </div>
                                  <div className="flex justify-center py-1">
                                    <ArrowDown className="h-4 w-4 text-cyan-500/60" />
                                  </div>
                                  <div className="rounded-xl bg-cyan-500/10 border border-cyan-500/20 p-4">
                                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-cyan-300/60">
                                      After (Same Format, Stronger Content)
                                    </p>
                                    <p className="text-sm text-white/80">
                                      &ldquo;{step.example.after}&rdquo;
                                    </p>
                                  </div>
                                </div>
                              )}

                              {step.highlight && (
                                <p className="mt-3 text-sm font-medium text-cyan-300/80">
                                  ✓ {step.highlight}
                                </p>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Simple Before/After Examples */}
                  {section.examples && !section.steps && (
                    <div className="mt-6 space-y-6">
                      {section.examples.map((example, exampleIndex) => (
                        <motion.div
                          key={exampleIndex}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.4,
                            delay: exampleIndex * 0.1,
                          }}
                          className="rounded-2xl border border-white/5 bg-white/5 p-6"
                        >
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="rounded-xl bg-red-500/5 border border-red-500/10 p-4">
                              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-300/60">
                                Original
                              </p>
                              <p className="text-sm text-white/60 italic">
                                &ldquo;{example.before}&rdquo;
                              </p>
                            </div>
                            <div className="rounded-xl bg-cyan-500/10 border border-cyan-500/20 p-4">
                              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-cyan-300/60">
                                Improved
                              </p>
                              <p className="text-sm text-white/80">
                                &ldquo;{example.after}&rdquo;
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Problems list */}
                  {section.problems && (
                    <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
                      <h4 className="mb-4 text-sm font-semibold tracking-wide text-red-300/80">
                        Many AI CV tools:
                      </h4>
                      <ul className="grid gap-2 sm:grid-cols-2">
                        {section.problems.map((problem, problemIndex) => (
                          <li
                            key={problemIndex}
                            className="flex items-center gap-2 text-sm text-white/60"
                          >
                            <X className="h-4 w-4 flex-shrink-0 text-red-400/60" />
                            {problem}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Features (for CVLab section) */}
                  {section.features && (
                    <div
                      className={`mt-6 rounded-2xl border p-6 md:p-8 ${
                        section.highlight
                          ? "border-cyan-500/40 bg-gradient-to-br from-cyan-500/10 to-blue-500/10"
                          : "border-white/5 bg-white/5"
                      }`}
                    >
                      <ul className="grid gap-3 sm:grid-cols-2">
                        {section.features.map((feature, featureIndex) => (
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

                  {/* Workflow */}
                  {section.workflow && (
                    <div className="mt-6 rounded-2xl border border-white/5 bg-white/5 p-6 md:p-8">
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
                  )}

                  {/* Final benefits with CTA */}
                  {section.benefits && section.cta && (
                    <div className="mt-6 rounded-2xl border border-white/5 bg-white/5 p-6 md:p-8">
                      <p className="mb-4 text-sm font-semibold text-white/80">
                        If you want:
                      </p>
                      <ul className="grid gap-3 sm:grid-cols-2">
                        {section.benefits.map((benefit, benefitIndex) => (
                          <li
                            key={benefitIndex}
                            className="flex items-center gap-2 text-sm text-white/60 md:text-base"
                          >
                            <Check className="h-4 w-4 flex-shrink-0 text-cyan-500" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
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
