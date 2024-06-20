import React from 'react';
import BorrowBook from './BorrowBook';
import ReturnBook from './ReturnBook';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const BorrowingHistory = ({ books, borrowHistory, handleBorrow, handleReturn }) => {
  console.log("borrowHistory",borrowHistory)
  console.log("handleBorrow",handleBorrow)

  return (
    <div>
     
       <div className='parentborrowsinglist'>
        <div className='borrowbooks'><BorrowBook books={books} handleBorrow={handleBorrow}/></div>
        <div className='returnbooks'><ReturnBook borrowHistory={borrowHistory} handleReturn={handleReturn} /></div>
       </div>
       <div className='container'>
      <div className="row">
        <div className="col-md-12">
          <div className="card card_shadow">
            <div className="card-body ">
            <h3 style={{float:"left"}}> Borrowing history</h3>
            <Table striped bordered hover>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Book ID</th>
            <th>Borrow Date</th>
            <th>Return Date</th>
          </tr>
        </thead>
        <tbody>
          {borrowHistory.map((record, index) => (
            <tr key={index}>
              <td>{record.userId}</td>
              <td>{record.bookId}</td>
              <td>{record.borrowDate}</td>
              <td>{record.returnDate || 'Not returned yet'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
            </div>
          </div>
        </div>
      </div>
      </div>
           
      
     
     
    </div>
  );
};

export default BorrowingHistory;

