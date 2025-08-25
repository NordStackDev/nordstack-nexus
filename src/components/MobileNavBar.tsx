import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, User, ShieldCheck, FileText, LogIn, LogOut, Shield } from "lucide-react";

// Props for auth state/actions
interface MobileNavBarProps {
  isAuthenticated?: boolean;
  isAdmin?: boolean;
  onLogout?: () => void;
}

const MobileNavBar: React.FC<MobileNavBarProps> = ({ isAuthenticated, isAdmin, onLogout }) => {
  const location = useLocation();
  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95vw] max-w-md bg-card/90 border border-white/10 rounded-2xl shadow-xl flex justify-around items-center py-2 px-2 backdrop-blur-md md:hidden">
      <Link to="/" className={`flex flex-col items-center text-xs font-medium px-2 py-1 transition-colors duration-150 ${location.pathname === "/" ? "text-[#FFD700]" : "text-gray-200 hover:text-[#FFD700]"}`}>
        <Home size={22} />
        <span className="mt-0.5">Hjem</span>
      </Link>
      {isAuthenticated ? (
        <>
          {isAdmin && (
            <Link to="/admin" className={`flex flex-col items-center text-xs font-medium px-2 py-1 transition-colors duration-150 ${location.pathname === "/admin" ? "text-[#FFD700]" : "text-gray-200 hover:text-[#FFD700]"}`}>
              <Shield size={22} />
              <span className="mt-0.5">Admin</span>
            </Link>
          )}
          <button onClick={onLogout} className="flex flex-col items-center text-xs font-medium px-2 py-1 text-gray-200 hover:text-[#FFD700] transition-colors duration-150">
            <LogOut size={22} />
            <span className="mt-0.5">Log ud</span>
          </button>
        </>
      ) : (
        <Link to="/auth" className={`flex flex-col items-center text-xs font-medium px-2 py-1 transition-colors duration-150 ${location.pathname === "/auth" ? "text-[#FFD700]" : "text-gray-200 hover:text-[#FFD700]"}`}>
          <LogIn size={22} />
          <span className="mt-0.5">Log ind</span>
        </Link>
      )}
    </nav>
  );
};

export default MobileNavBar;
