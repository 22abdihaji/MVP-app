import Link from "next/link";
import Image from "next/image";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  coverImage?: string;
  rating?: number;
  description?: string;
}

const BookCard = ({
  id,
  title,
  author,
  coverImage = "/book-placeholder.jpg",
  rating = 0,
  description = "",
}: BookCardProps) => {
  return (
    <div className="book-card">
      <Link href={`/books/${id}`} passHref>
        <div className="book-card__inner">
          <div className="book-card__image">
            <Image
              src={coverImage}
              alt={`${title} book cover`}
              width={200}
              height={300}
              objectFit="cover"
            />
          </div>
          <div className="book-card__content">
            <h3 className="book-card__title">{title}</h3>
            <p className="book-card__author">By {author}</p>
            {rating > 0 && (
              <div className="book-card__rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < rating ? "filled" : ""}>
                    ★
                  </span>
                ))}
              </div>
            )}
            {description && (
              <p className="book-card__description">
                {description.length > 100
                  ? `${description.substring(0, 100)}...`
                  : description}
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BookCard;
