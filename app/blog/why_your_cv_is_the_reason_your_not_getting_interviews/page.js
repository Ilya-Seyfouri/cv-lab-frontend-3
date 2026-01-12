"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Menu, X, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import heroImage from "../../../images/how_to_tailor_applications_efficiently.jpg";

// Blog content structure
const blogContent = {
  title: "Why Your CV Is the Reason You're Not Getting Interviews",
  date: "January 2025",
  category: "Career Insights",
  readTime: "7 min read",

  intro: [
    "If you're applying for jobs, meeting the requirements, and still hearing nothing back, it's easy to assume the market is broken or that employers are ignoring you.",
    "In reality, the most common reason candidates don't get interviews is much simpler.",
    "Your CV isn't doing its job.",
    "In the UK job market, especially for graduates and early-career roles, your CV is often the only thing standing between you and an interview. And for most candidates, it's the weakest part of the application.",
  ],

  sections: [
    {
      id: "numbers-dont-lie",
      title: "The Numbers Don't Lie: Competition Is Brutal",
      content: [
        "According to the Institute of Student Employers (ISE), UK employers received over 1.2 million applications for roughly 17,000 graduate roles in a single recruitment cycle.",
        "Source: https://ise.org.uk/knowledge/insights/410/record_graduate_job_applications/",
        'That means recruiters are rejecting the vast majority of CVs, often after just 6 to 8 seconds of scanning. In that time, they\'re not asking "Is this person talented?"',
        'They\'re asking "Is this CV clearly relevant to this role?"',
        "If the answer isn't obvious, the CV is gone.",
      ],
    },
    {
      id: "never-reach-human",
      title: "Most CVs Never Reach a Human",
      content: [
        "One of the biggest misconceptions job seekers have is that recruiters read every CV.",
        "They don't.",
        "Research consistently shows that over 75 percent of large UK employers use Applicant Tracking Systems (ATS) to filter applications before a recruiter sees them. These systems score CVs based on how closely they match the job description, including skills, keywords, structure, and clarity.",
        "If your CV doesn't align, it's rejected automatically, regardless of your potential.",
        "This is one of the main reasons qualified candidates never get interviews.",
      ],
    },
    {
      id: "generic-cvs-fail",
      title: "Generic CVs Are Designed to Fail",
      content: [
        "One CV sent to every job might feel efficient, but it's one of the fastest ways to get rejected.",
        "Employer research highlighted by Wonkhe shows that UK employers are increasingly focused on skills-based and role-specific hiring, rather than broad academic profiles.",
        "Source: https://wonkhe.com/blogs/employers-will-increasingly-focus-on-graduates-skills-over-technical-knowledge/",
        "Yet many CVs still:",
      ],
      list: [
        "Use vague, generic skill descriptions",
        "Fail to mirror job description language",
        "Emphasise responsibilities instead of outcomes",
      ],
      afterList:
        "In a market where hundreds of applicants meet the minimum criteria, generic CVs simply blend into the background.",
    },
    {
      id: "degrees-over-featured",
      title: "Degrees Are Over-Featured, Skills Are Under-Explained",
      content: [
        "UK government data shows that 87.6 percent of graduates are employed, compared to 68 percent of non-graduates.",
        "Source: https://explore-education-statistics.service.gov.uk/find-statistics/graduate-labour-markets/2024",
        "But employers are clear. Having a degree is expected. It's not impressive on its own.",
        "Employer perception research from HE Professional consistently shows that recruiters prioritise communication, problem-solving, adaptability, and digital confidence over academic detail.",
        "Source: https://heprofessional.co.uk/edition/employers-perceptions-of-the-employability-skills-of-new-graduates-in-the-uk-release",
        "CVs that focus heavily on modules, grades, and theory without showing real-world application fail to answer the employer's key question:",
        '"What can you actually do?"',
      ],
    },
    {
      id: "poor-structure",
      title: "Poor Structure Signals Poor Communication",
      content: [
        "Communication is one of the most demanded skills in the UK job market, yet many CVs demonstrate the opposite.",
        "Surveys by the Chartered Management Institute (CMI) show that 36 percent of employers cite communication as a major skills gap, while 58 percent point to a lack of resilience.",
        "Source: https://www.managers.org.uk/knowledge-and-insights/article/do-graduates-lack-the-skills-to-be-work-ready/",
        "Long paragraphs, cluttered layouts, irrelevant detail, and unclear sections all signal weak communication before an interview even begins. Recruiters don't have time to figure out your CV. They move on.",
      ],
    },
    {
      id: "listing-skills",
      title: "Listing Skills Without Evidence Is a Silent Killer",
      content: [
        "One of the most common CV mistakes is listing skills with no proof.",
        'Saying you have "teamwork" or "problem-solving" skills means very little without evidence. Employers want to see:',
      ],
      list: ["What you did", "How you did it", "What changed as a result"],
      afterList:
        "This applies whether your experience comes from internships, university projects, part-time work, or volunteering.\n\nWithout evidence, your CV reads like everyone else's.",
    },
    {
      id: "tailoring-not-optional",
      title: "Why Tailoring Is No Longer Optional",
      content: [
        "In today's market, relevance beats volume. A CV that's closely aligned to a job description is far more likely to:",
      ],
      list: [
        "Pass ATS screening",
        "Be understood quickly by recruiters",
        "Lead to interviews",
      ],
      afterList:
        "Even small changes, such as adjusting skill wording or re-prioritising experience, can dramatically improve results. Yet many candidates skip tailoring because it's time-consuming.",
    },
    {
      id: "cvlab-fixes",
      title: "How CVLab Fixes the Real Problem",
      content: [
        "This is exactly the issue CVLab is designed to solve.",
        "CVLab allows you to upload your CV once and automatically tailor it to each job description. Instead of sending the same generic CV everywhere, your application is optimised for:",
      ],
      list: [
        "Job-specific skills and keywords",
        "ATS compatibility",
        "Clear, recruiter-friendly structure",
      ],
      afterList:
        'This means your CV answers the employer\'s question immediately: "Is this person right for this role?"',
    },
    {
      id: "one-click-cover-letters",
      title: "One-Click Cover Letters That Support Your CV",
      content: [
        "A strong CV alone isn't always enough. Many UK roles still expect a cover letter, but writing one for every application is time-consuming.",
        "CVLab generates tailored cover letters in one click, ensuring your message aligns with both the job description and your CV. This consistency strengthens your application rather than weakening it with generic statements.",
      ],
    },
  ],

  conclusion: {
    title: "Final Thoughts",
    content: [
      "If you're not getting interviews, it's rarely because you're unqualified.",
      "It's because your CV:",
    ],
    list: [
      "Isn't tailored",
      "Isn't clear",
      "Isn't aligned with how employers hire today",
    ],
    afterList: [
      "In a market where competition is intense and screening is automated, your CV has to work harder than ever.",
      "With the right structure, clear evidence, and targeted tailoring, supported by tools like CVLab, you give your experience the chance it deserves.",
      "Your CV isn't just a document.",
      "It's your first interview.",
    ],
  },
};

// Table of Contents
const tocItems = blogContent.sections.map((section) => ({
  id: section.id,
  title: section.title,
}));

export default function WhyCVReason() {
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
                  alt="Why Your CV Is the Reason You're Not Getting Interviews"
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
                  {blogContent.conclusion.list && (
                    <ul className="my-4 space-y-2 pl-1">
                      {blogContent.conclusion.list.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="flex items-start gap-3 text-base text-white/60 md:text-lg"
                        >
                          <ChevronRight className="mt-1 h-5 w-5 flex-shrink-0 text-cyan-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {blogContent.conclusion.afterList &&
                    blogContent.conclusion.afterList.map((paragraph, index) => (
                      <p
                        key={`after-${index}`}
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
