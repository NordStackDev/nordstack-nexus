import { BackgroundBeams } from "@/components/BackgroundBeams";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Cloud, Laptop, Code, Database } from "lucide-react";
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

// Floating icons data
const floatingIcons = [
  { Icon: Cloud, delay: 0 },
  { Icon: Laptop, delay: 0.5 },
  { Icon: Code, delay: 1 },
  { Icon: Database, delay: 1.5 },
];

// Smooth scroll function
const scrollToFeatures = () => {
  document.getElementById('features')?.scrollIntoView({ 
    behavior: 'smooth' 
  });
};


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

// Floating Icons Component
const FloatingIcons: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {floatingIcons.map(({ Icon, delay }, idx) => (
        <motion.div
          key={idx}
          className="absolute text-white/20"
          style={{
            top: `${20 + idx * 15}%`,
            left: `${10 + idx * 20}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4 + idx,
            delay: delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Icon size={24 + idx * 4} />
        </motion.div>
      ))}
    </div>
  );
};

// Scroll Arrow Component
const ScrollArrow: React.FC = () => {
  return (
    <motion.div
      className="flex justify-center mt-16"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: [0, 1, 1, 0],
        y: [0, 0, 20, 20],
        scale: [1, 1.1, 1.1, 1]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <button
        aria-label="Scroll ned til features"
        onClick={scrollToFeatures}
        className="group flex flex-col items-center focus:outline-none"
        type="button"
      >
        <ArrowRight
          className="w-10 h-10 text-white/60 rotate-90 group-hover:text-white/80 transition-colors duration-200"
          aria-hidden="true"
        />
        <span className="sr-only">Scroll ned</span>
      </button>
    </motion.div>
  );
};

// Animated Text Component
const AnimatedTypewriter: React.FC<{ words: string[] }> = ({ words }) => {
  const { currentWord, currentWordIndex } = useTypewriter({
    words,
    delayBetweenWords: 3000,
  });

  return (
    <div className="mb-12 h-20 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentWordIndex}
          initial={{ opacity: 0, filter: "blur(10px)", scale: 0.8 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)", scale: 0.8 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="text-3xl md:text-4xl font-semibold text-blue-400"
        >
          {currentWord}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

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

  return (
    <div className="relative min-h-screen overflow-x-hidden overflow-y-visible">
      <BackgroundBeams className="pointer-events-none fixed top-0 left-0 w-full h-full z-0" />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          {/* Floating Icons */}
          <FloatingIcons />
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
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
              
              {/* Animated Typewriter Effect */}
              <AnimatedTypewriter words={typewriterWords} />

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
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

            {/* Smooth Scroll Arrow */}
            <ScrollArrow />
          </div>
        </section>

        {/* Features - Moved further down */}
        <section id="features" className="py-40 px-4 sm:px-6 lg:px-8 mt-20">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8">
              Hvad vi tilbyder
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Nordstack leverer moderne løsninger til virksomheder, der ønsker
              at optimere deres salgsprocesser og dokumenthåndtering med
              avanceret teknologi.
            </p>
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