import { BackgroundBeams } from "@/components/BackgroundBeams";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useTypewriter } from "@/hooks/useTypewriter";

// Typewriter words
const typewriterWords = [
  "SaaS",
  "Websites", 
  "Web Applications",
  "CRM-løsninger",
  "Custom Development"
];

// iPhone Mockup Component
const IPhoneMockup: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative"
    >
      <div className="relative w-64 h-[520px] mx-auto">
        {/* iPhone Frame */}
        <div className="absolute inset-0 bg-gray-900 rounded-[3rem] shadow-2xl border-8 border-gray-800">
          {/* Screen */}
          <div className="absolute inset-4 bg-black rounded-[2.2rem] overflow-hidden">
            <img
              src="/iphone_images/Iphone1.png"
              alt="Pitch 'N Sales App Screenshot"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full" />
          {/* Home indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full" />
        </div>
        
        {/* Shadow */}
        <div className="absolute -inset-4 bg-gradient-to-b from-transparent via-gray-900/20 to-gray-900/40 rounded-[4rem] -z-10 blur-xl" />
      </div>
    </motion.div>
  );
};

// Main Page
const Index: React.FC = () => {
  const { user } = useAuth();
  const typewriterText = useTypewriter({
    words: typewriterWords,
    typeSpeed: 100,
    deleteSpeed: 50,
    delayBetweenWords: 2000,
  });

  return (
    <div className="relative min-h-screen overflow-x-hidden overflow-y-visible">
      <BackgroundBeams className="pointer-events-none fixed top-0 left-0 w-full h-full z-0" />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                NordStack Nexus
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                Vi leverer digitale løsninger til vækst og effektivitet.
              </p>
              
              {/* Typewriter Effect */}
              <div className="mb-12 h-20 flex items-center justify-center">
                <span className="text-3xl md:text-4xl font-semibold text-blue-400">
                  {typewriterText}
                  <span className="animate-pulse">|</span>
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button asChild size="lg" className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg">
                  <Link to={user ? "/dashboard" : "/auth"}>
                    <ArrowRight className="w-5 h-5 mr-2" />
                    Kom i gang
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg">
                  <Link to="/contact">
                    Kontakt os
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Project Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Projekter
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Et udvalg af vores løsninger i praksis.
              </p>
            </motion.div>

            {/* Project Card */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <IPhoneMockup />
              </div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2 space-y-6"
              >
                <h3 className="text-3xl font-bold text-white">
                  Pitch 'N Sales
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Pitch 'N Sales gør det nemt at præsentere, dele og lukke salg direkte fra din mobil. 
                  Bygget som en moderne web-app med fokus på brugervenlighed.
                </p>
                <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Link to="/projects/pitch-n-sales">
                    Læs mere
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
