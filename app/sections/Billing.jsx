"use client";

import { useState, useEffect } from "react";
import { createClient } from "../lib/supabase/client";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import circle from "@/images/white-circle.png";
import button from "@/images/BUTTON_1.png";
import tick from "@/images/tick.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Billing() {
  const [user1, setUser1] = useState(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const [monthly, setMonthly] = useState(false);
  const [annual, setAnnual] = useState(false);
  const router = useRouter();

  const priceID = "price_1SLiliGXyzkhNsjncv7RnLad";

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        await fetchUserDetail(user.id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserDetail = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return;
      }

      setUser1(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const checkoutbruh = async () => {
    if (!user1) {
      console.error("No user found");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceID: priceID,
          email: user1.email,
          userId: user1.id,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        console.error("Error:", data.error);
        return;
      }

      window.location.href = data.url;
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <>
        <section id="pricing">
          <div className="container">
            <div className="pt-25 flex flex-col justify-center items-center">
              <div className="flex items-center py-5 max-w-4xl  text-center mx-auto">
                <h2 className="text-4xl font-semibold">
                  a better economic calendar for traders
                </h2>
              </div>
              <div className="pt-2 flex justify-center max-w-2xl">
                <p className="text-white/60 text-xl">
                  Unlock AI Insight, Event Notifications and more with GoMoon.ai
                  Pro
                </p>
              </div>

              <div className="pt-15 pb-10 flex items-center gap-4">
                <motion.p
                  className={twMerge(
                    "text-white/30 text-sm",
                    monthly && "text-white text-md"
                  )}
                  animate={{
                    opacity: monthly ? 1 : 0.3,
                    fontSize: monthly ? "1rem" : "0.875rem",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  Monthly
                </motion.p>

                <button
                  className="border-blue-500 bg-blue-500 rounded-full px-4 relative overflow-hidden"
                  onClick={() => setMonthly(!monthly)}
                >
                  <motion.div
                    animate={{ x: monthly ? -15 : 15 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <Image src={circle} alt="logo" className="h-6 w-auto" />
                  </motion.div>
                </button>

                <motion.p
                  className={twMerge(
                    "text-white/30 text-sm",
                    !monthly && "text-white text-md"
                  )}
                  animate={{
                    opacity: !monthly ? 1 : 0.3,
                    fontSize: !monthly ? "1rem" : "0.875rem",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  Yearly
                </motion.p>
              </div>

              <div className="pt-10 py-4 border-1 border-white/30 mx-auto max-w-[460px] bg-white/10 rounded-3xl">
                <div className="px-10 text-2xl">
                  <p className="font-semibold"> {monthly ? "Pro Monthly" : "Pro Yearly"}</p>
                </div>
                <div className="px-10 py-2">
                  <p className="text-white/50 text-sm">
                    Get Those Interviews — stand out with AI-optimized CVs
                    tailored to every job
                  </p>
                </div>
                <div className="pt-5 mx-auto max-w-[420px]">
                  <div className="">
                    <div
                      className={twMerge(
                        "absolute top-0 left-0 w-24 h-24 bg-blue-50 rounded-full blur-2xl opacity-80 z-50",
                        !monthly && "w-28 h-28"
                      )}
                    ></div>
                    <div className="pt- px-5 relative z-10">
                      <motion.h3
                        className="text-3xl font-semibold overflow-hidden inline-block"
                        layout
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      >
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={monthly ? "monthly" : "yearly"}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.1 }}
                            className="inline-block"
                          >
                            <span className="text-7xl">
                              {monthly ? "$12" : "$8"}
                            </span>
                            <span className="text-xl">
                              {monthly ? " /month" : "/month"}
                            </span>
                          </motion.span>
                        </AnimatePresence>
                      </motion.h3>
                    </div>
                    <div className="">
                      <p className="text-white/40 pt-4 flex items-center">
                        ---------------------------------------------------------
                      </p>

                      <div className="flex items-center gap-2">
                        <p className="">🚀 AI-Tailored CVs</p>
                      </div>
                      <p className="text-white/40">
                        ---------------------------------------------------------
                      </p>
                      <div className="flex items-center gap-2 ">
                        <p className="">✨ Keyword Optimization</p>
                      </div>
                      <p className="text-white/40">
                        ---------------------------------------------------------
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="">📊 ATS Compatibility Report</p>
                      </div>
                      <p className="text-white/40">
                        ---------------------------------------------------------
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="">📨 AI Cover Letter Generator</p>
                      </div>
                      <p className="text-white/40">
                        ---------------------------------------------------------
                      </p>
                      <div className="flex items-center gap-2  ">
                        <p className="">🧠 Job Match Analysis</p>
                      </div>
                    </div>

                    <div className="pt flex flex-row justify-center  items-center relative z-10"></div>
                    <div className="relative z-10">
                      <div className="flex justify-center pt-10 pb-10">
                        <button
                          onClick={checkoutbruh}
                          disabled={loading || !user1}
                          className="flex items-center gap-2 bg-white/90 font-semibold rounded-2xl px-20 py-2.5
                                      cursor-pointer text-black bg-gradient-to-r from-white
                                       via-gray-100 to-gray-200
  hover:from-gray-100 hover:via-gray-200 hover:to-gray-300
  focus:ring-4 focus:outline-none focus:ring-gray-300
  shadow-lg shadow-gray-300/50
 text-center me-2 mb-2
  transition-all duration-200 text-lg"
                        >
                          {loading ? "Loading..." : "Buy Now"}
                          <Image
                            src={button}
                            alt="logo"
                            className="h-8 w-auto"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
      <div className="flex justify-center pt-4 pb-15"></div>
    </>
  );
}
