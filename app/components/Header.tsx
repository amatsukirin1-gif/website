"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bell, Heart, Menu, Settings, X, Sun, Moon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "./ThemeProvider";
import Link from "next/link";

export function Header() {
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { theme, toggle } = useTheme();
  const notifRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Close panels on outside click & Escape
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const t = e.target as Node;
      if (showNotificationPanel && notifRef.current && !notifRef.current.contains(t)) {
        // check if click was on bell button
        const bellBtn = document.getElementById("btn-notifications");
        if (!bellBtn?.contains(t)) setShowNotificationPanel(false);
      }
      if (showSettingsPanel && settingsRef.current && !settingsRef.current.contains(t)) {
        const settingsBtn = document.getElementById("btn-settings");
        if (!settingsBtn?.contains(t)) setShowSettingsPanel(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setShowNotificationPanel(false);
        setShowSettingsPanel(false);
        setShowMobileMenu(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [showNotificationPanel, showSettingsPanel]);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    if (showMobileMenu) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [showMobileMenu]);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-40 border-b border-gray-200 dark:border-gray-800"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded-lg" aria-label="Community Foundation — Home">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shrink-0">
                <Heart className="w-4 h-4 sm:w-6 sm:h-6 text-white" aria-hidden="true" />
              </div>
              <span className="font-bold text-sm sm:text-lg hidden sm:block">Community Foundation</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6" aria-label="Primary">
              <a href="#who-we-are" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded">Who We Are</a>
              <a href="#vision" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded">Our Vision</a>
              <a href="#updates" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded">Updates</a>
              <a href="#contact" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded">Contact</a>
            </nav>

            {/* Action Icons */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                id="btn-notifications"
                onClick={() => { setShowNotificationPanel((v) => !v); setShowSettingsPanel(false); }}
                aria-label={showNotificationPanel ? "Close notifications" : "Open notifications, 3 unread"}
                aria-expanded={showNotificationPanel}
                aria-haspopup="dialog"
                className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-300" aria-hidden="true" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" aria-hidden="true"></span>
                <span className="sr-only">3 new notifications</span>
              </button>

              <button
                id="btn-settings"
                onClick={() => { setShowSettingsPanel((v) => !v); setShowNotificationPanel(false); }}
                aria-label={showSettingsPanel ? "Close settings" : "Open settings"}
                aria-expanded={showSettingsPanel}
                aria-haspopup="dialog"
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-300" aria-hidden="true" />
              </button>

              <button
                onClick={toggle}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                className="hidden sm:inline-flex p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                {theme === "dark" ? <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" aria-hidden="true" /> : <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" aria-hidden="true" />}
              </button>

              <button
                onClick={() => setShowMobileMenu((v) => !v)}
                aria-label={showMobileMenu ? "Close menu" : "Open menu"}
                aria-expanded={showMobileMenu}
                aria-controls="mobile-menu"
                className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                {showMobileMenu ? <X className="w-5 h-5 text-gray-600 dark:text-gray-300" aria-hidden="true" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-300" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden"
            >
              <nav className="container mx-auto px-4 py-4 flex flex-col gap-1" aria-label="Mobile">
                <a onClick={() => setShowMobileMenu(false)} href="#who-we-are" className="px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-600 transition-colors">Who We Are</a>
                <a onClick={() => setShowMobileMenu(false)} href="#vision" className="px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-600 transition-colors">Our Vision</a>
                <a onClick={() => setShowMobileMenu(false)} href="#updates" className="px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-600 transition-colors">Updates</a>
                <a onClick={() => setShowMobileMenu(false)} href="#contact" className="px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-600 transition-colors">Contact</a>
                <button
                  onClick={() => { toggle(); setShowMobileMenu(false); }}
                  className="mt-2 flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
                >
                  {theme === "dark" ? <Sun className="w-4 h-4" aria-hidden="true" /> : <Moon className="w-4 h-4" aria-hidden="true" />}
                  Switch to {theme === "dark" ? "light" : "dark"} mode
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Notification Panel */}
      <AnimatePresence>
        {showNotificationPanel && (
          <motion.div
            // eslint-disable-next-line @typescript-eslint/no-explicit-any -- framer-motion ref typing
            ref={notifRef as any}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            role="dialog"
            aria-label="Notifications"
            className="fixed top-16 sm:top-20 right-4 sm:right-6 w-80 sm:w-96 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 z-50 overflow-hidden"
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
              <h3 className="font-bold text-lg">Notifications</h3>
              <button onClick={() => setShowNotificationPanel(false)} aria-label="Close notifications" className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {[
                { color: "bg-blue-500", title: "New Partnership Opportunity", desc: "TechCorp wants to discuss CSR collaboration", time: "2 hours ago" },
                { color: "bg-green-500", title: "Project Milestone Reached", desc: "Kenya school construction completed", time: "1 day ago" },
                { color: "bg-purple-500", title: "Upcoming Event", desc: "Annual Gala next month — RSVP required", time: "3 days ago" },
              ].map((n) => (
                <div key={n.title} className="p-4 border-b last:border-0 border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors">
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 ${n.color} rounded-full mt-2 shrink-0`} aria-hidden="true"></div>
                    <div>
                      <p className="font-medium text-sm">{n.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{n.desc}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{n.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettingsPanel && (
          <motion.div
            // eslint-disable-next-line @typescript-eslint/no-explicit-any -- framer-motion ref typing
            ref={settingsRef as any}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            role="dialog"
            aria-label="Settings"
            className="fixed top-16 sm:top-20 right-4 sm:right-6 w-72 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 z-50"
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
              <h3 className="font-bold text-lg">Settings</h3>
              <button onClick={() => setShowSettingsPanel(false)} aria-label="Close settings" className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Dark Mode</span>
                <button
                  onClick={toggle}
                  role="switch"
                  aria-checked={theme === "dark"}
                  aria-label="Toggle dark mode"
                  className={`w-12 h-6 rounded-full relative transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${theme === "dark" ? "bg-blue-600" : "bg-gray-300"}`}
                >
                  <span className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${theme === "dark" ? "translate-x-6" : "translate-x-0"}`}></span>
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Theme is saved and respects your system preference on first visit.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
