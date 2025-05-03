
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../../utils/api';
import toast from 'react-hot-toast';
import { logout } from '../../store/slices/AuthSlices';
import { clearCartCount } from '../../store/slices/CartSlice';
import { clearFavoriteCount } from '../../store/slices/FavoriteSlices';



export default function Account() {
  const { register, handleSubmit, reset } = useForm();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [showSecondAddress, setShowSecondAddress] = useState(false);
  const [loading, setLoading] = useState(false); // new loading state

  const fetchData = async () => {
    if (!user?.id) return;

    try {
      const userData = await api.get(`${import.meta.env.VITE_USER}/${user.id}`);
      const addressesRes = await api.get(`${import.meta.env.VITE_ADDRESS}/users/${user.id}`);
      const fetchedAddresses = addressesRes.data || [];

      setAddresses(fetchedAddresses);

      const formValues = { ...userData.data, ...fetchedAddresses[0] };

      if (fetchedAddresses[1]) {
        formValues.street2 = fetchedAddresses[1].street;
        formValues.city2 = fetchedAddresses[1].city;
        formValues.postalCode2 = fetchedAddresses[1].postalCode;
        formValues.country2 = fetchedAddresses[1].country;
        setShowSecondAddress(true);
      } else {
        setShowSecondAddress(false);
      }

      reset(formValues);
      localStorage.setItem('userData', JSON.stringify(formValues));

    } catch (error) {
      console.error('Failed to fetch account data', error);
    }
  };

  const onSubmit = async (formData) => {
    try {
      setLoading(true);
  
      // 1. Update user basic info
      await api.put(`${import.meta.env.VITE_USER}/${user.id}`, {
        userName: formData.userName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        birthDate: formData.birthDate,
      });
  
      // 2. Update or Create Address 1
      if (addresses[0]) {
        await api.put(`${import.meta.env.VITE_ADDRESS}/${addresses[0].id}`, {
          userId: user.id,
          street: formData.street,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        });
      } else if (formData.street && formData.city && formData.postalCode && formData.country) {
        await api.post(`${import.meta.env.VITE_ADDRESS}`, {
          userId: user.id,
          street: formData.street,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        });
      }
  
      // 3. Update or Create Address 2 if shown
      if (showSecondAddress && (formData.street2 || formData.city2 || formData.postalCode2 || formData.country2)) {
        if (addresses[1]) {
          await api.put(`${import.meta.env.VITE_ADDRESS}/${addresses[1].id}`, {
            userId: user.id,
            street: formData.street2,
            city: formData.city2,
            postalCode: formData.postalCode2,
            country: formData.country2,
          });
        } else {
          await api.post(`${import.meta.env.VITE_ADDRESS}`, {
            userId: user.id,
            street: formData.street2,
            city: formData.city2,
            postalCode: formData.postalCode2,
            country: formData.country2,
          });
        }
      }
  
      toast.success('Account updated successfully!');
      localStorage.setItem('userData', JSON.stringify(formData));
      await fetchData();
  
    } catch (error) {
      console.error('Failed to update account', error);
      toast.error('Failed to update account');
    } finally {
      setLoading(false);
    }
  };
  

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCartCount());
  dispatch(clearFavoriteCount());
    navigate("/login");
    toast.success('Logged out successfully!');
    localStorage.removeItem('userData');
  };

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