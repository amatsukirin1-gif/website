"use client";

import { createContext, useContext, useState, useCallback } from "react";

type Ctx = { isOpen: boolean; open: (position?: string) => void; close: () => void; position: string; setPosition: (p: string) => void };

const Ctx = createContext<Ctx>({ isOpen: false, open: () => {}, close: () => {}, position: "IT Support", setPosition: () => {} });

export function useApplyModal() {
  return useContext(Ctx);
}

export function ApplyProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState("IT Support");
  const open = useCallback((pos?: string) => {
    if (pos) setPosition(pos);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);
  return <Ctx.Provider value={{ isOpen, open, close, position, setPosition }}>{children}</Ctx.Provider>;
}
