import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom';

export default function User() {
    const location = useLocation();
  const { email, password } = location.state || {};

 // const [user,setUser] = useState({})
  const [token,setToken] = useState("")
//   const [loginData,setLoginData] = useState({
//     "userName":"a",
//     "email":"a@gmail.com",
//     "password": "123aBc"
//   })
  console.log("navigate to user")
  console.log(email, password)
  console.log("navigate to user")
const login= ()=>{
    //const{email,password}=loginData
    console.log(email, password)
    console.log(`${import.meta.env.VITE_LOCAL_HOST}/${import.meta.env.VITE_AUTH_LOGIN}`)
     axios.post(`${import.meta.env.VITE_LOCAL_HOST}/${import.meta.env.VITE_AUTH_LOGIN}`,{email,password}).then((res) => {
        const token = res.data;
        console.log(res);
        console.log("Token:", token);
setToken(token)
        // Save token (commonly in localStorage)
        localStorage.setItem("token", token);
      })
      .catch((err) => {
        console.log("err")
        console.error("Login error:", err.response?.data?.message || err.message);
      });
}

useEffect(()=>{
login()
},[])
    return (
    < >
<div style={{
position:"relative",
        top: '20%px',
       padding:'100px',
        background: 'lightblue',
        
      }}><p>
        {token?"You are logged in!":"no token yet, you are not logged in"}
      </p><br />
        <div style={{width:'400px'}}>token: {token} <br />email: {email} , password: {password}</div>
      </div>
    </>
  )
}
