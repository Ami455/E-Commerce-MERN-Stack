import React from 'react'

import "./Footer.css"

export default function Footer() {
  return (

<footer>

    <div className="container ">
      <div className="row align-items-center justify-content-evenly  ">
        <div className="col-5 foot-sec rounded-2 " >
          <ul className="footer-ul">
            <li>1418 Riverland, Shop 385</li>
            <li>Cotowood, CA 92022</li>
            <li>United States</li>
          </ul>
        </div>
        <div className="col-5 foot-sec rounded-2 " >
          <ul className="footer-ul" >
            <li>Tel: 01272808270 </li>
            <li>Email: Selviaemad58@gmail.com </li>
            <li>Working Hours: 10 AM to 11 PM</li>
          </ul>
        </div>
        
      </div>
    </div>
</footer>
  )
}
