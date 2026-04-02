"use client";

// ============================================================
// AUTH INITIALIZER
// Invisible component — mounts on app start inside RootLayout.
// Validates the persisted Zustand session and syncs the role
// to a cookie so Edge Middleware can read it server-side.
//
// Flow:
//   App loads → mounts → reads Zustand (from localStorage)
//     → if token exists: calls getCurrentUser() to validate
//     → if valid: syncs user_role + access_token cookies
//     → if invalid: calls logout() and clears cookies
// ============================================================

import { useEffect } from "react";
import Cookies from "js-cookie";
import { useAuthStore } from "@/stores/authStore";
import type { UserRole } from "@/lib/api/auth/types";
import { getCurrentUser } from "@/lib/api/auth/queries";

const COOKIE_ROLE_KEY = "user_role";
const COOKIE_TOKEN_KEY = "access_token";
const COOKIE_TTL_DAYS = 7;

export function AuthInitializer() {
  const { login, logout, setLoading, access_token } = useAuthStore();

  useEffect(() => {
    const initSession = async () => {
      // Use getState() to safely read the latest hydrated token, 
      // avoiding stale closures where access_token might be null on initial render
      const currentToken = useAuthStore.getState().access_token;
      
      setLoading(true);

      if (!currentToken) {
        // No token → clear stale cookies
        Cookies.remove(COOKIE_ROLE_KEY);
        Cookies.remove(COOKIE_TOKEN_KEY);
        setLoading(false);
        return;
      }

      try {
        const user = await getCurrentUser();

        if (user && currentToken) {
          login(currentToken, user);

          // Sync to cookies for Edge Middleware to read
          Cookies.set(COOKIE_ROLE_KEY, user.role, {
            expires: COOKIE_TTL_DAYS,
            path: "/",
            sameSite: "lax",
          });
          Cookies.set(COOKIE_TOKEN_KEY, currentToken, {
            expires: COOKIE_TTL_DAYS,
            path: "/",
            sameSite: "lax",
          });
        } else {
          logout();
          Cookies.remove(COOKIE_ROLE_KEY);
          Cookies.remove(COOKIE_TOKEN_KEY);
        }
      } catch {
        logout();
        Cookies.remove(COOKIE_ROLE_KEY);
        Cookies.remove(COOKIE_TOKEN_KEY);
      } finally {
        setLoading(false);
      }
    };

    initSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null; // Invisible — renders nothing
}
