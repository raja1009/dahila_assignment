import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const ReturnBook = ({ borrowHistory, handleReturn }) => {
  const [userId, setUserId] = useState('');
  const [selectedBook, setSelectedBook] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (userId && selectedBook) {
      /// using callback function//
      handleReturn(userId, parseInt(selectedBook),returnDate);
      setUserId('');
      setSelectedBook('');
      setReturnDate('')
      
    }
  };
  console.log("raja1",returnDate)

  return (
    <div className='container'>
    <div className="row">
      <div className="col-md-12">
        <div className="card card_shadow">
          <div className="card-body ">
      <h3>Return a Book</h3>
      <Form onSubmit={handleSubmit}>
      <Form.Label>User ID:</Form.Label>
        <input style={{padding:"10px 10px"}} className="form-control"  type="text" value={userId} onChange={e => setUserId(e.target.value)} required />        
        <Form.Label>Book ID:</Form.Label>
        <input style={{padding:"10px 10px"}} className="form-control" type="text" value={selectedBook} onChange={e => setSelectedBook(e.target.value)} required />
        <Form.Label>Return Date:</Form.Label>
                <input
                  style={{ padding: "10px 10px" }}
                  className="form-control"
                  type="date"
                  value={returnDate}
                  onChange={e => setReturnDate(e.target.value)}
                  required
                />
        <Button style={{marginTop:"10px"}} type="submit">Return</Button>
      </Form>
      </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default ReturnBook;
