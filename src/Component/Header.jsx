import React from 'react'
import { Container, Navbar } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate()
  const handleLogin =()=>{
    navigate("/")
  }
  return (
    <Navbar expand="lg" variant="light" bg="light" className="navbar-custom">
    <div className="container-fluid">
        <div className="logo_logout_wrapper">
       
      
        <Button variant="primary" size="lg"   onClick={(e) => handleLogin(e)}  >
        logout
      </Button> 
      </div>

<div className="clearfix"></div>
</div>
</Navbar>
  )
}

export default Header