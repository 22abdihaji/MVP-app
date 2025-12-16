

export interface Book {
  id: string;
  title: string;
  author: string;
  description?: string;
  coverImage?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  reviews?: Review[]; // Optional relation to reviews
}

export interface BookFormData {
  title: string;
  author: string;
  description?: string;
  coverImage?: string;
}

export interface BookApiResponse {
  status: 'success' | 'error';
  data?: {
    book?: Book;
    books?: Book[];
  };
  message?: string;
  total?: number;
}

export interface Review {
  id: string;
  rating: number;
  comment?: string;
  userId: string;
  bookId: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  user?: {
    name: string;
  };
}

export interface BookListProps {
  books: Book[];
  onBookDeleted?: (bookId: string) => void;
  onBookEdited?: (book: Book) => void;
}

export interface BookCardProps {
  book: Book;
  onDelete?: (bookId: string) => void;
  onEdit?: (book: Book) => void;
}
