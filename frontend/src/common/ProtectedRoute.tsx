// frontend/src/components/common/ProtectedRoute.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ProtectedRoute({
  children,
  roles = [],
}: {
  children: React.ReactNode;
  roles?: string[];
}) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    if (!token) {
      toast.warning("Kirjaudu sisään jatkaaksesi");
      router.push("/login");
    } else if (roles.length > 0 && !roles.includes(userRole)) {
      toast.error("Ei käyttöoikeutta");
      router.push("/");
    }
  }, []);

  return <>{children}</>;
}
