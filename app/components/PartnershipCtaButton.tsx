"use client";

import { usePartnershipModal } from "./PartnershipModalProvider";

export function PartnershipCtaButton({ children, variant = "primary", className = "" }: { children: React.ReactNode; variant?: "primary" | "white"; className?: string }) {
  const { open } = usePartnershipModal();
  const base = "inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98]";
  const styles =
    variant === "white"
      ? "bg-white text-blue-600 hover:shadow-lg hover:scale-[1.02] focus-visible:ring-white focus-visible:ring-offset-blue-600"
      : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:scale-[1.02] focus-visible:ring-blue-600";
  return (
    <button onClick={open} className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  );
}
