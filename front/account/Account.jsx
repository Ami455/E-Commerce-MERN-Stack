import React from 'react'
import logo from "../../images/navLogo.png"


export default function account() {
  return (
    
    <div className="container">
        <div className="row justify-content-center align-content-center">
            <div className="col-12 p-5">
                <img src={logo} alt="logo" />
            </div>
            <div className="col-12">
            <form className="row g-3">
        <div className="col-md-6">
            <label htmlFor="inputName4" className="form-label">
            userName
            </label>
            <input type="email" className="form-control" id="inputEmail4" />
        </div>
        <div className="col-md-6">
        <label htmlFor="inputEmail4" className="form-label">
            Email
        </label>
        <input type="email" className="form-control" id="inputEmail4" />
        </div>
        <div className="col-md-6">
            <label htmlFor="inputPhone4" className="form-label">
            Phone Number
            </label>
            <input type="Phone" className="form-control" id="inputPhone4" />
        </div>
        <div className="col-md-6">
        <label htmlFor="inputDate4" className="form-label">
            Date
        </label>
        <input type="date" className="form-control" id="inputDate4" />
        </div>
    <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">
                Address
                </label>
        <div className="container border p-4">
            <div className="row">
            <div className="col-12">
                
                <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="1234 Main St"
                />
                </div>
                <div className="col-6">
                    <label htmlFor="inputCity" className="form-label">
                    City
                    </label>
                    <input type="text" className="form-control" id="inputCity" />
                    </div>
                    <div className="col-4">
                    <label htmlFor="inputpostCode" className="form-label">
                    Post Code
                    </label>
                    <input type="text" className="form-control" id="inputpostCode" />
                    </div>
        </div>
            </div>
        </div>
    </form> 
    </div>
    <div className="col-12 ">
        <div>
            <a href="/orders">
            your orders
        </a>
        </div>
        
    </div>
        </div>
    </div>
  )
}


      {/* <div className="col-12">
        <label htmlFor="inputAddress2" className="form-label">
          Address 2
        </label>
        <input
          type="text"
          className="form-control"
          id="inputAddress2"
          placeholder="Apartment, studio, or floor"
        />
      </div> */}
{/* <div className="col-md-4">
        <label htmlFor="inputState" className="form-label">
          State
        </label>
        <select id="inputState" className="form-select">
          <option defaultValue>Choose...</option>
          <option>...</option>
        </select>
      </div>
      <div className="col-md-2">
        <label htmlFor="inputZip" className="form-label">
          Zip
        </label>
        <input type="text" className="form-control" id="inputZip" />
      </div>
      <div className="col-12">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="gridCheck"
          />
          <label className="form-check-label" htmlFor="gridCheck">
            Check me out
          </label>
        </div>
      </div>*/}
      {/* <div className="col-12">
        <button type=" " className="btn w-100 btn-primary">
          your order
        </button>
      </div> */}