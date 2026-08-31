"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { usePartnershipModal } from "./PartnershipModalProvider";
import { useEffect } from "react";

export function PartnershipModal() {
  const { isOpen, close } = usePartnershipModal();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          aria-hidden={!isOpen}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 8 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 8 }}
            transition={{ type: "spring", damping: 24, stiffness: 260 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="partnership-title"
            aria-describedby="partnership-desc"
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-start mb-6 gap-4">
                <div>
                  <h3 id="partnership-title" className="text-2xl sm:text-3xl font-bold">
                    Partnership Opportunities
                  </h3>
                  <p id="partnership-desc" className="text-gray-600 dark:text-gray-300">
                    Join our network of changemakers
                  </p>
                </div>
                <button
                  onClick={close}
                  aria-label="Close partnership modal"
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  <X className="w-6 h-6" aria-hidden="true" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-bold text-lg mb-2">Corporate Partnerships</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    CSR programs, employee engagement, cause marketing, and strategic philanthropy.
                    Minimum commitment: $25,000 annually.
                  </p>
                </div>

                <div className="border-l-4 border-indigo-500 pl-4">
                  <h4 className="font-bold text-lg mb-2">Foundation Partnerships</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Grant collaborations, program funding, and shared initiatives. Open to private
                    foundations and charitable trusts.
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-bold text-lg mb-2">Individual Giving</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Monthly giving, major gifts, and legacy donations. All contributions are
                    tax-deductible (501(c)(3)).
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-bold text-lg mb-2">NGO Collaborations</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Joint programs, resource sharing, and capacity building. Focus on education,
                    healthcare, and economic development.
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Next Steps</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 list-none">
                    <li>• Contact our partnerships team: partnerships@communityfoundation.org</li>
                    <li>• Schedule a discovery call to discuss your goals</li>
                    <li>• Receive a customized partnership proposal</li>
                    <li>• Review and sign partnership agreement</li>
                  </ul>
                </div>

                <a
                  href="mailto:partnerships@communityfoundation.org?subject=Partnership%20Inquiry"
                  onClick={close}
                  className="block w-full text-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600"
                >
                  Contact Our Partnerships Team
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
