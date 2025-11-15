"use client";

import { Star, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Engineer",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjMwNTI4MTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    content:
      "I landed 3 interviews in my first week using CVCraft! The AI perfectly matched my skills to each job description. Worth every penny.",
  },
  {
    name: "Michael Chen",
    role: "Product Manager",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    content:
      "Finally got past those ATS systems! Got my dream job at a Fortune 500 company. This tool is a game-changer for job seekers.",
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Specialist",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    content:
      "The cover letters are incredible – so personalized and professional. Saved me hours during my job search. Highly recommend!",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-20 md:py-32 scroll-mt-28">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent text-3xl md:text-4xl lg:text-5xl font-semibold">
            Success Stories
          </h2>
          <p className="text-base md:text-lg text-white/60">
            Join thousands of job seekers who landed their dream roles with our
            AI-powered applications.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative rounded-3xl border border-white/5 bg-white/5 p-[1px] backdrop-blur-sm transition-all hover:border-cyan-500/30 hover:bg-white/10"
            >
              <div className="h-full rounded-3xl bg-black/70 p-6">
                <Quote className="mb-4 h-8 w-8 text-cyan-500/60" />

                <div className="mb-4 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-cyan-500 text-cyan-500"
                    />
                  ))}
                </div>

                <p className="mb-6 text-sm md:text-base text-white/70">
                  {testimonial.content}
                </p>

                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 overflow-hidden rounded-full ring-2 ring-cyan-500/30">
                   
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-white/60">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>
    </section>
  );
}
