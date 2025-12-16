interface BookCardProps {
  book: {
    id: number;
    title: string;
    author: string;
    description: string;
  };
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2">{book.title}</h3>
        <p className="text-gray-600 mb-3">by {book.author}</p>
        <p className="text-gray-700 line-clamp-3">{book.description}</p>
        <button className="mt-4 w-full py-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
}
