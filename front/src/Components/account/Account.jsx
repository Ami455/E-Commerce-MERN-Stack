import React, { useEffect, useState } from 'react'
import logo from "../../../../images/navLogo.png"
import { useForm } from 'react-hook-form'
import { api } from '../../utils/api'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

export default function Account() {
  const { register, handleSubmit ,reset} = useForm()
  const {user , isAuthenticated} = useSelector((state) => state.auth);
const navigate = useNavigate()
const [addressId, setAddressId] = useState(null)
const [iscreated, setIscreated] = useState(0)


const sendAddressData = async (updatedAddress, updatedUser) => {
   try{
    //if address is created just update it
   // await api.put(`${import.meta.env.VITE_ADDRESS}/${addressId}`,updatedAddress)
   console.log(iscreated)
   iscreated==1?await api.put(`${import.meta.env.VITE_ADDRESS}/${addressId}`,updatedAddress):await api.post(`${import.meta.env.VITE_ADDRESS}`,updatedAddress);
    await api.put(`${import.meta.env.VITE_USER}/${user.id}`,updatedUser);
    toast.success('Data Updated Successfully!')
    
   }
   catch(error){
    toast
console.error('Failed to post address:', error);
toast.error(error)
   }
    
  };
const fetchData = async () => {
   try{
    
    
   const userData= await api.get(`${import.meta.env.VITE_USER}/${user.id}`);
   const addresses= await api.get(`${import.meta.env.VITE_ADDRESS}`);
   if(addresses.data.length>0){setIscreated(1); setAddressId(addresses.data[0].id)}

   console.log(addresses.data.length, "length")
   console.log(userData.data, addresses.data[0])
   reset({ ...userData.data, ...addresses.data[0] }); // sets default values dynamically
   
   }
   catch(error){
console.error('Failed to fetch data', error);
   }
  };


  const onSubmit = async(formData) => {
    const {street, city, postalCode , country,userName, email, phoneNumber,birthDate} =formData
    
    await sendAddressData({street, city, postalCode , country},{userName, email, phoneNumber,birthDate})
    
  }

 useEffect(() => {
  console.log(isAuthenticated)
         if (!isAuthenticated) {
             navigate("/login"); 
         }
         fetchData()
         
     }, [isAuthenticated]);


  return (
    <div className="container">
      <div className="row justify-content-center align-content-center">
        <div className="col-12 p-5 text-center">
          <img src={logo} alt="logo" />
        </div>

        <div className="col-12">
          <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>

            {/* User Info */}
            <fieldset className="border p-4 rounded">
              <legend className="w-auto px-2">User Info</legend>

              <div className="col-md-6">
                <label className="form-label">UserName</label>
                <input  type="text" id="userName" className="form-control"  {...register("userName", { required: true })} />
              </div>

              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" id="email" {...register("email", { required: true })}/>
              </div>

              <div className="col-md-6">
                <label className="form-label">Phone Number</label>
                <input {...register("phoneNumber",  { required: true })} type="tel" className="form-control" />
              </div>

              <div className="col-md-6">
                <label className="form-label">Birth Date</label>
                <input {...register("birthDate",  { required: true })} type="date" className="form-control" />
              </div>
            </fieldset>

            {/* Address1 Info */}
            <fieldset className="border p-4 rounded mt-4">
              <legend className="w-auto px-2">Address 1 Info</legend>

              <div className="col-12">
                <label className="form-label">Street</label>
                  <input {...register("street", { required: true })} type="text" className="form-control" placeholder="1234 Main St" />
              </div>

              <div className="col-md-6">
                <label className="form-label">City</label>
                <input {...register("city" , { required: true })} type="text" className="form-control" />
              </div>

              <div className="col-md-6">
                <label className="form-label">Postal Code</label>
                <input {...register("postalCode" , { required: true })} type="text" className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Country</label>
                <input {...register("country" , { required: true })} type="text" className="form-control" />
              </div>
            </fieldset>

            <div className="col-12 mt-4 text-center">
              <button type="submit" className="btn btn-primary w-50">Save</button>
            </div>

          </form>
        </div>

        <div className="col-12 mt-3 text-center" >
          <a href="/orders">Your Orders</a>
        </div>
      </div>
    </div>
  )
}




// import React from 'react'
// import logo from "../../../../images/navLogo.png"



// export default function Account() {
//   return (
    
//     <div className="container">
//         <div className="row justify-content-center align-content-center">
//             <div className="col-12 p-5">
//                 <img src={logo} alt="logo" />
//             </div>
//             <div className="col-12">
//             <form className="row g-3">
//         <div className="col-md-6">
//             <label htmlFor="inputName4" className="form-label">
//             userName
//             </label>
//             <input type="email" className="form-control" id="inputEmail4" />
//         </div>
//         <div className="col-md-6">
//         <label htmlFor="inputEmail4" className="form-label">
//             Email
//         </label>
//         <input type="email" className="form-control" id="inputEmail4" />
//         </div>
//         <div className="col-md-6">
//             <label htmlFor="inputPhone4" className="form-label">
//             Phone Number
//             </label>
//             <input type="Phone" className="form-control" id="inputPhone4" />
//         </div>
//         <div className="col-md-6">
//         <label htmlFor="inputDate4" className="form-label">
//             Date
//         </label>
//         <input type="date" className="form-control" id="inputDate4" />
//         </div>
//     <div className="col-12">
//             <label htmlFor="inputAddress" className="form-label">
//                 Address
//                 </label>
//         <div className="container border p-4">
//             <div className="row">
//             <div className="col-12">
                
//                 <input
//                 type="text"
//                 className="form-control"
//                 id="inputAddress"
//                 placeholder="1234 Main St"
//                 />
//                 </div>
//                 <div className="col-6">
//                     <label htmlFor="inputCity" className="form-label">
//                     City
//                     </label>
//                     <input type="text" className="form-control" id="inputCity" />
//                     </div>
//                     <div className="col-4">
//                     <label htmlFor="inputpostCode" className="form-label">
//                     Post Code
//                     </label>
//                     <input type="text" className="form-control" id="inputpostCode" />
//                     </div>
//         </div>
//             </div>
//         </div>
//     </form> 
//     </div>
//     <div className="col-12 ">
//         <div>
//             <a href="/orders">
//             your orders
//         </a>
//         </div>
        
//     </div>
//         </div>
//     </div>
//   )
// }


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