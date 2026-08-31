"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Building2 } from "lucide-react";
import { useApplyModal } from "./ApplyProvider";

export function CompanyHero() {
  const { open } = useApplyModal();
  const shouldReduceMotion = useReducedMotion();
  const fadeUp = (delay = 0) => shouldReduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.2, delay } }
    : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay, ease: "easeOut" as const } };

  return (
    <section aria-labelledby="hero-heading" className="relative min-h-[85vh] sm:min-h-[88vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 pt-16 sm:pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800" aria-hidden="true" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-200/30 dark:bg-blue-900/20 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-200/30 dark:bg-indigo-900/20 rounded-full blur-3xl" aria-hidden="true" />
      <div className="relative z-10 container mx-auto py-12 sm:py-20 text-center">
        <motion.div {...fadeUp(0)} className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <Building2 className="w-8 h-8 sm:w-10 sm:h-10 text-white" aria-hidden="true" />
          </div>
          <motion.p {...fadeUp(0.08)} className="text-sm font-semibold tracking-widest text-blue-600 dark:text-blue-400">WE ARE HIRING — IT SUPPORT &amp; MORE</motion.p>
        </motion.div>
        <motion.h1 id="hero-heading" {...fadeUp(0.15)} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-balance">
          Join Our Team.<br />Build Your Future.
        </motion.h1>
        <motion.p {...fadeUp(0.3)} className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto text-pretty">
          Explore open roles, check requirements, and apply in one click — no email app needed. Fast, mobile-friendly, works for everyone.
        </motion.p>
        <motion.div {...fadeUp(0.45)} className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={() => open("IT Support")} className="px-7 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600">
            Apply Now — IT Support <ArrowRight className="w-4 h-4" />
          </button>
          <a href="#jobs" className="px-7 py-3.5 border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-full font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 active:scale-[0.98] transition-all text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">View All Jobs</a>
        </motion.div>
        <motion.div {...fadeUp(0.6)} className="mt-10 flex flex-wrap justify-center gap-6 sm:gap-10 text-sm text-gray-500 dark:text-gray-400">
          <span><span className="block text-xl font-bold text-gray-900 dark:text-white">15+</span> Open roles</span>
          <span className="hidden sm:block w-px h-8 bg-gray-300 dark:bg-gray-700" aria-hidden="true" />
          <span><span className="block text-xl font-bold text-gray-900 dark:text-white">200+</span> Team members</span>
          <span className="hidden sm:block w-px h-8 bg-gray-300 dark:bg-gray-700" aria-hidden="true" />
          <span><span className="block text-xl font-bold text-gray-900 dark:text-white">4.8★</span> Glassdoor</span>
        </motion.div>
      </div>
    </section>
  );
}
