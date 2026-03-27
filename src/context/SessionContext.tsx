"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Matches the roles from admin_dashboard_role_access.md
export type UserRole =
  | "RAD"
  | "RA"
  | "ADRPM"
  | "AC"
  | "VPRTT"
  | "Finance"
  | "Coordinator"
  | "Department"
  | "College/School"
  | "PGMO"
  | "Examiner/Evaluator"
  | "PI"
  | null;

export interface SessionUser {
  id: string;
  name: string;
  role: UserRole;
  email: string;
}

interface SessionContextType {
  user: SessionUser | null;
  isLoading: boolean;
  setSession: (user: SessionUser | null) => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This mocks fetching a session from your specific backend implementation
    const checkSession = async () => {
      setIsLoading(true);
      try {
        // Simulating backend request delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Mock current user - Change this role to "PI" to see the PI Dashboard
        setUser({ id: "1", name: "Dagmawi", role: "RAD", email: "admin@crmp.edu" });
      } catch (error) {
        console.error("No active session");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  return (
    <SessionContext.Provider value={{ user, isLoading, setSession: setUser }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
