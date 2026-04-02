"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import { useSession } from "@/context/SessionContext";

export default function NotFound() {
  const { user, isLoading } = useSession();

  // Determine the best home dashboard based on role
  const homePath = user?.role === "PI" ? "/pi" : "/admin";
  const backTo = user ? homePath : "/login";

  if (isLoading) return null;

  return (
    <div className="flex h-dvh flex-col items-center justify-center space-y-4 text-center p-6">
      <h1 className="font-extrabold text-4xl tracking-tight text-slate-900 dark:text-white">404</h1>
      <div className="space-y-1">
        <h2 className="font-semibold text-xl">Page not found</h2>
        <p className="text-muted-foreground max-w-xs mx-auto">
          The feature you're looking for hasn't been built yet or the link is broken.
        </p>
      </div>
      <Link prefetch={false} replace href={backTo}>
        <Button variant="default" className="px-8 rounded-full">
          {user ? "Back to Dashboard" : "Back to Sign In"}
        </Button>
      </Link>
    </div>
  );
}
