import Hero2 from "./sections/Hero2";
import Testimonials from "./sections/Test";

import Pricing2 from "./sections/Pricing2";
import FAQ from "./sections/FAQ";
import HowItWorks from "./sections/HowItWorks";
import Footer2 from "./sections/Footer2";
import Navbar2 from "./sections/NavBar2";

export default function Home() {
  return (
    <>
      <Navbar2 />
      <Hero2 />
      <HowItWorks/>
      <Pricing2 />
      <Testimonials/>
      <FAQ />
      <Footer2 />
    </>
  );
}
