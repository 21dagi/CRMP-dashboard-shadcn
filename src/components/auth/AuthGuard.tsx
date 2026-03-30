"use client";

// ============================================================
// AUTH GUARD — Client-side route protection fallback.
// Wrap layouts with this to block rendering if unauthorized.
// The middleware handles server-side; this handles browser-side.
// ============================================================

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import type { UserRole } from "@/lib/api/auth/types";

interface AuthGuardProps {
  children: React.ReactNode;
  /** If provided, only these roles can render children. */
  allowedRoles?: UserRole[];
}

export function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading, user } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || isLoading) return;

    if (!isAuthenticated) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
      // Wrong role — send them to their correct home
      router.replace(user.role === "PI" ? "/pi" : "/admin");
    }
  }, [mounted, isLoading, isAuthenticated, user, allowedRoles, router, pathname]);

  // While hydrating or loading, show a minimal spinner
  if (!mounted || isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
      </div>
    );
  }

  // Prevent flash of protected content before redirect fires
  if (!isAuthenticated) return null;
  if (allowedRoles && user && !allowedRoles.includes(user.role)) return null;

  return <>{children}</>;
}
