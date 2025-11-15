"use client";
import { createClient } from "../lib/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import CVLOGO from "../../images/logo.png";
import Link from "next/link";
import EyeClosed from "../../images/hide-pass.png";
import EyeOpen from "../../images/show-pass1.png";

export default function Auth() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error1, setError1] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePass = (e) => setPassword(e.target.value);

  async function signupFunc() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      setMessage("");
      setError1(error.message);
    } else {
      setError1("");
      setMessage("Check your email to verify your account!");
    }
  }

  async function loginFunc() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setMessage("");
      setError1(error.message);
    } else {
      router.push("/dashboard");
    }
  }

  async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      setError1(error.message);
    }
  }

  return (
    <section className="min-h-screen bg-[#020617] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background blobs like your inspiration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo + heading (outside the card) */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center mb-6 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image src={CVLOGO} alt="logo" className="w-auto h-20" priority />
          </div>
          <h1 className="mb-2 text-2xl lg:text-3xl font-bold text-white">
            Create your account
          </h1>
          <p className="text-sm text-white/50">
            Already have an account?{" "}
            <span className="text-cyan-400">Log in with your details</span>
          </p>
        </div>

        {/* Main card (this is the “card outside your login”) */}
        <div className="bg-white/5 border border-white/15 rounded-xl p-8 shadow-xl backdrop-blur">
          {/* Google sign in */}
          <button
            onClick={signInWithGoogle}
            className="w-full mb-6 h-12 inline-flex items-center justify-center gap-3 rounded-lg border border-white/20 bg-transparent hover:border-cyan-400/60 hover:bg-white/5 transition-all duration-200 text-sm font-medium text-white"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="border-t border-white/15" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-3 text-xs text-white/40">
            </span>
          </div>

          {/* Email + password fields (your login) */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-xs font-medium text-white/80">
                Email
              </label>
              <div className="border border-white/25 rounded-lg bg-black/20 focus-within:border-cyan-400/70 transition-colors">
                <input
                  value={email}
                  onChange={handleEmail}
                  placeholder="you@example.com"
                  type="email"
                  className="w-full py-2.5 px-4 bg-transparent outline-none text-sm text-white placeholder:text-white/40"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-white/80">
                Password
              </label>
              <div className="relative border border-white/25 rounded-lg bg-black/20 focus-within:border-cyan-400/70 transition-colors">
                <input
                  value={password}
                  onChange={handlePass}
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  className="w-full py-2.5 px-4 pr-12 bg-transparent outline-none text-sm text-white placeholder:text-white/40"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-75 transition"
                >
                  <Image
                    src={showPassword ? EyeClosed : EyeOpen}
                    alt="toggle password visibility"
                    className="w-auto h-4"
                  />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <Link
                href="/forgot-password"
                className="text-xs text-white/50 hover:text-cyan-400 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Buttons row */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                className="flex-1 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br active:scale-95 transition-transform shadow-lg shadow-cyan-500/40 py-2.5"
                onClick={signupFunc}
                type="button"
              >
                Sign Up
              </button>
              <button
                className="flex-1 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br active:scale-95 transition-transform shadow-lg shadow-green-500/40 py-2.5"
                onClick={loginFunc}
                type="button"
              >
                Log In
              </button>
            </div>

            {/* Terms */}
            <p className="text-[10px] text-white/40 text-center mt-4">
              By signing up, you agree to our{" "}
              <Link
                href="/terms"
                className="text-white/70 hover:text-cyan-400 transition-colors underline-offset-2 hover:underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-white/70 hover:text-cyan-400 transition-colors underline-offset-2 hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </p>

            {/* Success / error messages (inside the card now) */}
            {message && (
              <div className="mt-4 rounded-lg bg-emerald-500/15 text-emerald-300 text-xs text-center py-3 px-4">
                {message}
              </div>
            )}
            {error1 && (
              <div className="mt-4 rounded-lg bg-red-500/15 text-red-300 text-xs text-center py-3 px-4">
                {error1}
              </div>
            )}
          </div>
        </div>

        {/* Optional bottom text (outside card, like your inspo toggle area) */}
        <div className="text-center mt-6 text-xs text-white/50">
          Don&apos;t have an account yet?{" "}
          <span className="text-cyan-400">
            Use the Sign Up button above to create one.
          </span>
        </div>
      </div>
    </section>
  );
}
