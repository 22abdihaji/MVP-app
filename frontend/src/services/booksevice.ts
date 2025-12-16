const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const getBooks = async () => {
  const response = await fetch(`${API_URL}/books`);
  return response.json();
};

export const addBook = async (bookData) => {
  const response = await fetch(`${API_URL}/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookData),
  });
  return response.json();
};
