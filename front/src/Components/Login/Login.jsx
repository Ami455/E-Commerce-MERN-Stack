import React from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import './Login.css'
import Container from 'react-bootstrap/esm/Container';
import User from '../Admin/Users/User';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';


export default function Login() {
    const { register, handleSubmit, reset } = useForm();
    const nav = useNavigate();
    const sendLoginData=(formdata)=>{
        console.log("submit")
        console.log(formdata)
        console.log(formdata.email, formdata.password, "didnt nav")
        nav("/auth", { state: { email: formdata.email, password:formdata.password ,action: 'login' } })

    }
    return (
        <>
            <section className='login-background '>
                <div className="form  w-25 ">
                    <Form onSubmit={handleSubmit(sendLoginData)}>
                        <Form.Group as={Row} className="mb-5" controlId="formPlaintextEmail">
                            <Form.Label column className='me-2 ms-4' sm="2">
                                Email
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="email" placeholder="email@example.com" {...register("email")}/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-5" controlId="formPlaintextPassword">
                            <Form.Label column className='me-2 ms-4' sm="5">
                                Password
                            </Form.Label>
                            <Col sm="13">
                                <Form.Control type="password" placeholder="Password" aria-describedby="passwordHelpBlock" {...register("password")} />
                                <Form.Text id="passwordHelpBlock" muted>
                                    Your password must be 8-20 characters long, contain letters and numbers,
                                    and must not contain spaces, special characters, or emoji.
                                </Form.Text>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Col sm='3'></Col>
                            <Col>
                                <Button type="submit" variant="outline-primary" className='w-75' size="lg" >
                                    Login
                                </Button>
                            </Col>

                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Col sm='1'></Col>
                            <Col>
                                <Button type="create" variant="outline-success" href='/register' className='w-100' size="lg" >
                                    Create new account
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

