import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBook, updateBook } from '../services/api';
import BookForm from '../components/BookForm';
import type { Book } from '../types';

const EditBook: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<Book | null>(null);

  useEffect(() => {
    if (id) {
      getBook(id).then(res => setInitialData(res.data)).catch(() => alert("Failed to load book"));
    }
  }, [id]);

  const handleUpdate = async (data: Book) => {
    if (id) {
      try {
        await updateBook(id, data);
        navigate('/');
      } catch (err) {
        alert("Update failed");
      }
    }
  };

  return initialData ? 
      <div className="container mt-5 d-flex justify-content-center">
      <div className="w-100" style={{ maxWidth: '600px' }}>
      <BookForm onSubmit={handleUpdate} initialData={initialData} isEditing />
      </div>
    </div> : <p>Loading...</p>;
};

export default EditBook;