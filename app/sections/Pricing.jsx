"use client";
import { AnimatePresence, motion } from "framer-motion";
import circle from "../../images/white-circle.png";
import button from "../../images/BUTTON_1.png";
import tick from "../../images/tick.png";

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
      <section id="pricing" className="scroll-mt-28">
        <div className="container">
          <div className=" flex flex-col justify-center items-center">
            <div className="flex items-center pb-5 max-w-4xl  text-center mx-auto">
              <h2 className="text-5xl">
                We transform your CV for each job and spotlight the skills
                hiring managers want.
              </h2>
            </div>
            <div className="pt-4 flex justify-center items-center">
              <p className="text-white/60 lg:text-2xl text-lg text-center max-w-3xl">
                AI That Turns Your Applications Into Job Interviews.
              </p>
            </div>

            {/* Desktop: Show both cards */}
            <div className="pt-20 hidden lg:flex flex-row items-center gap-10">
              {/* Pro Monthly */}
              <div className="pt-8 py-4 border-0 mx-auto max-w-[440px] bg-gradient-to-br from-gray-900 via-gray-700 to-gray-500 rounded-3xl">
                <div className="px-10 text-2xl">
                  <p className="font-semibold">{"🔷 Pro Monthly"}</p>
                </div>
                <div className="px-10 pt-2">
                  <p className="text-white/60 font-mono">
                    Transform your CV in seconds and make every application a
                    perfect match.
                  </p>
                </div>
                <div className="pt-8 mx-auto max-w-[410px]">
                  <div className="bg-gradient-to-b from-blue-800 to-cyan-600 py-6 rounded-3xl relative overflow-hidden">
                    <div className="pt-2 px-5 relative z-10">
                      <div className="text-4xl font-semibold overflow-hidden inline-block">
                        <h3>£6/Month</h3>
                      </div>
                    </div>
                    <div className="pt-6 flex flex-row justify-center py-2 items-center relative z-10">
                      <div>
                        <button
                          className="flex items-center gap-2 font-semibold rounded-2xl px-30 py-2.5
cursor-pointer text-black bg-gradient-to-r from-white via-gray-100 
to-gray-200 hover:from-gray-100 hover:via-gray-200 hover:to-gray-300
focus:outline-none active:scale-95 shadow-lg shadow-gray-300/50 
text-sm text-center me-2 mb-2 transition-all duration-200"
                          onClick={() => router.push("/auth")}
                        >
                          <p className="text-black text-lg font-semibold">
                            Free Trial
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
                        <p className="">AI-Tailored CVs</p>
                      </div>
                      <p className="text-white/40 text-xs opacity-50">
                        ------------------------------------------------------------------------
                      </p>
                      <div className="flex items-center gap-2 px-6">
                        <Image src={tick} alt="Logo" className="h-5 w-auto" />
                        <p className=""> Keyword Optimization</p>
                      </div>
                      <p className="text-white/40 text-xs opacity-50">
                        ------------------------------------------------------------------------
                      </p>
                      <div className="flex items-center gap-2 px-6">
                        <Image src={tick} alt="Logo" className="h-5 w-auto" />
                        <p className=""> ATS Compatibility Report</p>
                      </div>
                      <p className="text-white/40 text-xs opacity-50">
                        ------------------------------------------------------------------------
                      </p>
                      <div className="flex items-center gap-2 px-6">
                        <Image src={tick} alt="Logo" className="h-5 w-auto" />
                        <p className=""> AI Cover Letter Generator</p>
                      </div>
                      <p className="text-white/40 text-xs opacity-50">
                        ------------------------------------------------------------------------
                      </p>
                      <div className="flex items-center gap-2 px-6 pb-4">
                        <Image src={tick} alt="Logo" className="h-5 w-auto" />
                        <p className="">Job Match Analysis</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pro Yearly – now visually matching Monthly */}
              <div className="pt-8 py-4 border-0 mx-auto max-w-[440px] bg-gradient-to-br from-gray-900 via-gray-700 to-gray-500 rounded-3xl">
                <div className="px-10 text-2xl">
                  <p className="font-semibold">{"♦️ Pro Yearly"}</p>
                </div>
                <div className="px-10 pt-2">
                  <p className="text-white/60 font-mono">
                    Get Those Interviews — stand out with AI-optimized CVs
                    tailored to every job.
                  </p>
                </div>
                <div className="pt-8 mx-auto max-w-[410px]">
                  <div className="bg-gradient-to-b from-red-400 to-pink-500 py-6 rounded-3xl relative overflow-hidden">
                    <div className="pt-2 px-5 relative z-10">
                      <div className="text-4xl font-semibold overflow-hidden inline-block">
                        <h3>£66/Year</h3>
                      </div>
                    </div>
                    <div className="pt-6 flex flex-row justify-center py-2 items-center relative z-10">
                      <div>
                        <button
                          className="flex items-center gap-2 font-semibold rounded-2xl px-30 py-2.5
