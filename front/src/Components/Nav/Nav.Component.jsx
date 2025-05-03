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

import Logo from "./logo.png";
import { api } from '../../utils/api';
import "../Nav/NavComponent.css";
import FavoriteBadge from '../favorite/FavoriteBadge';
import CartBadge from '../Cart/CartBadge';
import toast from 'react-hot-toast';

export default function NavComponent({ count }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { favoriteCount } = useSelector((state) => state.favorites);
  const { cartCount } = useSelector((state) => state.cart);
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

  const handleProtectedNavigation = (destination) => {
    if (!isAuthenticated) {
      toast.error(`Please log in to view your ${destination}.`);
    } else {
      navigate(`/${destination}`);
    }
  };

  useEffect(() => {
    getCategory();
  }, [favoriteCount, cartCount, isAuthenticated]);

  return (
    <Navbar expand="lg" className="navbar-dark w-100 bg-darkblue py-3  sticky-top shadow">
      <Container >
        {/* Logo */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
          <img src={Logo} alt="Logo" className="d-inline-block align-top" style={{ height: '40px' }} />
          
        </Navbar.Brand>

        {/* Mobile Toggle */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navbar Links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center gap-3">
            <Nav.Link as={Link} to="/" className="nav-link-custom fw-bolder "> Home </Nav.Link>
            <Nav.Link as={Link} to="/about" className="nav-link-custom">About</Nav.Link>
            <Nav.Link as={Link} to="/category/products" className="nav-link-custom">Products</Nav.Link>

            {/* Category Dropdown */}
            <NavDropdown title="Category" id="basic-nav-dropdown" className="nav-link-custom">
              {categoryData.map((cat) => (
                <NavDropdown.Item
                  as={Link}
                  to={`/category/products?category=${cat.name}`}
                  key={cat.id}
                  className="dropdown-item-custom"
                >
                  <h5>{cat.name}</h5>
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            {/* Favorite Badge */}
            <Nav.Link onClick={() => handleProtectedNavigation("favorites")} className="position-relative nav-link-custom">
              <FavoriteBadge count={favoriteCount} />
            </Nav.Link>

            {/* Cart Badge */}
            <Nav.Link onClick={() => handleProtectedNavigation("cart")} className="position-relative nav-link-custom">
              <CartBadge count={cartCount} />
            </Nav.Link>

            {/* User Account */}
            <Nav.Link as={Link} to={isAuthenticated ? "/account" : "/login"} className="nav-link-custom">
              <FontAwesomeIcon icon={faUser} />
            </Nav.Link>

            {/* Search */}
            <form onSubmit={handleSearchSubmit} className="d-flex position-relative">
              <input
                type="text"
                placeholder="Search..."
                className="form-control rounded-pill pe-5 py-2 search-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                type="submit"
                className="btn position-absolute end-0 top-0 h-100 d-flex align-items-center justify-content-center"
                style={{ background: 'transparent', border: 'none', color: 'white' }}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </form>

            {/* Admin Dashboard */}
            {user?.role === "admin" && (
              <Nav.Link as={Link} to="/admin" className="nav-link-custom">
                Dashboard
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
