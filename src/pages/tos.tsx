import React from "react";

const Tos: React.FC = () => (
  <div className="min-h-screen py-12 px-4 flex items-center justify-center">
    <div className="w-full max-w-4xl mx-auto bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8 md:p-12 text-white">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center tracking-tight">
        Terms of Service – Nordstack
      </h1>

      {/* Sektioner */}
      {[
        {
          title: "1. Definitioner",
          content: (
            <ul className="list-disc list-inside mb-6 space-y-2 text-gray-200">
              <li>“Virksomhed”, “vi”, “os”: Nordstack ApS.</li>
              <li>
                “Du”, “Bruger”, “Kunde”: Den person eller juridiske enhed, der
                bruger vores Tjenester.
              </li>
              <li>
                “Tjenester”: Alle IT-løsninger, webudvikling og vedligeholdelse
                leveret af Nordstack.
              </li>
            </ul>
          ),
        },
        {
          title: "2. Accept af vilkår",
          content: (
            <p className="mb-6 text-gray-200">
              Ved at klikke på “Jeg accepterer” eller ved at bruge vores
              Tjenester erklærer du, at du har læst, forstået og accepterer
              disse vilkår. Vi forbeholder os retten til at ændre ToS med
              forudgående besked.
            </p>
          ),
        },
        {
          title: "3. Konto og adgang",
          content: (
            <p className="mb-6 text-gray-200">
              Hvis adgang til Tjenester kræver konto, er du ansvarlig for at
              opretholde dens sikkerhed. Nordstack er ikke ansvarlig for
              aktiviteter, der udføres via din konto.
            </p>
          ),
        },
        {
          title: "4. Priser og betaling",
          content: (
            <p className="mb-6 text-gray-200">
              Prisfastsættelse fremgår af tilbud eller faktura. Alle priser er
              ekskl. moms. Betaling sker iht. aftale. Prisændringer kan ske med
              varsel.
            </p>
          ),
        },
        {
          title: "5. Intellektuel Ejendomsret",
          content: (
            <p className="mb-6 text-gray-200">
              Nordstack beholder ejerskab af alt materiale, herunder software,
              design og logoer. Du beholder ejerskab over dine data, men giver
              Nordstack en licens til at bruge dem til leverance af Tjenester.
            </p>
          ),
        },
        {
          title: "6. Brugeradfærd og ansvar",
          content: (
            <p className="mb-6 text-gray-200">
              Du må ikke krænke ophavsret, sprede skadeligt indhold, hacke eller
              forstyrre Tjenester. Overtrædelser kan føre til suspension eller
              ophør uden varsel.
            </p>
          ),
        },
        {
          title: "7. Ansvarsbegrænsning",
          content: (
            <p className="mb-6 text-gray-200">
              Tjenester leveres 'som de er' uden garantier. Nordstack er ikke
              ansvarlig for tab af data eller driftstab. Maksimalt ansvar
              begrænses til det beløb, du har betalt de seneste 12 måneder.
            </p>
          ),
        },
        {
          title: "8. Ophør",
          content: (
            <p className="mb-6 text-gray-200">
              Du kan til enhver tid ophøre med brugen af Tjenester. Vi kan
              opsige adgang ved alvorlige brud. Ved ophør kan data slettes.
            </p>
          ),
        },
        {
          title: "9. Ændringer af ToS",
          content: (
            <p className="mb-6 text-gray-200">
              Vi kan opdatere ToS efter behov. Væsentlige ændringer meddeles via
              e-mail eller hjemmeside. Fortsat brug betyder accept af ændringer.
            </p>
          ),
        },
        {
          title: "10. Lovvalg og tvister",
          content: (
            <p className="mb-6 text-gray-200">
              Disse ToS er underlagt dansk ret. Tvister afgøres ved danske
              domstole med Københavns Byret som værneting.
            </p>
          ),
        },
      ].map((section, idx) => (
        <div key={idx}>
          <h2 className="text-2xl md:text-3xl font-bold mt-10 mb-4 text-gradient-to-r from-blue-400 to-purple-400">
            {section.title}
          </h2>
          {section.content}
        </div>
      ))}

      <p className="mt-10 text-gray-500 text-center text-sm">
        &copy; {new Date().getFullYear()} Nordstack I/S. Alle rettigheder
        forbeholdes.
      </p>
    </div>
  </div>
);

export default Tos;
