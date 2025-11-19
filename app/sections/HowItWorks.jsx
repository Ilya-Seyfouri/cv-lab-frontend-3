"use client";

import { Upload, Sparkles, Download } from "lucide-react";

const steps = [
  {
    icon: Upload,
    step: "#1",
    title: "Upload Your CV & Job Description",
    description:
      "Drag and drop your existing CV and paste the job description you're applying for. We support PDF, DOCX, and TXT formats.",
  },
  {
    icon: Sparkles,
    step: "#2",
    title: "AI Analyzes & Optimizes",
    description:
      "Our AI matches your experience to the role, surfaces the right achievements, and injects the keywords that matter for ATS.",
  },
  {
    icon: Download,
    step: "#3",
    title: "Download & Apply",
    description:
      "Get your optimized CV and tailored cover letter in seconds. Download and apply with confidence.",
  },
];

export default function HowItWorks() {
  return (
    <section
      style={{
        position: "relative",
        paddingTop: "5rem",
        paddingBottom: "5rem",
        scrollMarginTop: "2.5rem",
      }}
      id="features"
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
              fontSize: "3rem",
              fontWeight: "600",
              color: "transparent",
            }}
          >
            How It Works
          </h2>
          <p
            style={{
              fontSize: "1.125rem",
              color: "rgba(255, 255, 255, 0.6)",
            }}
          >
            Tailor your CV in 3 simple steps. No complex setup, no learning
            curve.
          </p>
        </div>

        {/* Steps */}
        <div
          style={{
            display: "grid",
            gap: "2rem",
            gridTemplateColumns: "repeat(3, 1fr)",
          }}
        >
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                style={{
                  position: "relative",
                  height: "100%",
                  borderRadius: "1.5rem",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  padding: "1px",
                  backdropFilter: "blur(12px)",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(6, 182, 212, 0.4)";
                  e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.1)";
                  const icon = e.currentTarget.querySelector(".icon-wrapper");
                  if (icon) icon.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(255, 255, 255, 0.05)";
                  e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.05)";
                  const icon = e.currentTarget.querySelector(".icon-wrapper");
                  if (icon) icon.style.transform = "scale(1)";
                }}
              >
                <div
                  style={{
                    height: "100%",
                    borderRadius: "1.5rem",
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    padding: "2rem",
                    textAlign: "center",
                  }}
                >
                  {/* Icon */}
                  <div
                    className="icon-wrapper"
                    style={{
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginBottom: "1.5rem",
                      display: "inline-flex",
                      height: "4rem",
                      width: "4rem",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "1rem",
                      backgroundImage:
                        "linear-gradient(to bottom right, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.2))",
                      transition: "transform 0.3s",
                      transform: "scale(1)",
                    }}
                  >
                    <Icon
                      style={{
                        height: "2rem",
                        width: "2rem",
                        color: "#67e8f9",
                      }}
                    />
                  </div>

                  {/* Step number */}
                  <div
                    style={{
                      marginBottom: "0.5rem",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      letterSpacing: "0.05em",
                      color: "#67e8f9",
                    }}
                  >
                    {item.step}
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      marginBottom: "0.75rem",
                      fontSize: "1.25rem",
                      fontWeight: "600",
                      color: "white",
                    }}
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontSize:"1rem",
                      color: "rgba(255, 255, 255, 0.6)",
                    }}
                  >
                    {item.description}
                  </p>

                  {/* Connector line on desktop (between cards) */}
                  {index < steps.length - 1 && (
                    <div
                      style={{
                        position: "absolute",
                        right: "-1rem",
                        top: "50%",
                        display:"block",
                        height: "1px",
                        width: "2rem",
                        transform: "translateY(-50%)",
                        backgroundImage:
                          "linear-gradient(to right, rgba(6, 182, 212, 0.5), transparent)",
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Background gradient */}
      <div
        style={{
          pointerEvents: "none",
          position: "absolute",
          inset: "0",
          zIndex: "-10",
        }}
      >
        {/* Left card glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "15%",
            height: "420px",
            width: "420px",
            transform: "translate(-50%, -50%)",
            borderRadius: "9999px",
            backgroundColor: "rgba(6, 182, 212, 0.1)",
            filter: "blur(48px)",
          }}
        />
        {/* Middle card glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            height: "420px",
            width: "420px",
            transform: "translate(-50%, -50%)",
            borderRadius: "9999px",
            backgroundColor: "rgba(34, 211, 238, 0.1)",
            filter: "blur(48px)",
          }}
        />
        {/* Right card glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "15%",
            height: "420px",
            width: "420px",
            transform: "translate(50%, -50%)",
            borderRadius: "9999px",
            backgroundColor: "rgba(6, 182, 212, 0.1)",
            filter: "blur(48px)",
          }}
        />
      </div>
    </section>
  );
}
