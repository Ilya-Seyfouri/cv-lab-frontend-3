"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "framer-motion";
import { createBrowserClient } from "@supabase/ssr";
import CVLOGO from "../../public/logo_text.png";
import buttonImg from "../../public/BUTTON_1.png";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar2() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  return (
    <header className="fixed w-full top-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        {/* Top row */}
        <div className="flex h-16 items-center justify-between relative">
          {/* Left: logo */}
          <a href="/" className="flex items-center gap-2">
            <Image
              src={CVLOGO}
              alt="CVCraft logo"
              className="h-10 mt-1.5 w-auto"
            />
          </a>

          {/* Center: desktop nav links */}
          <nav
            className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <a
              
                key={link.label}
                href={link.href}
                className="text-md text-muted-foreground active:scale-95 transition-colors hover:bg-gradient-to-r hover:from-cyan-400 hover:via-cyan-500 hover:to-cyan-600 hover:bg-clip-text hover:text-transparent"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: desktop buttons + mobile toggle */}
          <div className="flex items-center gap-3">
            {/* Desktop "Login" or Profile Icon */}
            {!loading && (
              <>
                {user ? (
                  // User is logged in - show default profile icon
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="hidden md:flex items-center justify-center w-9 h-9 rounded-full bg-white/10 border border-white/20 cursor-pointer hover:border-cyan-400 hover:bg-white/15 transition-all"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 text-white/70"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                ) : (
                  // User is not logged in - show Login button
                  <button
                    onClick={() => router.push("/auth")}
                    className="hidden rounded-md px-3 py-2 cursor-pointer text-md font-medium hover:bg-gradient-to-r hover:from-cyan-400 hover:via-cyan-500 hover:to-cyan-600 hover:bg-clip-text hover:text-transparent hover:font-semibold active:scale-95 text-muted-foreground transition-colors md:inline-flex focus:outline-none"
                  >
                    Login
                  </button>
                )}
              </>
            )}

            {/* Desktop primary CTA with gradient */}
            {!loading && !user && (
              <button
                onClick={() => router.push("/auth")}
                className="hidden items-center gap-2 rounded-lg 
bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 
px-4 py-2 text-md font-semibold text-white 
shadow-lg shadow-cyan-500/30 transition 
hover:from-cyan-500 hover:via-cyan-600 hover:to-cyan-700 
md:inline-flex 
focus:outline-none focus:ring-2 focus:ring-cyan-500/70 active:scale-95 cursor-pointer"
              >
                <span>Get Started</span>
                <Image src={buttonImg} alt="CTA icon" className="h-6 w-auto" />
              </button>
            )}

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
              className="inline-flex items-center justify-center rounded-md p-2 md:hidden focus:outline-none"
            >
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
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="overflow-hidden md:hidden"
            >
              <div
                className="flex flex-col gap-6 py-4"
                aria-label="Mobile navigation"
              >
                {navLinks
                  .filter((link) => link.label !== "Home")
                  .map((link) => (
                    <a
                    
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-md text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  ))}

                {/* Mobile: Profile or Login button */}
                {!loading && (
                  <>
                    {user ? (
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          router.push("/dashboard");
                        }}
                        className="flex items-center gap-3 text-md text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4 text-white/70"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span>Dashboard</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          router.push("/auth");
                        }}
                        className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 px-4 py-2 text-lg font-semibold text-white shadow-lg shadow-cyan-500/30 transition hover:from-cyan-700 hover:to-cyan-800 focus:outline-none active:scale-95 w-fit"
                      >
                        <span>Login</span>
                        <Image
                          src={buttonImg}
                          alt="login button icon"
                          className="h-6 w-auto"
                        />
                      </button>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}