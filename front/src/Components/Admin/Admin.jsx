import React from 'react';
import './Admin.css';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { Outlet, Link } from 'react-router-dom';

export default function Admin() {
    return (
        <Tab.Container defaultActiveKey="add">
            <Row className='row'>
                <Col sm={2} className='tabRow '>
                    <Nav variant="underline" className="flex-column">
                        <Nav.Item>
                            <Nav.Link as={Link} to="add" className='nlink' >
                            <p>Add Items</p>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="list" className='nlink'>
                            <p>List Items</p>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={10} className='p-5'>
                    <Outlet />
                </Col>
            </Row>
        </Tab.Container>
    );
}
