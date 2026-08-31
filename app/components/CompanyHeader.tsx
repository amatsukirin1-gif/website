"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, X, Sun, Moon, Briefcase } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { useApplyModal } from "./ApplyProvider";
import Link from "next/link";

export function CompanyHeader() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { theme, toggle } = useTheme();
  const { open } = useApplyModal();

  useEffect(() => {
    if (showMobileMenu) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [showMobileMenu]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setShowMobileMenu(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-40 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg" aria-label="Company — Home">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shrink-0">
              <Heart className="w-4 h-4 sm:w-6 sm:h-6 text-white" aria-hidden="true" />
            </div>
            <span className="font-bold text-sm sm:text-lg hidden sm:block">Company</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6" aria-label="Primary">
            <a href="#about" className="hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded">About</a>
            <a href="#jobs" className="hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded">Jobs</a>
            <a href="#requirements" className="hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded">Requirements</a>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button onClick={toggle} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} className="hidden sm:inline-flex p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
              {theme === "dark" ? <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" aria-hidden="true" /> : <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" aria-hidden="true" />}
            </button>
            <button onClick={() => open()} className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-sm font-semibold hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600">
              <Briefcase className="w-4 h-4" aria-hidden="true" /> Apply Now
            </button>
            <button onClick={() => setShowMobileMenu((v) => !v)} aria-label={showMobileMenu ? "Close menu" : "Open menu"} aria-expanded={showMobileMenu} aria-controls="company-mobile-menu" className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
              {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showMobileMenu && (
          <motion.div id="company-mobile-menu" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-1" aria-label="Mobile">
              <a href="#about" onClick={() => setShowMobileMenu(false)} className="px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors">About</a>
              <a href="#jobs" onClick={() => setShowMobileMenu(false)} className="px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors">Jobs</a>
              <a href="#requirements" onClick={() => setShowMobileMenu(false)} className="px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors">Requirements</a>
              <button onClick={() => { open(); setShowMobileMenu(false); }} className="mt-3 w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold hover:opacity-90 transition-opacity">
                <Briefcase className="w-4 h-4" /> Apply Now
              </button>
              <button onClick={() => { toggle(); setShowMobileMenu(false); }} className="mt-2 flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm">
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />} Switch to {theme === "dark" ? "light" : "dark"} mode
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
