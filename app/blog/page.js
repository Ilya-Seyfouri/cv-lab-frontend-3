"use client";

import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navbar2 from "../sections/NavBar2";

// Import blog images
import graduateJobMarketImage from "../../images/graduate_job_market_2026_what_students_need_to_know.png";
import demandedSkillsImage from "../../images/the_most_demanded_graduate_skills_in_the_uk_2026.png";
import oneCVImage from "../../images/graduate_job_market_2026_what_students_need_to_know.png";
import aiDetectionImage from "../../images/graduate_job_market_2026_what_students_need_to_know.png";
// Blog posts data
const blogPosts = [
  {
    slug: "graduate_job_market_2026_what_students_need_to_know",
    title: "Graduate Job Market 2026: What Students Need to Know",
    excerpt:
      "For students graduating in 2026, the UK job market is both full of opportunity and more competitive than ever. Learn what's really happening in the graduate market.",
    date: "January 2025",
    readTime: "8 min read",
    category: "Career Insights",
    image: graduateJobMarketImage,
  },
  {
    slug: "the_most_demanded_graduate_skills_in_the_uk_2026",
    title: "The Most Demanded Graduate Skills in the UK in 2026",
    excerpt:
      "Graduate roles are changing, and employer expectations are evolving. Understand the skills employers are really looking for and how to present them effectively.",
    date: "January 2025",
    readTime: "8 min read",
    category: "Career Insights",
    image: demandedSkillsImage,
  },
  {
    slug: "one_cv_or_multiple_how_to_tailor_applications_efficiently",
    title: "One CV or Multiple? How to Tailor Applications Efficiently",
    excerpt:
      "Do you really need a different CV for every role? Learn the smart approach to CV tailoring that saves time while improving your interview chances.",
    date: "January 2025",
    readTime: "6 min read",
    category: "Guides & Tutorials",
    image: oneCVImage,
  },
  {
    slug: "are_recruiters_using_ai_to_detect_AI-written_cvs",
    title: "Are Recruiters Using AI to Detect AI-Written CVs?",
    excerpt:
      "Yes — and it's becoming more common. Learn how AI detection tools work, why generic AI CVs get rejected, and how to use AI smartly without getting flagged.",
    date: "January 2025",
    readTime: "6 min read",
    category: "Career Insights",
    image: aiDetectionImage,
  },
];

export default function BlogListingPage() {
  return (
    <>
      <Navbar2 />
      <div className="min-h-screen bg-black text-white pt-25">
        {/* Background gradient effects */}
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute top-0 left-1/4 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-cyan-500/5 blur-3xl" />
          <div className="absolute top-1/3 right-0 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-3xl" />
          <div className="absolute bottom-1/4 left-0 h-[400px] w-[400px] rounded-full bg-cyan-400/5 blur-3xl" />
        </div>

        <div className="container mx-auto max-w-7xl px-4 py-12 lg:py-16">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h1 className="mb-4 bg-gradient-to-b from-white to-white/60 bg-clip-text text-4xl font-semibold text-transparent md:text-5xl lg:text-6xl">
              Our Latest Articles
            </h1>
            <p className="mx-auto max-w-2xl text-base text-white/60 md:text-lg">
              Discover tips and insights to help you land your dream job
              with an optimized resume.
            </p>
          </motion.header>

          {/* Blog Grid */}
          <div className="grid gap-6 md:grid-cols-2  lg:grid-cols-3">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block h-full"
                >
                  <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/30 hover:bg-white/10">
                    {/* Image */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
                      <Image
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-6">
                      {/* Category */}
                      <span className="mb-3 inline-flex w-fit rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                        {post.category}
                      </span>

                      {/* Title */}
                      <h2 className="mb-3 line-clamp-2 text-lg font-semibold text-white transition-colors group-hover:text-cyan-300 md:text-xl">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="mb-4 flex-1 line-clamp-3 text-sm text-white/60">
                        {post.excerpt}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center gap-4 border-t border-white/5 pt-4 text-xs text-white/40">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
