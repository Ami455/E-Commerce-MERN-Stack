import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import {  faCartShopping, faHeart, faUser } from '@fortawesome/free-solid-svg-icons'
import List from './Components/Admin/List/List';


export default function () {

      
  return (
    <>
    <div  style={{
        width: '25%',
        position: 'fixed',
        top: '20%px',
        left: '0',
        height: '100vh',
        background: 'beige'
      }} >
hid
    </div>
    <main style={{
      width:"80%",
position:"relative",
        top: '20%px',
        left: '250px',
        height: '100vh',
        background: 'lightblue',
        padding: '40px'
      }}>
    <List/>
    </main>
   
    </>
  )
}
