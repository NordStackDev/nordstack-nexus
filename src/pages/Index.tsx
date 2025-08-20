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


// Mockup data
const displayMockups = [
  {
    src: "/mockups/mockup1.png",
    alt: "Mockup 1",
  },
  {
    src: "/mockups/mockup2.png",
    alt: "Mockup 2",
  },
  {
    src: "/mockups/mockup3.png",
    alt: "Mockup 3",
  },
];

// Mockup animation varianter (uden transition)
const mockupVariants = [
  {
    initial: { opacity: 0, x: -50, rotate: -6 },
    animate: { opacity: 1, x: 0, rotate: -6 },
  },
  {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
  },
  {
    initial: { opacity: 0, x: 50, rotate: 6 },
    animate: { opacity: 1, x: 0, rotate: 6 },
  },
];

// Mockup Display
const MockupDisplay: React.FC = () => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  return (
    <div className="relative w-full flex justify-center items-center overflow-visible px-6">
      <div
        className="relative w-[200px] sm:w-[320px] md:w-[360px] lg:w-[400px] xl:w-[440px] 2xl:w-[480px] 
                   h-[340px] sm:h-[440px] md:h-[480px] lg:h-[520px] xl:h-[560px] 2xl:h-[600px]"
        style={{ perspective: 1200 }}
      >
        {displayMockups.map((mockup, idx) => {
          if (isMobile && idx !== 1) return null; // kun midten på mobil
          const variant = mockupVariants[idx];

          const translateXClass =
            idx === 0
              ? "-translate-x-[40%] -rotate-6 hidden sm:flex"
              : idx === 1
              ? "-translate-x-1/2 rotate-0"
              : "translate-x-[40%] rotate-6 hidden sm:flex";

          return (
            <motion.div
              key={idx}
              initial={variant.initial}
              animate={variant.animate}
              transition={{ duration: 0.6 + idx * 0.2, ease: "easeOut" }}
              className={`absolute left-1/2 top-1/2 -translate-y-1/2 ${translateXClass} 
                          w-[80px] sm:w-36 md:w-44 lg:w-48 xl:w-52 2xl:w-56 
                          aspect-[9/19] rounded-3xl flex justify-center items-center overflow-visible 
                          border-4 border-white/20 bg-black`}
              style={{
                zIndex: idx === 1 ? 30 : 20,
                boxShadow:
                  idx === 1
                    ? "0 24px 60px rgba(0,0,0,0.22), 0 4px 16px rgba(0,0,0,0.12)"
                    : "0 16px 40px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)",
              }}
            >
              <img
                src={mockup.src}
                alt={mockup.alt}
                draggable={false}
                className="relative w-full h-full object-contain rounded-3xl border-2 border-white/10"
              />
              {/* Details */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-[rgba(255,255,255,0.06)] rounded-full pointer-events-none" />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-16 h-3 bg-[rgba(255,255,255,0.04)] rounded-full pointer-events-none" />
            </motion.div>
          );
        })}
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


  {/* Project Section removed here and moved below Features for better flow */}

        {/* Scroll Arrow */}
        <div className="flex justify-center mt-12">
          <button
            aria-label="Scroll ned til features"
            onClick={scrollToFeatures}
            className="group flex flex-col items-center focus:outline-none"
            type="button"
          >
            <span className="animate-bounce">
              <ArrowRight
                className="w-10 h-10 text-muted rotate-90 group-hover:text-foreground transition-colors duration-200"
                aria-hidden="true"
              />
            </span>
            <span className="sr-only">Scroll ned</span>
          </button>
        </div>

        {/* Features */}
        <section id="features" className="py-32 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 mt-16 animate-fade-in">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-8">
              Hvad vi tilbyder
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Nordstack leverer moderne løsninger til virksomheder, der ønsker
              at optimere deres salgsprocesser og dokumenthåndtering med
              avanceret teknologi.
            </p>
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

        {/* Projekter Section (moved below Features) */}
        <section id="projects" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl sm:text-4xl font-bold mb-4">Projekter</h3>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Se et udvalg af vores projekter og løsninger — klik for at se flere detaljer.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-start">
              {displayMockups.map((m, i) => (
                <article key={i} className="group bg-card/60 p-4 rounded-2xl border border-border/30 hover:shadow-glow transition transform hover:-translate-y-2">
                  <img src={m.src} alt={m.alt} className="w-full h-44 object-cover rounded-xl mb-4" />
                  <h4 className="font-semibold text-lg text-foreground mb-2">Projekt {i + 1}</h4>
                  <p className="text-sm text-muted-foreground">Kort beskrivelse af projektet med fokus på værdi og outcome.</p>
                </article>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Link to="/projects" className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary-glow shadow-glow">
                Se flere projekter
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;