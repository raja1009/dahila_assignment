
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import '../../src/assets/css/bootstrap.min.css'
// import '../../src/assets/css/responsive.css'
// import '../../src/assets/css/app.min.css'
// const Header = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };
//   return (
//     <header>

//       <nav className="navbar">

//         <div className="menu-toggle" onClick={toggleMenu}>
//           ☰
//         </div>
//         <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
//           <li>
//             <Link to="/" onClick={toggleMenu}>Home</Link>
//           </li>
//           <li>
//             <Link to="/books" onClick={toggleMenu}>Books</Link>
//           </li>
//           <li>
//             <Link to="/users" onClick={toggleMenu}>Users</Link>
//           </li>
//           <li>
//             <Link to="/history" onClick={toggleMenu}>Borrowing History</Link>
//           </li>
//         </ul>
//       </nav>

//     </header>
//   )
// }


// export default Header;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../src/assets/css/bootstrap.min.css';
import '../../src/assets/css/responsive.css';
import '../../src/assets/css/app.min.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link); // Update active link state
    toggleMenu(); 
  };

  return (
    <header>
      <nav className="navbar">
        <div className="menu-toggle" onClick={toggleMenu}>
          ☰
        </div>
        <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
          <li>
            <Link
              to="/"
              onClick={() => handleLinkClick('Home')}
              className={activeLink === 'Home' ? 'active-link' : ''}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/books"
              onClick={() => handleLinkClick('Books')}
              className={activeLink === 'Books' ? 'active-link' : ''}
            >
              Books
            </Link>
          </li>
          <li>
            <Link
              to="/users"
              onClick={() => handleLinkClick('Users')}
              className={activeLink === 'Users' ? 'active-link' : ''}
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/history"
              onClick={() => handleLinkClick('History')}
              className={activeLink === 'History' ? 'active-link' : ''}
            >
              Borrowing History
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;


