"use client";
import { useEffect } from "react";

export default function ErrorBoundary({ error }: { error: Error }) {
  useEffect(() => {
    console.error("Component error:", error);
  }, [error]);

  return (
    <div className="p-4 bg-red-100 text-red-800 rounded-lg">
      <h2 className="font-bold">Error</h2>
      <p>{error.message}</p>
    </div>
  );
}
