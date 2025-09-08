import React, { useState, useEffect, useMemo, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IphoneMockup } from "@/components/ui/IphoneMockup";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const projects = [
  {
    id: 2,
    titleKey: "projects.akita.title",
    descriptionKey: "projects.akita.description",
    images: [
      "AKITA/AKITA_Login.webp",
      "AKITA/AKITA_Login2.webp",
      "AKITA/AKITA_Dashboard1.webp",
      "AKITA/AKITA_Dashboard2.webp",
      "AKITA/AKITA_Dashboard3.webp",
      "AKITA/AKITA_Dashboard4.webp",
    ],
    link: "/projects/nordstack-akita",
  },
  {
    id: 1,
    titleKey: "projects.pitchnsales.title",
    descriptionKey: "projects.pitchnsales.description",
    images: [
      "/iphone_images/Login.webp",
      "/iphone_images/LogPitchNSale.webp",
      "/iphone_images/Dashboard.webp",
    ],
    link: "/projects/pitch-n-sales",
  },
];
// {
//   id: 3,
//   title: "WebApp Builder",
//   description: "En avanceret platform til at bygge custom web-applikationer. Fra prototyper til færdige løsninger med skalerbare funktioner.",
//   images: [
//     "/iphone_images/IphoneMockup1.png", // Placeholder - replace with actual images
//     "/iphone_images/IphoneMockup2.png",
//     "/iphone_images/IphoneMockup3.png",
//   ],
//   link: "/projects/webapp-builder"
// }

const ProjectCarouselComponent: React.FC = () => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [time, setTime] = useState<string>(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );

  const { t } = useTranslation();
  const currentProject = useMemo(
    () => projects[currentProjectIndex],
    [currentProjectIndex]
  );

  // Auto-rotate images within current project
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % currentProject.images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentProject]);

  // Update time
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentProjectIndex(
      (prev) => (prev - 1 + projects.length) % projects.length
    );
    setCurrentImageIndex(0);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
    setCurrentImageIndex(0);
  }, []);

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="grid gap-12 lg:grid-cols-2 items-center">
        {/* iPhone Mockup */}
        <div className="order-2 lg:order-1 relative flex justify-center">
          <IphoneMockup
            images={currentProject.images}
            imageIndex={currentImageIndex}
            className=""
            style={{}}
          />
        </div>

        {/* Project Info */}
        <motion.div
          key={currentProjectIndex}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="order-1 lg:order-2 space-y-6 text-left"
        >
          <motion.h3
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {t(currentProject.titleKey)}
          </motion.h3>

          <motion.p
            className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {t(currentProject.descriptionKey)}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button className="relative bg-transparent text-white hover:text-[#FFD700] mt-4 px-8 py-4 text-lg font-medium rounded-lg transition group">
              <Link to={currentProject.link} className="flex items-center">
                {t("projects.cta")}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <span className="absolute -bottom-1 left-0 w-full h-[2px] rounded bg-gradient-to-r from-transparent via-[#FFD700] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Navigation */}
      {projects.length > 1 && (
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none">
          <Button
            onClick={goToPrevious}
            className="pointer-events-auto -translate-x-4 bg-black/20 border border-white/10 hover:bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110"
            size="icon"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            onClick={goToNext}
            className="pointer-events-auto translate-x-4 bg-black/20 border border-white/10 hover:bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110"
            size="icon"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      )}

      {/* Project dots indicator */}
      {projects.length > 1 && (
        <div className="flex justify-center mt-8 space-x-3">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={useCallback(() => {
                setCurrentProjectIndex(index);
                setCurrentImageIndex(0);
              }, [])}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentProjectIndex
                  ? "bg-[#FFD700] scale-125 shadow-lg"
                  : "bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const ProjectCarousel = memo(ProjectCarouselComponent);
