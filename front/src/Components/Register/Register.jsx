import React from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import './Register.css'
import Container from 'react-bootstrap/esm/Container';


export default function Register() {
    return (
        <>
            <section className='register-background '>
                <div className="form  w-25 ">
                    <Form>
                    <Form.Group as={Row} className="mb-3">
                            <Form.Label column className='me-2 ms-4' sm="2">
                                Username
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="username" placeholder="Username" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column className='me-2 ms-4' sm="2">
                                Email
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="email" placeholder="email@example.com" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column className='me-2 ms-4' sm="5">
                                Password
                            </Form.Label>
                            <Col sm="13">
                                <Form.Control type="password" placeholder="Password" aria-describedby="passwordHelpBlock" />
                                <Form.Text id="passwordHelpBlock" muted>
                                    Your password must be 8-20 characters long, contain letters and numbers,
                                    and must not contain spaces, special characters, or emoji.
                                </Form.Text>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Col sm='3'></Col>
                            <Col>
                                <Button variant="outline-primary" className='w-75' size="lg">
                                    Register
                                </Button>
                            </Col>

                        </Form.Group>
                        <div>

                        </div>

                    </Form>
                </div>
            </section>
            </>

    )
}

