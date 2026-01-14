"use client";

import CVLOGO from "../../public/logo_text.png";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Sidebar({ selectedTab, onSelect }) {
  const navLinks = [
    { label: "Optimize CV", value: "optimize" },

    { label: "Account", value: "account" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleClick = (value) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <section className="fixed w-full top-0 z-50">
      <div
        className={twMerge(
          "bg-neutral-920/70 border-0 backdrop-blur container max-w-full transition-[backdrop-filter,background-color] duration-1000 ease-in-out",
          isOpen && "backdrop-blur-2xl"
        )}
      >
        <div className="container">
          <div className="py-4 px-5">
            <div className="border-0 rounded-lg flex items-center justify-between">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Image
                  src={CVLOGO}
                  alt="logo"
                  className="w-auto cursor-pointer"
                  height={40}
                  onClick={() => {
                    router.push("/");
                  }}
                />
              </div>

              {/* Mobile menu button */}
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

              {/* Desktop nav */}
              <nav className="hidden md:flex gap-12">
                {navLinks.map((link) => (
                  <button
                    key={link.value}
                    type="button"
                    onClick={() => handleClick(link.value)}
                    className={twMerge(
                      "text-md transition-colors cursor-pointer",
                      selectedTab === link.value
                        ? "text-cyan-500 font-semibold"
                        : "text-white/50 hover:text-white"
                    )}
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Mobile nav */}
            {isOpen && (
              <nav className="md:hidden flex flex-col gap-4 mt-4 pb-4">
                {navLinks.map((link) => (
                  <button
                    key={link.value}
                    type="button"
                    onClick={() => handleClick(link.value)}
                    className={twMerge(
                      "text-left text-md transition-colors",
                      selectedTab === link.value
                        ? "text-cyan-500 font-semibold"
                        : "text-white/50 hover:text-white"
                    )}
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
