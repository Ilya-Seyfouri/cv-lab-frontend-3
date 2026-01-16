"use client";
import { Star, Quote } from "lucide-react";
import Image from "next/image";
import photo1 from "../../public/photo1.jpg";
import photo2 from "../../public/photo2.jpg";
import photo3 from "../../public/photo3.jpg";
import photo4 from "../../public/photo4.jpg";
import photo5 from "../../public/avatar-owen-garcia.jpg";
import photo6 from "../../public/avatar-ashwin-santiago.jpg";
import photo7 from "../../images/A.avif";
import photo8 from "../../images/ape.webp";
import photo9 from "../../images/bob.jpg";
import photo10 from "../../images/linkedin.jpg";
import photo11 from "../../images/kelly.jpg";

const testimonials = [
  {
    name: "Olivia K",
    role: "Marketing Manager",
    avatar: photo11,
    content:
      "CV Lab helped me stand out in a crowded job market. Since I started using it, I've received way more callbacks.",
  },
  {
    name: "Amy T",
    role: "Student",
    avatar: photo7,
    content:
      "This AI turned my CV into a job-winning tool. I finally started getting interviews for the internships I've always dreamed of.",
  },
  {
    name: "Sarah S",
    role: "Project Manager",
    avatar: photo9,
    content:
      "This tool is a game-changer! It let me generate a tailored CV and cover letter in seconds. I applied to 10× more jobs than usual, and at a much higher quality.",
  },
  {
    name: "James H",
    role: "Software Engineer",
    avatar: photo4,
    content:
      "Thanks to CV Lab, I got past the ATS filters for a position I thought was out of reach. Highly recommend it!",
  },
  {
    name: "Dânik T",
    role: "Data Analyst",
    avatar: photo8,
    content:
      "The detailed skills analysis is impressive! I used it like a tutor to understand exactly which skills I needed to learn to land a specific job.",
  },
  {
    name: "Reza K",
    role: "Student",
    avatar: photo10,
    content:
      "CV Lab helped me get noticed for my dream role. The tailored CV was spot-on—I landed an interview within a week!",
  },
];

export default function Testimonials() {
  // Double the testimonials for seamless loop
  const allTestimonials = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="relative py-20 md:py-32 scroll-mt-28">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent text-3xl md:text-4xl lg:text-5xl font-semibold">
            Success Stories
          </h2>
          <p className="text-base md:text-lg text-white/60">
            From first applications to final offers – see how our optimised
            resumes helped candidates stand out.
          </p>
        </div>

        {/* Testimonials carousel */}
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="testimonials-wrapper">
            <div className="testimonials-track">
              {allTestimonials.map((testimonial, index) => (
                <div
                  key={`${testimonial.name}-${index}`}
                  className="testimonial-item"
                >
                  <div className="w-[350px] md:w-[600px] h-[260px] md:h-[280px] flex-shrink-0 rounded-3xl border border-white/5 bg-white/5 p-[1px] backdrop-blur-sm transition-all hover:border-cyan-500/30 hover:bg-white/10 flex flex-col">
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

     

      {/* CSS Animation with calc() for perfect loop */}
      <style jsx>{`
        .testimonials-wrapper {
          width: 100%;
        }

        .testimonials-track {
          display: flex;
          gap: 2rem;
          width: max-content;
          animation: scroll 50s linear infinite;
          will-change: transform;
        }

        .testimonial-item {
          flex-shrink: 0;
        }

       

        /* Calculate exact distance: 6 cards × (350px + 2rem gap) */
        @keyframes scroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(calc(-350px * 6 - 2rem * 6), 0, 0);
          }
        }

        /* Responsive: larger cards on desktop */
        @media (min-width: 768px) {
          @keyframes scroll {
            0% {
              transform: translate3d(0, 0, 0);
            }
            100% {
              transform: translate3d(calc(-600px * 6 - 2rem * 6), 0, 0);
            }
          }
        }

        /* Safari optimization */
        @media not all and (min-resolution: 0.001dpcm) {
          @supports (-webkit-appearance: none) {
            .testimonials-track {
              -webkit-transform: translate3d(0, 0, 0);
            }
          }
        }
      `}</style>
    </section>
  );
}
