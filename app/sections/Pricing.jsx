"use client";
import { AnimatePresence, motion } from "framer-motion";
import circle from "@/images/white-circle.png";
import button from "@/images/BUTTON_1.png";
import tick from "@/images/tick.png";

import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Pricing() {
  const [monthly, setMonthly] = useState(false);
  const [annual, setAnnual] = useState(false);
  const router = useRouter();

  return (
    <>
      <section id="pricing">
        <div className="container">
          <div className="pt-20 flex flex-col items-center">
            <div className="flex items-center py-5 max-w-xl  text-center mx-auto">
              <h2 className="text-5xl">
                A Better Economic Calender For Traders
              </h2>
            </div>
            <div className="pt-2 flex justify-center">
              <p className="text-white/60 text-xl">
                Unlock AI Insight, Event Notifications and more with GoMoon.ai
                Pro
              </p>
            </div>

            <div className="pt-20 flex flex-row items-center gap-10">
              <div className="pt-10 py-4 border-0 mx-auto max-w-[440px] bg-gradient-to-br from-gray-900 via-gray-700 to-gray-500 rounded-3xl">
                <div className="px-10 text-2xl">
                  <p className=""> {"Pro Monthly"}</p>
                </div>
                <div className="px-10">
                  <p className="text-white/50">
                    Get Those Interviews — stand out with AI-optimized CVs
                    tailored to every job
                  </p>
                </div>
                <div className="pt-5 mx-auto max-w-[400px]">
                  <div className=" bg-gradient-to-b  from-blue-800 to-cyan-600 rounded-3xl relative overflow-hidden">
                    <div
                      className={
                        "absolute top-0 left-0 w-24 h-24 bg-blue-50 rounded-full blur-2xl opacity-80 z-50"
                      }
                    ></div>
                    <div className="pt-8 px-5 relative z-10">
                      <div className="text-3xl font-semibold overflow-hidden inline-block">
                        <h3>$12/Month</h3>
                      </div>
                    </div>
                    <div className="pt-6 flex flex-row justify-center py-2 items-center relative z-10">
                      <div>
                        <button
                          className="flex items-center gap-2 font-semibold rounded-2xl px-6 py-1.5
cursor-pointer text-black bg-gradient-to-r from-white via-gray-100 
to-gray-200 hover:from-gray-100 hover:via-gray-200 hover:to-gray-300
focus:outline-none active:scale-95 shadow-lg shadow-gray-300/50 
text-sm text-center me-2 mb-2 transition-all duration-200"
                          onClick={() => router.push("/auth")}
                        >
                          <p className="text-black text-lg font-semibold">
                            Try for free
                          </p>
                          <Image
                            src={button}
                            alt="logo"
                            className="h-8 w-auto"
                          />
                        </button>
                      </div>
                    </div>
                    <div className="relative z-10">
                      <div className="py-5">
                        <p className="text-xl px-6">Whats Included</p>
                      </div>
                      <div className="flex items-center gap-2 px-6">
                        <Image src={tick} alt="Logo" className="h-5 w-auto" />

                        <p className="">🚀 AI-Tailored CVs</p>
                      </div>
                      <p className="text-white/40">
                        ------------------------------------------------------
                      </p>
                      <div className="flex items-center gap-2 px-6">
                        <Image src={tick} alt="Logo" className="h-5 w-auto" />

                        <p className="">✨ Keyword Optimization</p>
                      </div>
                      <p className="text-white/40">
                        ------------------------------------------------------
                      </p>
                      <div className="flex items-center gap-2 px-6">
                        <Image src={tick} alt="Logo" className="h-5 w-auto" />

                        <p className="">📊 ATS Compatibility Report</p>
                      </div>
                      <p className="text-white/40">
                        ------------------------------------------------------
                      </p>
                      <div className="flex items-center gap-2 px-6">
                        <Image src={tick} alt="Logo" className="h-5 w-auto" />

                        <p className="">📨 AI Cover Letter Generator</p>
                      </div>
                      <p className="text-white/40">
                        ------------------------------------------------------
                      </p>
                      <div className="flex items-center gap-2 px-6 pb-4">
                        <Image src={tick} alt="Logo" className="h-5 w-auto" />

                        <p className="">🧠 Job Match Analysis</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-10 py-4 border-0 mx-auto max-w-[440px] bg-gradient-to-br from-gray-900 via-gray-700 to-gray-500 rounded-3xl">
                <div className="px-10 text-2xl">
                  <p className=""> {"Pro Yearly"}</p>
                </div>
                <div className="px-10">
                  <p className="text-white/50">
                    Get Those Interviews — stand out with AI-optimized CVs
                    tailored to every job
                  </p>
                </div>
                <div className="pt-5 mx-auto max-w-[400px]">
                  <div className=" bg-gradient-to-b from-purple-500 to-pink-300 rounded-3xl relative overflow-hidden">
                    <div
                      className={
                        "absolute top-0 left-0 w-24 h-24 bg-blue-50 rounded-full blur-2xl opacity-80 z-50"
                      }
                    ></div>
                    <div className="pt-8 px-5 relative z-10">
                      <div className="text-3xl font-semibold overflow-hidden inline-block">
                        <h3>$80/Year</h3>
                      </div>
                    </div>
                    <div className="pt-6 flex flex-row justify-center py-2 items-center relative z-10">
                      <div>
                        <button
                          className="flex items-center gap-2 font-semibold rounded-2xl px-6 py-1.5
cursor-pointer text-black bg-gradient-to-r from-white via-gray-100 
to-gray-200 hover:from-gray-100 hover:via-gray-200 hover:to-gray-300
focus:outline-none active:scale-95 shadow-lg shadow-gray-300/50 
text-sm text-center me-2 mb-2 transition-all duration-200"
                          onClick={() => router.push("/auth")}
                        >
                          <p className="text-black text-lg font-semibold">
                            Try for free
                          </p>
                          <Image
                            src={button}
                            alt="logo"
                            className="h-8 w-auto"
                          />
                        </button>
                      </div>
                    </div>
                    <div className="relative z-10">
                      <div className="py-5">
                        <p className="text-xl px-6">Whats Included</p>
                      </div>
                      <div className="flex items-center gap-2 px-6">
                        <Image src={tick} alt="Logo" className="h-5 w-auto" />

                        <p className="">🚀 AI-Tailored CVs</p>
                      </div>
                      <p className="text-white/40">
                        ------------------------------------------------------
                      </p>
                      <div className="flex items-center gap-2 px-6">
                        <Image src={tick} alt="Logo" className="h-5 w-auto" />

                        <p className="">✨ Keyword Optimization</p>
                      </div>
                      <p className="text-white/40">
                        ------------------------------------------------------
                      </p>
                      <div className="flex items-center gap-2 px-6">
                        <Image src={tick} alt="Logo" className="h-5 w-auto" />

                        <p className="">📊 ATS Compatibility Report</p>
                      </div>
                      <p className="text-white/40">
                        ------------------------------------------------------
                      </p>
                      <div className="flex items-center gap-2 px-6">
                        <Image src={tick} alt="Logo" className="h-5 w-auto" />

                        <p className="">📨 AI Cover Letter Generator</p>
                      </div>
                      <p className="text-white/40">
                        ------------------------------------------------------
                      </p>
                      <div className="flex items-center gap-2 px-6 pb-4">
                        <Image src={tick} alt="Logo" className="h-5 w-auto" />

                        <p className="">🧠 Job Match Analysis</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
