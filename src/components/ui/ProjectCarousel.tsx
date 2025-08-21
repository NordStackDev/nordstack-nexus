import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Wifi, Signal, Battery } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Pitch 'N Sales",
    description: "Pitch 'N Sales gør det nemt at præsentere, dele og lukke salg direkte fra din mobil. Bygget som en moderne web-app med fokus på brugervenlighed.",
    images: [
      "/iphone_images/IphoneMockup1.png",
      "/iphone_images/IphoneMockup2.png",
      "/iphone_images/IphoneMockup3.png",
    ],
    link: "/projects/pitch-n-sales"
  },
  {
    id: 2,
    title: "NordStack CRM",
    description: "Et kraftfuldt CRM-system bygget til moderne virksomheder. Administrer kunder, leads og salgsprocesser alt sammen på ét sted.",
    images: [
      "/iphone_images/IphoneMockup1.png", // Placeholder - replace with actual images
      "/iphone_images/IphoneMockup2.png",
      "/iphone_images/IphoneMockup3.png",
    ],
    link: "/projects/nordstack-crm"
  },
  {
    id: 3,
    title: "WebApp Builder",
    description: "En avanceret platform til at bygge custom web-applikationer. Fra prototyper til færdige løsninger med skalerbare funktioner.",
    images: [
      "/iphone_images/IphoneMockup1.png", // Placeholder - replace with actual images
      "/iphone_images/IphoneMockup2.png",
      "/iphone_images/IphoneMockup3.png",
    ],
    link: "/projects/webapp-builder"
  }
];

export const ProjectCarousel: React.FC = () => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [time, setTime] = useState<string>(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );

  const currentProject = projects[currentProjectIndex];

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
      setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);
    setCurrentImageIndex(0);
  };

  const goToNext = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
    setCurrentImageIndex(0);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="grid gap-12 lg:grid-cols-2 items-center">
        {/* iPhone Mockup */}
        <div className="order-2 lg:order-1 relative flex justify-center">
          <motion.div
            key={currentProjectIndex}
            className="relative w-64 h-[520px] perspective-[2000px]"
            initial={{ rotateY: -12, rotateX: 6, opacity: 0, scale: 0.8 }}
            animate={{ rotateY: -12, rotateX: 6, opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
            whileHover={{ rotateY: -18, rotateX: 10, scale: 1.05 }}
          >
            {/* Phone frame */}
            <div className="relative w-full h-full rounded-[3rem] bg-black shadow-[0_30px_80px_rgba(0,0,0,0.7)] border-[6px] border-gray-700 overflow-hidden">
              {/* Screen content */}
              <div className="absolute inset-0 bg-white rounded-[2.7rem] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`${currentProjectIndex}-${currentImageIndex}`}
                    src={currentProject.images[currentImageIndex]}
                    alt={`${currentProject.title} Screenshot`}
                    initial={{ y: 120, scale: 1.1, opacity: 0, rotateX: -20 }}
                    animate={{ y: 0, scale: 1, opacity: 1, rotateX: 0 }}
                    exit={{ y: -120, scale: 0.95, opacity: 0, rotateX: 20 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-contain p-4 drop-shadow-2xl"
                  />
                </AnimatePresence>

                {/* Status bar */}
                <div className="absolute top-2.5 left-4 right-0 flex items-center justify-between px-4 text-[12px] font-semibold text-black">
                  <span className="tracking-tight">{time}</span>
                  <div className="flex items-center space-x-1">
                    <Signal size={14} strokeWidth={2.2} className="text-black" />
                    <Wifi size={14} strokeWidth={2.2} className="text-black" />
                    <Battery size={18} strokeWidth={2.2} className="text-black" />
                  </div>
                </div>
              </div>

              {/* Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full shadow-inner" />

              {/* Home indicator */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-28 h-1.5 bg-black/40 rounded-full" />
            </div>

            {/* Glow behind phone */}
            <div className="absolute -inset-3 bg-gradient-to-b from-[#fff200]/50 via-[#fff200]/50 to-[#fff200]/50 rounded-[4rem] -z-10"/>
          </motion.div>
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
            {currentProject.title}
          </motion.h3>
          
          <motion.p 
            className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {currentProject.description}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button className="relative bg-transparent text-white hover:text-[#FFD700] mt-4 px-8 py-4 text-lg font-medium rounded-lg transition group">
              <Link
                to={currentProject.link}
                className="flex items-center"
              >
                Læs mere
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <span className="absolute -bottom-1 left-0 w-full h-[2px] rounded bg-gradient-to-r from-transparent via-[#FFD700] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Navigation */}
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

      {/* Project dots indicator */}
      <div className="flex justify-center mt-8 space-x-3">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentProjectIndex(index);
              setCurrentImageIndex(0);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentProjectIndex 
                ? 'bg-[#FFD700] scale-125 shadow-lg' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};