import React from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import './Login.css'
import { useNavigate, Link } from 'react-router-dom';
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
            <section className=''>
                <div className="container  my-5">
                    <div className="row ggg p-5 justify-content-between align-item-center">

                        <div className="col-5 mt-5 login ">
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
                                
                                <br/>
                                <div className="mt-3">
                                <Link to="/register" >Don't have an account? Sign up now!</Link>
                                </div>
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

