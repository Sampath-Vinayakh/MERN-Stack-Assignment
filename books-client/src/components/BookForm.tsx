import React, { useState, useEffect } from 'react';
import type { Book } from '../types';
import { useNavigate } from 'react-router-dom';

interface BookFormProps {
  onSubmit: (book: Book) => void;
  initialData?: Book;
  isEditing?: boolean;
}

const BookForm: React.FC<BookFormProps> = ({ onSubmit, initialData, isEditing = false }) => {
  const navigate = useNavigate();
  const [book, setBook] = useState<Book>({
    title: '',
    author: '',
    publicationYear: undefined,
    genre: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditing && initialData) setBook(initialData);
  }, [initialData, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!book.title || !book.author || !book.publicationYear) {
      return setError('Title, Author, and Publication Year are required.');
    }
    setError('');
    onSubmit(book);
  };

  return (
    <div>
      <h1 className="text-center mb-2">{isEditing ? 'Update Book' : 'Add Book'}</h1>
      <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input className="form-control" name="title" value={book.title} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Author</label>
        <input className="form-control" name="author" value={book.author} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Publication Year</label>
        <input className="form-control" name="publicationYear" value={book.publicationYear} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Genre</label>
        <input className="form-control" name="genre" value={book.genre} onChange={handleChange} />
      </div>
      <div className="text-end">
          <button type="button" className="btn btn-secondary me-2" onClick={() => navigate('/')}>
            ← Back
          </button>
        <button className="btn btn-primary" type="submit">
          {isEditing ? 'Update Book' : 'Add Book'}
        </button>
      </div>

      </form>
    </div>

  );
};

export default BookForm;