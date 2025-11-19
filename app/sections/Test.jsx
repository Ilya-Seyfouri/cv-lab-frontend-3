"use client";
import { Star, Quote } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import photo1 from "../../public/photo1.jpg";
import photo2 from "../../public/photo2.jpg";
import photo3 from "../../public/photo3.jpg";
import photo4 from "../../public/photo4.jpg";
import photo5 from "../../public/avatar-owen-garcia.jpg";
import photo6 from "../../public/avatar-ashwin-santiago.jpg";
const testimonials = [
  {
    name: "Reece S",
    role: "Software Engineer",
    avatar: photo1,
    content:
      "CV Lab helped me stand out in a crowded job market. Since I started using it, I’ve received way more callbacks.",
  },
  {
    name: "Jessica T",
    role: "Marketing Manager",
    avatar: photo2,
    content:
      "This AI turned my CV into a job-winning tool. I finally started getting interviews for the opportunities I’ve always dreamed of.",
  },
  {
    name: "Bernie S",
    role: "Project Manager",
    avatar: photo3,
    content:
      "This tool is a game-changer! It let me generate a tailored CV and cover letter in seconds. I applied to 10× more jobs than usual, and at a much higher quality.",
  },
  {
    name: "James H",
    role: "Business Analyst",
    avatar: photo4,
    content:
      "Thanks to CV Lab, I got past the ATS filters for a position I thought was out of reach. Highly recommend it!",
  },
  {
    name: "Dânik T",
    role: "Data Analyst",
    avatar: photo5,
    content:
      "The detailed skills analysis is impressive! I used it like a tutor to understand exactly which skills I needed to learn to land a specific job.",
  },
  {
    name: "Prageth K",
    role: "AI Engineer",
    avatar: photo6,
    content:
      "CV Lab helped me get noticed for my dream role. The tailored CV was spot-on—I landed an interview within a week!",
  },
];
// Duplicate list for smooth infinite loop
const repeatedTestimonials = [...testimonials, ...testimonials];
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
        {/* Conveyor belt */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-8 w-max"
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{
              duration: 45,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {repeatedTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="w-[350px] md:w-[600px] h-[260px] md:h-[280px] flex-shrink-0 
                           rounded-3xl border border-white/5 bg-white/5 p-[1px]
                           backdrop-blur-sm transition-all hover:border-cyan-500/30 hover:bg-white/10
                           flex flex-col"
              >
                <div className="h-full rounded-3xl bg-black/70 p-6 flex flex-col justify-between">
                  <div>
                    <Quote className="mb-4 h-8 w-8 text-cyan-500/60" />
                    <div className="mb-4 flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-cyan-500 text-cyan-500"
                        />
                      ))}
                    </div>
                    <p className="text-sm md:text-base text-white/70">
                      {testimonial.content}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-full ring-2 ring-cyan-500/30">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
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
          </motion.div>
        </div>
      </div>
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>
    </section>
  );
}
