import { useState, useEffect } from "react";
import { useRouter } from "next/router";
export default function BookCollection() {
  const [books, setBooks] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const fetchBooksAndReviews = async () => {
    try {
      const bookRes = await fetch("http://localhost:3001/books");
      const reviewRes = await fetch("http://localhost:3001/reviews");
      const booksData = await bookRes.json();
      const reviews = await reviewRes.json();

      const combined = booksData.data.books.map((book: any) => ({
        ...book,
        reviews: reviews.filter((r: any) => r.book.title === book.title),
      }));

      setBooks(combined);
    } catch {
      setError("Failed to load books or reviews");
    }
  };

  const deleteBook = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3001/books/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      setBooks((prev) => prev.filter((book) => book.id !== id));
    } catch {
      setError("Failed to delete book");
    }
  };

  const updateBook = async (
    id: number,
    updatedData: { title?: string; author?: string; description?: string }
  ) => {
    try {
      const res = await fetch(`http://localhost:3001/books/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) throw new Error();
      await fetchBooksAndReviews();
    } catch {
      setError("Failed to update book");
    }
  };

  const addBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title || !author) {
      setError("Title and author are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author, description }),
      });

      if (!res.ok) throw new Error();
      await fetchBooksAndReviews();
      setTitle("");
      setAuthor("");
      setDescription("");
    } catch {
      setError("Failed to add book");
    }
  };

  useEffect(() => {
    fetchBooksAndReviews();
  }, []);

  return (
    <div className="container">
      <h1 className="main-heading">Book Collection</h1>

      <div className="form-section">
        <h2>Add New Book</h2>
        <form onSubmit={addBook} className="book-form">
          <div className="form-group">
            <label htmlFor="title">Title*</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Author*</label>
            <input
              id="author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="submit-btn">
            Add Book
          </button>
        </form>
      </div>

      <div className="books-section">
        <h2>All Books</h2>
        {books.length === 0 ? (
          <p>No books found. Add your first book!</p>
        ) : (
          <ul className="book-list">
            {books.map((book) => (
              <li key={book.id} className="book-item">
                <h3>{book.title}</h3>
                <p>
                  <strong>Author:</strong> {book.author}
                </p>
                {book.description && (
                  <p>
                    <strong>Description:</strong> {book.description}
                  </p>
                )}

                {book.reviews?.length > 0 && (
                  <div className="reviews">
                    <strong>Reviews:</strong>
                    <ul className="review-list">
                      {book.reviews.map((rev: any, i: number) => (
                        <li key={i}>
                          {rev.rating}⭐ – {rev.comment}{" "}
                          <em>({rev.user?.name || "Unknown"})</em>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  onClick={() => deleteBook(book.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
                <button
                  onClick={() =>
                    updateBook(book.id, {
                      title: prompt("New title:", book.title) || book.title,
                      author: prompt("New author:", book.author) || book.author,
                      description:
                        prompt("New description:", book.description) ||
                        book.description,
                    })
                  }
                  className="edit-btn"
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 30px 20px;
          font-family: Arial, sans-serif;
        }
        .main-heading {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 30px;
        }
        .form-section {
          background: #f9f9f9;
          padding: 25px;
          border-radius: 10px;
          margin-bottom: 40px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        .book-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
        }
        label {
          font-weight: 600;
          margin-bottom: 5px;
        }
        input,
        textarea {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 1rem;
        }
        textarea {
          resize: vertical;
        }
        .submit-btn {
          background-color: #4caf50;
          color: white;
          padding: 10px 15px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
          align-self: flex-start;
        }
        .submit-btn:hover {
          background-color: #45a049;
        }
        .book-list {
          list-style: none;
          padding: 0;
        }
        .book-item {
          background: white;
          padding: 20px;
          margin-bottom: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        .book-item h3 {
          margin: 0 0 10px;
          color: #2c3e50;
        }
        .delete-btn,
        .edit-btn {
          margin-right: 10px;
          padding: 6px 12px;
          border: none;
          border-radius: 5px;
          font-size: 0.9rem;
          cursor: pointer;
        }
        .delete-btn {
          background-color: #f44336;
          color: white;
        }
        .edit-btn {
          background-color: #2196f3;
          color: white;
        }
        .reviews {
          margin-top: 15px;
        }
        .review-list {
          margin-top: 8px;
          padding-left: 20px;
        }
        .review-list li {
          margin-bottom: 5px;
        }
        .error {
          color: red;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
}
