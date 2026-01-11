"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import photo from "../../public/avatar-lula-meyers.jpg";
import button from "../../public/BUTTON_1.png";
import xxx from "../../images/insta.png";

import goldman from "../../images/how_to_get_a_job_at_Goldman_sachs.png";
import nike from "../../images/how_to_get_a_job_at_Nike.png";
import spotify from "../../images/how_to_get_a_job_at_Spotify.png";
import chase from "../../images/how_to_get_a_job_at_chase.png";
import hp from "../../images/how_to_get_a_job_at_hp.png";
import mastercard from "../../images/how_to_get_a_job_at_mastercard.png";
import netflix from "../../images/how_to_get_a_job_at_netflix.png";
import nvidia from "../../images/how_to_get_a_job_at_nvidia.png";
import paypal from "../../images/how_to_get_a_job_at_paypal.png";
import samsung from "../../images/how_to_get_a_job_at_samsung.png";
import tesla from "../../images/how_to_get_a_job_at_tesla.png";
import twitch from "../../images/how_to_get_a_job_at_twitch.png";
import visa from "../../images/how_to_get_a_job_at_visa.png";

import { motion } from "framer-motion";

export default function Hero2() {
  const router = useRouter();

  const logos = [
    { id: "goldman", src: goldman, alt: "Goldman Sachs" },
    { id: "nike", src: nike, alt: "Nike" },
    { id: "spotify", src: spotify, alt: "Spotify" },
    { id: "chase", src: chase, alt: "Chase" },
    { id: "hp", src: hp, alt: "HP" },
    { id: "mastercard", src: mastercard, alt: "Mastercard" },
    { id: "netflix", src: netflix, alt: "Netflix" },
    { id: "nvidia", src: nvidia, alt: "NVIDIA" },
    { id: "paypal", src: paypal, alt: "PayPal" },
    { id: "samsung", src: samsung, alt: "Samsung" },
    { id: "tesla", src: tesla, alt: "Tesla" },
    { id: "twitch", src: twitch, alt: "Twitch" },
    { id: "visa", src: visa, alt: "Visa" },
  ];

  const marqueeLogos = [...logos, ...logos];

  return (
    <section
      className="relative overflow-hidden py-10 pt-25 scroll-mt-15"
      id="home"
    >
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Heading - no animation on mobile */}
          <h1 className="mb-6 text-4xl md:text-6xl font-semibold leading-tight md:hidden">
            <span className="bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent">
              Your Resume,{" "}
            </span>
            <span className="relative inline-block bg-gradient-to-r from-cyan-600 via-cyan-200 to-cyan-600 bg-clip-text text-transparent font-semibold">
              Perfectly
            </span>
            <br />
            <span className="relative inline-block bg-gradient-to-r from-cyan-600 via-cyan-200 to-cyan-600 bg-clip-text text-transparent font-semibold">
              Matched to Any Job.
            </span>
          </h1>

          {/* Heading - with animation on desktop */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-6 text-4xl md:text-6xl font-semibold leading-tight hidden md:block"
          >
            <span className="bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent">
              Your Resume,{" "}
            </span>

            <motion.span
              className="relative inline-block bg-gradient-to-r from-cyan-600 via-cyan-200 to-cyan-600 bg-clip-text text-transparent font-semibold"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Perfectly
            </motion.span>

            <br />

            <motion.span
              className="relative inline-block bg-gradient-to-r from-cyan-600 via-cyan-200 to-cyan-600 bg-clip-text text-transparent font-semibold"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Matched to Any Job.
            </motion.span>
          </motion.h1>

          {/* Social proof pill - no animation on mobile */}
          <div className="pt-2 justify-center flex md:hidden">
            <div className="inline-flex items-center gap-2 border border-white/20 rounded-full">
              <Image
                src={photo}
                alt="avatar"
                className="h-9 w-auto border-3 border-black rounded-full"
              />
              <p className="text-base font-semibold text-white/80 pr-2.5">
                4500+ CV&apos;s generated
              </p>
            </div>
          </div>

          {/* Social proof pill - with animation on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="pt-2 justify-center hidden md:flex"
          >
            <div className="inline-flex items-center gap-2 border border-white/20 rounded-full">
              <Image
                src={photo}
                alt="avatar"
                className="h-9 w-auto border-3 border-black rounded-full"
              />
              <p className="text-base font-semibold text-white/80 pr-2.5">
                4500+ CV&apos;s generated
              </p>
            </div>
          </motion.div>

          {/* Subheading - no animation on mobile */}
          <p className="mx-auto pt-10 mb-8 max-w-5xl text-md md:text-2xl text-white/60 md:hidden">
            Instantly turn your CV into a ATS-optimized, role-specific resume,
            tailored to each job description and aligned with each employer's
            desired candidate profile.
          </p>

          {/* Subheading - with animation on desktop */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mx-auto pt-10 mb-8 max-w-5xl text-md md:text-2xl text-white/60 hidden md:block"
          >
            Instantly turn your CV into a ATS-optimized, role-specific resume,
            tailored to each job description and aligned with each employer's
            desired candidate profile.
          </motion.p>

          {/* CTA buttons - no animation on mobile */}
          <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 py-2 md:hidden">
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
                <Image src={button} alt="button icon" className="h-8 w-auto" />
              </button>
            </div>

            <div>
              <button
                className="flex items-center gap-2 cursor-pointer text-white font-semibold 
bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 
hover:bg-gradient-to-br focus:outline-none active:scale-95 
transition-transform shadow-lg shadow-gray-500/50 dark:shadow-lg 
dark:shadow-gray-800/80 rounded-lg text-sm md:px-5 md:py-2.5 px-3 py-1.5 lg:py-3 text-center 
me-2 mb-2"
                onClick={() =>
                  window.open(
                    "https://www.instagram.com/cvlab.ltd/",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                <p className="text-lg">Contact us</p>
                <Image src={xxx} alt="x icon" className="h-6 w-auto px-2" />
              </button>
            </div>
          </div>

          {/* CTA buttons - with animation on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="hidden md:flex flex-row items-center justify-center gap-4 sm:gap-6 py-2"
          >
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
                <Image src={button} alt="button icon" className="h-8 w-auto" />
              </button>
            </div>

            <div>
              <button
                className="flex items-center gap-2 cursor-pointer text-white font-semibold 
bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 
hover:bg-gradient-to-br focus:outline-none active:scale-95 
transition-transform shadow-lg shadow-gray-500/50 dark:shadow-lg 
dark:shadow-gray-800/80 rounded-lg text-sm md:px-5 md:py-2.5 px-3 py-1.5 lg:py-3 text-center 
me-2 mb-2"
                onClick={() =>
                  window.open(
                    "https://www.instagram.com/cvlab.ltd/",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                <p className="text-lg">Contact us</p>
                <Image src={xxx} alt="x icon" className="h-6 w-auto px-2" />
              </button>
            </div>
          </motion.div>

          {/* Logos marquee - no animation on mobile */}
          <div className="overflow-x-clip md:hidden">
            <div className="mt-12 flex overflow-hidden py-8 [mask-imge:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  duration: 25,
                  ease: "linear",
                  repeat: Infinity,
                }}
                className="flex flex-none items-center gap-10 pr-10 will-change-transform"
              >
                {marqueeLogos.map((logo, i) => (
                  <div
                    key={`${logo.id}-${i}`}
                    className="flex h-16 w-auto items-center justify-center rounded-xl bg-white/5 px-4 ring-1 ring-white/10"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      className="h-16 w-auto opacity-85 hover:opacity-100 transition-opacity"
                      priority={i < 6}
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Logos marquee - with animation on desktop */}
          <div className="overflow-x-clip hidden md:block">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="mt-12"
            >
              <div className="flex overflow-hidden py-8">
                <motion.div
                  animate={{ x: "-50%" }}
                  transition={{
                    duration: 25,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                  className="flex flex-none items-center gap-10 pr-10"
                  style={{
                    willChange: "transform",
                    transform: "translateZ(0)", // Force GPU acceleration
                  }}
                >
                  {marqueeLogos.map((logo, i) => (
                    <div
                      key={`${logo.id}-${i}`}
                      className="flex h-16 w-auto items-center justify-center rounded-xl bg-white/5 px-4 ring-1 ring-white/10"
                      style={{ transform: "translateZ(0)" }} // Isolate each card's layer
                    >
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        className="h-16 w-auto opacity-85 hover:opacity-100 transition-opacity"
                        priority={i < 6}
                        unoptimized={i >= 6} // Don't optimize duplicates
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Video - no animation on mobile */}
          <div className="mt-12 flex justify-center md:hidden">
            <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-xl">
              <div className="aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/POeX6GtkL1M"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              </div>
            </div>
          </div>

          {/* Video - with animation on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="mt-12 hidden md:flex justify-center"
          >
            <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-xl">
              <div className="aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/POeX6GtkL1M"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-80 w-80 rounded-full bg-cyan-500/30 blur-3xl" />
        <div className="absolute right-1/4 top-24 h-80 w-80 rounded-full bg-blue-500/25 blur-3xl" />
      </div>
    </section>
  );
}
