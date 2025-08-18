import { motion, AnimatePresence } from "framer-motion";
import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";

const Loader = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
  </div>
);

export default function PageTransitionWrapper() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="h-full"
      >
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}
