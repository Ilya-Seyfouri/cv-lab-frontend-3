"use client";
import button from "@/images/BUTTON_1.png";
import Image from "next/image";
import CVLOGO from "@/images/logo_text.png";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  return (
    <>
      <section id="contact">
        <div className="container pt-40 flex flex-col items-center">
          <div>
            <h2 className="text-5xl">Ready to get those interviews?</h2>
          </div>
          <div className="pt-6">
            <p className="text-2xl">
              Join Students & Graduates worldwide who trust us for tailored
              results.
            </p>
          </div>
          <div className="pt-10 ">
            <button
              onClick={() => router.push("/auth")}
              className="flex items-center gap-2 font-semibold rounded-2xl px-6 py-1
cursor-pointer text-black bg-gradient-to-r from-white via-gray-100 
to-gray-200 hover:from-gray-100 hover:via-gray-200 hover:to-gray-300
focus:outline-none active:scale-95 shadow-lg shadow-gray-300/50 
text-sm text-center me-2 mb-2 transition-all duration-200"
            >
              <p className="text-lg">Get Started</p>
              <Image src={button} alt="logo" className="h-10 w-auto" />
            </button>
          </div>

          <div className=" border-white px-137 pt-10 border-b-2"></div>
          <div className="pt-10 flex items-center justify-between w-[1095px]">
            <Image src={CVLOGO} alt="Logo" className="h-12 w-auto mr-5" />
            <p className="text-white/60">contact us @ i.seyfouri@gmail.com</p>
          </div>

          <div className="pt-30"></div>
        </div>
      </section>
    </>
  );
}
