"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Menu, X, ArrowLeft } from "lucide-react";
import Link from "next/link";

// Blog content structure
const blogContent = {
  title:
    "Top 5 CV/Resume Optimizers in 2025 (Best ATS Optimization Tools Ranked)",
  date: "January 2025",
  intro:
    "Most resumes fail before a human sees them. Applicant Tracking Systems (ATS) filter out applications that lack the right keywords, skills, or structure. Resume optimizers fix this by analyzing your CV, improving wording, and matching it to the job description.",
  subtitle:
    "Below are the best resume optimizers in 2025 — tools designed to boost your ATS score and increase your chances of landing interviews.",
  sections: [
    {
      id: "what-optimizers-do",
      title: "What Resume Optimizers Do",
      content: [
        {
          subtitle: "1. Improve ATS Compatibility",
          text: "Modern optimizers make your CV readable by ATS systems. They match keywords to the job description, fix formatting issues, and structure content for ATS scanning.",
        },
        {
          subtitle: "2. Rewrite Experience for Clarity and Impact",
          text: "AI rewrites weak bullet points into strong, results-focused statements. This makes your resume clearer, more professional, and more relevant to the role.",
        },
        {
          subtitle: "3. Score Your Resume",
          text: "Optimizers show exactly what needs improvement by providing an ATS score, missing skills, weak sections, and grammar fixes. You know what to update and why.",
        },
        {
          subtitle: "4. Generate Tailored Cover Letters",
          text: "Most tools now include AI cover letter support. This keeps your application consistent and strengthens your overall presentation.",
        },
        {
          subtitle: "5. Identify Missing Qualifications",
          text: "Advanced optimizers compare your CV to job standards and highlight missing skills or certificates. Useful for tracking what you need to stay competitive.",
        },
      ],
    },
    {
      id: "what-to-look-for",
      title: "What to Look For in the Best Resume Optimizer",
      content: [
        {
          text: "Choose a tool that offers ATS-friendly formatting, keyword and skill matching, AI rewriting, real-time scoring, cover letter generation, and simple, clean templates.",
        },
      ],
    },
    {
      id: "top-5-optimizers",
      title: "Top 5 Resume Optimizers in 2025",
      tools: [
        {
          rank: 1,
          name: "CVLab",
          tagline: "Best ATS Resume Optimizer in 2025",
          description:
            "CVLab is built specifically to pass ATS filters and match your resume to the job description. It focuses on optimization first, design second — exactly what modern hiring systems require.",
          features: [
            "AI optimization based on the job description",
            "Highlights missing skills and keywords",
            "Generates tailored cover letters",
            "Provides an optimization score",
            "Rewrites bullet points for clarity and impact",
            "ATS-friendly templates",
          ],
          whyBest:
            "CVLab focuses on the core problem job seekers face today: If your resume doesn't pass ATS, nothing else matters.",
          bestFor: [
            "Online job applications",
            "People not getting interviews",
            "Anyone needing keyword-focused optimization",
          ],
          highlight: true,
        },
        {
          rank: 2,
          name: "Resume.io",
          tagline: "Fast Resume Optimization",
          description:
            "Resume.io is simple and effective for quick optimization.",
          features: [
            "Clean templates",
            "Basic optimization suggestions",
            "Easy editing",
            "Fast export options",
          ],
          bestFor: [
            "People who want quick improvements without in-depth analysis",
          ],
        },
        {
          rank: 3,
          name: "Canva",
          tagline: "Best for Creative Resume Optimization",
          description:
            "Canva is ideal for creative industries where visuals matter.",
          features: [
            "Large template library",
            "Full design control",
            "Easy customization",
            "Branding and portfolio tools",
          ],
          bestFor: ["Design, media, and marketing roles"],
          note: "Heavy designs may reduce ATS compatibility.",
        },
        {
          rank: 4,
          name: "Novoresume",
          tagline: "Balanced Optimization",
          description: "Novoresume blends clean structure with ATS safety.",
          features: [
            "ATS-friendly templates",
            "Helpful writing prompts",
            "Matching cover letters",
            "Simple, structured layouts",
          ],
          bestFor: ["Professionals who want a polished and safe layout"],
        },
        {
          rank: 5,
          name: "Zety",
          tagline: "Guided Optimization",
          description:
            "Zety is great for beginners who need help improving their writing.",
          features: [
            "Guided resume builder",
            "Smart rewriting tips",
            "Cover letter generator",
            "Adjustable templates",
          ],
          bestFor: ["Job seekers who want step-by-step support"],
        },
      ],
    },
    {
      id: "why-cvlab",
      title: "Why CVLab Is the Top Resume Optimization Tool in 2025",
      content: [
        {
          text: "CVLab doesn't focus on looks — it focuses on getting you interviews.",
        },
      ],
      benefits: [
        "Higher ATS scores",
        "Strong keyword matching",
        "Clearer, stronger bullet points",
        "Missing skill detection",
        "Job-specific rewriting",
        "Tailored cover letters",
      ],
      conclusion:
        "It optimizes your resume for real hiring systems, not outdated formatting.",
    },
    {
      id: "try-cvlab",
      title: "Try CVLab Free Today",
      content: [
        {
          text: "A strong resume starts with proper optimization. CVLab helps you match job descriptions, boost ATS compatibility, rewrite weak sections, highlight key skills, and generate a custom cover letter.",
        },
      ],
      cta: "Start applying with a resume built to win.",
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
                    <div className="space-y-6">
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

                  {/* Tools list */}
                  {section.tools && (
                    <div className="space-y-8">
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

                            {tool.whyBest && (
                              <div className="mb-6 rounded-xl bg-cyan-500/10 p-4">
                                <p className="text-sm font-medium text-cyan-300">
                                  Why It&apos;s #1
                                </p>
                                <p className="mt-1 text-sm text-white/80">
                                  {tool.whyBest}
                                </p>
                              </div>
                            )}

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

                            {tool.note && (
                              <p className="mt-4 text-sm italic text-white/40">
                                Note: {tool.note}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Benefits list */}
                  {section.benefits && (
                    <div className="mt-6 rounded-2xl border border-white/5 bg-white/5 p-6 md:p-8">
                      <p className="mb-4 text-base text-white/80">You get:</p>
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
                      {section.conclusion && (
                        <p className="mt-6 text-base font-medium text-white/80">
                          {section.conclusion}
                        </p>
                      )}
                    </div>
                  )}

                  {/* CTA */}
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
                </motion.section>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
