// frontend/src/components/books/BookForm.tsx
"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export function BookForm({ onSuccess }: { onSuccess?: () => void }) {
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      await axios.post("/api/books", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      router.refresh();
      toast.success("Kirja lisätty!");
      reset();
      onSuccess?.();
    } catch (error) {
      toast.error("Virhe kirjan lisäämisessä");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Kirjan nimi</label>
        <input
          {...register("title")}
          placeholder="Kirjan nimi"
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        Lisää kirja
      </button>
    </form>
  );
}
