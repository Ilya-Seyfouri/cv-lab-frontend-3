import Image from "next/image";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import Pricing from "./sections/Pricing";
import Features from "./sections/Features";
import FAQ from "./sections/FAQ";
import Footer from "./sections/Footer";


export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <FAQ />
      <Footer />
    </>
  );
}
