"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ReviewFormProps {
  bookId: number;
  onSuccess?: () => void;
}

interface ReviewData {
  rating: number;
  comment: string;
}

export function ReviewForm({ bookId, onSuccess }: ReviewFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReviewData>();
  const router = useRouter();

  const onSubmit = async (data: ReviewData) => {
    try {
      await axios.post(
        "/api/reviews",
        {
          ...data,
          bookId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      router.refresh();
      toast.success("Review added!");
      reset();
      onSuccess?.();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add review");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block mb-1">Rating</label>
        <select
          {...register("rating", { required: "Rating is required" })}
          className="w-full p-2 border rounded"
        >
          <option value="">Select rating</option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num} star{num !== 1 ? "s" : ""}
            </option>
          ))}
        </select>
        {errors.rating && (
          <p className="text-red-500">{errors.rating.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1">Review</label>
        <textarea
          {...register("comment")}
          className="w-full p-2 border rounded"
          rows={4}
          placeholder="Your review..."
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Submit Review
      </button>
    </form>
  );
}
