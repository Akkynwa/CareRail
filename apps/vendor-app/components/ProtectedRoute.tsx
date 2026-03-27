"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/useSession";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "vendor" | "admin";
}

export function ProtectedRoute({ children, requiredRole = "vendor" }: ProtectedRouteProps) {
  const router = useRouter();
  const { user, loading } = useSession();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    } else if (!loading && user && requiredRole && user.role !== requiredRole) {
      router.push("/");
    }
  }, [user, loading, router, requiredRole]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}