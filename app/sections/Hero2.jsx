"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import photo from "../../public/avatar-lula-meyers.jpg";
import button from "../../public/BUTTON_1.png";
import xxx from "../../public/x1.png";
import { Sparkles } from "lucide-react";
export default function Hero2() {
  const router = useRouter();
  return (
    <section className="relative overflow-hidden py-10 scroll-mt-15 " id="home">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mx-auto max-w-6xl text-center">
          {/* Top pill */}
          {/* Heading */}
          <h1
            className="mb-6 bg-gradient-to-b from-white via-white to-white/60 
             bg-clip-text text-transparent 
             text-4xl md:text-6xl font-semibold 
             leading-tight"
          >
            Your Resume, Perfectly Matched to Every{" "}
            <span className="whitespace-nowrap">Job.</span>
          </h1>
          <div className="pt-2 justify-center flex">
            <div className="inline-flex items-center gap-2 border border-white/20 rounded-full">
              <Image
                src={photo}
                alt="logo"
                className="h-9 w-auto border-3 border-black rounded-full"
              ></Image>
              <p className="text-base font-semibold text-white/80 pr-2.5">
                4500+ CV's generated
              </p>
            </div>
          </div>
          {/* Subheading */}
          <p className="mx-auto pt-10 mb-8 max-w-5xl text-md md:text-2xl text-white/60">
            Upload your CV and the job description. In seconds, our AI reshapes
            your resume and cover letter so they pass ATS checks and land in
            front of real hiring managers.
          </p>
          {/* CTA buttons – your original buttons, unchanged */}
          <div className="flex flex-row items-center justify-center gap-4 sm:flex-row sm:gap-6 py-2">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push("/auth")}
                className="flex items-center gap-2 cursor-pointer text-white bg-gradient-to-r 
from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br 
focus:outline-none active:scale-95 transition-transform shadow-lg 
shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 rounded-lg 
text-sm md:px-5 md:py-2.5 px-3 py-1.5 text-center me-2 mb-2 font-semibold"
              >
                <p className="text-lg">Get Started</p>
                <Image src={button} alt="logo" className="h-8 w-auto" />
              </button>
            </div>
            <div>
              <button
                className="flex items-center gap-2 cursor-pointer text-white font-semibold 
bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 
hover:bg-gradient-to-br focus:outline-none active:scale-95 
transition-transform shadow-lg shadow-gray-500/50 dark:shadow-lg 
dark:shadow-gray-800/80 rounded-lg text-sm md:px-5 md:py-2.5 px-3 py-1.5 text-center 
me-2 mb-2"
                onClick={() => router.push("https://x.com/zenifi99")}
              >
                <p className="text-lg">Contact us</p>
                <Image src={xxx} alt="logo" className="h-8 w-auto" />
              </button>
            </div>
          </div>
          {/* Video */}
          <div className="mt-12 flex justify-center">
            <div className="w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-xl">
              <div className="aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/BjW-P1JNfc8"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full border-0"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Decorative gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-80 w-80 rounded-full bg-cyan-500/30 blur-3xl" />
        <div className="absolute right-1/4 top-24 h-80 w-80 rounded-full bg-blue-500/25 blur-3xl" />
        <div className="absolute -bottom-10 left-1/3 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      </div>
    </section>
  );
}
