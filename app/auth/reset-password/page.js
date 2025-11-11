"use client";
import { createClient } from "../../lib/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const supabase = createClient();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleUpdate() {
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
    } else {
      setError("Password updated!");
      router.push("/auth");
    }
  }

  return (
    <div className="container py-20">
      <h3 className="text-center text-2xl font-bold pt-20">New Password</h3>
      <div className="max-w-md mx-auto mt-8">
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
          type="password"
          className="w-full py-2 px-4 border border-white/30 rounded-lg"
        />
        <button
          onClick={handleUpdate}
          className="w-full mt-4 py-3 rounded-lg bg-gradient-to-r from-green-400 to-green-600 font-semibold"
        >
          Update Password
        </button>
        {error && <p className="text-red-400 mt-4">{error}</p>}
      </div>
    </div>
  );
}
