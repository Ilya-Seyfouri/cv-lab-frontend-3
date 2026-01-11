"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Menu, X, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import heroImage from "../../../images/graduate_job_market_2026_what_students_need_to_know.png";
// Replace with your actual image path

// Blog content structure
const blogContent = {
  title: "Graduate Job Market 2026: What Students Need to Know",
  date: "January 2025",
  category: "Career Insights",
  readTime: "8 min read",
  
  intro: [
    "For students graduating in 2026, the UK job market is both full of opportunity and more competitive than ever. Graduate roles are changing, employer expectations are evolving, and the traditional 'degree-first' mindset is fading fast. Understanding what's happening in the market and how to prepare for it as it can make the difference between struggling to get interviews and securing a role early.",
    "Here's what the graduate job market really looks like in 2026, backed by data, trends, and practical insight."
  ],

  sections: [
    {
      id: "competition",
      title: "Graduate Competition Is at Record Levels",
      content: [
        "The biggest reality check for students entering the job market is competition. According to the Institute of Student Employers (ISE), UK employers received over 1.2 million applications for approximately 17,000 graduate vacancies in a recent recruitment cycle, marking a significant increase in applications per role compared to previous years.",
        "This means that for many graduate schemes, hundreds of students are competing for a single position. In this environment, being 'qualified' is no longer enough, you need to be clearly relevant."
      ],
      source: {
        text: "Institute of Student Employers (ISE)",
        url: "https://ise.org.uk/knowledge/insights/410/record_graduate_job_applications/"
      }
    },
    {
      id: "employment-rates",
      title: "Employment Rates Are Strong, But Not Evenly Distributed",
      content: [
        "On the surface, graduate employment figures look positive. UK government data shows that 87.6% of graduates are in employment, compared to 68% of non-graduates.",
        "However, the same data reveals an important detail: not all graduates are entering high-skilled roles immediately. While around 60% of graduates aged 21–30 are in professional or managerial jobs, a significant proportion are underemployed or working in roles unrelated to their degree.",
        "This highlights a key takeaway for students in 2026: how you present your skills matters just as much as what you studied."
      ],
      source: {
        text: "UK Government Graduate Labour Markets Data",
        url: "https://explore-education-statistics.service.gov.uk/find-statistics/graduate-labour-markets/2024"
      }
    },
    {
      id: "skills-based",
      title: "Employers Are Shifting to Skills-Based Hiring",
      content: [
        "One of the most important trends shaping the graduate job market is the move away from degree-heavy hiring. Research discussed by Wonkhe shows that employers are increasingly focusing on transferable skills and potential rather than academic specialism alone.",
        "This shift reflects how quickly workplaces are changing. Employers know that tools, platforms, and even job roles evolve but skills like communication, problem-solving, and adaptability remain valuable long-term.",
        "For students, this means your CV should highlight what you can do, not just what you studied."
      ],
      source: {
        text: "Wonkhe - Skills Over Technical Knowledge",
        url: "https://wonkhe.com/blogs/employers-will-increasingly-focus-on-graduates-skills-over-technical-knowledge/"
      }
    },
    {
      id: "digital-skills",
      title: "Digital Skills Are Now Expected Across Most Roles",
      content: [
        "Digital confidence is no longer optional. A report from techUK estimates that around 3 million UK jobs require digital skills, spanning sectors far beyond traditional technology roles.",
        "In the graduate market, this shows up in job descriptions asking for familiarity with:"
      ],
      list: [
        "Digital tools and platforms",
        "AI-assisted workflows",
        "Basic data handling and analysis"
      ],
      afterList: "Students who demonstrate comfort with technology, even at a basic level make you immediately more employable in 2026.",
      source: {
        text: "techUK - Fast Forward for Digital Jobs Report",
        url: "https://www.techuk.org/shaping-policy/fast-forward-for-digital-jobs-report.html"
      }
    },
    {
      id: "communication-gap",
      title: "Communication and Employability Skills Remain a Major Gap",
      content: [
        "Despite strong academic performance, many employers believe graduates lack essential workplace skills. Research published by HE Professional consistently ranks communication as one of the most important skills employers look for in graduates.",
        "At the same time, a Chartered Management Institute (CMI) survey found that 36% of employers cite communication as a key skills gap, while 58% point to a lack of resilience among new graduates.",
        "In a competitive market, these gaps can quickly cost candidates interviews."
      ],
      sources: [
        {
          text: "HE Professional - Employability Skills Research",
          url: "https://heprofessional.co.uk/edition/employers-perceptions-of-the-employability-skills-of-new-graduates-in-the-uk-release"
        },
        {
          text: "CMI - Graduate Work Readiness Survey",
          url: "https://www.managers.org.uk/knowledge-and-insights/article/do-graduates-lack-the-skills-to-be-work-ready/"
        }
      ]
    },
    {
      id: "adaptability",
      title: "Adaptability Is Becoming a Core Hiring Requirement",
      content: [
        "The graduate job market in 2026 reflects a broader reality: careers are no longer linear. Employers expect graduates to change roles, learn new tools, and adapt quickly.",
        "Government labour market forecasts show that fast-growing sectors particularly digital, green energy, and data-driven industries will continue to evolve rapidly through 2030.",
        "As a result, employers increasingly value learning ability and flexibility over narrow expertise."
      ],
      source: {
        text: "UK Government - Assessment of Priority Skills to 2030",
        url: "https://www.gov.uk/government/publications/assessment-of-priority-skills-to-2030/assessment-of-priority-skills-to-2030"
      }
    },
    {
      id: "biggest-mistake",
      title: "The Biggest Mistake Students Make When Applying",
      content: [
        "Despite all this data, many students still approach applications the same way:"
      ],
      list: [
        "One generic CV for every role",
        "Skills listed without evidence",
        "Little alignment with job descriptions"
      ],
      afterList: "In a market where hundreds of candidates meet the basic criteria, this approach makes it easy to be overlooked, especially by Applicant Tracking Systems (ATS)."
    },
    {
      id: "cvlab-solution",
      title: "How CVLab Helps Students Compete in 2026",
      content: [
        "This is where CVLab becomes particularly useful for students and recent graduates.",
        "CVLab allows users to upload their CV once and automatically tailor it to specific job descriptions. Instead of guessing what employers want, your CV highlights the exact skills and experience each role asks whether that comes from university projects, internships, part-time work, or volunteering.",
        "This targeted approach helps applications stand out in both ATS screening and recruiter reviews."
      ],
      highlight: true
    },
    {
      id: "cover-letters",
      title: "One-Click Cover Letters for Competitive Graduate Roles",
      content: [
        "Cover letters still play an important role in many graduate applications but writing a new one for every job is time-consuming. CVLab's one-click cover letter feature generates tailored letters that align with both the job description and your CV, ensuring consistency and relevance across applications.",
        "In a market as competitive as 2026, this can save time while improving quality."
      ],
      highlight: true
    }
  ],

  conclusion: {
    title: "Final Thoughts",
    content: [
      "The graduate job market in 2026 is defined by high competition, skills-based hiring, and rising employer expectations. While employment rates remain strong overall, students who fail to adapt their applications risk being left behind.",
      "Graduates who understand market trends, develop in-demand skills, and tailor their applications effectively will always have an advantage. With tools like CVLab, students can approach the job market with clarity, confidence, and a far better chance of standing out.",
      "Prepare early. Apply smarter. And position yourself for success in a rapidly changing graduate job market."
    ]
  }
};

// Table of Contents
const tocItems = blogContent.sections.map((section) => ({
  id: section.id,
  title: section.title,
}));

export default function GraduateJobMarket2026() {
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
                  alt="Graduate Job Market 2026"
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
              {blogContent.sections.map((section, sectionIndex) => (
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
                      </>
                    )}

                    {/* Single source */}
                    {section.source && (
                      <div className="mt-4 rounded-xl border border-white/5 bg-white/5 p-4">
                        <a
                          href={section.source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Source: {section.source.text}
                        </a>
                      </div>
                    )}

                    {/* Multiple sources */}
                    {section.sources && (
                      <div className="mt-4 space-y-2">
                        {section.sources.map((source, sourceIndex) => (
                          <div
                            key={sourceIndex}
                            className="rounded-xl border border-white/5 bg-white/5 p-4"
                          >
                            <a
                              href={source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200"
                            >
                              <ExternalLink className="h-4 w-4" />
                              Source: {source.text}
                            </a>
                          </div>
                        ))}
                      </div>
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