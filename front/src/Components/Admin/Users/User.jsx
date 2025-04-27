import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

export default function User() {
  const location = useLocation();


  const { email, password, userName, action } = location.state || {};
  const navigate = useNavigate();

  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [adminData, setAdminData] = useState("");

  const login = async () => {
    try {
      console.log("Logging in with:", email, password);

      const res = await axios.post(`${import.meta.env.VITE_LOCAL_HOST}/${import.meta.env.VITE_AUTH_LOGIN}`, { email, password });


      const token = res.data.token;

      console.log("Token:", token);

      setToken(token);
      setMessage("Login successful!");
      localStorage.setItem("token", token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;


      // ✅ Call adminRole and get the returned role
      const role = await adminRole();

      console.log("Role from adminRole:", role);

      if (role === "admin") {
        navigate('/admin');
      } else {
        navigate('/');
      }

      
    } catch (err) {
      console.error("Login error:", err.response?.data?.message || err.message);
      setMessage(err.response?.data?.message || "Login failed.");
    }
  };

  const adminRole = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_LOCAL_HOST}/${import.meta.env.VITE_AUTH_ADMIN}`);
      console.log("Admin data:", res.data.role);
      setAdminData(res.data.role); // You can still update state if you want to display it later
      return res.data.role; // ✅ Return role immediately
    } catch (err) {
      console.error("Error fetching admin role:", err.response?.data?.message || err.message);
      return null;
    }
  };

  const register = async () => {
    try {
      console.log("Registering with:", userName, email, password);

      const res = await axios.post(`${import.meta.env.VITE_LOCAL_HOST}/${import.meta.env.VITE_AUTH_REGISER}`, { userName, email, password });
      const token = res.data.token;

      console.log("Registration successful, Token:", token);

      setToken(token);
      setMessage("Registration successful!");
      localStorage.setItem("token", token);

    } catch (err) {
      console.error("Registration error:", err.response?.data?.message || err.message);
      setMessage(err.response?.data?.message || "Registration failed.");
    }
  };

  useEffect(() => {
    if (action === 'login') {
      login();
    } else if (action === 'register') {
      register();
    }
    const savedToken = localStorage.getItem("token");

    if (savedToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
      setToken(savedToken);
      console.log(savedToken);
    }
  }, [action]);


  return (
    <>
      {/* You can show message/token/admin role if you want */}
    </>
  );
}
