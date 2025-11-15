"use client"

import CVLOGO from "../../images/logo_text.png";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { useRouter } from "next/navigation"

export default function Sidebar() {
  const navLinks = [
    { label: "Account", href: "#plan" },

    { label: "Generate", href: "#cv" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter()

  return (
    <>
      <section className="fixed w-full top-0 z-50">
        <div
          className={twMerge(
            "bg-neutral-920/70 border-0 backdrop-blur container max-w-full transition-[backdrop-filter,background-color] duration-1000 ease-in-out",
            isOpen && " backdrop-blur-2xl"
          )}
        >
          <div className="container">
            <div className="py-4 px-5">
              <div className="border-0 rounded-lg flex items-center justify-between">
                <div className="flex-shrink-0">
                  <Image
                    src={CVLOGO}
                    alt="logo"
                    className="w-auto, cursor-pointer"
                    height={40}
                    onClick={() => {router.push("/auth")}}
                  />
                </div>

                <button
                  className="md:hidden text-white p-2"
                  onClick={() => setIsOpen(!isOpen)}
                  aria-label="Toggle menu"
                >
                  <svg
                    className="w-auto h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {isOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </button>

                <nav className="hidden md:flex gap-12 absolute left-1/2 transform -translate-x-1/2">
                  {navLinks.map((link) => (
                    <a
                    
                      key={link.label}
                      href={link.href}
                      className="text-white/50 text-md hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              </div>

              {isOpen && (
                <nav className="md:hidden flex flex-col gap-4 mt-4 pb-4">
                  {navLinks.map((link) => (
                    <a
                    
                      key={link.label}
                      href={link.href}
                      className="text-white/50 text-md hover:text-white transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}