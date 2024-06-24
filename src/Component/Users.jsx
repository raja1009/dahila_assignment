import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { z } from 'zod';

// Define the Zod schema for a book
const userSchema = z.object({
  name: z.string().nonempty('Title is required'),
  membershipid: z.string().nonempty('MembershipId is required'),
  email: z
    .string()
    .email({ message: "Email format is not correct" })
    .nonempty({ message: "Email is required" }),
});


const Users = () => {
  const userlist = [
    { id: 1, name: 'jhondoe',  email:"jhondoe@gmail.com",membershipid:"Ecrt456" },
    { id: 2, name: 'jhondoe2', email:"jhondoe@gmail.com",membershipid:"Ecrt456"  },
    { id: 3, name: 'jhondoe3', email:"jhondoe@gmail.com" ,membershipid:"Ecrt456" },
    { id: 4, name: 'jhondoe4',email:"jhondoe@gmail.com",membershipid:"Ecrt456" },
    { id: 5, name: 'jhondoe5', email:"jhondoe@gmail.com",membershipid:"Ecrt456" },
    { id: 6, name: 'jhondoe6', email:"jhondoe@gmail.com" ,membershipid:"Ecrt456" },
    { id: 7, name: 'jhondoe7', email:"jhondoe@gmail.com" ,membershipid:"Ecrt456" },
    { id: 8, name: 'jhondoe8', email:"jhondoe@gmail.com" ,membershipid:"Ecrt456" },
    { id: 9, name: 'jhondoe9', email:"jhondoe@gmail.com" ,membershipid:"Ecrt456" },
    { id: 10, name: 'jhondoe10', email:"jhondoe@gmail.com" ,membershipid:"Ecrt456" },
    { id: 11, name: 'jhondoe11', email:"jhondoe@gmail.com",membershipid:"Ecrt456" },
  ];

  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Default items per page
  const [pageRange] = useState(4);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' or 'edit'
  const [currentBook, setCurrentBook] = useState({ id: null, name: '', email: '',membershipid:''});
  const [errors, setErrors] = useState({});

  // Initialize books on component mount
  useEffect(() => {
    setBooks(userlist);
  }, []);

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset current page when searching
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1); // Reset current page when changing items per page
  };

  // Filter books based on search input
  const filteredData = books.filter((book) =>
    book.name.toLowerCase().includes(searchTerm.toLowerCase()) 
   
  );

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages for pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Determine start and end page numbers for pagination
  const startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
  const endPage = Math.min(totalPages, startPage + pageRange - 1);

  // Generate an array of page numbers for rendering pagination buttons
  const pageLinks = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

  // Handle opening modal
  const openModal = (type, book = { id: null, name: '', email: '',membershipid:''}) => {
    setModalType(type);
    setCurrentBook(book);
    setShowModal(true);
  };

  // Handle closing modal
  const closeModal = () => {
    setShowModal(false);
    setCurrentBook({id: null, name: '', email: '',membershipid:'' });
    setErrors({});
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));

    // Clear errors for the field being edited
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  // Handle form submit for adding or editing a book
   const handleFormSubmit = (e) => {
    e.preventDefault();  
    // Validate form data with Zod schema
    const parsedData = userSchema.safeParse({
      name: currentBook.name,
      membershipid:currentBook.membershipid,
      email: currentBook.email,
     
    });
  
    if (!parsedData.success) {
      // Handle validation errors
      const formErrors = parsedData.error.flatten().fieldErrors;
      setErrors(formErrors);
      return;
    }
  
    const validatedData = parsedData.data;
  
    if (modalType === 'add') {
      const newBook = { ...validatedData, id: books.length + 1 };
      // Prepend the new book to the beginning of the books array
      setBooks([newBook, ...books]);
      toast.success('User added successfully', 'Success');
    } else if (modalType === 'edit') {
      setBooks(books.map((book) => (book.id === currentBook.id ? validatedData : book)));
      toast.success('User update successfully', 'Success');
    }
    closeModal();
  };
  
  // Handle deleting a book
  const handleDelete = (id) => {
    setBooks(books.filter((book) => book.id !== id));
    toast.success('User delete successfully', 'Success');
  };

  return (
    <>
    <div className='container'>
      <div className="row">
        <div className="col-md-12">
          <div className="card card_shadow">
            <div className="card-body ">
            <h3 style={{float:"left"}}>List of users :{books.length}</h3>
              <div className="searchbox">
             
                <input type="text" placeholder="Enter a search" onChange={handleSearch} />
                <Button style={{ marginLeft: "10px" }} variant="btn btn-primary" className="me-2" onClick={() => openModal('add')}>
                  Add{' '}
                </Button>
              </div>

              <Table striped bordered hover>
                <thead>
                  <tr>
                   
                    <th>Name</th>
                    <th>Email Id</th> 
                    <th>MembershipId</th>                   
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((book) => (
                    <tr key={book.id}>                       
                      <td>{book.name}</td>
                      <td>{book.email}</td>
                      <td>{book.membershipid}</td>

                      <td>

                        <Button variant="btn btn-success" className="me-2" onClick={() => openModal('edit', book)}>
                          Edit
                        </Button>
                        <Button variant="btn btn-danger" onClick={() => handleDelete(book.id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {/* Pagination */}
              <div className="pagination">
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                  Prev
                </button>
                {pageLinks.map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => paginate(pageNumber)}
                    className={currentPage === pageNumber ? 'active' : ''}
                  >
                    {pageNumber}
                  </button>
                ))}
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                  Next
                </button>

                {/* Items per page selection */}
                <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  {/* Add more options as needed */}
                </select>
              </div>

              {/* Modal for Add/Edit Book */}
              <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                  <Modal.Title>{modalType === 'add' ? 'Add User' : 'Edit User'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={handleFormSubmit}>
                    <Form.Group controlId="formTitle">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter user name"
                        name="name"
                        value={currentBook.name}
                        onChange={handleInputChange}

                        isInvalid={errors.name}
                      />
                      {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
                    </Form.Group>

                    <Form.Group controlId="formAuthor">
                      <Form.Label>EmailId</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter user emailid"
                        name="email"
                        value={currentBook.email}
                        onChange={handleInputChange}

                        isInvalid={errors.email}
                      />
                      {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                    </Form.Group>
                    <Form.Group controlId="formTitle">
                      <Form.Label>MembershipId</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter user name"
                        name="membershipid"
                        value={currentBook.membershipid}
                        onChange={handleInputChange}

                        isInvalid={errors.membershipid}
                      />
                      {errors.membershipid && <p style={{ color: "red" }}>{errors.membershipid}</p>}
                    </Form.Group>


                   

                    <Button variant="primary" type="submit" className="buttonposition">
                      {modalType === 'add' ? 'Add User' : 'Save Changes'}
                    </Button>
                  </Form>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Users;

