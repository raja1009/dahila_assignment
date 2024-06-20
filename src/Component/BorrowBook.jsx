// import React, { useState } from 'react';
// import { Table, Button, Modal, Form } from 'react-bootstrap';

// const BorrowBook = ({ books, handleBorrow }) => {
//   const [userId, setUserId] = useState('');
//   const [selectedBook, setSelectedBook] = useState('');

//   const handleSubmit = e => {
//     e.preventDefault();
//     if (userId && selectedBook) {
//       handleBorrow(userId, parseInt(selectedBook));
//       setUserId('');
//       setSelectedBook('');
//     }
//   };

//   return (
//     <>
//      <div className='container'>
//       <div className="row">
//         <div className="col-md-12">
//           <div className="card card_shadow">
//             <div className="card-body ">
//       <h3>Borrow a Book</h3>
//       <Form onSubmit={handleSubmit}>
//       <Form.Label>User ID:</Form.Label>
//         <input style={{padding:"10px 10px"}} className="form-control" type="text" value={userId} onChange={e => setUserId(e.target.value)} required />
//         {/* <label>Select Book:</label> */}
//         <Form.Label>Select Book:</Form.Label>
//         <select style={{padding:"10px 10px"}} className="form-control" value={selectedBook} onChange={e => setSelectedBook(e.target.value)} required>
//           <option value="">Select a book</option>
//           {books.map(book => (
//             <option key={book.id} value={book.id}>
//               {book.title}
//             </option>
//           ))}
//         </select>
//         <Button style={{marginTop:"10px"}} type="submit">Borrow</Button>
//       </Form>
//     </div>
//     </div>
//     </div>
//     </div>
//     </div>
//     </>
   
//   );
// };

// export default BorrowBook;
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const BorrowBook = ({ books, handleBorrow }) => {
  const [userId, setUserId] = useState('');
  const [selectedBook, setSelectedBook] = useState('');
  const [borrowDate, setBorrowDate] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (userId && selectedBook && borrowDate) {
      handleBorrow(userId, parseInt(selectedBook), borrowDate);
      setUserId('');
      setSelectedBook('');
      setBorrowDate('');
    }
  };
console.log("borrowDate",borrowDate)
  return (
    <div className='container'>
      <div className="row">
        <div className="col-md-12">
          <div className="card card_shadow">
            <div className="card-body">
              <h3>Borrow a Book</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Label>User ID:</Form.Label>
                <input
                  style={{ padding: "10px 10px" }}
                  className="form-control"
                  type="text"
                  value={userId}
                  onChange={e => setUserId(e.target.value)}
                  required
                />
                <Form.Label>Select Book:</Form.Label>
                <select
                  style={{ padding: "10px 10px" }}
                  className="form-control"
                  value={selectedBook}
                  onChange={e => setSelectedBook(e.target.value)}
                  required
                >
                  <option value="">Select a book</option>
                  {books.map(book => (
                    <option key={book.id} value={book.id}>
                      {book.title}
                    </option>
                  ))}
                </select>
                <Form.Label>Borrow Date:</Form.Label>
                <input
                  style={{ padding: "10px 10px" }}
                  className="form-control"
                  type="date"
                  value={borrowDate}
                  onChange={e => setBorrowDate(e.target.value)}
                  required
                />
                <Button style={{ marginTop: "10px" }} type="submit">Borrow</Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowBook;

