import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { Book } from '../types';
import { Pencil, Trash } from 'lucide-react';

interface BookListProps {
  books: Book[];
  onDelete: (id: string) => void;
  handleFilterChange: (field: string,value:string) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onDelete,handleFilterChange }) => {
  const navigate = useNavigate();

  return (
<div className="table-responsive w-100">
  <table className="table table-striped d-none d-sm-table">
    <thead>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Year</th>
        <th>Genre</th>
        <th>Actions</th>
      </tr>
      <tr>
        <th>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Search Title"
            onChange={(e) => handleFilterChange('title', e.target.value)}
          />
        </th>
        <th>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Search Author"
            onChange={(e) => handleFilterChange('author', e.target.value)}
          />
        </th>
        <th></th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {books.map(book => (
        <tr key={book._id}>
          <td>{book.title}</td>
          <td>{book.author}</td>
          <td>{book.publicationYear}</td>
          <td>{book.genre}</td>
          <td>
            <Pencil onClick={() => navigate(`/edit/${book._id}`)} size={20} className="me-2" />
            <Trash onClick={() => book._id && onDelete(book._id)} size={20} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  <div className="d-sm-none">
    {books.map(book => (
      <div key={book._id} className="card mb-2 p-2">
        <div><strong>Title:</strong> {book.title}</div>
        <div><strong>Author:</strong> {book.author}</div>
        <div><strong>Year:</strong> {book.publicationYear}</div>
        <div><strong>Genre:</strong> {book.genre}</div>
        <div className="mt-1">
          <Pencil onClick={() => navigate(`/edit/${book._id}`)} size={20} className="me-2" />
          <Trash onClick={() => book._id && onDelete(book._id)} size={20} />
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default BookList;