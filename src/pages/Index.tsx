import React from "react";
import { BackgroundBeams } from "@/components/BackgroundBeams";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Cloud, Laptop, Code, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { IPhoneMockup } from "@/components/ui/IphoneCarousel";

const floatingIcons = [
  { Icon: Cloud, delay: 0 },
  { Icon: Laptop, delay: 0.5 },
  { Icon: Code, delay: 1 },
  { Icon: Database, delay: 1.5 },
];

const scrollToFeatures = (offset = 0) => {
  const el = document.getElementById("features");
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
};

const FloatingIcons: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none">
    {floatingIcons.map(({ Icon, delay }, idx) => (
      <motion.div
        key={idx}
        className="absolute text-white/20"
        style={{ top: `${20 + idx * 15}%`, left: `${10 + idx * 20}%` }}
        animate={{ y: [0, -20, 0], x: [0, 10, 0], rotate: [0, 5, -5, 0] }}
        transition={{
          duration: 4 + idx,
          delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Icon size={24 + idx * 4} />
      </motion.div>
    ))}
  </div>
);

const ScrollArrow: React.FC<{ offset?: number }> = ({ offset = 0 }) => (
  <motion.div
    className="flex justify-center mt-12"
    initial={{ opacity: 0 }}
    animate={{
      opacity: [0, 1, 1, 0],
      y: [0, 0, 12, 12],
      scale: [1, 1.04, 1.04, 1],
    }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
  >
    <button
      aria-label="Scroll ned til features"
      onClick={() => scrollToFeatures(offset)}
      className="group flex flex-col items-center focus:outline-none"
      type="button"
    >
      <ArrowRight
        className="w-10 h-10 text-white/60 rotate-90 group-hover:text-white/80 transition-colors duration-200"
        aria-hidden
      />
      <span className="sr-only">Scroll ned</span>
    </button>
  </motion.div>
);

const Index: React.FC = () => {
  const { user } = useAuth();
  const headerOffset = 84;

  return (
    <div className="relative min-h-screen overflow-x-hidden overflow-y-visible">
      <BackgroundBeams className="pointer-events-none fixed top-0 left-0 w-full h-full z-0" />
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative flex items-center justify-center px-4 sm:px-6 md:px-8 pt-32 pb-24">
          <FloatingIcons />
          <div className="w-full max-w-4xl mx-auto text-center relative z-10 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                NordStack Nexus
              </h1>
              {/* Gradient lines under title */}
              <div className="w-full max-w-2xl mx-auto h-10 relative flex items-center justify-center mb-8">
                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
              </div>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-10">
                Vi leverer digitale løsninger til vækst og effektivitet.
              </p>
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg"
                >
                  <Link to={user ? "/dashboard" : "/auth"}>
                    <ArrowRight className="w-5 h-5 mr-2" />
                    Kom i gang
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg"
                >
                  <Link to="/contact">Kontakt os</Link>
                </Button>
              </div>
              <ScrollArrow offset={headerOffset} />
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="pt-32 pb-24 px-4 sm:px-6 md:px-8 bg-gray-900/20"
        >
          <div className="text-center mb-12 max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Hvad vi tilbyder
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
              Nordstack leverer moderne løsninger til virksomheder, der ønsker
              at optimere deres salgsprocesser og dokumenthåndtering med
              avanceret teknologi.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Button
              asChild
              size="lg"
              className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg"
            >
              <Link to={user ? "/dashboard" : "/auth"}>
                <ArrowRight className="w-5 h-5 mr-2" />
                Kom i gang
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg"
            >
              <Link to="/contact">Kontakt os</Link>
            </Button>
          </div>
        </section>

        {/* Projekter Section */}
        <section className="pt-32 pb-24 px-4 sm:px-6 md:px-8">
          <div className="w-full max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                Projekter
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
                Et udvalg af vores løsninger i praksis.
              </p>
            </motion.div>
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="order-2 lg:order-1">
                <IPhoneMockup />
              </div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2 space-y-6 text-left"
              >
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Pitch 'N Sales
                </h3>
                <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
                  Pitch 'N Sales gør det nemt at præsentere, dele og lukke salg
                  direkte fra din mobil. Bygget som en moderne web-app med fokus
                  på brugervenlighed.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white mt-2">
                  <Link to="/projects/pitch-n-sales" className="flex items-center">
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
