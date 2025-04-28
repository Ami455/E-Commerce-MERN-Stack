import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/slices/AuthSlices';
import './Login.css';

export default function Login() {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuthenticated, error, loading } = useSelector((state) => state.auth);

    console.log(isAuthenticated)

    const onSubmit = async (formData) => {
        await dispatch(loginUser(formData)); 
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/"); 
        }
    }, [isAuthenticated, navigate]);

    return (
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
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? "Logging in..." : "Log in"}
                            </button>

                            {error && <div className="mt-3 alert alert-danger">{error}</div>}

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
    );
}
