"use client";
import { createClient } from "../lib/supabase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Account({ onNavigateToOptimizer }) {
  const [user1, setUser1] = useState(null);
  const [userdetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const supabase = createClient();
  const router = useRouter();

  const premium_priceID = "price_1SUSl4GTsfq9NWHAdMHCbsz5";
  const career_max = "price_1SUSqmGTsfq9NWHAs88j0NDn";
  const w = typeof window === "undefined" ? 0 : window.innerWidth;

  const checkoutbruh_premium = async () => {
    if (!user1) {
      console.error("No user found");
      return;
    }

    const selectedPriceID = premium_priceID;

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceID: selectedPriceID,
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

  const checkoutbruh_career_max = async () => {
    if (!user1) {
      console.error("No user found");
      return;
    }

    const selectedPriceID = career_max;

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceID: selectedPriceID,
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

  // Mock data for past generations
  const pastGenerations = [
    {
      id: 1,
      jobTitle: "Senior Software Engineer",
      company: "Tech Corp Inc.",
      date: "2024-11-14",
      score: 92,
      status: "completed",
    },
    {
      id: 2,
      jobTitle: "Full Stack Developer",
      company: "StartUp XYZ",
      date: "2024-11-12",
      score: 87,
      status: "completed",
    },
    {
      id: 3,
      jobTitle: "Frontend Engineer",
      company: "Digital Solutions",
      date: "2024-11-10",
      score: 89,
      status: "completed",
    },
    {
      id: 4,
      jobTitle: "React Developer",
      company: "Innovation Labs",
      date: "2024-11-08",
      score: 94,
      status: "completed",
    },
    {
      id: 5,
      jobTitle: "Product Manager",
      company: "Growth Company",
      date: "2024-11-05",
      score: 85,
      status: "completed",
    },
  ];

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (!userdetails?.id) return;

    const channel = supabase
      .channel("profile-changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "profiles",
          filter: `id=eq.${userdetails.id}`,
        },
        (payload) => {
          setUser1(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userdetails?.id]);

  useEffect(() => {
    if (!userdetails?.id) return;

    const interval = setInterval(() => {
      if (!document.hidden) {
        fetchUserDetail(userdetails.id);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [userdetails?.id]);

  const getUser = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserDetails(user);
      if (user) {
        await fetchUserDetail(user.id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  async function signOutFunc() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push("/auth");
    }
  }

  const fetchUserDetail = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (!error && data) {
        setUser1(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleManageSubscription = async () => {
    if (!user1?.stripe_customer_id) {
      console.log("No subscription found. Please subscribe first.");
      return;
    }

    try {
      const response = await fetch("/api/create-portal-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId: user1.stripe_customer_id,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const currentPlan =
    user1?.subscription_status === "Premium"
      ? "Premium"
      : user1?.subscription_status === "Career Max"
      ? "Career Max"
      : "free";
  const creditsRemaining = user1?.credits_remaining || 0;
  const totalCredits =
    currentPlan === "Premium"
      ? 100
      : currentPlan === "Career Max"
      ? "Unlimited"
      : 3;

  const userData = {
    name: userdetails?.email?.split("@")[0] || "John Doe",
    email: userdetails?.email || "john.doe@example.com",
    avatar: "",
    memberSince: new Date().toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    }),
  };

  const planDetails = {
    free: { name: "Free Trial", credits: 3 },
    Premium: { name: "Premium", credits: 100 },
    "Career Max": { name: "Career Max", credits: "Unlimited" },
  };

  const plan = planDetails[currentPlan];

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            animation: "spin 1s linear infinite",
            borderRadius: "9999px",
            height: "3rem",
            width: "3rem",
            borderBottom: "2px solid rgba(255, 255, 255, 0.6)",
          }}
        ></div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingTop: "1.25rem",
        paddingBottom: "1.25rem",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "1rem",
          paddingRight: "1rem",
        }}
      >
        <div
          style={{ maxWidth: "80rem", marginLeft: "auto", marginRight: "auto" }}
        >
          {/* Header */}
          <div style={{ marginBottom: "2rem" }}>
            <h1
              style={{
                marginBottom: "0.5rem",
                backgroundImage:
                  "linear-gradient(to bottom, white, rgba(255, 255, 255, 0.6))",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                fontSize: "2.25rem",
                color: "transparent",
              }}
            >
              Account Dashboard
            </h1>
            <p style={{ color: "rgba(255, 255, 255, 0.6)" }}>
              Manage your profile, credits, and view your application history
            </p>
          </div>

          {/* Quick Stats */}
          <div
            style={{
              marginBottom: "2rem",
              display: "grid",
              gap: "1rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            }}
          >
            <div
              style={{
                border: "1px solid rgba(6, 182, 212, 0.2)",
                backgroundColor: "rgba(6, 182, 212, 0.05)",
                backdropFilter: "blur(12px)",
                borderRadius: "0.5rem",
                padding: "1.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "rgba(255, 255, 255, 0.6)",
                    }}
                  >
                    Current Plan
                  </p>
                  <p style={{ fontSize: "1.25rem", color: "white" }}>
                    {plan.name}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    height: "3rem",
                    width: "3rem",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "9999px",
                    backgroundColor: "rgba(6, 182, 212, 0.2)",
                  }}
                >
                  <svg
                    style={{
                      height: "1.5rem",
                      width: "1.5rem",
                      color: "#22d3ee",
                    }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div
              style={{
                border: "1px solid rgba(34, 197, 94, 0.2)",
                backgroundColor: "rgba(34, 197, 94, 0.05)",
                backdropFilter: "blur(12px)",
                borderRadius: "0.5rem",
                padding: "1.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "rgba(255, 255, 255, 0.6)",
                    }}
                  >
                    Credits Left
                  </p>
                  <p style={{ fontSize: "1.25rem", color: "white" }}>
                    {creditsRemaining}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    height: "3rem",
                    width: "3rem",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "9999px",
                    backgroundColor: "rgba(34, 197, 94, 0.2)",
                  }}
                >
                  <svg
                    style={{
                      height: "1.5rem",
                      width: "1.5rem",
                      color: "#4ade80",
                    }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div
              style={{
                border: "1px solid rgba(59, 130, 246, 0.2)",
                backgroundColor: "rgba(59, 130, 246, 0.05)",
                backdropFilter: "blur(12px)",
                borderRadius: "0.5rem",
                padding: "1.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "rgba(255, 255, 255, 0.6)",
                    }}
                  >
                    Total Generated
                  </p>
                  <p style={{ fontSize: "1.25rem", color: "white" }}>
                    {pastGenerations.length}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    height: "3rem",
                    width: "3rem",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "9999px",
                    backgroundColor: "rgba(59, 130, 246, 0.2)",
                  }}
                >
                  <svg
                    style={{
                      height: "1.5rem",
                      width: "1.5rem",
                      color: "#60a5fa",
                    }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div
              style={{
                border: "1px solid rgba(249, 115, 22, 0.2)",
                backgroundColor: "rgba(249, 115, 22, 0.05)",
                backdropFilter: "blur(12px)",
                borderRadius: "0.5rem",
                padding: "1.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "rgba(255, 255, 255, 0.6)",
                    }}
                  >
                    Avg. Score
                  </p>
                  <p style={{ fontSize: "1.25rem", color: "white" }}>89</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    height: "3rem",
                    width: "3rem",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "9999px",
                    backgroundColor: "rgba(249, 115, 22, 0.2)",
                  }}
                >
                  <svg
                    style={{
                      height: "1.5rem",
                      width: "1.5rem",
                      color: "#fb923c",
                    }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            <div style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}>
              <div
                style={{
                  display: "inline-flex",
                  height: "2.5rem",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "0.375rem",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  padding: "0.25rem",
                  color: "rgba(255, 255, 255, 0.6)",
                }}
              >
                <button
                  onClick={() => setActiveTab("profile")}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    paddingLeft: "1.25rem",
                    paddingRight: "1.25rem",
                    whiteSpace: "nowrap",
                    borderRadius: "0.125rem",
                    paddingTop: "0.375rem",
                    paddingBottom: "0.375rem",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    transition: "all 0.2s",
                    cursor: "pointer",
                    backgroundColor:
                      activeTab === "profile"
                        ? "rgba(255, 255, 255, 0.1)"
                        : "transparent",
                    color:
                      activeTab === "profile"
                        ? "white"
                        : "rgba(255, 255, 255, 0.6)",
                    boxShadow:
                      activeTab === "profile"
                        ? "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
                        : "none",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "rgba(255, 255, 255, 0.3)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      activeTab === "profile"
                        ? "rgba(255, 255, 255, 0.1)"
                        : "transparent")
                  }
                  onMouseDown={(e) =>
                    (e.currentTarget.style.transform = "scale(0.95)")
                  }
                  onMouseUp={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  Profile
                </button>
                <div
                  style={{ paddingLeft: "0.375rem", paddingRight: "0.375rem" }}
                ></div>
                <button
                  onClick={() => setActiveTab("history")}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    whiteSpace: "nowrap",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "0.125rem",
                    paddingLeft: "0.75rem",
                    paddingRight: "0.75rem",
                    paddingTop: "0.375rem",
                    paddingBottom: "0.375rem",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    transition: "all 0.2s",
                    cursor: "pointer",
                    backgroundColor:
                      activeTab === "history"
                        ? "rgba(255, 255, 255, 0.1)"
                        : "transparent",
                    color:
                      activeTab === "history"
                        ? "white"
                        : "rgba(255, 255, 255, 0.6)",
                    boxShadow:
                      activeTab === "history"
                        ? "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
                        : "none",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "rgba(255, 255, 255, 0.3)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      activeTab === "history"
                        ? "rgba(255, 255, 255, 0.1)"
                        : "transparent")
                  }
                  onMouseDown={(e) =>
                    (e.currentTarget.style.transform = "scale(0.95)")
                  }
                  onMouseUp={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  Generation History
                </button>
              </div>
            </div>

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div
                style={{
                  display: "grid",
                  gap: "2rem",

                  gridTemplateColumns: "repeat(3, 1fr)",
                }}
              >
                {/* Profile Info */}
                <div
                  style={{
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(12px)",
                    borderRadius: "0.5rem",
                    gridColumn: w >= 1024 ? "span 2 / span 2" : "auto",
                  }}
                >
                  <div style={{ padding: "1.5rem" }}>
                    <h3
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        color: "white",
                        fontSize: "1.125rem",
                        fontWeight: "600",
                      }}
                    >
                      <svg
                        style={{
                          height: "1.25rem",
                          width: "1.25rem",
                          color: "#22d3ee",
                        }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      Profile Information
                    </h3>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "rgba(255, 255, 255, 0.6)",
                      }}
                    >
                      Update your personal information
                    </p>
                  </div>
                  <div
                    style={{
                      padding: "1.5rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "1.5rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1.5rem",
                      }}
                    >
                      <div
                        style={{
                          height: "5rem",
                          width: "5rem",
                          border: "2px solid rgba(6, 182, 212, 0.2)",
                          borderRadius: "9999px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: "rgba(6, 182, 212, 0.1)",
                            fontSize: "1.125rem",
                            color: "#22d3ee",
                            height: "100%",
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "600",
                          }}
                        >
                          {userData.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                      </div>
                      <div>
                        <h3 style={{ color: "white" }}>{userData.name}</h3>
                        <p
                          style={{
                            fontSize: "0.875rem",
                            color: "rgba(255, 255, 255, 0.6)",
                          }}
                        >
                          Member since {userData.memberSince}
                        </p>
                      </div>
                    </div>

                    <div
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        height: "1px",
                      }}
                    />

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                      }}
                    >
                      <div>
                        <label
                          style={{
                            fontSize: "0.875rem",
                            color: "rgba(255, 255, 255, 0.6)",
                          }}
                        >
                          Full Name
                        </label>
                        <p style={{ color: "white" }}>{userData.name}</p>
                      </div>
                      <div>
                        <label
                          style={{
                            fontSize: "0.875rem",
                            color: "rgba(255, 255, 255, 0.6)",
                          }}
                        >
                          Email Address
                        </label>
                        <p style={{ color: "white" }}>{userData.email}</p>
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "0.75rem" }}>
                      {(currentPlan === "Premium" ||
                        currentPlan === "Career Max") && (
                        <button
                          style={{
                            backgroundImage:
                              "linear-gradient(to right, #0891b2, #0e7490)",
                            paddingLeft: "1rem",
                            paddingRight: "1rem",
                            paddingTop: "0.5rem",
                            paddingBottom: "0.5rem",
                            borderRadius: "0.5rem",
                            color: "white",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            transition: "all 0.2s",
                            cursor: "pointer",
                            border: "none",
                          }}
                          onClick={handleManageSubscription}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor =
                              "linear-gradient(to right, #0e7490, #155e75)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor =
                              "linear-gradient(to right, #0891b2, #0e7490)")
                          }
                          onMouseDown={(e) =>
                            (e.currentTarget.style.transform = "scale(0.95)")
                          }
                          onMouseUp={(e) =>
                            (e.currentTarget.style.transform = "scale(1)")
                          }
                        >
                          <svg
                            style={{ height: "1rem", width: "1rem" }}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          Manage Subscription
                        </button>
                      )}
                      <button
                        onClick={signOutFunc}
                        style={{
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          paddingLeft: "1rem",
                          paddingRight: "1rem",
                          paddingTop: "0.5rem",
                          paddingBottom: "0.5rem",
                          borderRadius: "0.5rem",
                          transition: "all 0.2s",
                          color: "white",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          backgroundColor: "transparent",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "rgba(255, 255, 255, 0.05)";
                          e.currentTarget.style.color = "#f87171";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = "white";
                        }}
                        onMouseDown={(e) =>
                          (e.currentTarget.style.transform = "scale(0.95)")
                        }
                        onMouseUp={(e) =>
                          (e.currentTarget.style.transform = "scale(1)")
                        }
                      >
                        <svg
                          style={{ height: "1rem", width: "1rem" }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(12px)",
                    borderRadius: "0.5rem",
                  }}
                >
                  <div style={{ padding: "1.5rem" }}>
                    <h3 style={{ color: "white", fontWeight: "600" }}>
                      Usage This Month
                    </h3>
                  </div>
                  <div
                    style={{
                      padding: "1.5rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          marginBottom: "0.5rem",
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "0.875rem",
                        }}
                      >
                        <span style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                          Credits Remaining
                        </span>
                        <span style={{ color: "white" }}>
                          {creditsRemaining}
                        </span>
                      </div>

                      <div
                        style={{
                          height: "0.5rem",
                          overflow: "hidden",
                          borderRadius: "9999px",
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            backgroundImage:
                              "linear-gradient(to right, #0891b2, #0e7490)",
                            width:
                              totalCredits === "Unlimited"
                                ? "0%"
                                : `${
                                    ((totalCredits -
                                      (totalCredits - creditsRemaining)) /
                                      totalCredits) *
                                    100
                                  }%`,
                          }}
                        />
                      </div>
                    </div>

                    <div
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        height: "1px",
                      }}
                    />

                    <div
                      style={{
                        borderRadius: "0.5rem",
                        border: "1px solid rgba(34, 197, 94, 0.2)",
                        backgroundColor: "rgba(34, 197, 94, 0.05)",
                        padding: "0.75rem",
                      }}
                    >
                      <p style={{ fontSize: "0.875rem", color: "white" }}>
                        Credits Resets on Dec 15
                      </p>
                      <p
                        style={{
                          fontSize: "0.75rem",
                          color: "rgba(255, 255, 255, 0.6)",
                        }}
                      ></p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* History Tab */}
            {activeTab === "history" && (
              <div
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(12px)",
                  borderRadius: "0.5rem",
                }}
              >
                <div style={{ padding: "1.5rem" }}>
                  <h3
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      color: "white",
                      fontSize: "1.125rem",
                      fontWeight: "600",
                    }}
                  >
                    <svg
                      style={{
                        height: "1.25rem",
                        width: "1.25rem",
                        color: "#22d3ee",
                      }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Generation History
                  </h3>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "rgba(255, 255, 255, 0.6)",
                    }}
                  >
                    View and download your past CV and cover letter generations
                  </p>
                </div>
                <div style={{ padding: "1.5rem" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    {pastGenerations.map((generation) => (
                      <div
                        key={generation.id}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "1rem",
                          borderRadius: "0.5rem",
                          border: "1px solid rgba(255, 255, 255, 0.05)",
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          padding: "1rem",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(6, 182, 212, 0.2)";
                          e.currentTarget.style.backgroundColor =
                            "rgba(255, 255, 255, 0.1)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(255, 255, 255, 0.05)";
                          e.currentTarget.style.backgroundColor =
                            "rgba(255, 255, 255, 0.05)";
                        }}
                      >
                        <div style={{ flex: "1" }}>
                          <div
                            style={{
                              marginBottom: "0.5rem",
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                            }}
                          >
                            <h4 style={{ color: "white" }}>
                              {generation.jobTitle}
                            </h4>
                            <span
                              style={{
                                backgroundColor: "rgba(34, 197, 94, 0.2)",
                                color: "#4ade80",
                                paddingLeft: "0.5rem",
                                paddingRight: "0.5rem",
                                paddingTop: "0.25rem",
                                paddingBottom: "0.25rem",
                                borderRadius: "0.25rem",
                                fontSize: "0.75rem",
                              }}
                            >
                              Score: {generation.score}
                            </span>
                          </div>
                          <p
                            style={{
                              marginBottom: "0.25rem",
                              fontSize: "0.875rem",
                              color: "rgba(255, 255, 255, 0.6)",
                            }}
                          >
                            {generation.company}
                          </p>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "1rem",
                              fontSize: "0.75rem",
                              color: "rgba(255, 255, 255, 0.6)",
                            }}
                          >
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.25rem",
                              }}
                            >
                              <svg
                                style={{ height: "0.75rem", width: "0.75rem" }}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              {new Date(generation.date).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </span>
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.25rem",
                              }}
                            >
                              <svg
                                style={{ height: "0.75rem", width: "0.75rem" }}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              2 weeks ago
                            </span>
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <button
                            style={{
                              border: "1px solid rgba(255, 255, 255, 0.1)",
                              paddingLeft: "0.75rem",
                              paddingRight: "0.75rem",
                              paddingTop: "0.5rem",
                              paddingBottom: "0.5rem",
                              borderRadius: "0.25rem",
                              fontSize: "0.875rem",
                              transition: "background-color 0.2s",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              backgroundColor: "transparent",
                              color: "white",
                              cursor: "pointer",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                "rgba(255, 255, 255, 0.05)")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                "transparent")
                            }
                          >
                            <svg
                              style={{ height: "1rem", width: "1rem" }}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                            View
                          </button>
                          <button
                            style={{
                              backgroundColor: "#0891b2",
                              paddingLeft: "0.75rem",
                              paddingRight: "0.75rem",
                              paddingTop: "0.5rem",
                              paddingBottom: "0.5rem",
                              borderRadius: "0.25rem",
                              fontSize: "0.875rem",
                              color: "white",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              border: "none",
                              cursor: "pointer",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                "#0e7490")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                "#0891b2")
                            }
                          >
                            <svg
                              style={{ height: "1rem", width: "1rem" }}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                              />
                            </svg>
                            Download
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {pastGenerations.length === 0 && (
                    <div
                      style={{
                        paddingTop: "3rem",
                        paddingBottom: "3rem",
                        textAlign: "center",
                      }}
                    >
                      <svg
                        style={{
                          marginLeft: "auto",
                          marginRight: "auto",
                          marginBottom: "1rem",
                          height: "3rem",
                          width: "3rem",
                          color: "rgba(255, 255, 255, 0.6)",
                        }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <p style={{ marginBottom: "0.5rem", color: "white" }}>
                        No generations yet
                      </p>
                      <p
                        style={{
                          fontSize: "0.875rem",
                          color: "rgba(255, 255, 255, 0.6)",
                        }}
                      >
                        Start optimizing your CV to see your history here
                      </p>
                      <button
                        onClick={onNavigateToOptimizer}
                        style={{
                          marginTop: "1rem",
                          backgroundImage:
                            "linear-gradient(to right, #0891b2, #0e7490)",
                          paddingLeft: "1rem",
                          paddingRight: "1rem",
                          paddingTop: "0.5rem",
                          paddingBottom: "0.5rem",
                          borderRadius: "0.5rem",
                          color: "white",
                          border: "none",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "linear-gradient(to right, #0e7490, #155e75)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "linear-gradient(to right, #0891b2, #0e7490)")
                        }
                      >
                        Optimize Your First CV
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Upgrade Banner for Free Users */}
            {currentPlan === "free" && (
              <div style={{ marginBottom: "2rem" }}>
                <div
                  style={{
                    overflow: "hidden",
                    border: "1px solid rgba(6, 182, 212, 0.3)",
                    backgroundImage:
                      "linear-gradient(to bottom right, rgba(6, 182, 212, 0.1), rgba(6, 182, 212, 0.05), transparent)",
                    backdropFilter: "blur(12px)",
                    borderRadius: "0.5rem",
                  }}
                >
                  <div style={{ padding: "0" }}>
                    <div style={{ position: "relative" }}>
                      {/* Background decoration */}
                      <div
                        style={{
                          pointerEvents: "none",
                          position: "absolute",
                          inset: "0",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            right: "0",
                            top: "0",
                            height: "100%",
                            width: "50%",
                            backgroundImage:
                              "linear-gradient(to left, rgba(6, 182, 212, 0.1), transparent)",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            right: "2.5rem",
                            top: "50%",
                            height: "8rem",
                            width: "8rem",
                            transform: "translateY(-50%)",
                            borderRadius: "9999px",
                            backgroundColor: "rgba(6, 182, 212, 0.2)",
                            filter: "blur(48px)",
                          }}
                        />
                      </div>

                      <div style={{ position: "relative", padding: "2rem" }}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1.5rem",
                          }}
                        >
                          <div style={{ flex: "1" }}>
                            <div
                              style={{
                                marginBottom: "0.75rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  height: "2rem",
                                  width: "2rem",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  borderRadius: "0.5rem",
                                  backgroundImage:
                                    "linear-gradient(to bottom right, #06b6d4, #0891b2)",
                                }}
                              >
                                <svg
                                  style={{
                                    height: "1rem",
                                    width: "1rem",
                                    color: "white",
                                  }}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                  />
                                </svg>
                              </div>
                              <span
                                style={{
                                  backgroundColor: "rgba(6, 182, 212, 0.2)",
                                  color: "#67e8f9",
                                  paddingLeft: "0.625rem",
                                  paddingRight: "0.625rem",
                                  paddingTop: "0.125rem",
                                  paddingBottom: "0.125rem",
                                  borderRadius: "0.25rem",
                                  fontSize: "0.875rem",
                                }}
                              >
                                Free Trial Active
                              </span>
                            </div>
                            <h3
                              style={{
                                marginBottom: "0.5rem",
                                fontSize: "1.5rem",
                                color: "white",
                              }}
                            >
                              Unlock Your Full Potential
                            </h3>
                            <p
                              style={{
                                marginBottom: "1rem",
                                maxWidth: "48rem",
                                color: "rgba(255, 255, 255, 0.6)",
                              }}
                            >
                              You have {creditsRemaining} of {totalCredits} free
                              credits remaining. Upgrade now to get unlimited
                              access to all premium features.
                            </p>
                            <div
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "1rem",
                                fontSize: "0.875rem",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "0.5rem",
                                  color: "#67e8f9",
                                }}
                              >
                                <svg
                                  style={{ height: "1rem", width: "1rem" }}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                <span>100 tokens / month</span>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "0.5rem",
                                  color: "#67e8f9",
                                }}
                              >
                                <svg
                                  style={{ height: "1rem", width: "1rem" }}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                <span>Keyword Intergration</span>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "0.5rem",
                                  color: "#67e8f9",
                                }}
                              >
                                <svg
                                  style={{ height: "1rem", width: "1rem" }}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                <span>ATS optimization</span>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "0.5rem",
                                  color: "#67e8f9",
                                }}
                              >
                                <svg
                                  style={{ height: "1rem", width: "1rem" }}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                <span>AI undetectable</span>
                              </div>
                            </div>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexShrink: "0",
                              flexDirection: "column",
                              gap: "0.75rem",
                            }}
                          >
                            <button
                              onClick={checkoutbruh_premium}
                              style={{
                                gap: "0.5rem",
                                backgroundImage:
                                  "linear-gradient(to right, #0891b2, #0e7490)",
                                paddingLeft: "1.5rem",
                                paddingRight: "1.5rem",
                                paddingTop: "0.75rem",
                                paddingBottom: "0.75rem",
                                borderRadius: "0.5rem",
                                color: "white",
                                fontWeight: "600",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "none",
                                cursor: "pointer",
                              }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                  "linear-gradient(to right, #0e7490, #155e75)")
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                  "linear-gradient(to right, #0891b2, #0e7490)")
                              }
                            >
                              Upgrade to Premium
                              <svg
                                style={{ height: "1rem", width: "1rem" }}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </button>
                            <p
                              style={{
                                textAlign: "center",
                                fontSize: "0.75rem",
                                color: "rgba(255, 255, 255, 0.6)",
                              }}
                            >
                              Starting at £7/month
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mini Plan Comparison */}
                <div
                  style={{
                    marginTop: "1.5rem",
                    display: "grid",
                    gap: "1rem",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  }}
                >
                  <div
                    style={{
                      border: "1px solid rgba(255, 255, 255, 0.05)",
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(12px)",
                      transition: "all 0.2s",
                      borderRadius: "0.5rem",
                      padding: "1.5rem",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor =
                        "rgba(6, 182, 212, 0.3)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor =
                        "rgba(255, 255, 255, 0.05)")
                    }
                  >
                    <div
                      style={{
                        marginBottom: "1rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <h4 style={{ marginBottom: "0.25rem", color: "white" }}>
                          Premium
                        </h4>
                        <p style={{ fontSize: "1.5rem" }}>
                          <span
                            style={{
                              backgroundImage:
                                "linear-gradient(to right, #22d3ee, #60a5fa)",
                              backgroundClip: "text",
                              WebkitBackgroundClip: "text",
                              color: "transparent",
                            }}
                          >
                            £7.29
                          </span>
                          <span
                            style={{
                              fontSize: "0.875rem",
                              color: "rgba(255, 255, 255, 0.6)",
                            }}
                          >
                            /month
                          </span>
                        </p>
                      </div>
                      <span
                        style={{
                          backgroundImage:
                            "linear-gradient(to right, #0891b2, #0e7490)",
                          paddingLeft: "0.625rem",
                          paddingRight: "0.625rem",
                          paddingTop: "0.125rem",
                          paddingBottom: "0.125rem",
                          borderRadius: "0.25rem",
                          fontSize: "0.75rem",
                          color: "white",
                        }}
                      >
                        Popular
                      </span>
                    </div>
                    <ul
                      style={{
                        marginBottom: "1rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                        fontSize: "0.875rem",
                        listStyle: "none",
                        padding: "0",
                      }}
                    >
                      <li
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.5rem",
                          color: "rgba(255, 255, 255, 0.6)",
                        }}
                      >
                        <svg
                          style={{
                            height: "1rem",
                            width: "1rem",
                            flexShrink: "0",
                            color: "#06b6d4",
                          }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>100 tokens per month</span>
                      </li>
                      <li
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.5rem",
                          color: "rgba(255, 255, 255, 0.6)",
                        }}
                      >
                        <svg
                          style={{
                            height: "1rem",
                            width: "1rem",
                            flexShrink: "0",
                            color: "#06b6d4",
                          }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>Access to CV tailor </span>
                      </li>
                      <li
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.5rem",
                          color: "rgba(255, 255, 255, 0.6)",
                        }}
                      >
                        <svg
                          style={{
                            height: "1rem",
                            width: "1rem",
                            flexShrink: "0",
                            color: "#06b6d4",
                          }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>Access to cover letter generator</span>
                      </li>
                      <li
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.5rem",
                          color: "rgba(255, 255, 255, 0.6)",
                        }}
                      >
                        <svg
                          style={{
                            height: "1rem",
                            width: "1rem",
                            flexShrink: "0",
                            color: "#06b6d4",
                          }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>Keyword + ATS optimization</span>
                      </li>
                    </ul>
                    <button
                      onClick={checkoutbruh_premium}
                      style={{
                        width: "100%",
                        backgroundImage:
                          "linear-gradient(to right, #0891b2, #0e7490)",
                        paddingLeft: "1rem",
                        paddingRight: "1rem",
                        paddingTop: "0.5rem",
                        paddingBottom: "0.5rem",
                        borderRadius: "0.5rem",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          "linear-gradient(to right, #0e7490, #155e75)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          "linear-gradient(to right, #0891b2, #0e7490)")
                      }
                    >
                      Choose Plan
                    </button>
                  </div>

                  <div
                    style={{
                      border: "1px solid rgba(255, 255, 255, 0.05)",
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(12px)",
                      transition: "all 0.2s",
                      borderRadius: "0.5rem",
                      padding: "1.5rem",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor =
                        "rgba(6, 182, 212, 0.3)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor =
                        "rgba(255, 255, 255, 0.05)")
                    }
                  >
                    <div
                      style={{
                        marginBottom: "1rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <h4 style={{ marginBottom: "0.25rem", color: "white" }}>
                          Career Max
                        </h4>
                        <p style={{ fontSize: "1.5rem" }}>
                          <span
                            style={{
                              backgroundImage:
                                "linear-gradient(to right, #22d3ee, #60a5fa)",
                              backgroundClip: "text",
                              WebkitBackgroundClip: "text",
                              color: "transparent",
                            }}
                          >
                            £18.99
                          </span>
                          <span
                            style={{
                              fontSize: "0.875rem",
                              color: "rgba(255, 255, 255, 0.6)",
                            }}
                          >
                            /month
                          </span>
                        </p>
                      </div>
                      <span
                        style={{
                          border: "1px solid rgba(6, 182, 212, 0.3)",
                          color: "#67e8f9",
                          paddingLeft: "0.625rem",
                          paddingRight: "0.625rem",
                          paddingTop: "0.125rem",
                          paddingBottom: "0.125rem",
                          borderRadius: "0.25rem",
                          fontSize: "0.75rem",
                        }}
                      >
                        Best Value
                      </span>
                    </div>
                    <ul
                      style={{
                        marginBottom: "1rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                        fontSize: "0.875rem",
                        listStyle: "none",
                        padding: "0",
                      }}
                    >
                      <li
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.5rem",
                          color: "rgba(255, 255, 255, 0.6)",
                        }}
                      >
                        <svg
                          style={{
                            height: "1rem",
                            width: "1rem",
                            flexShrink: "0",
                            color: "#06b6d4",
                          }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>Unlimited tokens</span>
                      </li>
                      <li
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.5rem",
                          color: "rgba(255, 255, 255, 0.6)",
                        }}
                      >
                        <svg
                          style={{
                            height: "1rem",
                            width: "1rem",
                            flexShrink: "0",
                            color: "#06b6d4",
                          }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>Everything in Premium</span>
                      </li>
                      <li
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.5rem",
                          color: "rgba(255, 255, 255, 0.6)",
                        }}
                      >
                        <svg
                          style={{
                            height: "1rem",
                            width: "1rem",
                            flexShrink: "0",
                            color: "#06b6d4",
                          }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>Access to Interview Simulator</span>
                      </li>
                      <li
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.5rem",
                          color: "rgba(255, 255, 255, 0.6)",
                        }}
                      >
                        <svg
                          style={{
                            height: "1rem",
                            width: "1rem",
                            flexShrink: "0",
                            color: "#06b6d4",
                          }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>Salary negotiation guide</span>
                      </li>
                    </ul>
                    <button
                      onClick={checkoutbruh_career_max}
                      style={{
                        width: "100%",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        paddingLeft: "1rem",
                        paddingRight: "1rem",
                        paddingTop: "0.5rem",
                        paddingBottom: "0.5rem",
                        borderRadius: "0.5rem",
                        color: "white",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          "rgba(255, 255, 255, 0.05)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "transparent")
                      }
                    >
                      Choose Plan
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
