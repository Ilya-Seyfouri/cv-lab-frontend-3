"use client";
import { createClient } from "../lib/supabase/client";
import { useState } from "react";

export default function ForgotPassword() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleReset() {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-callback`,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Check your email for the reset link!");
    }
  }

  return (
    <div className="container py-20">
      <h3 className="text-center text-2xl font-bold">Reset Password</h3>
      <div className="max-w-md mx-auto mt-8">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          className="w-full py-2 px-4 border border-white/30 rounded-lg"
        />
        <button
          onClick={handleReset}
          className="w-full mt-4 py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-cyan-600 font-semibold"
        >
          Send Reset Link
        </button>
        {message && <p className="text-green-400 mt-4">{message}</p>}
        {error && <p className="text-red-400 mt-4">{error}</p>}
      </div>
    </div>
  );
}
