import { useEffect } from "react";
import Appbar from "../Components/Appbar";
import CallToAction from "../Components/CallToAction";
import HeroSection from "../Components/HeroSection";
import axios from "axios";
function LandingPage() {
  const signIn_Url=import.meta.env.VITE_URL;

  useEffect(()=>{
    const makeme=async()=>{
       await axios.get(`${signIn_Url}/getStatus`);
    }
    makeme();
  },[]);
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-25%] left-[-15%] w-[600px] h-[600px] bg-purple-600/20 blur-[140px] animate-orb1" />
        <div className="absolute bottom-[-25%] right-[-15%] w-[600px] h-[600px] bg-blue-600/20 blur-[140px] animate-orb2" />
      </div>
      <Appbar />
      <main className="pt-6 sm:pt-12 animate-page-enter">
        <div className="animate-section-enter">
          <HeroSection />
        </div>
        <div className="relative my-12 flex justify-center">
        </div>
        <section className="animate-section-enter">
          <CallToAction />
        </section>
        <div className="h-24" />
      </main>
    </div>
  );
}

export default LandingPage;
