import React from "react";
import { BackgroundBeams } from "@/components/BackgroundBeams";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { ProjectCarousel } from "@/components/ui/ProjectCarousel";
import { ServicesSection } from "@/components/ui/ServicesSection";
import FloatingIcons from "@/components/ui/FloatingIcons";
import ScrollArrow from "@/components/ui/ScrollArrow";

const Index: React.FC = () => {
  const { user } = useAuth();
  const headerOffset = 84;

  return (
    <div className="relative min-h-screen overflow-x-hidden overflow-y-visible">
      <BackgroundBeams className="pointer-events-none fixed top-0 left-0 w-full h-full z-0" />
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-32 sm:pt-32 sm:pb-40 min-h-screen">
          <FloatingIcons />
          <div className="w-full max-w-5xl mx-auto text-center relative z-10 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight tracking-tight">
                  NordStack Nexus
                </h1>
                
                {/* Decorative line */}
                <div className="w-full max-w-3xl mx-auto h-10 relative flex items-center justify-center">
                  <div className="absolute inset-x-16 sm:inset-x-20 top-0 bg-gradient-to-r from-transparent via-[#fff200] to-transparent h-[2px] w-5/6 blur-sm" />
                  <div className="absolute inset-x-16 sm:inset-x-20 top-0 bg-gradient-to-r from-transparent via-[#fff200] to-transparent h-px w-5/6" />
                  <div className="absolute inset-x-32 sm:inset-x-40 top-0 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent h-[5px] w-2/3 blur-sm" />
                  <div className="absolute inset-x-32 sm:inset-x-40 top-0 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent h-px w-2/3" />
                </div>
                
                <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  Vi leverer digitale løsninger til vækst og effektivitet.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-black hover:bg-gray-100 hover:scale-105 px-10 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
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
                  className="border-white/30 text-white hover:bg-white/10 hover:border-white hover:scale-105 backdrop-blur-sm px-10 py-6 text-lg font-semibold rounded-xl transition-all duration-300"
                >
                  <Link to="/contact">Kontakt os</Link>
                </Button>
              </div>
              
              <div className="pt-16">
                <ScrollArrow offset={headerOffset} />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <ServicesSection />

        {/* Projects Section */}
        <section id="projects" className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Projekter
              </h2>
              <div className="w-full max-w-2xl mx-auto h-10 relative flex items-center justify-center mb-8">
                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-[#fff200] to-transparent h-[2px] w-3/4 blur-sm" />
                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-[#fff200] to-transparent h-px w-3/4" />
                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent h-[5px] w-1/4 blur-sm" />
                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent h-px w-1/4" />
              </div>
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Et udvalg af vores løsninger i praksis. Se hvordan vi hjælper virksomheder med at transformere deres digitale tilstedeværelse.
              </p>
            </motion.div>
            
            <ProjectCarousel />
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-r from-[#FFD700]/10 via-[#fff200]/5 to-[#FFD700]/10 backdrop-blur-sm border border-[#FFD700]/20 rounded-3xl p-8 sm:p-12">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6">
                Klar til at transformere din virksomhed?
              </h3>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Lad os hjælpe dig med at skabe moderne digitale løsninger, der driver vækst og effektivitet.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#FFD700] text-black hover:bg-[#fff200] hover:scale-105 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <Link to={user ? "/dashboard" : "/auth"}>
                    <ArrowRight className="w-5 h-5 mr-2" />
                    Kom i gang nu
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 hover:border-white hover:scale-105 backdrop-blur-sm px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
                >
                  <Link to="/contact">Kontakt os</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default Index;