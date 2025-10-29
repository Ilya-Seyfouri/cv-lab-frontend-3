"use client";
import { createClient } from "../lib/supabase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Details() {
  const [user1, setUser1] = useState(null);
  const [userdetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const [error, setError1] = useState("")
  const router = useRouter()
  const [isResetMode, setIsResetMode] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

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
          console.log("Profile updated:", payload.new);
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
      console.log(user);
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
    if (error) {
      setError1(error.message);
    } else {
      // Clear any error messages
      ;
      // Redirect to auth page (or home page)
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

  const handleManageSubscription = async () => {
    if (!user1?.stripe_customer_id) {
      alert("No subscription found. Please subscribe first.");
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
        alert("Error opening subscription portal");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to open subscription portal");
    }
  };

  // Simple plan type - just read from database
  const getPlanType = () => {
    return user1?.subscription_status || "Free";
  };

  // Get badge color based on plan
  const getPlanBadgeColor = () => {
    return getPlanType() === "Pro"
      ? "bg-gradient-to-r from-blue-500 to-purple-600"
      : "bg-gray-600";
  };

  return (
    <>
      <section>
        <div className="container">
          <div className="pt-40">
            <div>
              <h2 className="text-center text-white/40 text-2xl mb-8">
                Your Profile
              </h2>
              <div>
                {loading ? (
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white/60"></div>
                  </div>
                ) : user1 ? (
                  <div className=" mx-auto w-[720px]">
                    {/* Profile Card */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                      <div className="flex justify-end">
                        <button className="border-1 px-2 py-1 rounded-md border-white/40 text-white/40 hover:text-red-400"
                        onClick={signOutFunc}>Sign Out</button>
                      </div>
                      {/* Email Section */}
                      <div className="mb-6">
                        <p className="text-white/40 text-sm mb-1">Email</p>
                        <p className="text-white text-lg">
                          {userdetails.email}
                        </p>
                      </div>

                      {/* Plan Section */}
                      <div className="mb-6">
                        <p className="text-white/40 text-sm mb-2">Plan</p>
                        <span
                          className={`inline-block px-4 py-2 rounded-xl text-white font-semibold ${getPlanBadgeColor()}`}
                        >
                          {getPlanType()}
                        </span>
                      </div>

                      {/* Credits Section */}
                      <div className="mb-6 pb-6 border-b border-white/10">
                        <p className="text-white/40 text-sm mb-1">
                          Credits Remaining
                        </p>
                        <p className="text-2xl font-bold text-white">
                          {user1.credits_remaining || 0}
                        </p>
                      </div>

                      {/* Manage Subscription Button */}
                      {getPlanType() === "Pro" && (
                        <button
                          onClick={handleManageSubscription}
                          className="w-full px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/20 mb-3"
                        >
                          Manage Subscription
                        </button>
                      )}

                      {/* Upgrade Button for Free Users */}
                      {getPlanType() === "Free" && (
                        <button
                          onClick={() => (window.location.href = "/pricing")}
                          className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg transition-colors font-semibold"
                        >
                          Upgrade to Pro
                        </button>
                      )}
                    </div>

                    {/* Additional Info */}
                    <div className="mt-8 pt-10 pb-10 text-center ">
                      <p className="text-white/50 text-lg ">
                        {getPlanType() === "Pro" ? (
                          <>
                            Thank you for being a{" "}
                            <span
                              className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 
                         bg-clip-text text-transparent font-semibold"
                            >
                              Pro
                            </span>{" "}
                            member! 🎉
                          </>
                        ) : (
                          <>
                            Upgrade to{" "}
                            <span
                              className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 
                         bg-clip-text text-transparent font-bold text-xl"
                            >
                              Pro
                            </span>{" "}
                            for unlimited credits
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-white/60">
                    No profile data found
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
