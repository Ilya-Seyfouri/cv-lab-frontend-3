"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Menu, X, ArrowLeft, ArrowDown } from "lucide-react";
import Link from "next/link";

// Blog content structure
const blogContent = {
  title: "Improve Your CV Bullet Points: Real Before-and-After AI Examples",
  date: "Updated January 2025",
  intro:
    "Most CVs fail for one simple reason: the bullet points are weak. They're vague. They list duties instead of achievements. They lack keywords. They don't show impact. And they don't match what recruiters or Applicant Tracking Systems (ATS) look for.",
  subtitle:
    "Strong bullet points are the difference between a CV that gets ignored and one that gets shortlisted. AI now makes this easy. With AI-powered bullet point rewriting, you can turn unclear, low-impact lines into polished, relevant achievements — without changing your formatting or exaggerating your experience.",
  sections: [
    {
      id: "why-bullet-points-matter",
      title: "Why Bullet Points Matter More Than Any Other Part of Your CV",
      content: [
        {
          text: "Recruiters skim CVs. They don't read paragraphs. They look for clear action verbs, measurable results, relevant skills, job-specific keywords, and impact — not duties.",
        },
        {
          text: "Weak bullet points waste space, confuse ATS, and make you look less qualified than you actually are.",
        },
      ],
      keyPoints: [
        "Clear action verbs",
        "Measurable results",
        "Relevant skills",
        "Job-specific keywords",
        "Impact, not duties",
      ],
      solution:
        "AI solves this by rewriting bullet points using stronger verbs, measurable outcomes, relevant skills, cleaner structure, and job description alignment.",
    },
    {
      id: "how-ai-improves",
      title: "How AI Improves CV Bullet Points",
      content: [
        {
          text: "A strong CV optimiser AI or resume optimiser AI rewrites only your content, keeps your formatting intact, and transforms ordinary bullet points into high-impact statements.",
        },
      ],
      capabilities: [
        "Rewrites only your content",
        "Keeps your formatting intact",
        "Adds relevant keywords",
        "Strengthens achievements",
        "Replaces weak verbs",
        "Adds metrics",
        "Clarifies responsibilities",
        "Improves ATS readability",
      ],
    },
    {
      id: "before-after-examples",
      title: "Before-and-After AI Bullet Point Examples",
      content: [
        {
          text: "Below are realistic examples across multiple job roles to show exactly how AI transforms your CV.",
        },
      ],
      examples: [
        {
          role: "Customer Service",
          before: "Helped customers with questions and complaints.",
          after:
            "Resolved 40–60 customer enquiries daily through CRM systems, improving satisfaction scores and reducing response times.",
          whyItWorks: [
            "Measurable output",
            "Added CRM skill",
            "Action-focused",
            "ATS keywords included",
          ],
        },
        {
          role: "Marketing",
          before: "Handled social media posts.",
          after:
            "Created and scheduled weekly social campaigns that increased engagement by 35% across Instagram and LinkedIn.",
          whyItWorks: [
            "Quantified results",
            "Relevant platforms included",
            "Clear ownership",
          ],
        },
        {
          role: "Project Manager",
          before: "Managed tasks for the team.",
          after:
            "Led cross-functional teams through planning and execution, delivering projects 10% under budget and ahead of deadlines.",
          whyItWorks: [
            "Leadership highlighted",
            "Responsibilities clarified",
            "Measurable results added",
          ],
        },
        {
          role: "Sales",
          before: "Spoke to clients and helped close sales.",
          after:
            "Managed a monthly pipeline of 120+ prospects and delivered 140% of quarterly sales targets through consistent follow-up and relationship building.",
          whyItWorks: [
            "Numbers show scale",
            "Goal-driven language",
            "Sales-specific metrics",
          ],
        },
        {
          role: "Software Engineer",
          before: "Worked on backend development.",
          after:
            "Developed and optimised backend APIs in Python, reducing average response times by 28% and improving system reliability.",
          whyItWorks: [
            "Specific tools",
            "Performance improvements",
            "Engineering impact",
          ],
        },
        {
          role: "Data Analyst",
          before: "Created reports for management.",
          after:
            "Built automated SQL and Power BI dashboards that reduced manual reporting time by 50% and supported weekly business decisions.",
          whyItWorks: [
            "Tools included",
            "Measurable efficiency gain",
            "Role-specific phrasing",
          ],
        },
        {
          role: "Admin / Receptionist",
          before: "Answered phones and greeted visitors.",
          after:
            "Managed daily front-desk operations including call handling, scheduling, and visitor coordination, supporting a team of 25 and improving office workflow.",
          whyItWorks: [
            "Shows responsibility",
            "Shows scale",
            "Adds administrative context",
          ],
        },
        {
          role: "Nurse",
          before: "Helped patients with daily tasks.",
          after:
            "Delivered patient care across 12-bed ward including monitoring vitals, medication administration, and coordinating with multidisciplinary teams.",
          whyItWorks: [
            "Clinical detail",
            "Role-specific terminology",
            "Measurable scope",
          ],
        },
      ],
    },
    {
      id: "why-ai-performs-better",
      title: "Why AI-Rewritten Bullet Points Perform Better",
      reasons: [
        {
          title: "They contain the right keywords",
          description:
            "ATS picks up industry-required terms naturally inserted.",
        },
        {
          title: "They show measurable value",
          description: "Recruiters prefer numbers, not general statements.",
        },
        {
          title: "They highlight skills properly",
          description: "AI adds relevant tools, systems, and terminology.",
        },
        {
          title: "They improve clarity",
          description: "Short, sharp, professional phrasing.",
        },
        {
          title: "They align with the job description",
          description: "Crucial for ATS scoring and relevance.",
        },
      ],
    },
    {
      id: "how-to-use-ai",
      title: "How to Use AI to Improve Your Own Bullet Points",
      content: [
        {
          text: "Here's the ideal workflow to transform your CV bullet points using AI while ensuring both ATS relevance and recruiter impact.",
        },
      ],
      workflow: [
        "Upload your CV",
        "Paste the job description",
        "Highlight bullet points you want improved",
        "Use rewrite bullet points AI to strengthen content",
        "Integrate missing skills and keywords",
        "Keep only natural, honest improvements",
        "Export your updated CV in the same format",
      ],
    },
    {
      id: "why-cvlab",
      title: "Why CVLab Is Ideal for Bullet Point Optimisation",
      content: [
        {
          text: "CVLab improves your bullet points while keeping your structure exactly the same.",
        },
      ],
      features: [
        "AI bullet point rewriting",
        "Complete resume rewriter AI",
        "Keyword scanning",
        "Skills gap analysis",
        "ATS optimisation",
        "Content-only rewriting (keeps formatting)",
        "Job-description alignment",
      ],
      highlight: true,
    },
    {
      id: "final-thoughts",
      title: "Final Thoughts",
      content: [
        {
          text: "Strong bullet points are the foundation of an effective CV. With AI, you can transform vague responsibilities into clear, measurable accomplishments that match the job you want.",
        },
      ],
      benefits: [
        "Stronger CV bullet points",
        "Keyword-optimised content",
        "Measurable impact statements",
        "ATS-friendly phrasing",
        "Rewritten content without changing your layout",
      ],
      cta: "AI bullet point rewriting is the fastest and most reliable method.",
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

                  {/* Key points */}
                  {section.keyPoints && (
                    <div className="mt-6 rounded-2xl border border-white/5 bg-white/5 p-6">
                      <h4 className="mb-3 text-sm font-semibold tracking-wide text-white/80">
                        What Recruiters Look For
                      </h4>
                      <ul className="grid gap-2 sm:grid-cols-2">
                        {section.keyPoints.map((point, pointIndex) => (
                          <li
                            key={pointIndex}
                            className="flex items-center gap-2 text-sm text-white/60"
                          >
                            <ChevronRight className="h-4 w-4 flex-shrink-0 text-cyan-500/60" />
                            {point}
                          </li>
                        ))}
                      </ul>
                      {section.solution && (
                        <p className="mt-4 rounded-xl bg-cyan-500/10 p-4 text-sm text-cyan-300/80">
                          ✓ {section.solution}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Capabilities */}
                  {section.capabilities && (
                    <div className="mt-6 rounded-2xl border border-white/5 bg-white/5 p-6">
                      <ul className="grid gap-2 sm:grid-cols-2">
                        {section.capabilities.map((capability, capIndex) => (
                          <li
                            key={capIndex}
                            className="flex items-center gap-2 text-sm text-white/60"
                          >
                            <ChevronRight className="h-4 w-4 flex-shrink-0 text-cyan-500/60" />
                            {capability}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Before/After Examples */}
                  {section.examples && (
                    <div className="space-y-8">
                      {section.examples.map((example, exampleIndex) => (
                        <motion.div
                          key={exampleIndex}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.4,
                            delay: exampleIndex * 0.05,
                          }}
                          className="rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm"
                        >
                          {/* Role badge */}
                          <div className="mb-4">
                            <span className="inline-flex rounded-full bg-cyan-500/20 px-3 py-1 text-sm font-semibold text-cyan-300">
                              {example.role}
                            </span>
                          </div>

                          {/* Before */}
                          <div className="mb-4 rounded-xl bg-red-500/5 border border-red-500/10 p-4">
                            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-300/60">
                              Before
                            </p>
                            <p className="text-sm text-white/60 italic">
                              &ldquo;{example.before}&rdquo;
                            </p>
                          </div>

                          {/* Arrow */}
                          <div className="flex justify-center py-2">
                            <ArrowDown className="h-5 w-5 text-cyan-500/60" />
                          </div>

                          {/* After */}
                          <div className="mb-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 p-4">
                            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-cyan-300/60">
                              After (AI Rewrite)
                            </p>
                            <p className="text-sm text-white/80">
                              &ldquo;{example.after}&rdquo;
                            </p>
                          </div>

                          {/* Why it works */}
                          <div className="mt-4">
                            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/40">
                              Why It Works
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {example.whyItWorks.map((reason, reasonIndex) => (
                                <span
                                  key={reasonIndex}
                                  className="inline-flex rounded-full bg-white/5 px-3 py-1 text-xs text-white/60"
                                >
                                  {reason}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Reasons */}
                  {section.reasons && (
                    <div className="space-y-4">
                      {section.reasons.map((reason, reasonIndex) => (
                        <motion.div
                          key={reasonIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.3,
                            delay: reasonIndex * 0.05,
                          }}
                          className="flex items-start gap-4 rounded-xl border border-white/5 bg-white/5 p-4"
                        >
                          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-cyan-500/20 text-sm font-bold text-cyan-300">
                            {reasonIndex + 1}
                          </span>
                          <div>
                            <h4 className="mb-1 font-semibold text-white">
                              {reason.title}
                            </h4>
                            <p className="text-sm text-white/60">
                              {reason.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
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

                  {/* Benefits */}
                  {section.benefits && (
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
                            <ChevronRight className="h-4 w-4 flex-shrink-0 text-cyan-500" />
                            {benefit}
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
