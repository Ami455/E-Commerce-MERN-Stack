import React from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';


export default function Login() {
    const { register, handleSubmit } = useForm();
    const nav = useNavigate();
    const sendLoginData=(formdata)=>{
        console.log("submit")
        console.log(formdata)
        console.log(formdata.email, formdata.password, "didnt nav")
        nav("/auth", { state: { email: formdata.email, password:formdata.password ,action: 'login' } })

    }
    return (
        <>
            {/* <section className='login-background '>
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
            </section> */}

            <section className=''>
                <div className="container   my-5">
                    <div className="row ggg p-5 justify-content-between alighn-item-center">

                        <div className="col-5 login ">
                            <form onSubmit={handleSubmit(sendLoginData)}>
                                <div className="mb-3">
                                <h2 className='login-title p-3'>Log in</h2>
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register("email")}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" {...register("password")} />
                                </div>
                                
                                <button type="submit" className="btn ">Log in</button>
                                <br />
                                <p >if you don't have account please create one</p>
                                <button to="/register" onClick={"/register"} type="create" className="btn ">Create Account</button>
                                <Button type="create"  href='/register' className=' btn '  >
                                    Create new account
                                </Button>
                            </form>
                            </div>
                            <div className="col-5">
                                {/* <img src="https://i.pinimg.com/736x/58/ef/fc/58effc8203b7d19935efc26589cd0b3a.jpg" className='w-100 rounded' alt="" /> */}
                                <img src="https://i.pinimg.com/736x/f8/33/e9/f833e9c1e11ff86c5aa7f1fa4ba4ea86.jpg" className='w-100 rounded' alt="" />
                            </div>

                        
                        {/* <div className="col-6">
                            
                        </div> */}
                    </div>
                </div>
            </section>

            </>

    )
}

