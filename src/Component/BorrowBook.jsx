import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const BorrowBook = ({ books, handleBorrow }) => {
  const userlist = [
    { id: 1, name: 'jhondoe', email: "jhondoe@gmail.com", membershipid: "Ecrt456" },
    { id: 2, name: 'jhondoe2', email: "jhondoe2@gmail.com", membershipid: "Ecrt457" },
    { id: 3, name: 'jhondoe3', email: "jhondoe3@gmail.com", membershipid: "Ecrt458" },
    { id: 4, name: 'jhondoe4', email: "jhondoe4@gmail.com", membershipid: "Ecrt459" },
    { id: 5, name: 'jhondoe5', email: "jhondoe5@gmail.com", membershipid: "Ecrt460" },
    { id: 6, name: 'jhondoe6', email: "jhondoe6@gmail.com", membershipid: "Ecrt461" },
    { id: 7, name: 'jhondoe7', email: "jhondoe7@gmail.com", membershipid: "Ecrt462" },
    { id: 8, name: 'jhondoe8', email: "jhondoe8@gmail.com", membershipid: "Ecrt463" },
    { id: 9, name: 'jhondoe9', email: "jhondoe9@gmail.com", membershipid: "Ecrt464" },
    { id: 10, name: 'jhondoe10', email: "jhondoe10@gmail.com", membershipid: "Ecrt465" },
    { id: 11, name: 'jhondoe11', email: "jhondoe11@gmail.com", membershipid: "Ecrt466" },
  ];

  const [membershipId, setMembershipId] = useState('');
  const [selectedBook, setSelectedBook] = useState('');
  const [borrowDate, setBorrowDate] = useState('');
  const [error, setError] = useState('');

  const handleMembershipIdChange = (e) => {
    setMembershipId(e.target.value);
    setError('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    const user = userlist.find(user => user.membershipid === membershipId);
    console.log("user",user)
    if (user) {
      if (selectedBook && borrowDate) {
        handleBorrow(user.membershipid, parseInt(selectedBook), borrowDate);
        setMembershipId('');
        setSelectedBook('');
        setBorrowDate('');
      }
    } else {
      setError('Invalid Membership ID');
    }
  };

  return (
    <div className='container'>
      <div className="row">
        <div className="col-md-12">
          <div className="card card_shadow">
            <div className="card-body">
              <h3>Borrow a Book</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Label>Membership ID:</Form.Label>
                <input
                  style={{ padding: "10px 10px" }}
                  className="form-control"
                  type="text"
                  value={membershipId}
                  onChange={handleMembershipIdChange}
                  required
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
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


