import React from "react";

export default function PitchNSales() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center text-yellow-300 drop-shadow">
        Pitch n Sales
      </h1>
      <p className="mb-8 text-lg text-center text-gray-200">
        Pitch n Sales er et specialiseret værktøj til virksomheder, der arbejder
        med direct marketing og opsøgende salg – særligt til teams, der står på
        gaden, i butikker eller ringer ud til kunder. Platformen er udviklet med
        fokus på at gøre det nemt for teamledere at holde styr på deres sælgere,
        følge op på performance og skabe et motiverende, datadrevet miljø for
        hele salgsstyrken.
      </p>
      <div className="space-y-6 text-gray-100 text-base leading-relaxed">
        <p>
          Med Pitch n Sales får du et komplet overblik over dit salgs-team –
          live og historisk. Teamleads kan nemt følge med i, hvor mange pitches
          og salg hver medarbejder laver, se udvikling over tid og spotte både
          top-performere og dem, der har brug for ekstra støtte eller træning.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Live dashboard med real-time statistik for hele teamet og den
            enkelte sælger
          </li>
          <li>
            Registrering af pitches, salg og opfølgninger direkte fra mobilen –
            nemt for sælgeren, værdifuldt for lederen
          </li>
          <li>
            Indbygget gamification og leaderboard, der motiverer og engagerer
          </li>
          <li>
            Mulighed for at sætte mål, bonusser og give feedback direkte i
            systemet (under udvikling)
          </li>
          {/* <li>
            Detaljerede rapporter, så du kan optimere træning, planlægning og
            rekruttering
          </li> */}
        </ul>
        <p>
          Pitch n Sales er bygget til at gøre hverdagen lettere for både ledere
          og sælgere. Alt data samles ét sted, så du slipper for regneark og
          manuelle opgørelser. Platformen kan tilpasses jeres behov – uanset om
          I er 5 eller 500 på holdet.
        </p>
        <p>
          <span className="font-semibold text-yellow-300">
            Vil du have mere ud af dit salgs-team?
          </span>{" "}
          Kontakt os for en demo eller for at høre, hvordan Pitch n Sales kan
          styrke jeres direct marketing og skabe bedre resultater – både for
          virksomheden og medarbejderne.
        </p>
      </div>
    </div>
  );
}
