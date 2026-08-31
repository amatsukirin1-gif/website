"use client";

import { createContext, useContext, useState, useCallback } from "react";

type Ctx = { isOpen: boolean; open: () => void; close: () => void };

const Ctx = createContext<Ctx>({ isOpen: false, open: () => {}, close: () => {} });

export function usePartnershipModal() {
  return useContext(Ctx);
}

export function PartnershipModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  return <Ctx.Provider value={{ isOpen, open, close }}>{children}</Ctx.Provider>;
}
