import React, { useEffect, useRef } from 'react';
import './Admin.css';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Accordion from 'react-bootstrap/Accordion';
import { Outlet, Link, useLocation } from 'react-router-dom';

export default function Admin() {
  const contentRef = useRef(null);
  const location = useLocation();

  // Scroll content into view when location changes (route changes)
  useEffect(() => {
    if (contentRef.current) {
      window.scrollTo({
        top: contentRef.current.offsetTop - 20,
        behavior: 'smooth',
      });
    }
  }, [location]);

  return (
    <Tab.Container defaultActiveKey="add">
      <Row>
        <Col sm={2} className="tabRow p-5">
          <Accordion defaultActiveKey="0" className='mb-3'>
            <Accordion.Item eventKey="0">
              <Accordion.Header><strong>Product</strong></Accordion.Header>
              <Accordion.Body>
                <Nav className="flex-column">
                  <Nav.Link as={Link} to="product/add" className="nlink">Add</Nav.Link>
                  <Nav.Link as={Link} to="product/list" className="nlink">List</Nav.Link>
                  {/* <Nav.Link as={Link} to="product/edit" className="nlink">Edit</Nav.Link> */}
                </Nav>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <Accordion defaultActiveKey="0" className='mb-3'>
            <Accordion.Item eventKey="0">
              <Accordion.Header><strong>User</strong></Accordion.Header>
              <Accordion.Body>
                <Nav className="flex-column">
                  <Nav.Link as={Link} to="user/add" className="nlink">Add</Nav.Link>
                  <Nav.Link as={Link} to="user/list" className="nlink">List</Nav.Link>
                  {/* <Nav.Link as={Link} to="user/edit" className="nlink">Edit</Nav.Link> */}
                </Nav>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <Accordion defaultActiveKey="0" className='mb-3'>
            <Accordion.Item eventKey="0">
              <Accordion.Header><strong>Order</strong></Accordion.Header>
              <Accordion.Body>
                <Nav className="flex-column">
                  <Nav.Link as={Link} to="order/list" className="nlink">List</Nav.Link>
                  {/* <Nav.Link as={Link} to="order/edit" className="nlink">Edit</Nav.Link> */}
                </Nav>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>

        <Col sm={10} className="p-5" ref={contentRef}>
          <Outlet />
        </Col>
      </Row>
    </Tab.Container>
  );
}
