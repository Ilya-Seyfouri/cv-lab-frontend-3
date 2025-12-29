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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white/60"></div>
      </div>
    );
  }
  return (
    <div className="min-h-screen py-5">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
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
            <div className="border-blue-500/20 bg-blue-500/5 backdrop-blur-sm rounded-lg border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Generated
                  </p>
                  <p className="text-xl text-foreground">
                    {pastGenerations.length}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20">
                  <svg
                    className="h-6 w-6 text-blue-400"
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
            <div className="border-orange-500/20 bg-orange-500/5 backdrop-blur-sm rounded-lg border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Score</p>
                  <p className="text-xl text-foreground">89</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/20">
                  <svg
                    className="h-6 w-6 text-orange-400"
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
          <div className="space-y-8">
            <div className="bg-card/50">
              <div className="inline-flex h-10 items-center justify-center   rounded-md bg-muted p-1 text-muted-foreground">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`inline-flex cursor-pointer items-center justify-center border px-5 hover:bg-white/30 active:scale-95 transition whitespace-nowrap rounded-sm  py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                    activeTab === "profile"
                      ? "bg-background text-foreground shadow-sm"
                      : ""
                  }`}
                >
                  Profile
                </button>
                <div className="px-1.5"></div>
                <button
                  onClick={() => setActiveTab("history")}
                  className={`inline-flex cursor-pointer items-center justify-center whitespace-nowrap border hover:bg-white/30 active:scale-95 transition  rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
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
                          className="bg-gradient-to-r  from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 cursor-pointer active:scale-95 transition px-4 py-2 rounded-lg text-white inline-flex items-center gap-2"
                          onClick={handleManageSubscription}
                        >
                          <svg
                            className="h-4 w-4"
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
                        className="border-white/10 cursor-pointer border hover:text-red-400 active:scale-95 transition px-4 py-2 rounded-lg hover:bg-white/5 transition-colors text-white inline-flex items-center gap-2"
                      >
                        <svg
                          className="h-4 w-4"
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
                      <p className="text-sm text-foreground">
                        Credits Resets on Dec 15
                      </p>
                      <p className="text-xs text-muted-foreground"></p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* History Tab */}
            {activeTab === "history" && (
              <div className="border-white/5 bg-card/50 backdrop-blur-sm rounded-lg border">
                <div className="p-6">
                  <h3 className="flex items-center gap-2 text-foreground text-lg font-semibold">
                    <svg
                      className="h-5 w-5 text-cyan-400"
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
                  <p className="text-sm text-muted-foreground">
                    View and download your past CV and cover letter generations
                  </p>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {pastGenerations.map((generation) => (
                      <div
                        key={generation.id}
                        className="flex flex-col gap-4 rounded-lg border border-white/5 bg-white/5 p-4 transition-all hover:border-cyan-500/20 hover:bg-white/10 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="flex-1">
                          <div className="mb-2 flex items-center gap-2">
                            <h4 className="text-foreground">
                              {generation.jobTitle}
                            </h4>
                            <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">
                              Score: {generation.score}
                            </span>
                          </div>
                          <p className="mb-1 text-sm text-muted-foreground">
                            {generation.company}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <svg
                                className="h-3 w-3"
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
                            <span className="flex items-center gap-1">
                              <svg
                                className="h-3 w-3"
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
                        <div className="flex gap-2">
                          <button className="border-white/10 cursor-pointer border px-3 py-2 rounded text-sm hover:bg-white/5 transition-colors inline-flex items-center gap-2">
                            <svg
                              className="h-4 w-4"
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
                          <button className="cursor-pointer bg-cyan-600 hover:bg-cyan-700 px-3 py-2 rounded text-sm text-white inline-flex items-center gap-2">
                            <svg
                              className="h-4 w-4"
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
                    <div className="py-12 text-center">
                      <svg
                        className="mx-auto mb-4 h-12 w-12 text-muted-foreground"
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
            {/* Upgrade Banner for Free Users */}
            {currentPlan === "free" && (
              <div className="mb-8">
                <div className="overflow-hidden border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 via-cyan-500/5 to-transparent backdrop-blur-sm rounded-lg border">
                  <div className="p-0">
                    <div className="relative">
                      {/* Background decoration */}
                      <div className="pointer-events-none absolute inset-0">
                        <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-cyan-500/10 to-transparent" />
                        <div className="absolute right-10 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-cyan-500/20 blur-3xl" />
                      </div>
                      <div className="relative p-8">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                          <div className="flex-1">
                            <div className="mb-3 flex items-center gap-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-700">
                                <svg
                                  className="h-4 w-4 text-white"
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
                              <span className="bg-cyan-500/20 text-cyan-300 px-2.5 py-0.5 rounded text-sm">
                                Free Trial Active
                              </span>
                            </div>
                            <h3 className="mb-2 text-2xl text-foreground">
                              Unlock Your Full Potential
                            </h3>
                            <p className="mb-4 max-w-2xl text-muted-foreground">
                              You have {creditsRemaining} of {totalCredits} free
                              credits remaining. Upgrade now to get unlimited
                              access to all premium features.
                            </p>
                            <div className="flex flex-wrap gap-4 text-sm">
                              <div className="flex items-center gap-2 text-cyan-300">
                                <svg
                                  className="h-4 w-4"
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
                                <span>50 tokens / month</span>
                              </div>
                              <div className="flex items-center gap-2 text-cyan-300">
                                <svg
                                  className="h-4 w-4"
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
                              <div className="flex items-center gap-2 text-cyan-300">
                                <svg
                                  className="h-4 w-4"
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
                              <div className="flex items-center gap-2 text-cyan-300">
                                <svg
                                  className="h-4 w-4"
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
                          <div className="flex shrink-0 flex-col gap-3">
                            <button
                              onClick={checkoutbruh_premium}
                              className="gap-2 cursor-pointer bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 px-6 py-3 rounded-lg text-white font-semibold inline-flex items-center justify-center"
                            >
                              Upgrade to Standard
                              <svg
                                className="h-4 w-4"
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
                            <p className="text-center text-xs text-muted-foreground">
                              Starting at £7/month
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Mini Plan Comparison */}
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="border-white/5 bg-card/50 backdrop-blur-sm transition-all hover:border-cyan-500/30 rounded-lg border p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h4 className="mb-1 text-foreground">Standard</h4>
                        <p className="text-2xl">
                          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                            £7.29
                          </span>
                          <span className="text-sm text-muted-foreground">
                            /month
                          </span>
                        </p>
                      </div>
                      <span className="bg-gradient-to-r from-cyan-600 to-cyan-700 px-2.5 py-0.5 rounded text-xs text-white">
                        Popular
                      </span>
                    </div>
                    <ul className="mb-4 space-y-2 text-sm">
                      <li className="flex items-start gap-2 text-muted-foreground">
                        <svg
                          className="h-4 w-4 shrink-0 text-cyan-500"
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
                        <span>50 tokens per month</span>
                      </li>
                      <li className="flex items-start gap-2 text-muted-foreground">
                        <svg
                          className="h-4 w-4 shrink-0 text-cyan-500"
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
                      <li className="flex items-start gap-2 text-muted-foreground">
                        <svg
                          className="h-4 w-4 shrink-0 text-cyan-500"
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
                      <li className="flex items-start gap-2 text-muted-foreground">
                        <svg
                          className="h-4 w-4 shrink-0 text-cyan-500"
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
                      className="w-full  cursor-pointer bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 px-4 py-2 rounded-lg text-white"
                    >
                      Choose Plan
                    </button>
                  </div>
                  <div className="border-white/5 bg-card/50 backdrop-blur-sm transition-all hover:border-cyan-500/30 rounded-lg border p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h4 className="mb-1 text-foreground">Premium</h4>
                        <p className="text-2xl">
                          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                            £18.99
                          </span>
                          <span className="text-sm text-muted-foreground">
                            /month
                          </span>
                        </p>
                      </div>
                      <span className="border-cyan-500/30 text-cyan-300 border px-2.5 py-0.5 rounded text-xs">
                        Best Value
                      </span>
                    </div>
                    <ul className="mb-4 space-y-2 text-sm">
                      <li className="flex items-start gap-2 text-muted-foreground">
                        <svg
                          className="h-4 w-4 shrink-0 text-cyan-500"
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
                      <li className="flex items-start gap-2 text-muted-foreground">
                        <svg
                          className="h-4 w-4 shrink-0 text-cyan-500"
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
                        <span>Everything in Standard</span>
                      </li>
                      <li className="flex items-start gap-2 text-muted-foreground">
                        <svg
                          className="h-4 w-4 shrink-0 text-cyan-500"
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
                        <span>AI Undetectable</span>
                      </li>
                      <li className="flex items-start gap-2 text-muted-foreground">
                        <svg
                          className="h-4 w-4 shrink-0 text-cyan-500"
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
                      className="w-full cursor-pointer border-white/10 hover:bg-white/5 border px-4 py-2 rounded-lg text-white"
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
