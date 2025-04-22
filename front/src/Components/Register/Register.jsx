import React from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import './Register.css'
import Container from 'react-bootstrap/esm/Container';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';


export default function Register() {
    
    const { register, handleSubmit, reset } = useForm();
    const nav = useNavigate();
    const sendLoginData=(formdata)=>{
        console.log("submit")
        console.log(formdata)
        console.log(formdata.email, formdata.password, "didnt nav")
        nav("/auth", { state: { userName: formdata.userName ,email: formdata.email, password:formdata.password ,action: 'register'} })

        

    }


    return (
        <>
            <section className='register-background '>
                <div className="form  w-25 ">
                    <Form onSubmit={handleSubmit(sendLoginData)}>
                    <Form.Group as={Row} className="mb-3">
                            <Form.Label column className='me-2 ms-4' sm="2">
                                Username
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="userName" placeholder="UserName" {...register("userName")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column className='me-2 ms-4' sm="2">
                                Email
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="email" placeholder="email@example.com" {...register("email")}/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column className='me-2 ms-4' sm="5">
                                Password
                            </Form.Label>
                            <Col sm="13">
                                <Form.Control type="password" placeholder="Password" aria-describedby="passwordHelpBlock" {...register("password")}/>
                                <Form.Text id="passwordHelpBlock" muted>
                                    Your password must be 8-20 characters long, contain letters and numbers,
                                    and must not contain spaces, special characters, or emoji.
                                </Form.Text>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Col sm='3'></Col>
                            <Col>
                                <Button type="submit" variant="outline-primary" className='w-75' size="lg">
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

