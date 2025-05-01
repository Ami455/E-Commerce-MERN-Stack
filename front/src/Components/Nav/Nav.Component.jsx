import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Logo from "../../../../images/navLogo.png";
import { api } from '../../utils/api';
import "../Nav/NavComponent.css";

export default function NavComponent() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [categoryData, setCategoryData] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const getCategory = useCallback(async () => {
    try {
      const res = await api.get(`${import.meta.env.VITE_CATEGORY_LIST}`);
      setCategoryData(res.data.categories);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?search=${search}`);
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <Navbar expand="lg" className="bar">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={Logo} alt="logo" className="w-25" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center gap-3">

            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/category/products">Product</Nav.Link>

            <NavDropdown title="Category" id="category-dropdown">
              {categoryData.map((cat) => (
                <NavDropdown.Item as={Link} to={`http://localhost:5173/category/products?category=${cat.name}`} key={cat.id}>
                  {cat.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            <Nav.Link as={Link} to="/favorites">
              <FontAwesomeIcon icon={faHeart} />
            </Nav.Link>

            <Nav.Link as={Link} to="/cart">
              <FontAwesomeIcon icon={faCartShopping} />
            </Nav.Link>

            <Nav.Link as={Link} to={isAuthenticated?"/account":"/login"}>
              <FontAwesomeIcon icon={faUser} />
            </Nav.Link>

            {/* Search Form */}
            <form onSubmit={handleSearchSubmit} className="d-flex position-relative">
              <input
                type="text"
                placeholder="Search products..."
                className="search-input form-control rounded-3 py-2 pe-5"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn-outline-secondary position-absolute end-0 top-0 h-100 px-3"
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </form>
            {user?.role !== "admin" ? '' : <Nav.Link as={Link} to= '/admin'>
              Dashboard
            </Nav.Link>}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
