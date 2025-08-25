import React from "react";


const Privacy: React.FC = () => (
  <div className="min-h-screen bg-background py-12 px-2 flex items-center justify-center">
    <div className="w-full max-w-3xl mx-auto bg-card/80 rounded-xl shadow-lg border border-white/10 p-6 md:p-10 text-white">
      <h1 className="text-3xl font-bold mb-4 text-[#FFD700] text-center">Privatlivspolitik for NordStack</h1>
      <p className="mb-6 text-base text-gray-200 text-center">
        Vi værdsætter dit privatliv og er forpligtet til at beskytte dine personoplysninger. Her kan du læse, hvordan NordStack behandler og beskytter dine data.
      </p>

      <ol className="list-decimal pl-6 space-y-6">
        <li>
          <span className="block text-lg font-semibold text-[#FFD700] mb-1">Indsamling af oplysninger</span>
          <span className="text-gray-100">Vi indsamler kun de oplysninger, der er nødvendige for at levere vores tjenester, herunder navn, e-mail og andre relevante data.</span>
        </li>
        <li>
          <span className="block text-lg font-semibold text-[#FFD700] mb-1">Formål med behandling</span>
          <span className="text-gray-100">
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Kundeservice og levering af ydelser (abonnementsadministration, fakturering, support)</li>
              <li>Drift og forbedring af vores hjemmeside (analyse, optimering, cookies)</li>
              <li>Markedsføring (nyhedsbreve og tilbud – kun med samtykke)</li>
            </ul>
          </span>
        </li>
        <li>
          <span className="block text-lg font-semibold text-[#FFD700] mb-1">Typer af personoplysninger</span>
          <span className="text-gray-100">
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Navn, firmanavn og kontaktoplysninger</li>
              <li>CVR-nummer</li>
              <li>Betalingsoplysninger</li>
              <li>IP-adresse og browserdata</li>
              <li>Loginoplysninger til kundesystemer (hvis nødvendigt)</li>
            </ul>
          </span>
        </li>
        <li>
          <span className="block text-lg font-semibold text-[#FFD700] mb-1">Retsgrundlag</span>
          <span className="text-gray-100">
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Opfyldelse af kontrakt (GDPR art. 6, stk. 1, litra b)</li>
              <li>Retlig forpligtelse (fx bogføringsloven – art. 6, stk. 1, litra c)</li>
              <li>Samtykke (art. 6, stk. 1, litra a) for markedsføring</li>
              <li>Legitim interesse (art. 6, stk. 1, litra f) for driftsoptimering</li>
            </ul>
          </span>
        </li>
        <li>
          <span className="block text-lg font-semibold text-[#FFD700] mb-1">Deling af personoplysninger</span>
          <span className="text-gray-100">
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Hostingudbydere</li>
              <li>Underleverandører (fx domæneregistratorer)</li>
              <li>Revisor og bogholder</li>
              <li>Offentlige myndigheder, hvor lovgivningen kræver det</li>
            </ul>
            Alle underleverandører har indgået databehandleraftaler med os.
          </span>
        </li>
        <li>
          <span className="block text-lg font-semibold text-[#FFD700] mb-1">Overførsel til tredjelande</span>
          <span className="text-gray-100">Vi overfører som udgangspunkt ikke dine oplysninger til lande uden for EU/EØS. Hvis det sker (fx ved brug af visse cloudtjenester), sikrer vi gyldigt overførselsgrundlag, typisk EU-Kommissionens standardkontrakter.</span>
        </li>
        <li>
          <span className="block text-lg font-semibold text-[#FFD700] mb-1">Opbevaringsperiode</span>
          <span className="text-gray-100">
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Bogføringsmateriale: 5 år efter regnskabsårets afslutning</li>
              <li>Kundeoplysninger: Slettes senest 12 måneder efter ophør af kundeforhold</li>
              <li>Samtykke til markedsføring: Gemmes, indtil det trækkes tilbage</li>
            </ul>
          </span>
        </li>
        <li>
          <span className="block text-lg font-semibold text-[#FFD700] mb-1">Dine rettigheder</span>
          <span className="text-gray-100">
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Få indsigt i de oplysninger, vi behandler om dig</li>
              <li>Få rettet urigtige oplysninger</li>
              <li>Få slettet oplysninger (“retten til at blive glemt”)</li>
              <li>Begrænse behandlingen</li>
              <li>Modtage dine oplysninger i et struktureret, maskinlæsbart format</li>
              <li>Tilbagekalde samtykke til behandling (fx markedsføring)</li>
            </ul>
            Anmodninger sendes til <a href="mailto:info@nordstack.dk" className="underline text-[#FFD700]">info@nordstack.dk</a>.
          </span>
        </li>
        <li>
          <span className="block text-lg font-semibold text-[#FFD700] mb-1">Sikkerhed</span>
          <span className="text-gray-100">Vi har truffet tekniske og organisatoriske foranstaltninger for at beskytte dine oplysninger mod uautoriseret adgang, ændring, sletning eller offentliggørelse.</span>
        </li>
        <li>
          <span className="block text-lg font-semibold text-[#FFD700] mb-1">Klage</span>
          <span className="text-gray-100">Hvis du ønsker at klage over vores behandling af dine personoplysninger, kan du kontakte:<br />
            Datatilsynet<br />
            Carl Jacobsens Vej 35<br />
            2500 Valby<br />
            <a href="https://www.datatilsynet.dk" className="underline text-[#FFD700]">www.datatilsynet.dk</a>
          </span>
        </li>
        <li>
          <span className="block text-lg font-semibold text-[#FFD700] mb-1">Ændringer i privatlivspolitikken</span>
          <span className="text-gray-100">Vi forbeholder os retten til at opdatere denne politik. Ændringer offentliggøres på vores hjemmeside med ny opdateringsdato.</span>
        </li>
      </ol>
    </div>
  </div>
);

export default Privacy;
