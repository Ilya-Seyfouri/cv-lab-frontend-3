"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import photo from "../../public/avatar-lula-meyers.jpg";
import button from "../../public/BUTTON_1.png";
import xxx from "../../public/x1.png";
import { Sparkles } from "lucide-react";

export default function Hero2() {
  const router = useRouter();

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        paddingTop: "2.5rem",
        paddingBottom: "2.5rem",
        scrollMarginTop: "3.75rem",
      }}
      id="home"
    >
      <div
        style={{
          maxWidth: "64rem",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "1rem",
          paddingRight: "1rem",
        }}
      >
        <div
          style={{
            maxWidth: "72rem",
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
          }}
        >
          {/* Top pill */}

          {/* Heading */}
          <h1
            style={{
              marginBottom: "1.5rem",
              background:
                "linear-gradient(to bottom, rgb(255, 255, 255), rgb(255, 255, 255), rgba(255, 255, 255, 0.6))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "white",
              fontSize: "2.25rem",
              fontWeight: "600",
              lineHeight: "1.25",
            }}
          >
            Your Resume, Perfectly Matched to Every{" "}
            <span style={{ whiteSpace: "nowrap" }}>Job.</span>
          </h1>

          <div
            style={{
              paddingTop: "0.5rem",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "9999px",
              }}
            >
              <Image
                src={photo}
                alt="logo"
                style={{
                  height: "2.25rem",
                  width: "auto",
                  borderWidth: "3px",
                  borderColor: "rgb(0, 0, 0)",
                  borderRadius: "9999px",
                }}
              />
              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: "1.5rem",
                  fontWeight: "600",
                  color: "rgba(255, 255, 255, 0.8)",
                  paddingRight: "0.625rem",
                }}
              >
                4500+ CV's generated
              </p>
            </div>
          </div>

          {/* Subheading */}
          <p
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              paddingTop: "2.5rem",
              marginBottom: "2rem",
              maxWidth: "64rem",
              fontSize: "1.5rem",
              lineHeight: "2.0rem",
              color: "rgba(255, 255, 255, 0.6)",
            }}
          >
            Drop your CV and enter a Job Description to get a perfectly tailored
            Resume and Cover Letter in seconds. Beat ATS filters and stand out
            from the crowd.
          </p>

          {/* CTA buttons – your original buttons, unchanged */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              paddingTop: "0.5rem",
              paddingBottom: "0.5rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <button
                onClick={() => router.push("/auth")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  cursor: "pointer",
                  color: "rgb(255, 255, 255)",
                  backgroundImage:
                    "linear-gradient(to bottom right, rgb(34, 211, 238), rgb(6, 182, 212), rgb(8, 145, 178))",
                  outline: "none",
                  borderRadius: "0.5rem",
                  fontSize: "0.875rem",
                  lineHeight: "1.25rem",
                  paddingLeft: "1.25rem",
                  paddingRight: "1.25rem",
                  paddingTop: "0.625rem",
                  paddingBottom: "0.625rem",
                  textAlign: "center",
                  marginRight: "0.5rem",
                  marginBottom: "0.5rem",
                  fontWeight: "600",
                  boxShadow:
                    "0 10px 15px -3px rgba(6, 182, 212, 0.5), 0 4px 6px -4px rgba(6, 182, 212, 0.5)",
                  transition: "transform 150ms",
                  border: "none",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundImage =
                    "linear-gradient(to bottom right, rgb(34, 211, 238), rgb(6, 182, 212), rgb(8, 145, 178))")
                }
                onMouseDown={(e) =>
                  (e.currentTarget.style.transform = "scale(0.95)")
                }
                onMouseUp={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <p style={{ fontSize: "1.125rem", lineHeight: "1.75rem" }}>
                  Get Started
                </p>
                <Image
                  src={button}
                  alt="logo"
                  style={{ height: "2rem", width: "auto" }}
                />
              </button>
            </div>

            <div>
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  cursor: "pointer",
                  color: "rgb(255, 255, 255)",
                  fontWeight: "600",
                  backgroundImage:
                    "linear-gradient(to bottom right, rgb(156, 163, 175), rgb(107, 114, 128), rgb(75, 85, 99))",
                  outline: "none",
                  borderRadius: "0.5rem",
                  fontSize: "0.875rem",
                  lineHeight: "1.25rem",
                  paddingLeft: "1.25rem",
                  paddingRight: "1.25rem",
                  paddingTop: "0.625rem",
                  paddingBottom: "0.625rem",
                  textAlign: "center",
                  marginRight: "0.5rem",
                  marginBottom: "0.5rem",
                  boxShadow:
                    "0 10px 15px -3px rgba(107, 114, 128, 0.5), 0 4px 6px -4px rgba(107, 114, 128, 0.5)",
                  transition: "transform 150ms",
                  border: "none",
                }}
                onClick={() => router.push("https://x.com/zenifi99")}
                onMouseDown={(e) =>
                  (e.currentTarget.style.transform = "scale(0.95)")
                }
                onMouseUp={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <p style={{ fontSize: "1.125rem", lineHeight: "1.75rem" }}>
                  Contact us
                </p>
                <Image
                  src={xxx}
                  alt="logo"
                  style={{ height: "2rem", width: "auto" }}
                />
              </button>
            </div>
          </div>

          {/* Video */}
          <div
            style={{
              marginTop: "3rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "48rem",
                overflow: "hidden",
                borderRadius: "1.5rem",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                style={{
                  aspectRatio: "16 / 9",
                  position: "relative",
                  width: "100%",
                }}
              >
                <iframe
                  src="https://www.youtube.com/embed/BjW-P1JNfc8"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    height: "100%",
                    width: "100%",
                    border: "0",
                  }}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gradients */}
      <div
        style={{
          pointerEvents: "none",
          position: "absolute",
          inset: "0",
          zIndex: "-10",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "25%",
            top: "0",
            height: "20rem",
            width: "20rem",
            borderRadius: "9999px",
            backgroundColor: "rgba(6, 182, 212, 0.3)",
            filter: "blur(96px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "25%",
            top: "6rem",
            height: "20rem",
            width: "20rem",
            borderRadius: "9999px",
            backgroundColor: "rgba(59, 130, 246, 0.25)",
            filter: "blur(96px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-2.5rem",
            left: "33.333333%",
            height: "18rem",
            width: "18rem",
            borderRadius: "9999px",
            backgroundColor: "rgba(6, 182, 212, 0.2)",
            filter: "blur(96px)",
          }}
        />
      </div>

      <style jsx>{`
        @media (min-width: 768px) {
          h1 {
            font-size: 3.75rem !important;
            line-height: 1 !important;
          }
          p.subheading {
            font-size: 1.5rem !important;
            line-height: 2rem !important;
          }
          .cta-buttons {
            flex-direction: row !important;
            gap: 1.5rem !important;
          }
          .btn-get-started,
          .btn-contact {
            padding-left: 1.25rem !important;
            padding-right: 1.25rem !important;
            padding-top: 0.625rem !important;
            padding-bottom: 0.625rem !important;
          }
        }
      `}</style>
    </section>
  );
}
