"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import { usePartnershipModal } from "./PartnershipModalProvider";

export function Hero() {
  const { open } = usePartnershipModal();
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = (delay = 0) =>
    shouldReduceMotion
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.2, delay } }
      : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay, ease: "easeOut" as const } };

  return (
    <section aria-labelledby="hero-heading" className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 pt-16 sm:pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800" aria-hidden="true" />
      {/* decorative blobs - hidden from AT */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-200/30 dark:bg-blue-900/20 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-200/30 dark:bg-indigo-900/20 rounded-full blur-3xl" aria-hidden="true" />

      <div className="relative z-10 container mx-auto py-12 sm:py-20 text-center">
        <motion.div {...fadeUp(0)} className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-4 sm:mb-6 shadow-lg">
            <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-white" aria-hidden="true" />
          </div>
          <motion.p {...fadeUp(0.1)} className="text-sm sm:text-base font-semibold tracking-widest text-blue-600 dark:text-blue-400 mb-2">
            COMMUNITY FOUNDATION
          </motion.p>
        </motion.div>

        <motion.h1
          id="hero-heading"
          {...fadeUp(0.2)}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-balance"
        >
          Building Tomorrow Together
        </motion.h1>

        <motion.p
          {...fadeUp(0.35)}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto px-2 sm:px-4 text-pretty"
        >
          Since 2015, we&apos;ve been empowering communities through innovative partnerships, sustainable solutions, and collaborative programs that create
          lasting positive change.
        </motion.p>

        <motion.div {...fadeUp(0.5)} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2 sm:px-4">
          <button
            onClick={open}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600"
          >
            Partner With Us
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
          </button>
          <a
            href="#who-we-are"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-full font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 active:scale-[0.98] transition-all duration-300 text-sm sm:text-base text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600 inline-flex items-center justify-center"
          >
            Learn More
          </a>
        </motion.div>

        {/* Social proof */}
        <motion.div {...fadeUp(0.6)} className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm text-gray-500 dark:text-gray-400">
          <div className="text-center"><span className="block text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">100k+</span> Lives impacted</div>
          <div className="hidden sm:block w-px h-8 bg-gray-300 dark:bg-gray-700" aria-hidden="true" />
          <div className="text-center"><span className="block text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">50+</span> Partners</div>
          <div className="hidden sm:block w-px h-8 bg-gray-300 dark:bg-gray-700" aria-hidden="true" />
          <div className="text-center"><span className="block text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">12</span> Countries</div>
        </motion.div>
      </div>
    </section>
  );
}
