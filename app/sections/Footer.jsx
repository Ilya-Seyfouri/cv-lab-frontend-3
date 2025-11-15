"use client";
import button from "../../images/BUTTON_1.png"
import Image from "next/image";
import CVLOGO from "../../images/logo_text.png";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  return (
    <>
      <section id="contact">
        <div className="container flex flex-col justify-center items-center px-4 lg:px-0">
          <div className="text-center">
            <h2 className="text-3xl lg:text-5xl">
              Ready to get those interviews?
            </h2>
          </div>
          <div className="pt-4 lg:pt-6 text-center px-4">
            <p className="text-lg lg:text-2xl">
              Join Students & Graduates worldwide who trust us for tailored
              results.
            </p>
          </div>
          <div className="pt-6 lg:pt-10">
            <button
              onClick={() => router.push("/auth")}
              className="flex items-center gap-2 font-semibold rounded-2xl px-4 lg:px-6 py-1
cursor-pointer text-black bg-gradient-to-r from-white via-gray-100 
to-gray-200 hover:from-gray-100 hover:via-gray-200 hover:to-gray-300
focus:outline-none active:scale-95 shadow-lg shadow-gray-300/50 
text-sm text-center me-2 mb-2 transition-all duration-200"
            >
              <p className="text-base lg:text-lg">Get Started</p>
              <Image src={button} alt="logo" className="h-8 lg:h-10 w-auto" />
            </button>
          </div>

          <div className="w-full max-w-5xl border-white px-4 pt-8 lg:pt-10 border-b-2"></div>

          <div className="pt-6 lg:pt-10 flex flex-col lg:flex-row items-center justify-between w-full max-w-5xl gap-4 lg:gap-0 px-4">
            <Image src={CVLOGO} alt="Logo" className="h-10 lg:h-12 w-auto" />
            <p className="text-white/60 text-sm lg:text-base text-center lg:text-left">
              contact us @ cvlabhelp@gmail.com
            </p>
          </div>

          <div className="pt-10 lg:pt-10"></div>
        </div>
      </section>
    </>
  );
}
