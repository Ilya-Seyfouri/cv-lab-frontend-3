"use client";
import { createClient } from "../lib/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "@/images/logo.svg";
import CVLOGO from "@/images/logo_text.png";
import photo from "@/images/avatar-owen-garcia.jpg";
import Link from "next/link";
import EyeClosed from "@/images/hide-pass.png"; // adjust path to your icon
import EyeOpen from "@/images/show-pass1.png"; // adjust path to your icon



export default function Auth() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error1, setError1] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePass = (e) => {
    setPassword(e.target.value);
  };

  async function signupFunc() {
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      //options: {
       // emailRedirectTo: `${windows.location.origin}/auth/callback`,
      //},
    });
    if (error) {
      setError1(error.message);
    } else {
      setError1("");
      setMessage("Check your email to verify your account!");
    }
  }

  async function loginFunc() {
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
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
    <>
      <section>
        <div className="container">
          <div className="flex justify-center lg:gap-6 items-center">
            <div className="pt-4 mr-5">
              <Image src={CVLOGO} className="w-auto" alt="logo" height={60} />
            </div>
          </div>

          <div className="py-45 lg:py-38">
            <div className="">
              <h3 className="text-center text-2xl lg:text-3xl font-bold">
                Create an Account
              </h3>
            </div>
            <div className="py-2">
              <p className="text-center lg:text-lg text-white/30">
                Already have an account? <span className="">Login</span>
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <div className="py-3 px-4">
                <div className="border border-white/30 rounded-lg">
                  <input
                    value={email}
                    onChange={handleEmail}
                    placeholder="Email"
                    type="email"
                    className="w-full py-2 px-4"
                  />
                </div>
                <div className="py-3">
                  <div className="border border-white/30 rounded-lg relative">
                    <input
                      value={password}
                      onChange={handlePass}
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                      className="w-full py-2 px-4 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-70 transition"
                    >
                      {showPassword ? (
                        <Image
                          src={EyeClosed}
                          alt="logo"
                          className="w-auto h-4"
                        />
                      ) : (
                        <Image
                          src={EyeOpen}
                          alt="logo"
                          className="w-auto h-2"
                        />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center px-4 pb-2">
                <div className="flex-1 border-t border-white/30"></div>
                <span className="px-4 text-white/30 text-sm">or</span>
                <div className="flex-1 border-t border-white/30"></div>
              </div>

              {/* NEW: Google Sign-in Button */}
              <div className="px-4 py-3">
                <button
                  onClick={signInWithGoogle}
                  className="w-full flex items-center justify-center gap-3 border border-white/30 rounded-lg py-3 px-4 hover:bg-white/5 transition"
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
                  <span className="font-medium">Google</span>
                </button>
              </div>

              <div className="py-4">
                <div className="flex justify-center gap-10">
                  <div>
                    <button
                      className="border-none lg:px-15 lg:py-2 px-15 py-2 rounded-lg text-xl
cursor-pointer text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600
hover:bg-gradient-to-br focus:outline-none active:scale-95 transition-transform 
shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-semibold 
text-center me-2 mb-2"
                      onClick={signupFunc}
                    >
                      Sign Up
                    </button>
                  </div>
                  <div>
                    <button
                      className="border-none lg:px-15 lg:py-2 px-15 py-2 rounded-lg text-xl font-semibold
cursor-pointer text-white active:scale-95 
transition-transform  bg-gradient-to-r
 from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br 
 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80  
 text-center me-2 mb-2"
                      onClick={loginFunc}
                    >
                      Log In
                    </button>
                  </div>
                </div>
              </div>

              <div className="py-5">
                <p className="text-xs text-white/30 text-center px-2">
                  By signing up, you agree to our{" "}
                  <Link
                    href="/terms"
                    className="hover:text-white/50 transition-colors"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className=" hover:text-white/50 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>

              {/* Success message */}
              {message && (
                <div className="py-5">
                  <div className="flex justify-center">
                    <div className="border-0 py-4 lg:py-4 px-25 lg:px-25 rounded-xl text-center bg-green-500/20 text-green-400">
                      {message}
                    </div>
                  </div>
                </div>
              )}

              {/* Error message */}
              {error1 && (
                <div className="py-5">
                  <div className="flex justify-center">
                    <div className="border-0 py-4 lg:py-5 px-25 lg:px-25 rounded-xl text-center bg-red-500/20 text-red-400">
                      {error1}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
