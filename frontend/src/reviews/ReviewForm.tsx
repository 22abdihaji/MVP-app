"use client"; // Required for client-side interactivity

interface ReviewsFormProps {
  bookId: number;
}

export function ReviewForm({ bookId }: { bookId: number }) {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      await axios.post("/api/reviews", { ...data, bookId });
      router.refresh();
      toast.success("Review added!");
    } catch (error) {
      toast.error("Failed to add review");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select {...register("rating")} required>
        <option value="">Select rating</option>
        {[1, 2, 3, 4, 5].map((num) => (
          <option key={num} value={num}>
            {num} star{num !== 1 ? "s" : ""}
          </option>
        ))}
      </select>
      <textarea {...register("comment")} placeholder="Your review" required />
      <button type="submit">Submit Review</button>
    </form>
  );
}
