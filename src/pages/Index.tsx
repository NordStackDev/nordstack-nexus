import { BackgroundBeams } from "@/components/BackgroundBeams";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

// Features
const features = [
  {
    title: "Feature 1",
    description: "Beskrivelse af feature 1",
    icon: ArrowRight,
  },
  {
    title: "Feature 2",
    description: "Beskrivelse af feature 2",
    icon: ArrowRight,
  },
  {
    title: "Feature 3",
    description: "Beskrivelse af feature 3",
    icon: ArrowRight,
  },
  {
    title: "Feature 4",
    description: "Beskrivelse af feature 4",
    icon: ArrowRight,
  },
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
      </div>
    </div>
  );
};

// Main Page
const Index: React.FC = () => {
  const { user } = useAuth();

  const scrollToFeatures = () => {
    const el = document.getElementById("features");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden overflow-y-visible">
      <BackgroundBeams className="pointer-events-none fixed top-0 left-0 w-full h-full z-0" />

      <div className="relative z-10">
        {/* Hero */}
        <section className="bg-[color:var(--card)] dark:bg-background pt-8 sm:pt-10 md:pt-14 lg:pt-20 pb-12">
          <div
            className="relative grid max-w-screen-xl xl:max-w-[1200px] 2xl:max-w-[1320px] 
                          px-2 sm:px-4 md:px-8 mx-auto lg:grid-cols-12 gap-10 lg:gap-16 items-center"
          >
            {/* Tekst */}
            <div className="lg:col-span-12 flex flex-col justify-center items-center text-center">
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-foreground mb-6 leading-tight">
                NordStack Nexus
              </h1>
              <p className="text-lg md:text-xl text-muted mb-8 max-w-2xl mx-auto">
                Din professionelle løsning til salgs- og dokumenthåndtering.
                Organiser, del og spor dine vigtigste forretningsdokumenter med
                sikkerhed og kontrol.
              </p>

              <div className="flex gap-4 flex-wrap justify-center">
                <Link
                  to={user ? "/dashboard" : "/auth"}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg 
                             bg-[color:var(--cta-bg)] text-[color:var(--cta-foreground)] 
                             hover:bg-[color:var(--secondary-bg)] transition"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  {user ? "Gå til Dashboard" : "Kom i gang"}
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg border 
                             border-[color:var(--border)] text-muted 
                             hover:bg-[rgba(255,255,255,0.04)] transition"
                >
                  Kontakt os
                </Link>
              </div>
            </div>
          </div>
        </section>

  {/* Projekter Section removed here and moved below Features for better flow */}

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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <Card
                key={idx}
                className="p-6 hover:scale-105 transition-transform duration-300 group"
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className="mx-auto w-16 h-16 rounded-xl flex items-center justify-center mb-6 
                                  bg-transparent border border-[rgba(255,255,255,0.03)] 
                                  group-hover:shadow-card"
                  >
                    <feature.icon className="w-8 h-8 text-muted" />
                  </div>
                  <CardTitle className="text-xl font-semibold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-muted">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
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