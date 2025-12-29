"use client";

import { motion } from "framer-motion";
import { ChevronRight, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import CVLOGO from "../../images/logo.png";
import Image from "next/image";
import Navbar2 from "../sections/NavBar2";

// Blog posts data - add new blogs here
const blogPosts = [
  {
    slug: "ats-resume-checkers-keyword-scanners",
    title: "ATS Resume Checkers and Keyword Scanners: Do They Really Work?",
    excerpt:
      "If you're applying for jobs online, you've already gone through an ATS. Learn what ATS checkers and keyword scanners do, how they work, what they get right, and how to use them to increase your interview chances.",
    date: "January 2025",
    readTime: "9 min read",
    category: "Tools & Reviews",
    featured: true,
  },
  {
    slug: "ai-resume-matchers-explained",
    title:
      "AI Resume Matchers Explained: How Job Description–Resume Matching Really Works",
    excerpt:
      "Most job seekers send the same resume to every application, then wonder why they aren't getting interviews. Learn how AI resume matchers analyse your resume, calculate job match scores, and help you tailor your application in minutes.",
    date: "January 2025",
    readTime: "10 min read",
    category: "Guides & Tutorials",
  },
  {
    slug: "top-5-resume-optimizers-ai-ats-2025",
    title:
      "Top 5 Resume Optimizers in 2025 (Best AI & ATS Resume Tools Ranked)",
    excerpt:
      "Most resumes never reach a human recruiter. ATS filter out applications that don't use the right keywords, skills, or formatting. Discover the best AI resume optimizers to increase your interview rate.",
    date: "January 2025",
    readTime: "11 min read",
    category: "Tools & Reviews",
  },
  {
    slug: "top-5-cv-resume-optimizers-2025",
    title:
      "Top 5 CV/Resume Optimizers in 2025 (Best ATS Optimization Tools Ranked)",
    excerpt:
      "Most resumes fail before a human sees them. Applicant Tracking Systems (ATS) filter out applications that lack the right keywords, skills, or structure. Discover the best resume optimizers to boost your ATS score.",
    date: "January 2025",
    readTime: "8 min read",
    category: "Tools & Reviews",
  },
  {
    slug: "how-to-tailor-resume-ai-2025",
    title:
      "How to Tailor Your Resume to Any Job Description Using AI (2025 Guide)",
    excerpt:
      "Most job seekers send the same resume to every role, and ATS systems filter them out instantly. Learn how AI makes tailoring your resume fast, accurate, and stress-free.",
    date: "January 2025",
    readTime: "10 min read",
    category: "Guides & Tutorials",
  },
  {
    slug: "resume-skills-analysis-ai-gaps-keywords",
    title:
      "Resume Skills Analysis: How AI Finds Gaps, Keywords and ATS Requirements",
    excerpt:
      "Most resumes fail because they don't showcase the right skills. Learn how AI scans your resume, identifies missing skills, highlights keyword gaps, and detects ATS issues.",
    date: "January 2025",
    readTime: "11 min read",
    category: "Guides & Tutorials",
  },
  {
    slug: "improve-cv-bullet-points-ai-examples",
    title: "Improve Your CV Bullet Points: Real Before-and-After AI Examples",
    excerpt:
      "Most CVs fail for one simple reason: the bullet points are weak. See real before-and-after examples of how AI transforms vague duties into powerful, measurable achievements.",
    date: "January 2025",
    readTime: "12 min read",
    category: "Examples & Tips",
  },
  {
    slug: "maintain-cv-formatting-ai",
    title: "Maintain CV Formatting With AI: Fix Content, Not Your Layout",
    excerpt:
      "Most AI CV tools fix your writing but destroy your formatting. Learn how modern AI can rewrite and optimise your CV without touching the structure.",
    date: "January 2025",
    readTime: "9 min read",
    category: "Guides & Tutorials",
  },
];

export default function BlogListingPage() {
  return (
    <>
      <Navbar2 />
      <div className="min-h-screen bg-black text-white pt-15">
        {/* Background gradient effects */}
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute top-0 left-1/4 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-cyan-500/5 blur-3xl" />
          <div className="absolute top-1/3 right-0 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-3xl" />
          <div className="absolute bottom-1/4 left-0 h-[400px] w-[400px] rounded-full bg-cyan-400/5 blur-3xl" />
        </div>

        <div className="container mx-auto max-w-6xl px-4 py-12 lg:py-20">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            {/* Top row */}
            <div className="relative flex items-center h-16">
              <div className="pt-20 "></div>

              {/* Blog — true center */}
              <h1 className="absolute left-1/2 -translate-x-1/2 bg-gradient-to-b from-white to-white/60 bg-clip-text text-4xl font-semibold  md:text-5xl lg:text-6xl text-center">
                Blog
              </h1>
            </div>

            {/* Subtitle */}
            <p className="mx-auto mt-6 max-w-2xl text-center text-base text-white/60 md:text-lg">
              Expert tips, guides, and insights to help you land your dream job
              with an optimized resume.
            </p>
          </motion.header>

          {/* Blog Grid */}
          <div className="grid gap-8 md:grid-cols-2">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block h-full"
                >
                  <div className="relative h-full rounded-3xl border border-white/5 bg-white/5 p-[1px] backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/40 hover:bg-white/10">
                    <div className="flex h-full flex-col rounded-3xl bg-black/60 p-6 md:p-8">
                      {/* Category badge */}
                      <div className="mb-4">
                        <span className="inline-flex rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                          {post.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="mb-3 bg-gradient-to-b from-white to-white/80 bg-clip-text text-xl font-semibold text-transparent transition-all group-hover:from-cyan-300 group-hover:to-cyan-100 md:text-2xl">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="mb-6 flex-1 text-sm text-white/50 md:text-base">
                        {post.excerpt}
                      </p>

                      {/* Meta info */}
                      <div className="flex items-center justify-between border-t border-white/5 pt-4">
                        <div className="flex items-center gap-4 text-xs text-white/40">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {post.readTime}
                          </span>
                        </div>

                        {/* Read more arrow */}
                        <span className="flex items-center gap-1 text-sm font-medium text-cyan-300 opacity-0 transition-all group-hover:opacity-100">
                          Read
                          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* Empty state for when more blogs come */}
          {blogPosts.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-white/40">
                No blog posts yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
