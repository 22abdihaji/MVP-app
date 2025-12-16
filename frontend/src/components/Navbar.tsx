"use client";

import { useEffect, useState } from "react";
import { getCookie, deleteCookie } from "cookies-next";
import Link from "next/link";

export default function Navbar() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = getCookie("token");
    setToken(storedToken as string | null);
  }, []);

  const handleLogout = () => {
    deleteCookie("token");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (token === null) return null; // Prevent SSR mismatch

  return (
    <nav style={{ padding: "1rem", background: "#f1f1f1" }}>
      <Link href="/" style={{ marginRight: "1rem" }}>
        Etusivu
      </Link>
      <Link href="/review" style={{ marginRight: "1rem" }}>
        Arvostele
      </Link>

      {token ? (
        <button onClick={handleLogout} style={{ marginRight: "1rem" }}>
          Kirjaudu ulos
        </button>
      ) : (
        <Link href="/login" style={{ marginRight: "1rem" }}>
          Kirjaudu
        </Link>
      )}
    </nav>
  );
}
