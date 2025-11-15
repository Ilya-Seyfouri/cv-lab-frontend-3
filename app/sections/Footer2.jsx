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
            
          </div>
          <div className=" lg:pt-6 text-center px-4">
          
          </div>
          <div className="lg:pt-10">
            
          </div>

          <div className="w-full max-w-5xl border-white px-4  border-b-2"></div>

          <div className="pt-6 lg:pt-10 flex flex-col lg:flex-row items-center justify-between w-full max-w-5xl gap-4 lg:gap-0 px-4">
            <p className="text-white/60">&copy; {new Date().getFullYear()} CVLab. All rights reserved.</p>
            <p className="text-white/60 text-sm lg:text-base text-center lg:text-left">
              cvlabhelp@gmail.com
            </p>
          </div>

          <div className="pt-10 lg:pt-10"></div>
        </div>
      </section>
    </>
  );
}
