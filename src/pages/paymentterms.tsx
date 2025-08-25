import React from "react";


const Terms: React.FC = () => (
  <div className="min-h-screen bg-background py-12 px-2 flex items-center justify-center">
    <div className="w-full max-w-3xl mx-auto bg-card/80 rounded-xl shadow-lg border border-white/10 p-6 md:p-10 text-white">
      <h1 className="text-3xl font-bold mb-4 text-[#FFD700] text-center">Handelsbetingelser for NordStack</h1>
      <p className="mb-6 text-base text-gray-200 text-center">Disse handelsbetingelser gælder for alle aftaler og ydelser leveret af NordStack. Vi ønsker at gøre det nemt, trygt og overskueligt at være kunde hos os.</p>

      <ol className="list-decimal pl-6 space-y-6">
        <li>
          <span className="block text-lg font-semibold text-[#FFD700] mb-1">Vores ydelser</span>
          <span className="text-gray-100">NordStack tilbyder cloud hosting, domæneregistrering, drift, overvågning, sikkerhed og support. Detaljer om din løsning fremgår af din ordrebekræftelse eller abonnementsaftale.</span>
        </li>
        <li>
          <span className="block text-lg font-semibold text-[#FFD700] mb-1">Aftale og oprettelse</span>
          <span className="text-gray-100">En aftale er indgået, når du modtager en skriftlig bekræftelse fra NordStack. Ved bestilling accepterer du disse betingelser.</span>
        </li>
        <li>
          <span className="block text-lg font-semibold text-[#FFD700] mb-1">Betaling</span>
          <span className="text-gray-100">Du faktureres forud månedligt eller årligt, afhængigt af din aftale. Betaling skal ske senest 8 dage efter fakturadato. Ved forsinket betaling kan vi opkræve rykkergebyr og renter. Manglende betaling kan medføre midlertidig lukning af dine tjenester.</span>
        </li>
        <li>
          <span className="block text-lg font-semibold text-[#FFD700] mb-1">Dine forpligtelser</span>
          <span className="text-gray-100">Du skal oplyse korrekte kontakt- og virksomhedsoplysninger, overholde gældende lovgivning og ikke bruge vores tjenester til ulovlige formål. Du er ansvarlig for at beskytte dine loginoplysninger.</span>
        </li>
        <li>
          <span className="block text-lg font-semibold text-[#FFD700] mb-1">Brugsret og ejerskab</span>
          <span className="text-gray-100">Du får adgang til vores platform og software i abonnementsperioden. Alt indhold du selv leverer, tilhører dig. Kode og systemer udviklet af NordStack forbliver vores ejendom, medmindre andet er aftalt.</span>
        </li>
        <li>
          <span className="block text-lg font-semibold text-[#FFD700] mb-1">Oppetid og vedligehold</span>
          <span className="text-gray-100">Vi tilstræber 99,9% oppetid hver måned. Planlagt vedligeholdelse varsles minimum 48 timer i forvejen. SLA-detaljer kan aftales særskilt.</span>
        </li>
        <li>
          <span className="block text-lg font-semibold text-[#FFD700] mb-1">Support</span>
          <span className="text-gray-100">Du kan kontakte vores support mandag–fredag kl. 09:00–16:00. Kritiske fejl forsøges løst hurtigst muligt. Support uden for åbningstid kan aftales særskilt.</span>
        </li>
        <li>
          <span className="block text-lg font-semibold text-[#FFD700] mb-1">Ansvar</span>
          <span className="text-gray-100">NordStack er ikke ansvarlig for indirekte tab, driftstab eller tab af data, medmindre det skyldes grov uagtsomhed. Kompensation ved overskridelse af SLA kan maksimalt udgøre én måneds abonnementsbetaling. Vi er ikke ansvarlige for fejl fra tredjepartsleverandører eller kundens egne systemer.</span>
        </li>
        <li>
          <span className="block text-lg font-semibold text-[#FFD700] mb-1">Opsigelse</span>
          <span className="text-gray-100">Du kan opsige dit abonnement med 30 dages skriftligt varsel til udgangen af en betalingsperiode. Dine data slettes 14 dage efter ophør, medmindre andet er aftalt.</span>
        </li>
        <li>
          <span className="block text-lg font-semibold text-[#FFD700] mb-1">Ændringer</span>
          <span className="text-gray-100">Vi kan ændre disse betingelser med 30 dages varsel. Du får besked via e-mail og/eller på vores hjemmeside.</span>
        </li>
        <li>
          <span className="block text-lg font-semibold text-[#FFD700] mb-1">Databeskyttelse</span>
          <span className="text-gray-100">Vi behandler dine personoplysninger i overensstemmelse med GDPR og vores privatlivspolitik. Hvis vi behandler data på dine vegne, indgår vi en databehandleraftale.</span>
        </li>
        <li>
          <span className="block text-lg font-semibold text-[#FFD700] mb-1">Lovvalg og tvister</span>
          <span className="text-gray-100">Aftalen er underlagt dansk ret. Eventuelle tvister afgøres ved byretten i NordStacks hjemting.</span>
        </li>
      </ol>
    </div>
  </div>
);

export default Terms;
