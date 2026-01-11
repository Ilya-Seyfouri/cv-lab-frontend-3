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

// Container with sequential stagger
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

// Hero title: scale from 80% to 100% with fade (matches reference video)
const titleVariants = {
  hidden: {
    opacity: 0,
    scale: 0.85,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Secondary elements: subtle scale with fade
const itemVariants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

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

  // Triple duplicate for seamless infinite loop
  const marqueeLogos = [...logos, ...logos, ...logos];

  return (
    <section
      className="relative overflow-hidden py-10 scroll-mt-15 pt-20"
      id="home"
    >
      <div className="container mx-auto max-w-5xl px-4">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Heading with scale-up animation */}
          <motion.h1
            variants={titleVariants}
            className="mb-6 text-4xl md:text-6xl font-semibold leading-tight"
            style={{
              willChange: "transform, opacity",
              backfaceVisibility: "hidden",
              WebkitFontSmoothing: "antialiased",
            }}
          >
            <span className="bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent">
              Your Resume,{" "}
            </span>

            <motion.span
              className="relative inline-block bg-gradient-to-r from-cyan-600 via-cyan-200 to-cyan-600 bg-clip-text text-transparent font-semibold"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{
                backgroundSize: "200% 200%",
                willChange: "background-position",
              }}
            >
              Perfectly
            </motion.span>

            <br />

            <motion.span
              className="relative inline-block bg-gradient-to-r from-cyan-600 via-cyan-200 to-cyan-600 bg-clip-text text-transparent font-semibold"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{
                backgroundSize: "200% 200%",
                willChange: "background-position",
              }}
            >
              Matched to Any Job.
            </motion.span>
          </motion.h1>

          {/* Social proof pill */}
          <motion.div
            variants={itemVariants}
            className="pt-2 justify-center flex"
            style={{
              willChange: "transform, opacity",
              backfaceVisibility: "hidden",
            }}
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

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="mx-auto pt-10 mb-8 max-w-5xl text-md md:text-2xl text-white/60"
            style={{
              willChange: "transform, opacity",
              backfaceVisibility: "hidden",
            }}
          >
            Instantly turn your CV into a ATS-optimized, role-specific resume,
            tailored to each job description and aligned with each employer's
            desired candidate profile.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-row items-center justify-center gap-4 sm:gap-6 py-2"
            style={{
              willChange: "transform, opacity",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push("/auth")}
                className="flex items-center gap-2 cursor-pointer text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:outline-none active:scale-95 transition-transform shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 rounded-lg text-sm md:px-5 md:py-2.5 px-3 py-1.5 text-center me-2 mb-2 font-semibold"
              >
                <p className="text-lg">Get Started</p>
                <Image src={button} alt="button icon" className="h-8 w-auto" />
              </button>
            </div>

            <div>
              <button
                className="flex items-center gap-2 cursor-pointer text-white font-semibold bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 hover:bg-gradient-to-br focus:outline-none active:scale-95 transition-transform shadow-lg shadow-gray-500/50 dark:shadow-lg dark:shadow-gray-800/80 rounded-lg text-sm md:px-5 md:py-2.5 px-3 py-1.5 text-center me-2 mb-2"
                onClick={() => router.push("https://x.com/cvlabltd")}
              >
                <p className="text-lg">Contact us</p>
                <Image src={xxx} alt="x icon" className="h-8 w-auto" />
              </button>
            </div>
          </motion.div>

          {/* Logos marquee - PURE CSS ANIMATION FOR MAXIMUM PERFORMANCE */}
          <motion.div
            variants={itemVariants}
            className="overflow-x-clip"
            style={{
              willChange: "transform, opacity",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="mt-12 flex overflow-hidden py-8 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              {/* Pure CSS marquee - no JavaScript animation */}
              <div className="marquee-content">
                {marqueeLogos.map((logo, i) => (
                  <div
                    key={`${logo.id}-${i}`}
                    className="marquee-item flex h-16 w-auto items-center justify-center rounded-xl bg-white/5 px-4 ring-1 ring-white/10"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      className="h-16 w-auto opacity-85 hover:opacity-100 transition-opacity"
                      priority={i < 6}
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Video */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex justify-center"
            style={{
              willChange: "transform, opacity",
              backfaceVisibility: "hidden",
            }}
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
        </motion.div>
      </div>

      {/* Decorative gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-80 w-80 rounded-full bg-cyan-500/30 blur-3xl" />
        <div className="absolute right-1/4 top-24 h-80 w-80 rounded-full bg-blue-500/25 blur-3xl" />
      </div>

      {/* Pure CSS Marquee Styles */}
      <style jsx>{`
        .marquee-content {
          display: flex;
          animation: marquee 15s linear infinite;
          gap: 2.5rem;
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .marquee-item {
          flex-shrink: 0;
        }

    

        @keyframes marquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-33.333%, 0, 0);
          }
        }

        /* Optimize for Safari */
        @media not all and (min-resolution: 0.001dpcm) {
          @supports (-webkit-appearance: none) {
            .marquee-content {
              -webkit-transform: translate3d(0, 0, 0);
            }
          }
        }
      `}</style>
    </section>
  );
}
