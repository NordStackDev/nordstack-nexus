import React from "react";

const Terms: React.FC = () => (
  <div className="min-h-screen py-12 px-4 flex items-center justify-center">
    <div className="w-full max-w-4xl mx-auto bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8 md:p-12 text-white">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center tracking-tight">
        Generelle Handelsbetingelser – Nordstack I/S
      </h1>

      {/* Sektioner */}
      {[
        {
          title: "1. Anvendelse",
          content: (
            <p className="mb-6 text-gray-200">
              Disse handelsbetingelser gælder for alle leverancer, salg og
              ydelser leveret af Nordstack I/S (“Nordstack”, “vi”, “os”),
              medmindre andet er skriftligt aftalt mellem parterne.
            </p>
          ),
        },
        {
          title: "2. Tilbud og aftaler",
          content: (
            <ul className="list-disc list-inside mb-6 space-y-2 text-gray-200">
              <li>
                Alle tilbud fra Nordstack er gældende i 30 dage fra tilbudsdato,
                medmindre andet fremgår.
              </li>
              <li>
                En bindende aftale anses for indgået, når kunden skriftligt har
                accepteret tilbuddet, eller når Nordstack har påbegyndt
                leverancen.
              </li>
            </ul>
          ),
        },
        {
          title: "3. Priser og betaling",
          content: (
            <ul className="list-disc list-inside mb-6 space-y-2 text-gray-200">
              <li>
                Alle priser er angivet i DKK ekskl. moms, medmindre andet er
                oplyst.
              </li>
              <li>
                Betalingsfristen er 14 dage netto fra fakturadato, medmindre
                andet er aftalt.
              </li>
              <li>
                Ved forsinket betaling pålægges renter i henhold til renteloven
                samt evt. rykkergebyrer.
              </li>
            </ul>
          ),
        },
        {
          title: "4. Levering og ydelser",
          content: (
            <ul className="list-disc list-inside mb-6 space-y-2 text-gray-200">
              <li>Leveringstidspunktet fastsættes efter aftale.</li>
              <li>Eventuelle forsinkelser meddeles straks.</li>
              <li>
                Nordstack er ikke ansvarlig for forsinkelser, der skyldes
                forhold uden for vores kontrol (force majeure).
              </li>
            </ul>
          ),
        },
        {
          title: "5. Kundens forpligtelser",
          content: (
            <ul className="list-disc list-inside mb-6 space-y-2 text-gray-200">
              <li>
                Kunden skal give Nordstack adgang til alle nødvendige
                oplysninger, materialer og systemer for at kunne levere ydelsen.
              </li>
              <li>
                Kunden er ansvarlig for lovligheden af indhold, data og
                materiale, der stilles til rådighed.
              </li>
            </ul>
          ),
        },
        {
          title: "6. Immaterielle rettigheder",
          content: (
            <ul className="list-disc list-inside mb-6 space-y-2 text-gray-200">
              <li>
                Nordstack beholder ejerskab og ophavsret til egne koncepter,
                software og værktøjer.
              </li>
              <li>
                Kunden opnår en brugsret til de løsninger, der udvikles
                specifikt til kunden, når betaling er fuldt gennemført.
              </li>
            </ul>
          ),
        },
        {
          title: "7. Ansvarsbegrænsning",
          content: (
            <ul className="list-disc list-inside mb-6 space-y-2 text-gray-200">
              <li>
                Nordstack er ikke ansvarlig for indirekte tab, herunder
                driftstab, tabt fortjeneste eller datatab.
              </li>
              <li>
                Vores samlede ansvar er begrænset til det beløb, kunden har
                betalt for den pågældende ydelse i de seneste 12 måneder.
              </li>
            </ul>
          ),
        },
        {
          title: "8. Fortrolighed",
          content: (
            <p className="mb-6 text-gray-200">
              Parterne forpligter sig til at behandle alle oplysninger, som ikke
              er offentligt kendte, fortroligt.
            </p>
          ),
        },
        {
          title: "9. Opsigelse og ophør",
          content: (
            <ul className="list-disc list-inside mb-6 space-y-2 text-gray-200">
              <li>
                Aftaler om løbende ydelser kan opsiges med 3 måneders varsel til
                udgangen af en måned, medmindre andet er aftalt.
              </li>
              <li>
                Ved kundens væsentlige misligholdelse kan Nordstack ophæve
                aftalen uden varsel.
              </li>
            </ul>
          ),
        },
        {
          title: "10. Force majeure",
          content: (
            <p className="mb-6 text-gray-200">
              Nordstack er ikke ansvarlig for manglende opfyldelse af aftaler,
              hvis dette skyldes forhold uden for vores rimelige kontrol,
              herunder men ikke begrænset til: strømsvigt, nedbrud hos
              hostingudbydere, krig, strejke, naturkatastrofer m.m.
            </p>
          ),
        },
        {
          title: "11. Tvister og lovvalg",
          content: (
            <ul className="list-disc list-inside mb-6 space-y-2 text-gray-200">
              <li>Handelsbetingelserne er underlagt dansk ret.</li>
              <li>
                Tvister afgøres ved danske domstole med Københavns Byret som
                værneting.
              </li>
            </ul>
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

export default Terms;
