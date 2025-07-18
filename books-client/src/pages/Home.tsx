import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BadgePlus } from 'lucide-react';
import BookManager from '../components/BookManager';

const Home: React.FC = () => {
 const navigate = useNavigate();

  return  <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="flex-grow-1 text-start text-sm-center">Book Collection</h2>
        <BadgePlus size={40}  onClick={() => navigate('/add')} className="d-none d-sm-block"/>
        <BadgePlus size={20}  onClick={() => navigate('/add')} className="d-block d-sm-none"/>
      </div>
      <BookManager />
    </div>
    ;
};

export default Home;