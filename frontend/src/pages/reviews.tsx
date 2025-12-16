"use client";
import { useEffect, useState } from "react";

import { ReviewForm } from "../reviews/ReviewForm";

export default function ReviewPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await fetch("http://localhost:3001/reviews");
      const data = await res.json();
      setReviews(data);
    };

    fetchReviews();
  }, []);

  return (
    <div className="container">
      <h1>Arvostelut</h1>
      {reviews.map((r) => (
        <div key={r.id} className="book-card">
          <div className="book-card__content">
            <h2 className="book-card__title">{r.book?.title}</h2>
            <p className="book-card__author">{r.user?.name}</p>
            <p className="book-card__rating">⭐ {r.rating}</p>
            <p className="book-card__description">{r.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
