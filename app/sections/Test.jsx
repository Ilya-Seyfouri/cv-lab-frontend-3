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
      "CV Lab helped me stand out in a crowded job market. Since I started using it, I've received way more callbacks.",
  },
  {
    name: "Jessica T",
    role: "Marketing Manager",
    avatar: photo2,
    content:
      "This AI turned my CV into a job-winning tool. I finally started getting interviews for the opportunities I've always dreamed of.",
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
  const w = typeof window === "undefined" ? 0 : window.innerWidth;

  return (
    <section
      id="testimonials"
      style={{
        position: "relative",
        paddingTop: w >= 768 ? "8rem" : "5rem",
        paddingBottom: w >= 768 ? "8rem" : "5rem",
        scrollMarginTop: "7rem",
      }}
    >
      <div
        style={{
          maxWidth: "72rem",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "1rem",
          paddingRight: "1rem",
        }}
      >
        {/* Header */}
        <div
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "4rem",
            maxWidth: "48rem",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              marginBottom: "1rem",
              backgroundImage:
                "linear-gradient(to bottom, white, rgba(255, 255, 255, 0.6))",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              fontSize:
                w >= 1024
                  ? "3rem"
                  : w >= 768
                  ? "2.25rem"
                  : "1.875rem",
              fontWeight: "600",
            }}
          >
            Success Stories
          </h2>
          <p
            style={{
              fontSize: w >= 768 ? "1.125rem" : "1rem",
              color: "rgba(255, 255, 255, 0.6)",
            }}
          >
            Join thousands of job seekers who landed their dream roles with our
            AI-powered applications.
          </p>
        </div>

        {/* Conveyor belt */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <motion.div
            style={{ display: "flex", gap: "2rem", width: "max-content" }}
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
                style={{
                  width: w >= 768 ? "600px" : "350px",
                  height: w >= 768 ? "280px" : "260px",
                  flexShrink: 0,
                  borderRadius: "1.5rem",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  padding: "1px",
                  backdropFilter: "blur(12px)",
                  transition: "all 0.3s",
                  display: "flex",
                  flexDirection: "column",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(6, 182, 212, 0.3)";
                  e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(255, 255, 255, 0.05)";
                  e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.05)";
                }}
              >
                <div
                  style={{
                    height: "100%",
                    borderRadius: "1.5rem",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    padding: "1.5rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <Quote
                      style={{
                        marginBottom: "1rem",
                        height: "2rem",
                        width: "2rem",
                        color: "rgba(6, 182, 212, 0.6)",
                      }}
                    />

                    <div
                      style={{
                        marginBottom: "1rem",
                        display: "flex",
                        gap: "0.25rem",
                      }}
                    >
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          style={{
                            height: "1rem",
                            width: "1rem",
                            fill: "#06b6d4",
                            color: "#06b6d4",
                          }}
                        />
                      ))}
                    </div>

                    <p
                      style={{
                        fontSize:
                          w >= 768 ? "1rem" : "0.875rem",
                        color: "rgba(255, 255, 255, 0.7)",
                      }}
                    >
                      {testimonial.content}
                    </p>
                  </div>

                  <div
                    style={{
                      marginTop: "1.5rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        height: "2.5rem",
                        width: "2.5rem",
                        overflow: "hidden",
                        borderRadius: "9999px",
                        border: "2px solid rgba(6, 182, 212, 0.3)",
                      }}
                    >
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: "600",
                          color: "white",
                        }}
                      >
                        {testimonial.name}
                      </div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "rgba(255, 255, 255, 0.6)",
                        }}
                      >
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
      <div
        style={{
          pointerEvents: "none",
          position: "absolute",
          inset: "0",
          zIndex: "-10",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            height: "500px",
            width: "500px",
            transform: "translate(-50%, -50%)",
            borderRadius: "9999px",
            backgroundColor: "rgba(6, 182, 212, 0.1)",
            filter: "blur(48px)",
          }}
        />
      </div>
    </section>
  );
}
