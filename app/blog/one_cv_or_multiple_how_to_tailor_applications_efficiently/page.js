"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Menu, X, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import heroImage from "../../../images/graduate_job_market_2026_what_students_need_to_know.png"; // Replace with your actual image path

// Blog content structure
const blogContent = {
  title: "One CV or Multiple? How to Tailor Applications Efficiently",
  date: "January 2025",
  category: "Guides & Tutorials",
  readTime: "6 min read",

  intro: [
    "If you've been applying for jobs for more than a week, you've probably asked yourself this question already: do I really need a different CV for every role?",
    "It's a fair question and an exhausting one. Between job boards, cover letters, and follow-ups, the idea of rewriting your CV again and again can feel overwhelming. But using the same CV for every application doesn't work either.",
    "So what's the right balance?",
  ],

  sections: [
    {
      id: "generic-cv",
      title: "Why One Generic CV Rarely Gets Results",
      content: [
        "A single CV for every role feels efficient, but in practice, it often holds candidates back.",
        "Recruiters aren't reading CVs line by line. They're scanning. They're looking for familiar keywords, relevant experience, and quick proof that you match the role. If your CV feels broad or unfocused, it's easy to skip.",
        "On top of that, most companies use Applicant Tracking Systems (ATS). These systems compare your CV to the job description before a human ever sees it. If the match is weak, your application may be filtered out automatically.",
        "A generic CV isn't 'bad' it's just not specific enough.",
      ],
    },
    {
      id: "rewriting-problem",
      title: "Why Rewriting Your CV for Every Job Isn't Sustainable",
      content: [
        "At the other extreme, some candidates try to create a brand-new CV for each application.",
        "While this can improve relevance, it quickly becomes:",
      ],
      list: ["Time-consuming", "Mentally draining", "Easy to mess up"],
      afterList:
        "You end up copying the same content, tweaking wording, second-guessing yourself, and spending hours on small changes. Over time, this slows your job search and leads to burnout.",
      afterList2: "There has to be a better way.",
    },
    {
      id: "approach-that-works",
      title: "The Approach That Actually Works",
      content: [
        "The most effective strategy is surprisingly simple:",
        "One strong master CV, tailored for each role.",
        "Your master CV is your complete career story. It includes all your experience, skills, achievements, and everything you might need.",
        "From there, you tailor, not rewrite.",
        "That means:",
      ],
      list: [
        "Highlighting the experience that matters most for the role",
        "Adjusting wording to reflect the job description",
        "Prioritizing skills the employer is actively looking for",
      ],
      afterList:
        "You're still you. You're just presenting the most relevant version of yourself for each job, making you the ideal candidate.",
    },
    {
      id: "what-recruiters-want",
      title: "What Recruiters Are Really Looking For",
      content: [
        "Recruiters aren't expecting a completely different CV every time. What they want is relevance.",
        "A tailored CV shows that:",
      ],
      list: [
        "You've read the job description",
        "You understand what the role involves",
        "Your experience clearly aligns with their needs",
      ],
      afterList:
        "Even small changes like matching the language used in the job description can make a big difference in how your CV is received.",
    },
    {
      id: "how-to-tailor",
      title: "How to Tailor Your CV Without Burning Out",
      content: [
        "Tailoring your CV manually works, but it's slow and repetitive.",
        "That's why many job seekers now use tools that automate the process. With an automated CV tailoring platform, you can:",
      ],
      list: [
        "Upload your master CV once",
        "Add a job description",
        "Instantly generate a tailored version for that role",
      ],
      afterList:
        "The system highlights relevant experience, adjusts keywords for ATS, and keeps your formatting clean—all without you starting from scratch every time.",
    },
    {
      id: "the-answer",
      title: "So… One CV or Multiple?",
      content: ["Here's the honest answer:"],
      list: [
        "One generic CV → not targeted enough",
        "A brand-new CV every time → too much work",
        "One master CV, tailored efficiently → the sweet spot",
      ],
      afterList:
        "If you're applying to multiple jobs, this approach lets you stay consistent, relevant, and sane.",
    },
    {
      id: "cvlab-solution",
      title: "How CVLab Makes Tailoring Effortless",
      content: [
        "This is exactly where CVLab comes in.",
        "Instead of rewriting your CV again and again, CVLab lets you:",
      ],
      list: [
        "Upload your master CV once",
        "Paste a job description",
        "Instantly generate a tailored CV in one click",
      ],
      afterList:
        "The platform automatically aligns your experience with the role, optimizes keywords for ATS, and keeps everything clean and professional.",
      afterList2: "No guesswork. No copy-pasting. No wasted hours.",
      highlight: true,
    },
  ],

  conclusion: {
    title: "Apply Smarter, Not Harder",
    content: [
      "Job hunting is demanding enough. Your CV process shouldn't slow you down.",
      "By automatically tailoring your CV and generating matching cover letters in one click, CVLab helps you apply faster, stay consistent, and show up as the right candidate for every role.",
      "Spend less time editing—and more time landing interviews.",
    ],
  },
};

// Table of Contents
const tocItems = blogContent.sections.map((section) => ({
  id: section.id,
  title: section.title,
}));

export default function OneCVOrMultiple() {
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
                  alt="One CV or Multiple CVs"
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
                  className={`scroll-mt-24 ${
                    section.highlight
                      ? "rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6 md:p-8"
                      : ""
                  }`}
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
                        {section.afterList2 && (
                          <p className="text-base text-white/60 md:text-lg leading-relaxed">
                            {section.afterList2}
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
