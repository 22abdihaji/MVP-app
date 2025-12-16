interface ReviewCardProps {
  review: {
    id: number;
    rating: number;
    comment: string;
    user: {
      name: string;
    };
    book: {
      title: string;
    };
  };
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="border rounded-lg p-5 shadow-sm">
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
          <span className="text-gray-600">
            {review.user.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <h4 className="font-medium">{review.user.name}</h4>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={
                  i < review.rating ? "text-yellow-400" : "text-gray-300"
                }
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-700 mb-2">{review.comment}</p>
      <p className="text-sm text-gray-500">
        For book: <span className="italic">{review.book.title}</span>
      </p>
    </div>
  );
}
