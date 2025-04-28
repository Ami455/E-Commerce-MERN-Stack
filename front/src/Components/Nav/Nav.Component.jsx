import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useState } from 'react';

import { faCartShopping, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from "../../../../images/navLogo.png";
import { api } from '../../utils/api';
import "../Nav/NavComponent.css";
import { useSelector } from "react-redux";


export default function NavComponent() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [categoryData, setCategoryData] = useState([]);
  

  const getCategory = useCallback(async () => {
    const data = await api.get(
      `${import.meta.env.VITE_CATEGORY_LIST}`
    );
    setCategoryData(data.data.categories);  
  }, []);

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <Navbar expand="lg" className="bar">
        <Container>
          
          <Navbar.Brand href="/"><img src={Logo} alt="logo" className="w-25 " /></Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            
            <Nav className="ms-auto d-flex align-items-center gap-3">

              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/category/products">Product</Nav.Link>

              <NavDropdown title="Category" id="category-dropdown">
                {categoryData.map((cat) => (
                  <NavDropdown.Item key={cat.id} href={`/category/${cat.id}`}>
                    {cat.name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>

              <Nav.Link href="/favorites" className="navLink">
                <FontAwesomeIcon icon={faHeart} />
              </Nav.Link>

              <Nav.Link href="/cart">
                <FontAwesomeIcon icon={faCartShopping} />
              </Nav.Link>

              <Nav.Link href="/login">
                <FontAwesomeIcon icon={faUser} />
              </Nav.Link>

              <Nav.Link href={user?.role !== "admin" ? '/' : '/admin'}>Dashboard</Nav.Link>


            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    </>
  );
}
