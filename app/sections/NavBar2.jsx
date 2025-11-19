"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import CVLOGO from "../../public/logo_text.png";
import buttonImg from "../../public/BUTTON_1.png";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar2() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      style={{
        position: "sticky",
        top: "0",
        zIndex: 50,
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(24px)",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "1rem",
          paddingRight: "1rem",
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: "flex",
            height: "4rem",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Left: logo + desktop nav */}
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            {/* Logo */}
            <a
              href="/"
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <Image
                src={CVLOGO}
                alt="CVCraft logo"
                style={{
                  height: "2.5rem",
                  marginTop: "0.375rem",
                  width: "auto",
                }}
                priority
              />
            </a>

            {/* Desktop nav links */}
            <nav
              className="desktopOnly"
              style={{
                alignItems: "center",
                gap: "1.5rem",
                display: "flex",
              }}
              aria-label="Main navigation"
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    fontSize: "1rem",
                    color: "rgba(255, 255, 255, 0.6)",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)")
                  }
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Right: desktop buttons + mobile toggle */}
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            {/* Desktop "Login" */}
            <button
              type="button"
              onClick={() => router.push("/auth")}
              className="desktopInline"
              style={{
                borderRadius: "0.375rem",
                paddingLeft: "0.75rem",
                paddingRight: "0.75rem",
                paddingTop: "0.5rem",
                paddingBottom: "0.5rem",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: 500,
                color: "rgba(255, 255, 255, 0.6)",
                transition: "color 0.2s",
                border: "none",
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)")
              }
              onFocus={(e) => {
                e.currentTarget.style.outline =
                  "2px solid rgba(6, 182, 212, 0.6)";
                e.currentTarget.style.outlineOffset = "2px";
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = "none";
              }}
            >
              Login
            </button>

            {/* Desktop primary CTA */}
            <button
              type="button"
              onClick={() => router.push("/auth")}
              className="desktopInline"
              style={{
                alignItems: "center",
                gap: "0.5rem",
                borderRadius: "0.5rem",
                backgroundImage:
                  "linear-gradient(to right, #22d3ee, #06b6d4, #0891b2)",
                paddingLeft: "1rem",
                paddingRight: "1rem",
                paddingTop: "0.5rem",
                paddingBottom: "0.5rem",
                fontSize: "1rem",
                fontWeight: 600,
                color: "white",
                boxShadow:
                  "0 10px 15px -3px rgba(6, 182, 212, 0.3), 0 4px 6px -4px rgba(6, 182, 212, 0.3)",
                transition: "all 0.2s",
                cursor: "pointer",
                border: "none",
                display: "inline-flex",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundImage =
                  "linear-gradient(to right, #06b6d4, #0891b2, #0e7490)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundImage =
                  "linear-gradient(to right, #22d3ee, #06b6d4, #0891b2)";
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline =
                  "2px solid rgba(6, 182, 212, 0.7)";
                e.currentTarget.style.outlineOffset = "2px";
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = "none";
              }}
            >
              <span>Get Started</span>
              <Image
                src={buttonImg}
                alt="CTA icon"
                style={{ height: "1.5rem", width: "auto" }}
              />
            </button>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
              className="mobileInline"
              style={{
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "0.375rem",
                padding: "0.5rem",
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
                display: "inline-flex",
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline =
                  "2px solid rgba(6, 182, 212, 0.6)";
                e.currentTarget.style.outlineOffset = "2px";
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = "none";
              }}
            >
              {/* Animated hamburger icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ height: "1.5rem", width: "1.5rem", color: "white" }}
              >
                <line
                  x1="3"
                  y1="6"
                  x2="21"
                  y2="6"
                  style={{
                    transformOrigin: "left",
                    transition: "all 0.2s",
                    transform: isOpen
                      ? "rotate(45deg) translateY(-0.25rem)"
                      : "none",
                  }}
                />
                <line
                  x1="3"
                  y1="12"
                  x2="21"
                  y2="12"
                  style={{
                    transition: "all 0.2s",
                    opacity: isOpen ? "0" : "1",
                  }}
                />
                <line
                  x1="3"
                  y1="18"
                  x2="21"
                  y2="18"
                  style={{
                    transformOrigin: "left",
                    transition: "all 0.2s",
                    transform: isOpen
                      ? "rotate(-45deg) translateY(0.25rem)"
                      : "none",
                  }}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="mobileBlock"
              style={{
                overflow: "hidden",
              }}
            >
              <nav
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  paddingBottom: "1rem",
                  paddingTop: "0.5rem",
                }}
                aria-label="Mobile navigation"
              >
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    style={{
                      fontSize: "0.875rem",
                      color: "rgba(255, 255, 255, 0.6)",
                      paddingLeft: "1rem",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "white")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)")
                    }
                  >
                    {link.label}
                  </a>
                ))}

                {/* Mobile login CTA */}
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    router.push("/auth");
                  }}
                  style={{
                    marginTop: "0.5rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    borderRadius: "0.5rem",
                    backgroundImage:
                      "linear-gradient(to right, #06b6d4, #0891b2)",
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                    paddingTop: "0.5rem",
                    paddingBottom: "0.5rem",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "white",
                    boxShadow:
                      "0 10px 15px -3px rgba(6, 182, 212, 0.3), 0 4px 6px -4px rgba(6, 182, 212, 0.3)",
                    transition: "all 0.2s",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundImage =
                      "linear-gradient(to right, #0e7490, #155e75)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundImage =
                      "linear-gradient(to right, #06b6d4, #0891b2)";
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.outline =
                      "2px solid rgba(6, 182, 212, 0.7)";
                    e.currentTarget.style.outlineOffset = "2px";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.outline = "none";
                  }}
                >
                  <span>Login</span>
                  <Image
                    src={buttonImg}
                    alt="login button icon"
                    style={{ height: "1.5rem", width: "auto" }}
                  />
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Responsive helpers */}
      <style jsx>{`
        /* >= md */
        @media (min-width: 768px) {
          .desktopOnly {
            display: flex;
          }
          .desktopInline {
            display: inline-flex;
          }
          .mobileInline,
          .mobileBlock {
            display: none !important;
          }
        }

        /* < md */
        @media (max-width: 767px) {
          .desktopOnly,
          .desktopInline {
            display: none !important;
          }
          .mobileInline {
            display: inline-flex;
          }
          .mobileBlock {
            display: block;
          }
        }
      `}</style>
    </header>
  );
}
