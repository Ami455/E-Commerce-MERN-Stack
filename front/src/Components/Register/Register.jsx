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
            
            <section className=''>
                <div className="container my-5">
                    <div className="row ggg p-5 justify-content-between align-item-evenly">
                        <div className="col-5 login">
                            <form onSubmit={handleSubmit(sendLoginData)}>
                                <div className="mb-3">
                                    <h2 className='login-title p-3'>Sign up</h2>
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register("email")} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputUserName" className="form-label">User Name</label>
                                    <input type="text" className="form-control" id="exampleInputUserName" {...register("userName")} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" {...register("password")}/>
                                </div>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label" htmlFor="exampleCheck1"> Remember me</label>
                                </div>
                            
                                <button type="submit" className="btn ">Rejester</button>
                            </form>

                        </div>
                        <div className="col-5 ">
                                {/* <img src="https://i.pinimg.com/736x/58/ef/fc/58effc8203b7d19935efc26589cd0b3a.jpg" className='w-100 rounded' alt="" /> */}
                                <img src="https://i.pinimg.com/736x/f8/33/e9/f833e9c1e11ff86c5aa7f1fa4ba4ea86.jpg" className='w-100 rounded' alt="" />
                            </div>
                        
                        </div>
                </div>
            </section>

            </>

    )
}

