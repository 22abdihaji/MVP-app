"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:3001/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error();

        const json = await res.json();
        setUser(json.data.user);
      } catch {
        localStorage.removeItem("token");
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (loading) return <p>Ladataan profiilia...</p>;

  if (!user) return null;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Profiili</h1>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Nimi:</strong> {user.name}
      </p>
      <p>
        <strong>Rooli:</strong> {user.role}
      </p>

      <button
        onClick={handleLogout}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Kirjaudu ulos
      </button>
    </div>
  );
}
