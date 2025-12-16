import { useEffect, useState } from "react";
import { fetchBooks, addBook } from "../services/api";

export function useBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchBooks()
      .then(setBooks)
      .finally(() => setLoading(false));
  }, []);

  const createBook = async (bookData) => {
    const newBook = await addBook(bookData);
    setBooks((prev) => [...prev, newBook]);
  };

  return { books, loading, createBook };
}
