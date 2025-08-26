import React from "react";

const CookiePolicy: React.FC = () => (
  <div className="min-h-screen py-12 px-4 flex items-center justify-center">
    <div className="w-full max-w-4xl mx-auto bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8 md:p-12 text-white">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center tracking-tight">
        Cookiepolitik – Nordstack
      </h1>

      {/* Sektioner */}
      {[
        {
          title: "1. Hvad er cookies?",
          content: (
            <p className="mb-6 text-gray-200">
              Cookies er små tekstfiler, der gemmes på din computer, tablet
              eller mobiltelefon, når du besøger en hjemmeside. Cookies gør det
              muligt at genkende din enhed, huske dine indstillinger, udføre
              statistik og målrette indhold og annoncer.
            </p>
          ),
        },
        {
          title: "2. Sådan bruger vi cookies",
          content: (
            <ul className="list-disc list-inside mb-6 space-y-2 text-gray-200">
              <li>
                <strong>Nødvendige cookies:</strong> Bruges for at få
                hjemmesiden til at fungere korrekt, fx login og sikkerhed.
              </li>
              <li>
                <strong>Præferencecookies:</strong> Bruges til at huske dine
                indstillinger, fx sprogvalg eller formularoplysninger.
              </li>
              <li>
                <strong>Statistikcookies:</strong> Bruges til at analysere,
                hvordan vores hjemmeside anvendes, så vi kan forbedre
                funktionalitet og indhold (fx Google Analytics).
              </li>
              <li>
                <strong>Marketingcookies:</strong> Bruges til at målrette
                annoncer og måle effektiviteten af vores markedsføring (fx
                Google Ads, Facebook Pixel).
              </li>
            </ul>
          ),
        },
        {
          title: "3. Samtykke til cookies",
          content: (
            <p className="mb-6 text-gray-200">
              Når du besøger vores hjemmeside første gang, bliver du bedt om at
              give samtykke via vores cookie-banner. Du kan altid ændre eller
              trække dit samtykke tilbage ved at justere indstillingerne i
              banneret eller i din browser.
            </p>
          ),
        },
        {
          title: "4. Hvor længe gemmes cookies?",
          content: (
            <p className="mb-6 text-gray-200">
              Cookies gemmes i en bestemt periode afhængigt af formålet. Nogle
              slettes automatisk, når du lukker browseren (sessionscookies),
              mens andre kan blive gemt i længere tid (persistente cookies).
            </p>
          ),
        },
        {
          title: "5. Tredjeparter",
          content: (
            <p className="mb-6 text-gray-200">
              Vi anvender cookies fra tredjeparter (fx Google, Meta/Facebook),
              som kan kombinere dine oplysninger med andre data, du har givet
              til dem, eller som de har indsamlet via din brug af deres
              tjenester.
            </p>
          ),
        },
        {
          title: "6. Hvordan undgår du cookies?",
          content: (
            <p className="mb-6 text-gray-200">
              Du kan altid blokere eller slette cookies på din enhed ved at
              ændre indstillingerne i din browser. Vær dog opmærksom på, at
              visse funktioner på hjemmesiden kan stoppe med at virke, hvis du
              afviser cookies.
            </p>
          ),
        },
        {
          title: "7. Ændringer",
          content: (
            <p className="mb-6 text-gray-200">
              Vi kan til enhver tid ændre denne cookiepolitik. Den seneste
              version er altid tilgængelig på vores hjemmeside.
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

export default CookiePolicy;
