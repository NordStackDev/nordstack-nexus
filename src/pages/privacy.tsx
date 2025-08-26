import React from "react";

const Privacy: React.FC = () => (
  <div className="min-h-screen py-12 px-4 flex items-center justify-center">
    <div className="w-full max-w-4xl mx-auto bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8 md:p-12 text-white">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center tracking-tight">
        Privatlivspolitik – Nordstack
      </h1>
      <p className="mb-6 font-semibold text-gray-300 text-center">(GDPR)</p>
      <p className="mb-8 text-gray-200 leading-relaxed">
        Nordstack I/S (“Nordstack”, “vi”, “os”, “vores”) tager beskyttelse af
        dine personoplysninger alvorligt. Denne privatlivspolitik beskriver,
        hvordan vi indsamler, bruger, lagrer og beskytter dine oplysninger i
        overensstemmelse med Databeskyttelsesforordningen (GDPR).
      </p>

      {[
        {
          title: "1. Dataansvarlig",
          content: (
            <>
              <p className="mb-4 text-gray-200">
                <strong>Nordstack I/S</strong>
                <br />
                CVR: 45785513
                <br />
                Adresse: Borgergade 31, Aalborg
                <br />
                E-mail:{" "}
                <a
                  href="mailto:NordStack@outlook.dk"
                  className="underline text-blue-400 hover:text-blue-500 transition"
                >
                  NordStack@outlook.dk
                </a>
              </p>
              <p className="mb-6 text-gray-200">
                Vi er dataansvarlig for behandlingen af personoplysninger i
                forbindelse med levering af vores IT-løsninger og
                hjemmesidetjenester.
              </p>
            </>
          ),
        },
        {
          title: "2. Hvilke oplysninger indsamler vi?",
          content: (
            <ul className="list-disc list-inside mb-6 space-y-2 text-gray-200">
              <li>
                Kontaktoplysninger: navn, e-mail, telefonnummer, virksomhed.
              </li>
              <li>
                Kundeoplysninger: faktureringsadresse, betalingsoplysninger.
              </li>
              <li>
                Tekniske data: IP-adresse, browserinformation, loginoplysninger.
              </li>
              <li>
                Projektdata: indhold og filer du deler i forbindelse med
                levering af vores løsninger.
              </li>
            </ul>
          ),
        },
        {
          title: "3. Formål med behandlingen",
          content: (
            <ul className="list-disc list-inside mb-6 space-y-2 text-gray-200">
              <li>
                Levering af bestilte ydelser (hjemmesider, IT-løsninger,
                support).
              </li>
              <li>Fakturering og regnskab.</li>
              <li>Kundeservice og kommunikation.</li>
              <li>Forbedring og udvikling af vores tjenester.</li>
              <li>Overholdelse af lovkrav.</li>
            </ul>
          ),
        },
        {
          title: "4. Retsgrundlag",
          content: (
            <ul className="list-disc list-inside mb-6 space-y-2 text-gray-200">
              <li>
                GDPR artikel 6(1)(b): Behandling er nødvendig for at opfylde en
                kontrakt.
              </li>
              <li>
                GDPR artikel 6(1)(c): Behandling er nødvendig for at overholde
                retlige forpligtelser.
              </li>
              <li>
                GDPR artikel 6(1)(f): Behandling er nødvendig for legitime
                interesser (fx drift og sikkerhed).
              </li>
            </ul>
          ),
        },
        {
          title: "5. Videregivelse af oplysninger",
          content: (
            <p className="mb-6 text-gray-200">
              Vi videregiver kun oplysninger til tredjeparter, når det er
              nødvendigt:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>IT- og hostingpartnere.</li>
                <li>Betalingsudbydere.</li>
                <li>Offentlige myndigheder, hvor loven kræver det.</li>
              </ul>
              Alle databehandlere indgår en databehandleraftale (DPA) med os,
              som sikrer GDPR-overholdelse.
            </p>
          ),
        },
        {
          title: "6. Opbevaring og sletning",
          content: (
            <ul className="list-disc list-inside mb-6 space-y-2 text-gray-200">
              <li>
                Kundeforhold: Opbevares i op til 5 år jf. bogføringsloven.
              </li>
              <li>
                Projektdata: Slettet ved kontraktens ophør, medmindre andet er
                aftalt.
              </li>
              <li>Nyhedsbreve: Slettes ved afmelding.</li>
            </ul>
          ),
        },
        {
          title: "7. Dine rettigheder",
          content: (
            <>
              <ul className="list-disc list-inside mb-4 space-y-2 text-gray-200">
                <li>Ret til indsigt i dine oplysninger.</li>
                <li>Ret til berigtigelse (rettelse).</li>
                <li>Ret til sletning (“retten til at blive glemt”).</li>
                <li>Ret til begrænsning af behandling.</li>
                <li>Ret til dataportabilitet.</li>
                <li>Ret til at gøre indsigelse mod behandling.</li>
              </ul>
              <p className="mb-6 text-gray-200">
                Du kan udøve dine rettigheder ved at kontakte os på{" "}
                <a
                  href="mailto:NordStack@outlook.dk"
                  className="underline text-blue-400 hover:text-blue-500 transition"
                >
                  NordStack@outlook.dk
                </a>
                .
              </p>
            </>
          ),
        },
        {
          title: "8. Datasikkerhed",
          content: (
            <p className="mb-6 text-gray-200">
              Vi anvender tekniske og organisatoriske foranstaltninger for at
              beskytte dine oplysninger, herunder kryptering, adgangskontrol og
              løbende sikkerhedsopdateringer.
            </p>
          ),
        },
        {
          title: "9. Overførsel til tredjelande",
          content: (
            <p className="mb-6 text-gray-200">
              Vi bestræber os på at opbevare data inden for EU/EØS. Hvis data
              overføres udenfor EU/EØS, sikrer vi overholdelse via EU’s
              standardkontraktbestemmelser (SCC) eller tilsvarende
              beskyttelsesniveau.
            </p>
          ),
        },
        {
          title: "10. Cookies",
          content: (
            <p className="mb-6 text-gray-200">
              Hvis vi anvender cookies på vores hjemmeside, vil du blive
              informeret via et cookie-banner og henvist til en særskilt
              cookiepolitik.
            </p>
          ),
        },
        {
          title: "11. Klageadgang",
          content: (
            <p className="mb-6 text-gray-200">
              Hvis du ønsker at klage over vores behandling af dine
              personoplysninger, kan du kontakte:
              <br />
              <strong>Datatilsynet</strong>
              <br />
              Carl Jacobsens Vej 35
              <br />
              2500 Valby
              <br />
              <a
                href="https://www.datatilsynet.dk"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-400 hover:text-blue-500 transition"
              >
                www.datatilsynet.dk
              </a>
            </p>
          ),
        },
        {
          title: "12. Ændringer",
          content: (
            <p className="mb-6 text-gray-200">
              Vi kan opdatere denne privatlivspolitik fra tid til anden. Den
              seneste version vil altid være tilgængelig på vores hjemmeside.
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

export default Privacy;
