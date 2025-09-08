import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function Akita() {
  return (
    <div className="max-w-5xl mx-auto py-16 px-6 flex flex-col items-center text-gray-100">
      {/* Overskrift */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl font-bold mb-4 text-center text-white drop-shadow"
      >
        Akita
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
        Akita er en kraftfuld Sales Performance Management platform bygget til
        moderne virksomheder indenfor direct marketing. Platformen hjælper
        ledere med at holde styr på sælgere, performance, leads og kunder – og
        skaber et motiverende men også automatiseret, datadrevet miljø.
      </motion.p>

      {/* Features i kort */}
      <div className="grid gap-6 md:grid-cols-2 w-full max-w-4xl mb-16">
        {[
          "Live dashboard med real-time overblik over salg, aktiviteter og teamets samlede performance, så du hurtigt kan træffe beslutninger.",
          "Registrering af leads, kunder, salg og opfølgninger direkte fra mobilen gennem vores intuitive kundeformular, der sparer tid og minimerer fejl.",
          "Centraliseret styring af salgs-lokationer, så teamet altid er placeret optimalt for maksimal performance.",
          "Automatisk opdaterede data, der giver et komplet overblik over både aktuelle og historiske tal til datadrevet beslutningsstøtte.",
          "Sæt mål, tildel bonusser og giv feedback direkte i systemet, så teamets indsats belønnes og udvikles (under udvikling).",
          "Motiver teamet med gamification, leaderboard, achievements og battles, der skaber engagement og konkurrenceånd (under udvikling).",
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
          Med Akita får du et komplet overblik over din salgsorganisation – live
          og historisk. Spot top-performere, giv støtte til dem der har brug for
          det, og skab Danmarks bedste team i direct marketing.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-lg leading-relaxed"
        >
          <span className="font-semibold text-yellow-300">
            Vil du have mere ud af din salgsorganisation?
          </span>{" "}
          Kontakt os for en demo og hør, hvordan Akita kan styrke jeres direct
          marketing og skabe bedre resultater.
        </motion.p>
      </div>
    </div>
  );
}
