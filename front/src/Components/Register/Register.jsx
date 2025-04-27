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
    
    const { register, handleSubmit } = useForm();
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

            
            <section className=''>
                <div className="container   my-5">
                    <div className="row ggg p-5 justify-content-center alighn-item-evenly">
                        <div className="col-5 login">
                            <form>
                                <div className="mb-3">
                                    <h2 className='login-title p-3'>Login</h2>
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputUserName" className="form-label">User Name</label>
                                    <input type="UserName" className="form-control" id="exampleInputUserName"  />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" />
                                </div>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label" htmlFor="exampleCheck1"> Remember me</label>
                                </div>
                            
                                <button type="submit" className="btn ">Rejester</button>
                            </form>

                        </div>
                        
                        </div>
                </div>
            </section>

            </>

    )
}

