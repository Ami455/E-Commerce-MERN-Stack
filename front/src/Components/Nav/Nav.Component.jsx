import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { faCartShopping, faHeart, faUser } from '@fortawesome/free-solid-svg-icons'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../Nav/NavComponent.css"


export default function NavComponent() {
  return (
    <>
      <Navbar expand="lg" className="bar ">
        <Container className='justify-content-between'>
          <Navbar.Brand href="#home">LOGO</Navbar.Brand>
          <Nav>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <NavDropdown title="Category" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Beds</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Sofa
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Table</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
              <Nav>
              <Nav.Link href="#fav" className='navLink'><FontAwesomeIcon icon={faHeart} /></Nav.Link>
              <Nav.Link href="#cart"><FontAwesomeIcon icon={faCartShopping} /></Nav.Link>
              <Nav.Link href="#acount"><FontAwesomeIcon icon={faUser} /></Nav.Link>
              </Nav>
              </Nav>
          </Navbar.Collapse>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

