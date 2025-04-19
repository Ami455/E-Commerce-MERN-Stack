import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import {  faCartShopping, faHeart, faUser } from '@fortawesome/free-solid-svg-icons'
import "./Nav.css"

export default function Nav() {
  return (
    <>
    <nav className="navbar" >
<div className="logo"><h2>LOGO</h2></div>
<div className="navRSection">
<div className="links">
    <ul className="navUl" >
        <li >
            <Link to={"home"}>Home</Link>
        </li>
        <li>
            <Link to={"home"}>Category</Link>
        </li>
        <li>
            <Link to={"home"}>Contact Us</Link>
        </li>
        <li>
            <Link to={"home"}>About</Link>
        </li>
    </ul>
</div>
<div className="navButtons">
    <button className="register"><FontAwesomeIcon icon={faUser} /></button>
    <button className="fav"><FontAwesomeIcon icon={faHeart} /></button>
    <button className="cart"><FontAwesomeIcon icon={faCartShopping} /></button>
   
</div>
</div>
   </nav> 
    
    </>
  )
}
