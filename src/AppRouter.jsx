import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Component/Home';
import Books from './Component/Books';
import Users from './Component/Users';
import BorrowingHistory from './Component/BorrowingHistory';
import data from './data.json';

const AppRouter = () => {
  const [books, setBooks] = useState(data.books);
  const [borrowHistory, setBorrowHistory] = useState(data.borrowHistory);

  const handleBorrow = (userId, bookId, borrowDate) => {
    const updatedBooks = books.map(book => {
      if (book.id === bookId && book.quantity > 0) {
        return { ...book, quantity: book.quantity - 1 };
      }
      return book;
    });

    if (updatedBooks !== books) {
      const newBorrowRecord = { userId, bookId, borrowDate };
      setBooks(updatedBooks);
      setBorrowHistory([...borrowHistory, newBorrowRecord]);
    }
  };


  const handleReturn = (userId, bookId, returnDate) => {
    console.log("raja",returnDate)
    const updatedBooks = books.map(book => {
      if (book.id === bookId) {
        return { ...book, quantity: book.quantity + 1 };
      }
      return book;
    });
  
    const updatedHistory = borrowHistory.map(record => {
      if (record.userId === userId && record.bookId === bookId && !record.returnDate) {
        return { ...record, returnDate };
      }
      return record;
    });
  
    setBooks(updatedBooks);
    setBorrowHistory(updatedHistory);
  };
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/users" element={<Users />} />
        <Route
          path="/history"
          element={
            <BorrowingHistory
              books={books}
              borrowHistory={borrowHistory}
              handleBorrow={handleBorrow}
              handleReturn={handleReturn}
            />
          }
        />
      </Routes>
    </>
  );
};

export default AppRouter;
