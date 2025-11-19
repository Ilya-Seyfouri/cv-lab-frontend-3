"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import button from "../../public/BUTTON_1.png";
import tick from "../../public/tick.png";

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
    name: "Premium",
    price: "£7.29",
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
    name: "Career Max",
    price: "£18.99",
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
    <section
      style={{
        position: "relative",
        paddingTop: window.innerWidth >= 768 ? "2.5rem" : "0",
        paddingBottom: window.innerWidth >= 768 ? "2.5rem" : "0",
        scrollMarginTop: "7rem",
      }}
      id="pricing"
    >
      <div
        style={{
          maxWidth: "72rem",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "1rem",
          paddingRight: "1rem",
        }}
      >
        <div
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "4rem",
            maxWidth: "48rem",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              marginBottom: "1rem",
              backgroundImage:
                "linear-gradient(to bottom, white, rgba(255, 255, 255, 0.6))",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              fontSize:
                window.innerWidth >= 1024
                  ? "3rem"
                  : window.innerWidth >= 768
                  ? "2.25rem"
                  : "1.875rem",
              fontWeight: "600",
              lineHeight: "1.25",
            }}
          >
            Choose Your Plan
          </h2>
          <p
            style={{
              fontSize: window.innerWidth >= 768 ? "1.125rem" : "1rem",
              color: "rgba(255, 255, 255, 0.6)",
            }}
          >
            Choose the perfect plan for your job search. Start free and upgrade
            whenever you're ready.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gap: "2rem",
            paddingTop: window.innerWidth >= 1024 ? "2.5rem" : "0",
            gridTemplateColumns:
              window.innerWidth >= 1024 ? "repeat(3, 1fr)" : "1fr",
          }}
        >
          {plans.map((plan, index) => (
            <div
              key={index}
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                borderRadius: "1.5rem",
                border: plan.popular
                  ? "1px solid rgba(6, 182, 212, 0.6)"
                  : "1px solid rgba(255, 255, 255, 0.05)",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                padding: "1px",
                backdropFilter: "blur(12px)",
                transition: "all 0.3s",
                transform: plan.popular ? "scale(1.03)" : "scale(1)",
                boxShadow: plan.popular
                  ? "0 25px 50px -12px rgba(6, 182, 212, 0.3)"
                  : "none",
              }}
              onMouseEnter={(e) => {
                if (!plan.popular) {
                  e.currentTarget.style.borderColor = "rgba(6, 182, 212, 0.3)";
                }
              }}
              onMouseLeave={(e) => {
                if (!plan.popular) {
                  e.currentTarget.style.borderColor =
                    "rgba(255, 255, 255, 0.05)";
                }
              }}
            >
              {plan.popular && (
                <div
                  style={{
                    position: "absolute",
                    top: "-1rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  <div
                    style={{
                      borderRadius: "9999px",
                      backgroundImage:
                        "linear-gradient(to right, #0891b2, #0e7490)",
                      paddingLeft: "1rem",
                      paddingRight: "1rem",
                      paddingTop: "0.5rem",
                      paddingBottom: "0.5rem",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                      color: "white",
                      boxShadow:
                        "0 10px 15px -3px rgba(6, 182, 212, 0.4), 0 4px 6px -4px rgba(6, 182, 212, 0.4)",
                    }}
                  >
                    Most Popular
                  </div>
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  height: "100%",
                  flexDirection: "column",
                  borderRadius: "1.5rem",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  padding: "2rem",
                }}
              >
                <div style={{ marginBottom: "1.5rem" }}>
                  <h3
                    style={{
                      fontSize: window.innerWidth >= 768 ? "1.5rem" : "1.25rem",
                      fontWeight: "600",
                      color: "white",
                    }}
                  >
                    {plan.name}
                  </h3>
                  <p
                    style={{
                      marginTop: "0.5rem",
                      fontSize: window.innerWidth >= 768 ? "1rem" : "0.875rem",
                      color: "rgba(255, 255, 255, 0.6)",
                    }}
                  >
                    {plan.description}
                  </p>
                  <div
                    style={{
                      marginTop: "1.25rem",
                      display: "flex",
                      alignItems: "baseline",
                      gap: "0.5rem",
                    }}
                  >
                    <span
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, #22d3ee, #60a5fa)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        fontSize: "2.25rem",
                        fontWeight: "600",
                        color: "transparent",
                      }}
                    >
                      {plan.price}
                    </span>
                    <span
                      style={{
                        fontSize: "0.875rem",
                        color: "rgba(255, 255, 255, 0.5)",
                      }}
                    >
                      /month
                    </span>
                  </div>
                </div>

                <div style={{ flex: "1" }}>
                  <ul
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.75rem",
                      listStyle: "none",
                      padding: "0",
                      margin: "0",
                    }}
                  >
                    {plan.features.map((feature, i) => {
                      const isRed =
                        feature.includes("100 tokens") ||
                        feature.includes("Interview Simulation") ||
                        feature.includes("Unlimited tokens");

                      return (
                        <li
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "0.75rem",
                          }}
                        >
                          <Image
                            src={tick}
                            alt="Included"
                            style={{
                              marginTop: "0.125rem",
                              height: "1.25rem",
                              width: "1.25rem",
                              flexShrink: 0,
                            }}
                          />
                          <span
                            style={{
                              fontSize: "0.875rem",
                              backgroundImage: isRed
                                ? "linear-gradient(to right, #06b6d4, #60a5fa)"
                                : "none",
                              backgroundClip: isRed ? "text" : "initial",
                              WebkitBackgroundClip: isRed ? "text" : "initial",
                              color: isRed
                                ? "transparent"
                                : "rgba(255, 255, 255, 0.7)",
                              fontWeight: isRed ? "600" : "normal",
                            }}
                          >
                            {feature}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div style={{ marginTop: "2rem" }}>
                  <button
                    onClick={() => router.push("/auth")}
                    style={{
                      display: "flex",
                      width: "100%",
                      cursor: "pointer",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      borderRadius: "1rem",
                      paddingLeft: "1.5rem",
                      paddingRight: "1.5rem",
                      paddingTop: "0.625rem",
                      paddingBottom: "0.625rem",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      transition: "all 0.2s",
                      backgroundImage: plan.popular
                        ? "linear-gradient(to right, #06b6d4, #0891b2, #0e7490)"
                        : "linear-gradient(to right, #22d3ee, #06b6d4, #0891b2)",
                      color: "white",
                      boxShadow: plan.popular
                        ? "0 20px 25px -5px rgba(6, 182, 212, 0.4), 0 8px 10px -6px rgba(6, 182, 212, 0.4)"
                        : "0 10px 15px -3px rgba(6, 182, 212, 0.3), 0 4px 6px -4px rgba(6, 182, 212, 0.3)",
                      border: "none",
                    }}
                    onMouseEnter={(e) => {
                      if (plan.popular) {
                        e.currentTarget.style.backgroundImage =
                          "linear-gradient(to right, #0891b2, #0e7490, #155e75)";
                      } else {
                        e.currentTarget.style.backgroundImage =
                          "linear-gradient(to right, #06b6d4, #0891b2, #0e7490)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (plan.popular) {
                        e.currentTarget.style.backgroundImage =
                          "linear-gradient(to right, #06b6d4, #0891b2, #0e7490)";
                      } else {
                        e.currentTarget.style.backgroundImage =
                          "linear-gradient(to right, #22d3ee, #06b6d4, #0891b2)";
                      }
                    }}
                    onMouseDown={(e) =>
                      (e.currentTarget.style.transform = "scale(0.95)")
                    }
                    onMouseUp={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  >
                    <p style={{ fontSize: "1.125rem" }}>
                      {plan.name === "Free Trial"
                        ? "Get Started Free"
                        : "Choose Plan"}
                    </p>
                    <Image
                      src={button}
                      alt="Start"
                      style={{ height: "2rem", width: "auto" }}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          pointerEvents: "none",
          position: "absolute",
          inset: "0",
          zIndex: "-10",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            height: "600px",
            width: "600px",
            transform: "translate(-50%, -50%)",
            borderRadius: "9999px",
            backgroundColor: "rgba(6, 182, 212, 0.1)",
            filter: "blur(48px)",
          }}
        />
      </div>
    </section>
  );
}
