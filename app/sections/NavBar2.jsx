"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
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
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        {/* Top row */}
        <div className="flex h-16 items-center justify-between">
          {/* Left: logo + desktop nav */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2">
              <Image src={CVLOGO} alt="CVCraft logo" className="h-10 mt-1.5 w-auto" />
            </a>

            {/* Desktop nav links */}
            <nav
              className="hidden items-center gap-6 md:flex"
              aria-label="Main navigation"
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-md text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Right: desktop buttons + mobile toggle */}
          <div className="flex items-center gap-3">
            {/* Desktop "Login" — ghost style */}
            <button
              onClick={() => router.push("/auth")}
              className="hidden rounded-md px-3 py-2 cursor-pointer text-md font-medium text-muted-foreground transition-colors hover:text-foreground md:inline-flex focus:outline-none focus:ring-2 focus:ring-cyan-500/60"
            >
              Login
            </button>

            {/* Desktop primary CTA with gradient (uses your button image inside) */}
            <button
              onClick={() => router.push("/auth")}
              className="hidden items-center gap-2 rounded-lg 
bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 
px-4 py-2 text-md font-semibold text-white 
shadow-lg shadow-cyan-500/30 transition 
hover:from-cyan-500 hover:via-cyan-600 hover:to-cyan-700 
md:inline-flex 
focus:outline-none focus:ring-2 focus:ring-cyan-500/70 cursor-pointer"
            >
              <span>Get Started</span>
              <Image src={buttonImg} alt="CTA icon" className="h-6 w-auto" />
            </button>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
              className="inline-flex items-center justify-center rounded-md p-2 md:hidden focus:outline-none focus:ring-2 focus:ring-cyan-500/60"
            >
              {/* Your animated hamburger icon */}
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
                className="h-6 w-6 text-foreground"
              >
                <line
                  x1="3"
                  y1="6"
                  x2="21"
                  y2="6"
                  className={twMerge(
                    "origin-left transition",
                    isOpen && "rotate-45 -translate-y-1"
                  )}
                />
                <line
                  x1="3"
                  y1="12"
                  x2="21"
                  y2="12"
                  className={twMerge("transition", isOpen && "opacity-0")}
                />
                <line
                  x1="3"
                  y1="18"
                  x2="21"
                  y2="18"
                  className={twMerge(
                    "origin-left transition",
                    isOpen && "-rotate-45 translate-y-1"
                  )}
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
              className="overflow-hidden md:hidden"
            >
              <nav
                className="flex flex-col gap-3 pb-4 pt-2"
                aria-label="Mobile navigation"
              >
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-sm text-muted-foreground pl-4 transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                ))}

                
                {/* Mobile login CTA */}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    router.push("/auth");
                  }}
                  className="mt-2 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r 
                    from-cyan-500 to-cyan-600 px-4 py-2 text-sm font-semibold text-white 
                    shadow-lg shadow-cyan-500/30 transition hover:from-cyan-700 hover:to-cyan-800 
                    focus:outline-none focus:ring-2 focus:ring-cyan-500/70"
                >
                  <span>Login</span>
                  <Image
                    src={buttonImg}
                    alt="login button icon"
                    className="h-6 w-auto"
                  />
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
