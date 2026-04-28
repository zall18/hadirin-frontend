import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-rose-500 selection:text-white bg-slate-50 relative overflow-hidden">
      {/* Global Floral Ambient Background */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 bg-[url('https://www.transparenttextures.com/patterns/floral-flourish.png')] opacity-5 mix-blend-multiply"></div>
      
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <HowItWorks />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
