
let books = [];

export default function handler(req, res) {
  if (req.method === 'POST') {
    // Add new book
    const { title, author, description } = req.body;

    if (!title || !author) {
      return res.status(400).json({ error: 'Title and author are required' });
    }

    const newBook = {
      id: Date.now().toString(),
      title,
      author,
      description: description || '',
    };

    books.push(newBook);
    return res.status(201).json(newBook);
  } else if (req.method === 'GET') {
    // Get all books
    return res.status(200).json(books);
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
