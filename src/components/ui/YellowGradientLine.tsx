import React from "react";

export const YellowGradientLine = () => (
  <div className="w-full max-w-2xl mx-auto h-8 sm:h-10 relative flex items-center justify-center mb-6 sm:mb-8">
    {/* Mobil: én centreret gul linje, lidt tykkere og mindre blur */}
    <div className="absolute left-1/2 top-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent h-[3px] w-2/3 blur-[2px] rounded sm:hidden" />
    {/* Desktop: */}
    <div className="hidden sm:block">
      <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-[#fff200] to-transparent h-[2px] w-3/4 blur-sm" />
      <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-[#fff200] to-transparent h-px w-3/4" />
      <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent h-[5px] w-1/4 blur-sm" />
      <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent h-px w-1/4" />
    </div>
  </div>
);
