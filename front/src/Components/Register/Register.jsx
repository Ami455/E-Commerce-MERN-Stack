import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {api} from '../../utils/api'; // make sure your api instance is set
import './Register.css';
import Photo from './1.png'

export default function Register() {
  const { register, handleSubmit } = useForm();
  const [isRegistered, setIsRegistered] = useState(false);
  const [message, setMessage] = useState('');

  const registerUser = async (formData) => {
    const { userName, email, password } = formData;

    try {
      // Send registration request to the backend
      const res = await api.post(`${import.meta.env.VITE_AUTH_REGISTER}`, { userName, email, password });
      console.log("Registration successful:", res.data);

      // After successful registration:
      setMessage("Registration successful! Please log in.");
      localStorage.removeItem("token"); // Clear any existing token
      localStorage.removeItem("role");  // Clear any existing role

      // Set state to trigger the redirect
      setIsRegistered(true);  // Set to true to trigger the redirection

    } catch (err) {
      console.error("Registration error:", err.response?.data?.message || err.message);
      setMessage(err.response?.data?.message || "Registration failed.");
    }
  };

  const onSubmit = (formData) => {
    registerUser(formData); // Call the register function
  };

  // If the user is registered, navigate to the login page
  if (isRegistered) {
    return <Navigate to="/login" replace />;
  }

  return (
    
    <section >
      <div className="container my-5">
        <div className="row bg-dark-subtle p-5 justify-content-between align-items-center">
          <div className="col-5 ">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2 className="register-title p-3">Sign up</h2>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" {...register("email", { required: true })} />
              </div>

              <div className="mb-3">
                <label htmlFor="userName" className="form-label">User Name</label>
                <input type="text" className="form-control" id="userName" {...register("userName", { required: true })} />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" {...register("password", { required: true })} />
              </div>

              

              <button type="submit" className="btn btn-primary">Register</button>

              {message && <div className="mt-3 alert alert-info">{message}</div>}
              <div className="mt-3">
                <Link to="/login">Already have an account? Log in here!</Link>
              </div>
            </form>
          </div>

          <div className="col-5">
            <img src={Photo} className="w-100 rounded" alt="Register Visual" />
          </div>
        </div>
      </div>
    </section>
    
  );
}
