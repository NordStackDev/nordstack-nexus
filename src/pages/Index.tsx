import React from "react";
import { useTranslation } from "react-i18next";
import { Seo } from "@/components/Seo";
import { YellowGradientLine } from "@/components/ui/YellowGradientLine";
import { BackgroundBeams } from "@/components/BackgroundBeams";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { ProjectCarousel } from "@/components/ui/ProjectCarousel";
import { ServicesSection } from "@/components/ui/ServicesSection";
import FloatingIcons from "@/components/ui/FloatingIcons";

const Index: React.FC = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState(true);
  const headerOffset = 84;

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <main
        aria-busy="true"
        aria-label="Indlæser forsiden"
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        {/* Transparent gradient overlay */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(circle at 50% 55%, rgba(255,215,0,0.04) 0%, rgba(24,24,27,0.85) 40%, rgba(17,17,17,1) 100%)",
          }}
        />
        {/* Blurred glow layer */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-2xl z-0" />

        <div className="absolute inset-0 flex flex-col items-center justify-start pt-32 gap-8 z-10">
          {/* Logo loader */}
          <div className="relative flex flex-col items-center justify-center">
            <div className="w-32 h-32 flex items-center justify-center">
              <img
                src="/NS_logo_nobg.webp"
                alt="NordStack logo"
                className="w-24 h-24 animate-fade-in"
                style={{ filter: "drop-shadow(0 0 24px #FFD700)" }}
              />
              <div className="absolute w-32 h-32 border-4 border-[#FFD700]/80 border-t-transparent rounded-full animate-spin" />
            </div>
          </div>

          <span className="animate-pulse text-3xl text-[#FFD700] font-bold drop-shadow-lg mt-2 tracking-wide">
            Indlæser...
          </span>
        </div>
      </main>
    );
  }

  return (
    <Seo
      title="NordStack Nexus | Digitale løsninger til vækst og effektivitet"
      description="Vi leverer digitale løsninger til vækst og effektivitet til alle virksomheder i hele verden. Se cases, services og kontakt os for at komme i gang."
      ogImage="/opengraph-image.webp"
      url="https://nordstack.dev"
    >
      <div className="relative min-h-screen overflow-x-hidden overflow-y-visible">
        <BackgroundBeams className="pointer-events-none fixed top-0 left-0 w-full h-full z-0" />
        <main className="relative z-10" aria-label="Forside hovedindhold">
          {/* Hero Section */}
          <section
            className="relative flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-32 sm:pt-32 sm:pb-40 min-h-screen"
            aria-labelledby="hero-title"
          >
            <div className="w-full max-w-5xl mx-auto text-center relative z-10 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-8"
              >
                <div className="space-y-6">
                  <h1
                    id="hero-title"
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight tracking-tight"
                  >
                    NordStack Nexus
                  </h1>
                  {/* Mobil: én centreret gul linje, desktop: flere gradient-linjer */}
                  <div className="w-full max-w-2xl mx-auto h-10 relative items-center justify-center mb-8">
                    {/* Mobil version */}
                    <div className="absolute left-1/2 top-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent h-[2px] w-1/2 sm:hidden" />
                    {/* Desktop version */}
                    <div className="hidden sm:block">
                      <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-[#fff200] to-transparent h-[2px] w-3/4 blur-sm" />
                      <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-[#fff200] to-transparent h-px w-3/4" />
                      <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent h-[5px] w-1/4 blur-sm" />
                      <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent h-px w-1/4" />
                    </div>
                  </div>
                  <div className="relative w-full flex flex-row items-center justify-center h-7 mt-0 mb-0 left-12">
                    <FloatingIcons />
                  </div>
                  <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed mt-2">
                    {t("hero.description")}
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
                      {t("hero.cta")}
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-white/30 text-white hover:bg-white/10 hover:border-white hover:scale-105 backdrop-blur-sm px-10 py-6 text-lg font-semibold rounded-xl transition-all duration-300"
                  >
                    <Link to="/contact">{t("hero.contact")}</Link>
                  </Button>
                </div>{" "}
                {/* <-- den manglede lukning her */}
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
                  {t("cases.title")}
                </h2>
                <YellowGradientLine />
                <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  {t("cases.description")}
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
                  {t("cta.title")}
                </h3>
                <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                  {t("cta.description")}
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-8">
                  <Button
                    asChild
                    size="lg"
                    className="bg-[#FFD700] text-black hover:bg-yellow-400 hover:scale-105 px-10 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                  >
                    <Link to={user ? "/dashboard" : "/auth"}>
                      <ArrowRight className="w-5 h-5 mr-2" />
                      {t("cta.ctaButton")}
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-white/30 text-white hover:bg-white/10 hover:border-white hover:scale-105 backdrop-blur-sm px-10 py-6 text-lg font-semibold rounded-xl transition-all duration-300"
                  >
                    <Link to="/contact">{t("cta.contactButton")}</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </section>
        </main>
      </div>
    </Seo>
  );
};

export default Index;
