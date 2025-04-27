import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faCartShopping, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../Nav/NavComponent.css";
import Logo from "../../../../images/navLogo.png";


export default function NavComponent() {
  const [categoryData, setCategoryData] = useState([]);

  const getCategory = async () => {
    const data = await axios.get(
      `${import.meta.env.VITE_LOCAL_HOST}/${import.meta.env.VITE_CATEGORY_LIST}`
    );
    setCategoryData(data.data.categories);
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <Navbar expand="lg" className="bar">
        <Container>
          {/* 🔹 Logo on the left */}
          <Navbar.Brand href="/"><img src={Logo} alt="logo" className="w-25 " /></Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* 🔹 Everything else pushed to the right */}
            <Nav className="ms-auto d-flex align-items-center gap-3">

              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>

              <NavDropdown title="Category" id="category-dropdown">
                {categoryData.map((cat) => (
                  <NavDropdown.Item key={cat.id} href={`/category/${cat.id}`}>
                  {/* <NavDropdown.Item key={cat.id} href={`/category/${cat.id}`}> */}
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
              
 {/* {isAthenticated ? :<Nav.Link href="/login">
                <FontAwesomeIcon icon={faUser} />
              </Nav.Link>}
               */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    </>
  );
}
