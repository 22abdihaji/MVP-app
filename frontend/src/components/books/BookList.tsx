import BookCard from "./BookCard";
import { Book } from "@/types/book";

interface BookListProps {
  books: Book[];
  onDelete?: (id: number) => void;
  onEdit?: (book: Book) => void;
}

const BookList = ({ books, onDelete, onEdit }: BookListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default BookList;
