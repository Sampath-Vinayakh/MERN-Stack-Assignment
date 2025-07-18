import axios from 'axios';
import type { Book } from '../types';
const API_BASE = 'http://localhost:5000/api/books';

export const getBooks = (filters={}) => axios.get<{books:Book[],total:number}>(API_BASE,{params:filters});
export const getBook = (id: string) => axios.get<Book>(`${API_BASE}/${id}`);
export const addBook = (data: Book) => axios.post(API_BASE, data);
export const updateBook = (id: string, data: Book) => axios.put(`${API_BASE}/${id}`, data);
export const deleteBook = (id: string) => axios.delete(`${API_BASE}/${id}`);