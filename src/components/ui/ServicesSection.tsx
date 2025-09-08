import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { YellowGradientLine } from "@/components/ui/YellowGradientLine";
import { Globe, Code2, Palette, Smartphone, Database, Zap } from "lucide-react";

const services = [
  {
    icon: Globe,
    titleKey: "services.web.title",
    descKey: "services.web.description",
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-400",
    border: "border-blue-500/20",
  },
  {
    icon: Code2,
    titleKey: "services.app.title",
    descKey: "services.app.description",
    gradient: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-400",
    border: "border-green-500/20",
  },
  {
    icon: Palette,
    titleKey: "services.design.title",
    descKey: "services.design.description",
    gradient: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
    border: "border-purple-500/20",
  },
  {
    icon: Smartphone,
    titleKey: "services.mobile.title",
    descKey: "services.mobile.description",
    gradient: "from-orange-500/20 to-red-500/20",
    iconColor: "text-orange-400",
    border: "border-orange-500/20",
  },
  {
    icon: Database,
    titleKey: "services.backend.title",
    descKey: "services.backend.description",
    gradient: "from-indigo-500/20 to-blue-600/20",
    iconColor: "text-indigo-400",
    border: "border-indigo-500/20",
  },
  {
    icon: Zap,
    titleKey: "services.seo.title",
    descKey: "services.seo.description",
    gradient: "from-yellow-500/20 to-amber-500/20",
    iconColor: "text-yellow-400",
    border: "border-yellow-500/20",
  },
];

export const ServicesSection: React.FC = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  // Udtræk fornavn fra full_name eller email
  let firstName = "";
  if (user?.user_metadata?.full_name) {
    firstName = user.user_metadata.full_name.split(" ")[0];
  } else if (user?.email) {
    firstName = user.email.split("@")[0];
  }
  return (
    <section id="services" className="pt-32 pb-24 px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t("servicesSection.title", { firstName })}
          </h2>
          <YellowGradientLine />
          {/* Mobil: én centreret gul linje, desktop: flere gradient-linjer */}
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
            {t("servicesSection.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {services.map((service, index) => (
             <motion.div
               key={service.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              className="group relative"
            >
              <div
                className={
                  `relative p-8 rounded-2xl bg-gradient-to-br ${service.gradient} ` +
                  `backdrop-blur-sm border ${service.border} ` +
                  `hover:border-opacity-40 transition-all duration-500 ` +
                  `shadow-lg hover:shadow-2xl hover:shadow-black/20 overflow-hidden ` +
                  `min-h-[340px] flex flex-col`
                }
              >
                {/* Background glow effect */}
                <div
                  className={`
                  absolute inset-0 bg-gradient-to-br ${service.gradient} 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl
                `}
                />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div
                      className={`
                      p-3 rounded-xl bg-black/20 backdrop-blur-sm 
                      group-hover:scale-110 transition-transform duration-300
                    `}
                    >
                      <service.icon
                        className={`h-8 w-8 ${service.iconColor}`}
                      />
                    </div>
                  </div>

                  <h3 className="service-desc-mono text-xl sm:text-2xl font-bold text-white mb-4 group-hover:text-[#FFD700] transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="service-desc-mono text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                    {service.description}
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 group-hover:text-[#FFD700] transition-colors duration-300">
                    {t(service.titleKey)}
                  </h3>

                  <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                    {t(service.descKey)}
                  </p>
                </div>

                {/* Hover border animation */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-[#FFD700]/20 via-transparent to-[#FFD700]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
           <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-[#FFD700]/10 to-[#fff200]/10 backdrop-blur-sm border border-[#FFD700]/20 rounded-2xl px-8 py-6">
             <Zap className="h-6 w-6 text-[#FFD700] animate-pulse" />
             <div>
               <h2 className="text-2xl font-bold text-white mb-2">{t("cta.title")}</h2>
               <p className="text-lg text-white">{t("cta.description")}</p>
             </div>
           </div>
        </motion.div>
      </div>
    </section>
  );
};
