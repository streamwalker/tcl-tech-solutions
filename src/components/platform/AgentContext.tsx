import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";

type Msg = { role: "user" | "assistant"; content: string };

interface AgentContextType {
  messages: Msg[];
  setMessages: React.Dispatch<React.SetStateAction<Msg[]>>;
  clearMessages: () => void;
}

const AgentContext = createContext<AgentContextType | null>(null);

const STORAGE_KEY = "tcl-agent-history";
// Use sessionStorage so sensitive business data (clients, revenue) doesn't
// persist across browser sessions or devices.

export function AgentProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Msg[]>(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {}
  }, [messages]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    sessionStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <AgentContext.Provider value={{ messages, setMessages, clearMessages }}>
      {children}
    </AgentContext.Provider>
  );
}

export function useAgentContext() {
  const ctx = useContext(AgentContext);
  if (!ctx) throw new Error("useAgentContext must be used within AgentProvider");
  return ctx;
}
