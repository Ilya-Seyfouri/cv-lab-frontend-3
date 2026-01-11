"use client";

import { useEffect, useMemo, useState } from "react";
import { Upload, Sparkles, Download } from "lucide-react";

const steps = [
  {
    icon: Upload,
    step: "#1",
    title: "Upload Your CV & Job Description",
    description:
      "Upload your CV and copy & paste the Job description for the role you’re applying for.",
  },
  {
    icon: Sparkles,
    step: "#2",
    title: "AI Analyzes & Optimizes",
    description:
      "Our software then aligns your CV to the specific job description, making you the ideal candidate for that Job.",
  },
  {
    icon: Download,
    step: "#3",
    title: "Download & Apply",
    description:
      "Download your optimised CV and Cover Letter and get that dream Job!",
  },
];

export default function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const intervalMs = 2500;

  useEffect(() => {
    if (paused) return;

    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % steps.length);
    }, intervalMs);

    return () => clearInterval(id);
  }, [paused]);

  return (
    <section className="relative py-20 md:py-15 scroll-mt-10" id="features">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 bg-gradient-to-b from-white to-white/60 bg-clip-text text-3xl md:text-4xl lg:text-5xl font-semibold text-transparent">
            How It Works
          </h2>
          <p className="text-base md:text-lg text-white/60">
            Tailor your CV in 3 simple steps. No complex setup, no learning
            curve.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((item, index) => {
            const Icon = item.icon;
            const isActive = index === activeIndex;

            return (
              <div
                key={index}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                className={[
                  "group relative h-full rounded-3xl border border-white/5 bg-white/5 p-[1px] backdrop-blur-sm transition-all",
                  // Hover effect (your existing)
                  "hover:border-cyan-500/40 hover:bg-white/10",
                  // Auto-glow uses the SAME visual as hover
                  isActive ? "border-cyan-500/40 bg-white/10" : "",
                ].join(" ")}
              >
                {/* Extra glow ring (optional but looks very “alive”) */}
                <div
                  className={[
                    "pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-500",
                    "shadow-[0_0_0_1px_rgba(34,211,238,0.15),0_0_30px_rgba(34,211,238,0.18)]",
                    isActive ? "opacity-100" : "opacity-0",
                    "group-hover:opacity-100", // hover always wins
                  ].join(" ")}
                />

                <div className="relative h-full rounded-3xl bg-black/60 p-8 text-center">
                  {/* Icon */}
                  <div
                    className={[
                      "mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl",
                      "bg-gradient-to-br from-cyan-500/20 to-blue-500/20 transition-transform duration-300",
                      "group-hover:scale-110",
                      isActive ? "scale-110" : "",
                    ].join(" ")}
                  >
                    <Icon className="h-8 w-8 text-cyan-300" />
                  </div>

                  {/* Step number */}
                  <div className="mb-2 text-sm font-semibold tracking-wide text-cyan-300">
                    {item.step}
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 text-lg md:text-xl font-semibold text-white">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm md:text-base text-white/60">
                    {item.description}
                  </p>

                  {/* Connector line on desktop (between cards) */}
                  {index < steps.length - 1 && (
                    <div className="absolute -right-9 top-1/2 hidden h-px w-8 -translate-y-1/2 bg-gradient-to-r from-cyan-500/50 to-transparent md:block" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Background gradient (make only the active one visible) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className={[
            "absolute top-1/2 left-[15%] h-[420px] w-[420px] -translate-y-1/2 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl transition-opacity duration-700",
            activeIndex === 0 ? "opacity-100" : "opacity-0",
          ].join(" ")}
        />
        <div
          className={[
            "absolute top-1/2 left-1/2 h-[420px] w-[420px] -translate-y-1/2 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl transition-opacity duration-700",
            activeIndex === 1 ? "opacity-100" : "opacity-0",
          ].join(" ")}
        />
        <div
          className={[
            "absolute top-1/2 right-[15%] h-[420px] w-[420px] -translate-y-1/2 translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl transition-opacity duration-700",
            activeIndex === 2 ? "opacity-100" : "opacity-0",
          ].join(" ")}
        />
      </div>
    </section>
  );
}
