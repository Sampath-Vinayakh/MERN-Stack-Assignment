import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addBook } from '../services/api';
import BookForm from '../components/BookForm';
import type { Book } from '../types';

const AddBook: React.FC = () => {
  const navigate = useNavigate();

  const handleAdd = async (data: Book) => {
    try {
      await addBook(data);
      navigate('/');
    } catch (err) {
      alert("Add failed");
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="w-100" style={{ maxWidth: '600px' }}>
        <BookForm onSubmit={handleAdd} />
      </div>
    </div>
  );
};

export default AddBook;
