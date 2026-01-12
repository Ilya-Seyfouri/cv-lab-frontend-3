"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Menu, X, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import heroImage from "../../../images/the_10_skills_that_get_uk_graduates_interviews.jpg";

// Blog content structure
const blogContent = {
  title: "The 10 Skills That Get UK Graduates Interviews",
  date: "January 2025",
  category: "Career Insights",
  readTime: "8 min read",

  intro: [
    "In today's UK graduate job market, having a degree is no longer enough to secure interviews. With some graduate roles receiving hundreds of applications per vacancy, employers are filtering candidates faster and more ruthlessly than ever.",
    "According to the Institute of Student Employers (ISE), UK employers received over 1.2 million applications for around 17,000 graduate roles in a recent recruitment cycle (Source: https://ise.org.uk/knowledge/insights/410/record_graduate_job_applications/).",
    "So what actually gets graduates shortlisted?",
    "Across employer surveys, labour market data, and recruiter insights, the same skills appear again and again. Below are the 10 skills most likely to get UK graduates interviews in 2026, backed by evidence and guidance on how to show them effectively.",
  ],

  sections: [
    {
      id: "communication-skills",
      title: "Communication Skills",
      content: [
        "Communication remains the most consistently demanded graduate skill in the UK. Research published by HE Professional shows that employers rank communication above technical knowledge when assessing graduate employability (Source:https://heprofessional.co.uk/edition/employers-perceptions-of-the-employability-skills-of-new-graduates-in-the-uk-release).",
        "Graduates who can write clearly, explain ideas, and communicate professionally especially in hybrid environments, stand out immediately. Poor communication is also one of the most common reasons candidates fail at an interview.",
      ],
    },
    {
      id: "problem-solving",
      title: "Problem-Solving Ability",
      content: [
        "UK employers increasingly value how graduates think, not just what they know. Problem-solving appears in the top five skills across most graduate employer surveys.",
        "Recruiters look for evidence that candidates can analyse situations, make decisions, and adapt when faced with uncertainty skills that translate across industries.",
      ],
    },
    {
      id: "digital-confidence",
      title: "Digital Confidence",
      content: [
        "Digital skills are now expected across almost all graduate roles. A report from techUK estimates that around 3 million UK jobs require digital skills, many of them non-technical (Source: https://www.techuk.org/shaping-policy/fast-forward-for-digital-jobs-report.html).",
        "Graduates don't need to code but they do need to show confidence using digital tools, platforms, and increasingly, AI-assisted workflows.",
      ],
    },
    {
      id: "teamwork",
      title: "Teamwork and Collaboration",
      content: [
        "Modern workplaces are collaborative by default. Employers want graduates who can work effectively in teams often across departments or remotely.",
        "This skill is frequently assessed through group interviews, assessment centres, and CV evidence from university projects, placements, or part-time work.",
      ],
    },
    {
      id: "adaptability",
      title: "Adaptability and Willingness to Learn",
      content: [
        "Career paths are no longer linear, and employers know it. Research from the Chartered Management Institute (CMI) found that 58% of employers believe graduates lack resilience, closely linked to adaptability (Source:https://www.managers.org.uk/knowledge-and-insights/article/do-graduates-lack-the-skills-to-be-work-ready/).",
        "Graduates who show they can learn quickly, handle change, and stay productive under pressure are far more likely to be shortlisted.",
      ],
    },
    {
      id: "commercial-awareness",
      title: "Commercial Awareness",
      content: [
        "Employers consistently say they want graduates who understand how organisations operate not just their specific role.",
        "Commercial awareness includes understanding customers, markets, competition, and how your work contributes to business goals. It's especially important for graduate schemes and corporate roles.",
      ],
    },
    {
      id: "time-management",
      title: "Time Management and Organisation",
      content: [
        "With tight deadlines and multiple responsibilities, employers want graduates who can manage their time effectively.",
        "Evidence of balancing studies with work, extracurriculars, or leadership roles helps demonstrate this skill, particularly for fast-paced industries.",
      ],
    },
    {
      id: "data-awareness",
      title: "Data Awareness",
      content: [
        "You don't need to be a data analyst, but basic data literacy is increasingly valuable. Government labour market forecasts show digital and data-related skills growing faster than most other areas through 2030 (Source:https://www.gov.uk/government/publications/assessment-of-priority-skills-to-2030/assessment-of-priority-skills-to-2030).",
        "Graduates who can interpret simple metrics, reports, or dashboards are seen as more confident and decision-ready.",
      ],
    },
    {
      id: "initiative",
      title: "Initiative and Proactivity",
      content: [
        "Employers want graduates who don't wait to be told what to do. Initiative signals motivation, confidence, and leadership potential.",
        "This skill often comes through experiences like internships, volunteering, student societies, or self-led projects.",
      ],
    },
    {
      id: "self-awareness",
      title: "Self-Awareness and Professionalism",
      content: [
        "Graduates who understand their strengths and can communicate them clearly perform better in applications and interviews.",
        "Professionalism includes tone, presentation, honesty, and clarity. Recruiters often say this is noticeable within seconds of reviewing a CV.",
      ],
    },
    {
      id: "showing-skills",
      title: "The Real Challenge: Showing These Skills on Your CV",
      content: [
        "Most graduates already have many of these skills. The problem is how they're presented.",
        "Common mistakes include:",
      ],
      list: [
        "Listing skills without evidence",
        "Using generic phrases",
        "Sending the same CV to every employer",
      ],
      afterList: "In a competitive market, relevance is what gets interviews.",
    },
    {
      id: "cvlab-helps",
      title: "How CVLab Helps Graduates Get Interview-Ready",
      content: [
        "This is where CVLab gives graduates a real advantage.",
        "CVLab allows you to upload your CV once and automatically tailor it to each job description. Instead of guessing which skills matter most, your CV highlights the exact competencies employers are asking for.",
      ],
    },
    {
      id: "cover-letters",
      title: "One-Click Cover Letters That Reinforce Your Skills",
      content: [
        "Cover letters still matter, especially for graduate roles—but writing a new one for every application is time-consuming. CVLab's one-click cover letter feature generates tailored letters that align with your CV and the job description, reinforcing your suitability rather than repeating generic statements.",
      ],
    },
  ],

  conclusion: {
    title: "Final Thoughts",
    content: [
      "Getting interviews in the UK graduate job market isn't about being perfect, it's about being relevant, clear, and well-prepared.",
      "The graduates who secure interviews are the ones who can demonstrate strong communication, adaptability, digital confidence, and problem-solving and tailor their applications to each role.",
      "With competition at record levels, tools like CVLab help turn strong potential into interview-ready applications giving graduates the best possible chance to be seen, shortlisted, and hired.",
    ],
  },
};

// Table of Contents
const tocItems = blogContent.sections.map((section) => ({
  id: section.id,
  title: section.title,
}));

export default function TenSkillsGraduates() {
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
                  alt="The 10 Skills That Get UK Graduates Interviews"
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
