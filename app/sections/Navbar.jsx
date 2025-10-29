"use client";

import Image from "next/image";
import Logo from "@/images/logo.svg";
import Menu from "@/images/menu.svg";
import Mouse from "@/images/mouse-pointer.svg";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import CVLOGO from "@/images/logo_text.png";
import button from "@/images/BUTTON_1.png";

export default function Navbar() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <section className="fixed w-full top-0 z-50">
        <div
          className={twMerge(
            "bg-neutral-920/70 border-0 backdrop-blur container max-w-full transition-[backdrop-filter,background-color] duration-1000 ease-in-out",
            isOpen && " backdrop-blur-2xl"
          )}
        >
          <div className="flex flex-row justify-between px-6 py-6 lg:px-20">
            <div className="">
              <Image src={CVLOGO} alt="logo" className="w-auto" height={40} />
            </div>
            <div className="hidden lg:flex lg:items-center">
              <nav className="flex gap-5 mr-5">
                {navLinks.map((link) => (
                  <a
                    className="text-white/50 text-lg"
                    key={link.label}
                    href={link.href}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
            <div className="hidden md:flex justify-end">
              <button
                onClick={() => router.push("/auth")}
                className="flex items-center gap-2 cursor-pointer text-white bg-gradient-to-r 
from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br 
focus:outline-none active:scale-95 transition-transform shadow-lg 
shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 
font-semibold rounded-lg text-sm px-4 py-1 text-center me-2 mb-2"
              >
                <p className="text-md">Login</p>
                <Image src={button} alt="logo" className="h-8 w-auto" />
              </button>
            </div>

            <div className="flex justify-end md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-menu h-10 w-auto"
                onClick={() => setIsOpen(!isOpen)}
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
                ></line>
                <line
                  x1="3"
                  y1="12"
                  x2="21"
                  y2="12"
                  className={twMerge("transition", isOpen && "opacity-0")}
                ></line>
                <line
                  x1="3"
                  y1="18"
                  x2="21"
                  y2="18"
                  className={twMerge(
                    "origin-left transition",
                    isOpen && "-rotate-45 translate-y-1"
                  )}
                ></line>
              </svg>
            </div>
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                inital={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                className="overflow-hidden"
              >
                <div className="flex flex-col items-start gap-4 py-4 px-8">
                  {navLinks.map((link) => (
                    <a
                      href={link.href}
                      key={link.label}
                      onClick={() => setTimeout(() => setIsOpen(!isOpen), 100)}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
