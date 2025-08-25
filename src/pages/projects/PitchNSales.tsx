import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function PitchNSales() {
  return (
    <div className="max-w-5xl mx-auto py-16 px-6 flex flex-col items-center text-gray-100">
      {/* Overskrift */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl font-bold mb-4 text-center text-white drop-shadow"
      >
        Pitch 'n Sales
      </motion.h1>

      {/* Dekorativ streg */}
      <div className="relative w-full flex justify-center mb-10">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-yellow-400 to-transparent h-[3px] w-1/2" />
      </div>

      {/* Intro tekst */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mb-12 text-lg text-center max-w-3xl leading-relaxed text-gray-200"
      >
        Pitch 'n Sales er et specialiseret værktøj til virksomheder, der
        arbejder med direct marketing og opsøgende salg. Platformen hjælper
        teamledere med at holde styr på deres sælgere, følge performance og
        skabe et motiverende, datadrevet miljø.
      </motion.p>

      {/* Features i kort */}
      <div className="grid gap-6 md:grid-cols-2 w-full max-w-4xl mb-16">
        {[
          "Live dashboard med real-time statistik for hele teamet og den enkelte sælger",
          "Registrering af pitches, salg og opfølgninger direkte fra mobilen",
          "Indbygget gamification og leaderboard, der motiverer og engagerer",
          "Mulighed for at sætte mål, bonusser og give feedback direkte i systemet (under udvikling)",
        ].map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
          >
            <Card className="bg-gray-800 border border-gray-700 shadow-lg h-full flex">
              <CardContent className="flex items-start gap-3 p-6">
                <CheckCircle className="w-6 h-6 text-yellow-400 shrink-0 mt-1" />
                <p className="text-gray-200 text-base leading-snug">
                  {feature}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Afsluttende tekst */}
      <div className="space-y-6 text-center max-w-2xl">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-lg leading-relaxed"
        >
          Med Pitch 'n Sales får du et komplet overblik over dit salgs-team –
          live og historisk. Spot top-performere, giv støtte til dem der har
          brug for det, og slip for manuelle regneark.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-lg leading-relaxed"
        >
          <span className="font-semibold text-yellow-300">
            Vil du have mere ud af dit salgs-team?
          </span>{" "}
          Kontakt os for en demo og hør, hvordan Pitch 'n Sales kan styrke jeres
          direct marketing og skabe bedre resultater.
        </motion.p>
      </div>
    </div>
  );
}
