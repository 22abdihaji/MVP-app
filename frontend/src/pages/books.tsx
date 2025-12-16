import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BookCard from "../components/BookCard";

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
}

export default function BooksPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/books");
      return res.data as Book[];
    },
  });

  if (isLoading) return <div className="p-4">Loading books...</div>;
  if (error) return <div className="p-4 text-red-500">Error loading books</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Our Book Collection</h1>

      {data?.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No books available yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
