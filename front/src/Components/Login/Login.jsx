import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {api} from '../../utils/api'; // make sure you have an api.js for axios instance
import './Login.css';


export default function Login() {
    const { register, handleSubmit } = useForm();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [message, setMessage] = useState('');
    const [token, setToken] = useState('');
    const [adminData, setAdminData] = useState('');

    const login = async (formData) => {
        const { email, password } = formData;

        try {
            console.log("Logging in with:", email, password);

            const res = await api.post(`${import.meta.env.VITE_AUTH_LOGIN}`, { email, password });

            const receivedToken = res.data.token;
            console.log("Token:", receivedToken);

            setToken(receivedToken);
            setMessage("Login successful!");
            localStorage.setItem("token", receivedToken);
            setIsAuthenticated(true); // user is now authenticated

            const role = await adminRole();

            if (role === "admin") {
                setIsAdmin(true); // mark as admin
            } else {
                setIsAdmin(false); // not admin
            }
        } catch (err) {
            console.error("Login error:", err.response?.data?.message || err.message);
            setMessage(err.response?.data?.message || "Login failed.");
        }
    };

    const adminRole = async () => {
        try {
            const res = await api.get(`${import.meta.env.VITE_AUTH_ADMIN}`);
            console.log("Admin data:", res.data.role);
            setAdminData(res.data.role);
            return res.data.role;
        } catch (err) {
            console.error("Error fetching admin role:", err.response?.data?.message || err.message);
            return null;
        }
    };

    const onSubmit = (formData) => {
        console.log("Submitting form data:", formData);
        login(formData);
    };

    // Handle redirection if authenticated
    if (isAuthenticated) {
        if (isAdmin) {
            return <Navigate to="/admin" replace />;
        } else {
            return <Navigate to="/" replace />;
        }
    }

    return (
        <>
            <section>
                <div className="container my-5">
                    <div className="row ggg p-5 justify-content-between align-items-center">
                        <div className="col-5 login">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <h2 className='login-title p-3'>Log in</h2>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" {...register("email", { required: true })} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" {...register("password", { required: true })} />
                                </div>
                                <button type="submit" className="btn btn-primary">Log in</button>

                                {message && <div className="mt-3 alert alert-info">{message}</div>}

                                <div className="mt-3">
                                    <Link to="/register">Don't have an account? Sign up now!</Link>
                                </div>
                            </form>
                        </div>
                        <div className="col-5">
                            <img src="https://i.pinimg.com/736x/f8/33/e9/f833e9c1e11ff86c5aa7f1fa4ba4ea86.jpg" className='w-100 rounded' alt="Login Visual" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
