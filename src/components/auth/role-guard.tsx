"use client";

import { ReactNode } from "react";
import { useSession, UserRole } from "@/context/SessionContext";

interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: ReactNode;
  fallback?: ReactNode;
}

export function RoleGuard({ allowedRoles, children, fallback = null }: RoleGuardProps) {
  const { user, isLoading } = useSession();

  // Optionally return null or skeleton if still loading session
  if (isLoading) return null;

  // Render children if user exists and has a role included in allowedRoles
  if (user && user.role && allowedRoles.includes(user.role)) {
    return <>{children}</>;
  }

  // Otherwise, render fallback (which defaults to nothing)
  return <>{fallback}</>;
}
