import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { glossaryById, type GlossaryEntry } from "@/data/glossary";

interface KnowledgeContextValue {
  plainEnglish: boolean;
  togglePlainEnglish: () => void;
  openTermId: string | null;
  openTerm: (id: string) => void;
  closeTerm: () => void;
  getTerm: (id: string) => GlossaryEntry | undefined;
}

const KnowledgeContext = createContext<KnowledgeContextValue | null>(null);

export const KnowledgeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [plainEnglish, setPlainEnglish] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("tcl.plainEnglish") === "1";
  });
  const [openTermId, setOpenTermId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("tcl.plainEnglish", plainEnglish ? "1" : "0");
    }
  }, [plainEnglish]);

  const togglePlainEnglish = useCallback(() => setPlainEnglish((p) => !p), []);
  const openTerm = useCallback((id: string) => setOpenTermId(id), []);
  const closeTerm = useCallback(() => setOpenTermId(null), []);
  const getTerm = useCallback((id: string) => glossaryById[id], []);

  return (
    <KnowledgeContext.Provider
      value={{ plainEnglish, togglePlainEnglish, openTermId, openTerm, closeTerm, getTerm }}
    >
      {children}
    </KnowledgeContext.Provider>
  );
};

export const useKnowledge = () => {
  const ctx = useContext(KnowledgeContext);
  if (!ctx) throw new Error("useKnowledge must be used within KnowledgeProvider");
  return ctx;
};