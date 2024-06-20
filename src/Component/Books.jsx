import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { z } from 'zod';

// Define the Zod schema for a book
const bookSchema = z.object({
  title: z.string().nonempty('Title is required'),
  author: z.string().nonempty('Author is required'),
  isbn: z.string().nonempty('ISBN is required'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
});

const Books = () => {
  const booklist = [
    { id: 1, title: 'Book 1', author: 'Author 1', isbn: '123456', quantity: 5 },
    { id: 2, title: 'Book 2', author: 'Author 2', isbn: '789012', quantity: 3 },
    { id: 3, title: 'Book 3', author: 'Author 3', isbn: '789012', quantity: 3 },
    { id: 4, title: 'Book 4', author: 'Author 4', isbn: '789012', quantity: 3 },
    { id: 5, title: 'Book 5', author: 'Author 5', isbn: '789012', quantity: 3 },
    { id: 6, title: 'Book 6', author: 'Author 2', isbn: '789012', quantity: 3 },
    { id: 7, title: 'Book 7', author: 'Author 2', isbn: '789012', quantity: 3 },
    { id: 8, title: 'Book 8', author: 'Author 2', isbn: '789012', quantity: 3 },
    { id: 9, title: 'Book 9', author: 'Author 2', isbn: '789012', quantity: 3 },
    { id: 10, title: 'Book 10', author: 'Author 2', isbn: '789012', quantity: 3 },
    { id: 11, title: 'Book 11', author: 'Author 11', isbn: '789012', quantity: 3 },
  ];

  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Default items per page
  const [pageRange] = useState(4);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' or 'edit'
  const [currentBook, setCurrentBook] = useState({ id: null, title: '', author: '', isbn: '', quantity: '' });
  const [errors, setErrors] = useState({});

  // Initialize books on component mount
  useEffect(() => {
    setBooks(booklist);
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
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.isbn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.quantity.toString().includes(searchTerm.toLowerCase())
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
  const openModal = (type, book = { id: null, title: '', author: '', isbn: '', quantity: '' }) => {
    setModalType(type);
    setCurrentBook(book);
    setShowModal(true);
  };

  // Handle closing modal
  const closeModal = () => {
    setShowModal(false);
    setCurrentBook({ id: null, title: '', author: '', isbn: '', quantity: '' });
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
    const parsedData = bookSchema.safeParse({
      title: currentBook.title,
      author: currentBook.author,
      isbn: currentBook.isbn,
      quantity: parseInt(currentBook.quantity, 10),
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
      toast.success('Added successfully', 'Success');
    } else if (modalType === 'edit') {
      setBooks(books.map((book) => (book.id === currentBook.id ? validatedData : book)));
      toast.success('Update successfully', 'Success');
    }
    closeModal();
  };
  
  // Handle deleting a book
  const handleDelete = (id) => {
    setBooks(books.filter((book) => book.id !== id));
    toast.success('Delete successfully', 'Success');
  };

  return (
    <>
     <div className='container'>
      <div className="row">
        <div className="col-md-12">
          <div className="card card_shadow">
            <div className="card-body ">
              <h3 style={{float:"left"}}>List of Books :{books.length}</h3>
              <div className="searchbox">
                <input type="text" placeholder="Enter a search" onChange={handleSearch} />
                <Button style={{ marginLeft: "10px" }} variant="btn btn-primary" className="me-2" onClick={() => openModal('add')}>
                  Add{' '}
                </Button>
              </div>

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>ISBN</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((book) => (
                    <tr key={book.id}>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.isbn}</td>
                      <td>{book.quantity}</td>
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
                  <Modal.Title>{modalType === 'add' ? 'Add Book' : 'Edit Book'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={handleFormSubmit}>
                    <Form.Group controlId="formTitle">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter book title"
                        name="title"
                        value={currentBook.title}
                        onChange={handleInputChange}

                        isInvalid={errors.title}
                      />
                      {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}
                    </Form.Group>

                    <Form.Group controlId="formAuthor">
                      <Form.Label>Author</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter book author"
                        name="author"
                        value={currentBook.author}
                        onChange={handleInputChange}

                        isInvalid={errors.author}
                      />
                      {errors.author && <p style={{ color: "red" }}>{errors.isbn}</p>}
                    </Form.Group>

                    <Form.Group controlId="formISBN">
                      <Form.Label>ISBN</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter book ISBN"
                        name="isbn"
                        value={currentBook.isbn}
                        onChange={handleInputChange}

                        isInvalid={errors.isbn}
                      />
                      {errors.isbn && <p style={{ color: "red" }}>{errors.isbn}</p>}
                    </Form.Group>

                    <Form.Group controlId="formQuantity">
                      <Form.Label>Quantity</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter book quantity"
                        name="quantity"
                        value={currentBook.quantity}
                        onChange={handleInputChange}

                        isInvalid={errors.quantity}
                      />
                      {errors.quantity && (
                        <p style={{ color: "red" }}>{errors.quantity}</p>
                      )}
                    </Form.Group>

                    <Button variant="primary" type="submit" className="buttonposition">
                      {modalType === 'add' ? 'Add Book' : 'Save Changes'}
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

export default Books;

