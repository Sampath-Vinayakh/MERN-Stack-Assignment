import React, { useEffect, useRef, useState } from 'react';
import { getBooks, deleteBook } from '../services/api';
import BookList from '../components/BookList';
import type { Book } from '../types';

const BookManager: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [booksCount,setBooksCount] = useState(0);
  const fetchedPages = useRef<Set<number>>(new Set());
  const booksPerPage = 2; 
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
      title: '',
      author: '',
      page: currentPage,
      limit: booksPerPage
  });
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(booksCount / booksPerPage);

  const debounceTimer = useRef<ReturnType<typeof setTimeout>  | null>(null);

  const fetchBooks = async (filterParams: any) => {
    const { page, limit, title, author } = filterParams;
    if (fetchedPages.current.has(page)) return;
    try {
      const res = await getBooks({ page, limit, title, author });
      setBooks(prev=>{
        const existingIds = new Set(prev.map(book => book._id));
        const newBooks = res.data.books.filter(book => !existingIds.has(book._id));
        return [...prev, ...newBooks];
      });
      setBooksCount(res.data.total);
      fetchedPages.current.add(page);
    } catch (err) {
      alert("Failed to fetch books.");
    }
  };

  useEffect(() => {
    fetchBooks(filters);
  }, [filters]);

  const handleFilterChange = (field: string, value: string | number) => {
    const newFilters = { ...filters, [field]: value };
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      setBooks([]); 
      fetchedPages.current.clear(); 
      setCurrentPage(1);
      setFilters(newFilters);
    }, 600);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id);
        fetchedPages.current.delete(currentPage);

        setBooks(prev => prev.filter(book => book._id !== id));
        setBooksCount(prev => prev - 1);
        if(currentPage!=totalPages){
          setFilters(prev => ({ ...prev, page:currentPage })); 
        }
      } catch (err) {
        alert("Delete failed");
      }
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setFilters(prev => ({ ...prev, page })); 
  };

  return <div className="d-flex flex-column justify-content-center">
        <BookList books={currentBooks} onDelete={handleDelete} handleFilterChange={handleFilterChange}/>
        <div className="text-end">
          <nav aria-label="Page navigation example">
          <ul className="pagination float-end">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}><a className="page-link" href="#" onClick={() => handlePageChange(currentPage - 1)}>Previous</a></li>
            {[...Array(totalPages).keys()].map(num => {
              const page = num + 1;
              return (
                <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                  <a className="page-link" href="#" onClick={() => handlePageChange(page)}>{page}</a>
                </li>
              );
            })}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}><a className="page-link" href="#" onClick={() => handlePageChange(currentPage + 1)}>Next</a></li>
          </ul>
          </nav>
        </div>
      </div>
    ;
};

export default BookManager;