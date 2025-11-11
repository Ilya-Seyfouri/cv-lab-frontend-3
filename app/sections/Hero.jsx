"use client";
import Image from "next/image";
import photo from "@/images/avatar-lula-meyers.jpg";
import { useRouter } from "next/navigation";
import button from "@/images/BUTTON_1.png";
import xxx from "@/images/x.png";

export default function Hero() {
  const router = useRouter();
  return (
    <>
      <section className="py-30" id="home">
        <div className="container max-w-full">
          <div className="flex  justify-center"></div>

          <div className="lg:px-45">
            <div className="flex justify-center py px-15">
              <h2 className="text-3xl md:text-5xl lg:text-6xl text-center mx-auto max-w-4xl ">
                Your Resume, Perfectly Matched to Every Job.
              </h2>
            </div>
            <div className="pt-10 justify-center flex">
              <div className="inline-flex items-center gap-2 border border-white/20 rounded-full">
                <Image
                  src={photo}
                  alt="logo"
                  className="h-9 w-auto border-3 border-black rounded-full"
                ></Image>
                <p className="text-base font-semibold text-white/80 pr-2.5">
                  500+ CV's generated
                </p>
              </div>
            </div>
            <div className="flex justify-center pt-10 mx-auto max-w-2xl">
              <p className="text-center text-xl px-10 text-white/50 lg:text-2xl ">
                Tailor your CV and generate a cover letter in one click. Built
                to land you interviews.
              </p>
            </div>
            <div className="flex justify-center gap-10 py-10">
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
                  <p className="text-lg">Join us on</p>
                  <Image src={xxx} alt="logo" className="h-8 w-auto" />
                </button>
              </div>
            </div>

            <div id="features">
              <div className="flex justify-center py-10">
                <iframe
                  src="https://www.youtube.com/embed/BjW-P1JNfc8"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="border-0 rounded-3xl lg:h-150 lg:w-250 md:h-100 md:w-170"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
