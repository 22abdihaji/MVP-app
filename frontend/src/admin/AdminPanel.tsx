// frontend/src/components/admin/AdminPanel.tsx
"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export function AdminPanel() {
  const {
    data: users,
    refetch,
    isLoading,
    error,
  } = useQuery(["users"], async () => {
    const res = await axios.get("/api/admin/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data;
  });

  const { mutate: banUser } = useMutation(
    (userId: number) =>
      axios.delete(`/api/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    {
      onSuccess: () => {
        toast.success("Käyttäjä bännätty");
        refetch();
      },
      onError: () => {
        toast.error("Bännäys epäonnistui");
      },
    }
  );

  if (isLoading) return <div className="p-4">Ladataan...</div>;
  if (error)
    return <div className="p-4 text-red-500">Virhe käyttäjien haussa</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Käyttäjähallinta</h1>
      <div className="space-y-3">
        {users?.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-3 border rounded-lg"
          >
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                {user.role}
              </span>
            </div>
            {user.role !== "ADMIN" && (
              <button
                onClick={() => {
                  if (
                    confirm(`Haluatko varmasti bännätä käyttäjän ${user.name}?`)
                  ) {
                    banUser(user.id);
                  }
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Bännää
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
