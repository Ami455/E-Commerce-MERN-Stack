import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom';

export default function User() {
  const location = useLocation();
  const { email, password, userName, action } = location.state || {}; // Expecting action to determine login or register
  // const [user,setUser] = useState({})

  const [token,setToken] = useState("")
  const [message, setMessage] = useState(""); // State for message

  const login = () => {
    console.log("Logging in with:", email, password);
    
    console.log("navigate to user")
    console.log(email, password)
    console.log("navigate to user")

    //const{email,password}=loginData
    console.log(email, password)
    //console.log(`${import.meta.env.VITE_LOCAL_HOST}/${import.meta.env.VITE_AUTH_LOGIN}`)
    axios.post(`${import.meta.env.VITE_LOCAL_HOST}/${import.meta.env.VITE_AUTH_LOGIN}`, { email, password }).then((res) => {
      const token = res.data.token;
    
      
      console.log("Token:", token);
      setToken(token)
      setMessage("Login successful!"); // Set success message
      // Save token (commonly in localStorage)
      localStorage.setItem("token", token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
    })
      .catch((err) => {
        console.log("err")
        console.error("Login error:", err.response?.data?.message || err.message);
        setMessage(err.response?.data?.message || "Login failed."); // Set error message
      
      });
  };


  const register = () => {
    console.log("Registering with:", userName, email, password);
    axios.post(`${import.meta.env.VITE_LOCAL_HOST}/${import.meta.env.VITE_AUTH_REGISER}`, { userName, email, password })
      .then((res) => {
        const token = res.data.token;
        console.log("Registration successful, Token:", token);
        setToken(token);
        setMessage("Registration successful!"); // Set success message
        localStorage.setItem("token", token);
      })
      .catch((err) => {
        console.error("Registration error:", err.response?.data?.message || err.message);
        setMessage(err.response?.data?.message || "Registration failed."); // Set error message
      });
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
  }
  }, [action]); // Depend on action to call the correct function

  return (
    < >
      <div style={{
        position:"relative",
        top: '20%',
        padding:'100px',
        background: 'lightblue',

      }}><p>
          {token ? "success!" : "no token yet, you are not logged in"}
        </p><br />
        <p>{message}</p> {/* Render the message here */}
        <br />
        <div style={{width:'400px'}}>token: {token} <br />email: {email} , password: {password}</div>
      </div>
    </>
  )
}