cursor-pointer text-black bg-gradient-to-r from-white via-gray-100 
to-gray-200 hover:from-gray-100 hover:via-gray-200 hover:to-gray-300
focus:outline-none active:scale-95 shadow-lg shadow-gray-300/50 
text-sm text-center me-2 mb-2 transition-all duration-200"
                          onClick={() => router.push("/auth")}
                        >
                          <p className="text-black text-lg font-semibold">
                            Free Trial
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
                        <p className="text-xl px-6">
                          Whats Included<span> + 3 months free.</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2 px-6">
                        <Image src={tick} alt="Logo" className="h-5 w-auto" />
                        <p className="">AI-Tailored CVs</p>
                      </div>
                      <p className="text-white/40 text-xs opacity-50">
                        ------------------------------------------------------------------------
                      </p>
                      <div className="flex items-center gap-2 px-6">
                        <Image src={tick} alt="Logo" className="h-5 w-auto" />
                        <p className="">Keyword Optimization</p>
                      </div>
                      <p className="text-white/40 text-xs opacity-50">
                        ------------------------------------------------------------------------
                      </p>
                      <div className="flex items-center gap-2 px-6">
                        <Image src={tick} alt="Logo" className="h-5 w-auto" />
                        <p className="">ATS Compatibility Report</p>
                      </div>
                      <p className="text-white/40 text-xs opacity-50">
                        ------------------------------------------------------------------------
                      </p>
                      <div className="flex items-center gap-2 px-6">
                        <Image src={tick} alt="Logo" className="h-5 w-auto" />
                        <p className="">AI Cover Letter Generator</p>
                      </div>
                      <p className="text-white/40 text-xs opacity-50">
                        ------------------------------------------------------------------------
                      </p>
                      <div className="flex items-center gap-2 px-6 pb-4">
                        <Image src={tick} alt="Logo" className="h-5 w-auto" />
                        <p className="">Job Match Analysis</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile: Show only yearly card */}
            <div className="pt-20 flex lg:hidden flex-row items-center justify-center">
              <div className="pt-10 py-4 border-0 mx-auto max-w-[400px] bg-gradient-to-br from-gray-900 via-gray-700 to-gray-500 rounded-3xl">
                <div className="px-10 text-2xl">
                  <p className=""> {"Pro Monthly"}</p>
                </div>
                <div className="px-10">
                  <p className="text-white/50">
                    Get Those Interviews — stand out with AI-optimized CVs
                    tailored to every job
                  </p>
                </div>
                <div className="pt-5 mx-auto max-w-[360px]">
                  <div className=" bg-gradient-to-b from-purple-500 to-pink-300 rounded-3xl relative overflow-hidden">
                    <div className="pt-8 px-5 relative z-10">
                      <div className="text-3xl font-semibold overflow-hidden inline-block">
                        <h3>£6/Month</h3>
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

                        <p className="">AI-Tailored CVs</p>
                      </div>
                      <p className="text-white/40 text-xs opacity-50">
                        ------------------------------------------------------------------------
                      </p>
                      <div className="flex items-center gap-2 px-6">
                        <Image src={tick} alt="Logo" className="h-5 w-auto" />

                        <p className="">Keyword Optimization</p>
                      </div>
                      <p className="text-white/40 text-xs opacity-50">
                        ------------------------------------------------------------------------
                      </p>
                      <div className="flex items-center gap-2 px-6">
                        <Image src={tick} alt="Logo" className="h-5 w-auto" />

                        <p className="">ATS Compatibility Report</p>
                      </div>
                      <p className="text-white/40 text-xs opacity-50">
                        ------------------------------------------------------------------------
                      </p>
                      <div className="flex items-center gap-2 px-6">
                        <Image src={tick} alt="Logo" className="h-5 w-auto" />

                        <p className="">AI Cover Letter Generator</p>
                      </div>
                      <p className="text-white/40 text-xs opacity-50">
                        ------------------------------------------------------------------------
                      </p>
                      <div className="flex items-center gap-2 px-6 pb-4">
                        <Image src={tick} alt="Logo" className="h-5 w-auto" />

                        <p className="">Job Match Analysis</p>
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
