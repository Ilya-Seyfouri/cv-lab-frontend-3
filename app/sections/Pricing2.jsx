"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import button from "../../images/BUTTON_1.png";
import tick from "../../images/tick.png";

const plans = [
  {
    name: "Free Trial",
    price: "£0",
    description: "Perfect for testing our service.",
    features: [
      "5 free tokens",
      "Access to CV tailor",
      "Access to cover letter generator",
      "Keyword Intergration",
      "ATS optimization",
    ],
    popular: false,
  },
  {
    name: "Job Seeker",
    price: "£4.99",
    description: "For active job hunters.",
    features: [
      "100 tokens / month",
      "Access to CV tailor",
      "Access to cover letter generator",
      "Keyword Intergration",
      "ATS optimization",
    ],
    popular: true,
  },
  {
    name: "Pro Career",
    price: "14.99",
    description: "For serious professionals.",
    features: [
      "Unlimited tokens",
      "Access to CV tailor",
      "Access to cover letter generator",
      "Access to Interview Simulation",
      "Keyword Intergration",
      "ATS optimization",
    ],
    popular: false,
  },
];

export default function Pricing2() {
  const router = useRouter();

  return (
    <section className="relative  md:py-10  scroll-mt-28" id="pricing">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2
            className="mb-4 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent
             text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight"
          >
            Choose Your Plan
          </h2>
          <p className="text-base md:text-lg text-white/60">
            Choose the perfect plan for your job search. Start free and upgrade
            whenever you're ready.
          </p>
        </div>

        <div className="grid gap-8 lg:pt-10 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative flex flex-col rounded-3xl border border-white/5 bg-white/5 p-[1px] backdrop-blur-sm transition-all ${
                plan.popular
                  ? "scale-[1.03] border-cyan-500/60 shadow-2xl shadow-cyan-500/30"
                  : "hover:border-cyan-500/30"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="rounded-full bg-gradient-to-r from-cyan-600 to-cyan-700 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-cyan-500/40">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="flex h-full flex-col rounded-3xl bg-black/70 p-8">
                <div className="mb-6">
                  <h3 className="text-xl md:text-2xl font-semibold text-white">
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-sm md:text-base text-white/60">
                    {plan.description}
                  </p>
                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-4xl font-semibold text-transparent">
                      {plan.price}
                    </span>
                    <span className="text-sm text-white/50">/month</span>
                  </div>
                </div>

                <div className="flex-1">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => {
                      const isRed =
                        feature.includes("100 tokens") ||
                        feature.includes("Interview Simulation") ||
                        feature.includes("Unlimited tokens");

                      return (
                        <li key={i} className="flex items-start gap-3">
                          <Image
                            src={tick}
                            alt="Included"
                            className="mt-0.5 h-5 w-5 shrink-0"
                          />
                          <span
                            className={`text-sm ${
                              isRed
                                ? "bg-gradient-to-r from-cyan-500 to-blue-400 bg-clip-text text-transparent font-semibold"
                                : "text-white/70"
                            }`}
                          >
                            {feature}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="mt-8">
                  <button
                    onClick={() => router.push("/auth")}
                    className={`flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-2.5 text-sm font-semibold 
                    transition-all duration-200 active:scale-95 
                    ${
                      plan.popular
                        ? "bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 text-white shadow-xl shadow-cyan-500/40 hover:from-cyan-600 hover:via-cyan-700 hover:to-cyan-800"
                        : "bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 text-white shadow-lg shadow-cyan-500/30 hover:from-cyan-500 hover:via-cyan-600 hover:to-cyan-700"
                    }`}
                  >
                    <p className="text-lg">
                      {plan.name === "Free Trial"
                        ? "Get Started Free"
                        : "Choose Plan"}
                    </p>
                    <Image src={button} alt="Start" className="h-8 w-auto" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>
    </section>
  );
}
