import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Instagram, Linkedin } from "lucide-react";

const CVR = "CVR: 45785513"; // Opdater med jeres rigtige CVR


const Footer: React.FC = () => {
  const location = useLocation();
  const links = [
    { to: "/terms", label: "Handelsbetingelser" },
    { to: "/privacy", label: "Privatlivspolitik" },
    { to: "/tos", label: "Terms of Service" },
  ];
  return (
    <footer className="w-full bg-black/80 text-gray-300 border-t border-white/10 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-1 md:gap-0">
          <span className="font-semibold text-white">NordStack Nexus</span>
          <span className="text-xs text-gray-400 mt-1">{CVR}</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Instagram className="w-6 h-6 hover:text-[#FFD700] transition" />
          </a>
          {/* <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin className="w-6 h-6 hover:text-[#FFD700] transition" />
          </a> */}
        </div>
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-xs">
          {links.map(link => (
            <span key={link.to} className="flex items-center gap-1">
              <Link
                to={link.to}
                className={
                  "hover:text-[#FFD700] transition" +
                  (location.pathname === link.to ? " font-semibold" : "")
                }
              >
                {link.label}
              </Link>
              {location.pathname === link.to && (
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 ml-1" />
              )}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
