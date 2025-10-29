"use client"

import CVLOGO from "@/images/logo_text.png";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { useState } from "react";

export default function Sidebar() {
  const navLinks = [
    { label: "Account", href: "#billing" },
    { label: "Generate", href: "#cv" },
    { label: "Manage Plan", href: "#plan" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  //

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
              <div className=" border-0 rounded-lg  flex items-center justify-between ">
                <div className="flex-shrink-0">
                  <Image
                    src={CVLOGO}
                    alt="logo"
                    className="w-auto"
                    height={40}
                  />
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-1">
                  <nav className="gap-12 flex">
                    {navLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className="text-white/50 text-md"
                      >
                        {link.label}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
