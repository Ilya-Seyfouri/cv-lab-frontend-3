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
  const [isAnnual, setIsAnnual] = useState(false);

  // NEW: State for generations
  const [generations, setGenerations] = useState([]);
  const [generationsLoading, setGenerationsLoading] = useState(true);
  const [generationStats, setGenerationStats] = useState({
    total_count: 0,
    avg_ats_score: 0,
    avg_match_score: 0,
  });
  const [selectedGeneration, setSelectedGeneration] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [downloadingId, setDownloadingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Price IDs - ALL YOUR PLANS
  const PRICE_IDS = {
    monthlyStandard: "price_1SpUeoGTsfq9NWHAFOXcEXHh",
    monthlyPremium: "price_1SpUfaGTsfq9NWHAtr59tPFE",
    sixMonthStandard: "price_1SpUggGTsfq9NWHA0exdHuEp",
    sixMonthPremium: "price_1SpUgBGTsfq9NWHAhYdxJKRu",
    tokenPack15: "price_1SpUhsGTsfq9NWHAodt5avHo",
  };

  // Generic checkout function
  const handleCheckout = async (priceID) => {
    if (!userdetails) {
      console.error("No user found");
      return;
    }

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceID: priceID,
          email: userdetails.email,
          userId: userdetails.id,
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

    window.open(data.url, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  // Checkout handlers for each plan type
  const checkoutStandard = () => {
    const priceId = isAnnual
      ? PRICE_IDS.sixMonthStandard
      : PRICE_IDS.monthlyStandard;
    handleCheckout(priceId);
  };

  const checkoutPremium = () => {
    const priceId = isAnnual
      ? PRICE_IDS.sixMonthPremium
      : PRICE_IDS.monthlyPremium;
    handleCheckout(priceId);
  };

  const buyTokenPack = () => {
    handleCheckout(PRICE_IDS.tokenPack15);
  };

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

  // NEW: Fetch generations when user is loaded
  useEffect(() => {
    if (userdetails?.id) {
      fetchGenerations();
    }
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

  

  // NEW: Fetch generations from API
  const fetchGenerations = async () => {
    setGenerationsLoading(true);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        console.error("No session found");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/generations`,
        {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setGenerations(data.generations || []);
        setGenerationStats(
          data.stats || { total_count: 0, avg_ats_score: 0, avg_match_score: 0 }
        );
      } else {
        console.error("Failed to fetch generations:", data);
      }
    } catch (error) {
      console.error("Error fetching generations:", error);
    } finally {
      setGenerationsLoading(false);
    }
  };

  // NEW: View a specific generation (get signed URLs for PDFs)
  const viewGeneration = async (generationId) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/generations/${generationId}`,
        {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setSelectedGeneration(data.generation);
        setViewModalOpen(true);
      } else {
        console.error("Failed to fetch generation:", data);
      }
    } catch (error) {
      console.error("Error fetching generation:", error);
    }
  };

  // NEW: Download PDFs for a generation
  const downloadGeneration = async (generationId) => {
    setDownloadingId(generationId);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/generations/${generationId}`,
        {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success && data.generation) {
        const gen = data.generation;

        // Download CV PDF
        if (gen.cv_pdf_url) {
          const link = document.createElement("a");
          link.href = gen.cv_pdf_url;
          link.download = `cv-${gen.role_title.replace(/\s+/g, "-")}.pdf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }

        // Download Cover Letter PDF (slight delay to prevent browser blocking)
        if (gen.cover_letter_pdf_url) {
          setTimeout(() => {
            const link = document.createElement("a");
            link.href = gen.cover_letter_pdf_url;
            link.download = `cover-letter-${gen.role_title.replace(
              /\s+/g,
              "-"
            )}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }, 500);
        }
      }
    } catch (error) {
      console.error("Error downloading generation:", error);
    } finally {
      setDownloadingId(null);
    }
  };

  // NEW: Delete a generation
  const deleteGeneration = async (generationId) => {
    setDeletingId(generationId);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/generations/${generationId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        // Remove from local state
        setGenerations((prev) => prev.filter((gen) => gen.id !== generationId));
        // Update stats
        setGenerationStats((prev) => ({
          ...prev,
          total_count: Math.max(0, prev.total_count - 1),
        }));
      } else {
        console.error("Failed to delete generation:", data);
      }
    } catch (error) {
      console.error("Error deleting generation:", error);
    } finally {
      setDeletingId(null);
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

  // Helper function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatResetDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };



  // Helper function to get time ago

  return (
    <div className="min-h-screen py-5">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-7xl">
          <div className="flex justify-center pb-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span
                className={`text-sm font-medium transition-colors ${
                  !isAnnual ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                Monthly
              </span>

              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="relative inline-flex h-8 w-14 items-center rounded-full bg-cyan-500/20 border border-cyan-500/30 transition-colors hover:bg-cyan-500/30 "
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-gradient-to-br from-cyan-500 to-cyan-700 shadow-lg transition-transform ${
                    isAnnual ? "translate-x-7" : "translate-x-1"
                  }`}
                />
              </button>

              <span
                className={`text-sm font-medium transition-colors ${
                  isAnnual ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                6 Months
                <span className="ml-1.5 text-xs bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded">
                  Save 20%
                </span>
              </span>
            </div>
          </div>

          {/* Upgrade Banner for Free Users - Keep existing code */}
          {currentPlan === "free" && (
            <div className="mb-8">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* First Pricing Card */}
                <div className="flex-1 overflow-hidden border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 via-cyan-500/5 to-transparent backdrop-blur-sm rounded-lg border">
                  <div className="p-0">
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-0">
                        <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-cyan-500/10 to-transparent" />
                        <div className="absolute right-10 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-cyan-500/20 blur-3xl" />
                      </div>
                      <div className="relative p-6">
                        <div className="flex flex-col gap-4">
                          <div>
                            <div className="mb-3 flex items-center gap-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-700">
                                <svg
                                  className="h-4 w-4 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                  />
                                </svg>
                              </div>
                              <span className="bg-cyan-500/20 text-cyan-300 px-2.5 py-0.5 rounded text-sm">
                                Standard
                              </span>
                            </div>
                            {isAnnual ? (
                              <h3 className="mb-3 text-2xl text-foreground">
                                £40
                              </h3>
                            ) : (
                              <h3 className="mb-3 text-2xl text-foreground">
                                £8.27/mo
                              </h3>
                            )}

                            <div className="flex flex-col gap-2 text-sm mb-4">
                              <div className="flex items-center gap-2 text-cyan-300">
                                <svg
                                  className="h-4 w-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                <span>30 tokens / month</span>
                              </div>
                            </div>

                            <button
                              onClick={checkoutStandard}
                              className="w-full gap-2 cursor-pointer bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 px-6 py-3 rounded-lg text-white font-semibold inline-flex items-center justify-center"
                            >
                              Upgrade to Standard
                              <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Second Pricing Card */}
                <div className="flex-1 overflow-hidden border-orange-500/30 bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-transparent backdrop-blur-sm rounded-lg border">
                  <div className="p-0">
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-0">
                        <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-orange-500/10 to-transparent" />
                        <div className="absolute right-10 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-orange-500/20 blur-3xl" />
                      </div>
                      <div className="relative p-6">
                        <div className="flex flex-col gap-4">
                          <div>
                            <div className="mb-3 flex items-center gap-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-700">
                                <svg
                                  className="h-4 w-4 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                  />
                                </svg>
                              </div>
                              <span className="bg-orange-500/20 text-orange-300 px-2.5 py-0.5 rounded text-sm">
                                Premium
                              </span>
                            </div>
                            {isAnnual ? (
                              <h3 className="mb-3 text-2xl text-foreground">
                                £80
                              </h3>
                            ) : (
                              <h3 className="mb-3 text-2xl text-foreground">
                                £15.39/mo
                              </h3>
                            )}

                            <div className="flex flex-col gap-2 text-sm mb-4 pb-2">
                              <div className="flex items-center gap-2 text-orange-300">
                                <svg
                                  className="h-4 w-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
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
                            </div>

                            <button
                              onClick={checkoutPremium}
                              className="w-full gap-2 cursor-pointer bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 px-6 py-3 rounded-lg text-white font-semibold inline-flex items-center justify-center"
                            >
                              Upgrade to Premium
                              <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Header */}
          <div className="mb-8 pt-20">
            <h1 className="mb-2 bg-gradient-to-b from-white to-white/60 bg-clip-text text-4xl text-transparent">
              Account Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your profile, credits, and view your application history.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="mb-8 grid gap-4 md:grid-cols-4">
            <div className="border-cyan-500/20 bg-cyan-500/5 backdrop-blur-sm rounded-lg border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Current Plan</p>
                  <p className="text-xl text-foreground">{plan.name}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/20">
                  <svg
                    className="h-6 w-6 text-cyan-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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
            <div className="border-green-500/20 bg-green-500/5 backdrop-blur-sm rounded-lg border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Credits Left</p>
                  <p className="text-xl text-foreground">{creditsRemaining}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20">
                  <svg
                    className="h-6 w-6 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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
            <div className="border-blue-500/20 bg-blue-500/5 backdrop-blur-sm rounded-lg border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Generated
                  </p>
                  <p className="text-xl text-foreground">
                    {generationStats.total_count}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20">
                  <svg
                    className="h-6 w-6 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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
            <div className="border-orange-500/20 bg-orange-500/5 backdrop-blur-sm rounded-lg border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Score</p>
                  <p className="text-xl text-foreground">
                    {generationStats.avg_ats_score || "—"}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/20">
                  <svg
                    className="h-6 w-6 text-orange-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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
          <div className="space-y-8">
            <div className="bg-card/50">
              <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`inline-flex cursor-pointer items-center justify-center border px-5 hover:bg-white/30 active:scale-95 transition whitespace-nowrap rounded-sm py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                    activeTab === "profile"
                      ? "bg-background text-foreground shadow-sm"
                      : ""
                  }`}
                >
                  Profile
                </button>
                <div className="px-1.5"></div>
                <button
                  onClick={() => {
                    setActiveTab("history");
                    fetchGenerations();
                  }}
                  className={`inline-flex cursor-pointer items-center justify-center whitespace-nowrap border hover:bg-white/30 active:scale-95 transition rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                    activeTab === "history"
                      ? "bg-background text-foreground shadow-sm"
                      : ""
                  }`}
                >
                  Generation History
                </button>
              </div>
            </div>

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="grid gap-8 lg:grid-cols-3">
                {/* Profile Info */}
                <div className="border-white/5 bg-card/50 backdrop-blur-sm rounded-lg border lg:col-span-2">
                  <div className="p-6">
                    <h3 className="flex items-center gap-2 text-foreground text-lg font-semibold">
                      <svg
                        className="h-5 w-5 text-cyan-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
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
                    <p className="text-sm text-muted-foreground">
                      Update your personal information
                    </p>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="flex items-center gap-6">
                      <div className="h-20 w-20 ring-2 ring-cyan-500/20 rounded-full overflow-hidden">
                        <div className="bg-cyan-500/10 text-lg text-cyan-400 h-full w-full flex items-center justify-center font-semibold">
                          {userData.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-foreground">{userData.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Member since {userData.memberSince}
                        </p>
                      </div>
                    </div>
                    <div className="bg-white/5 h-px" />
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-muted-foreground">
                          Full Name
                        </label>
                        <p className="text-foreground">{userData.name}</p>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">
                          Email Address
                        </label>
                        <p className="text-foreground">{userData.email}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      {(currentPlan === "Premium" ||
                        currentPlan === "Career Max") && (
                        <button
                          className="bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 cursor-pointer active:scale-95 transition px-4 py-2 rounded-lg text-white inline-flex items-center gap-2"
                          onClick={handleManageSubscription}
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
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
                        className="border-white/10 cursor-pointer border hover:text-red-400 active:scale-95 transition px-4 py-2 rounded-lg hover:bg-white/5 transition-colors text-white inline-flex items-center gap-2"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
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
                <div className="border-white/5 bg-card/50 backdrop-blur-sm rounded-lg border">
                  <div className="p-6">
                    <h3 className="text-foreground font-semibold">
                      Usage This Month
                    </h3>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <div className="mb-2 flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Credits Remaining
                        </span>
                        <span className="text-foreground">
                          {creditsRemaining}
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-600 to-cyan-700"
                          style={{
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
                    <div className="bg-white/5 h-px" />
                    <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-3">
                      {user1?.credits_reset_date ? (
                        <>
                          <p className="text-sm text-muted-foreground">
                            Credits reset on:
                          </p>
                          <p className="text-foreground font-medium">
                            {formatResetDate(user1.credits_reset_date)}
                          </p>
                        </>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          {currentPlan === "free"
                            ? "Subscribe to get monthly credits"
                            : "Credits reset date will appear after your first billing cycle"}
                        </p>
                      )}
                    </div>
                    <div className="py-2"></div>
                    <div className="border-red-500/20 bg-red-500/5 backdrop-blur-sm rounded-lg border p-6">
                      <div>Urgent for more credits?</div>
                      <div className="pt-5">
                        <button
                          onClick={buyTokenPack}
                          className="bg-red-600 px-4 py-2 rounded-xl hover:bg-red-700 transition cursor-pointer active:scale-95"
                        >
                          Buy 15 credits for £5
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* History Tab - UPDATED WITH REAL DATA */}
            {activeTab === "history" && (
              <div className="border-white/5 bg-card/50 backdrop-blur-sm rounded-lg border">
                <div className="p-6">
                  <h3 className="flex items-center gap-2 text-foreground text-lg font-semibold">
                    <svg
                      className="h-5 w-5 text-cyan-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
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
                  <p className="text-sm text-muted-foreground">
                    View and download your past CV and cover letters
                  </p>
                </div>
                <div className="p-6">
                  {generationsLoading ? (
                    <div className="py-12 flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
                    </div>
                  ) : generations.length > 0 ? (
                    <div className="space-y-4">
                      {generations.map((generation) => (
                        <div
                          key={generation.id}
                          className="flex flex-col gap-4 rounded-lg border border-white/5 bg-white/5 p-4 transition-all hover:border-cyan-500/20 hover:bg-white/10 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div className="flex-1">
                            <div className="mb-2 flex items-center gap-2 flex-wrap">
                              <h4 className="text-foreground font-medium">
                                {generation.role_title}
                              </h4>
                              {generation.ats_score && (
                                <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">
                                  ATS: {generation.ats_score}%
                                </span>
                              )}
                              {generation.cv_template && (
                                <span className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded text-xs capitalize">
                                  {generation.cv_template}
                                </span>
                              )}
                            </div>
                            {generation.company_name && (
                              <p className="mb-1 text-sm text-muted-foreground">
                                {generation.company_name}
                              </p>
                            )}
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <svg
                                  className="h-3 w-3"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                                {formatDate(generation.created_at)}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => viewGeneration(generation.id)}
                              className="border-white/10 cursor-pointer border px-3 py-2 rounded text-sm hover:bg-white/5 transition-colors inline-flex items-center gap-2"
                            >
                              <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                              View
                            </button>

                            <button
                              onClick={() => deleteGeneration(generation.id)}
                              disabled={deletingId === generation.id}
                              className="cursor-pointer border border-red-500/30 hover:bg-red-500/10 px-3 py-2 rounded text-sm text-red-400 inline-flex items-center gap-2 disabled:opacity-50"
                            >
                              {deletingId === generation.id ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-400"></div>
                              ) : (
                                <svg
                                  className="h-4 w-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              )}
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center">
                      <svg
                        className="mx-auto mb-4 h-12 w-12 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <p className="mb-2 text-foreground">No generations yet</p>
                      <p className="text-sm text-muted-foreground">
                        Start optimizing your CV to see your history here
                      </p>
                      <button
                        onClick={onNavigateToOptimizer}
                        className="mt-4 bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 px-4 py-2 rounded-lg text-white"
                      >
                        Optimize Your First CV
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* View Generation Modal */}
      {viewModalOpen && selectedGeneration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-card border border-white/10 rounded-xl max-w-lg w-full mx-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">
                {selectedGeneration.role_title}
              </h3>
              <button
                onClick={() => setViewModalOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <svg
                  className="h-6 w-6 cursor-pointer"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {selectedGeneration.company_name && (
                <div>
                  <p className="text-sm text-muted-foreground">Company</p>
                  <p className="text-foreground">
                    {selectedGeneration.company_name}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                {selectedGeneration.ats_score && (
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                    <p className="text-sm text-muted-foreground">ATS Score</p>
                    <p className="text-2xl font-bold text-green-400">
                      {selectedGeneration.ats_score}%
                    </p>
                  </div>
                )}
                {selectedGeneration.match_score && (
                  <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">
                    <p className="text-sm text-muted-foreground">Match Score</p>
                    <p className="text-2xl font-bold text-cyan-400">
                      {Math.round(selectedGeneration.match_score) + 3}%
                    </p>
                  </div>
                )}
              </div>

              <div>
                <div className="flex gap-2">
                  {selectedGeneration.cv_pdf_url && (
                    <a
                      href={selectedGeneration.cv_pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-green-500/60 border border-green-500/80 rounded-lg active:scale-95 hover:bg-green-500/40 p-3"
                    >
                      Download CV
                    </a>
                  )}
                  {selectedGeneration.cover_letter_pdf_url && (
                    <a
                      href={selectedGeneration.cover_letter_pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-cyan-500/60 border border-cyan-500/80 hover:bg-cyan-500/40 active:scale-95 rounded-lg p-3"
                    >
                      Download Cover Letter
                    </a>
                  )}
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                Created: {formatDate(selectedGeneration.created_at)}{" "}
                <span className="text-yellow-300 px-2">
                  Expires: {formatDate(selectedGeneration.expires_at)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
