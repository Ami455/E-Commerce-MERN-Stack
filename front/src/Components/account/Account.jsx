// import React, { useEffect, useState } from 'react';
// import logo from "../../../../images/navLogo.png";
// import { useForm } from 'react-hook-form';
// import { api } from '../../utils/api';
// import toast from 'react-hot-toast';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// export default function Account() {
//   const { register, handleSubmit, reset } = useForm();
//   const { user, isAuthenticated } = useSelector((state) => state.auth);
//   const navigate = useNavigate();
//   const [addressId, setAddressId] = useState(null);
//   const [iscreated, setIscreated] = useState(0);
//   const [showSecondAddress, setShowSecondAddress] = useState(false);

//   const sendAddressData = async (updatedAddress, updatedUser) => {
//     try {
//       iscreated === 1
//         ? await api.put(`${import.meta.env.VITE_ADDRESS}/${addressId}`, updatedAddress)
//         : await api.post(`${import.meta.env.VITE_ADDRESS}`, updatedAddress);

//       await api.put(`${import.meta.env.VITE_USER}/${user.id}`, updatedUser);
//       toast.success('Data Updated Successfully!');
//     } catch (error) {
//       console.error('Failed to post address:', error);
//       toast.error(error.message || "Something went wrong!");
//     }
//   };

//   const fetchData = async () => {
//     try {
//       const userData = await api.get(`${import.meta.env.VITE_USER}/${user.id}`);
//       const addresses = await api.get(`${import.meta.env.VITE_ADDRESS}`);
//       console.log(addresses.length)
//       if (addresses.data.length > 0) {
//         setIscreated(1);
//         setAddressId(addresses.data[0].id);
//       }
    
//       reset({ ...userData.data, ...addresses.data[0] });
//     } catch (error) {
//       console.error('Failed to fetch data', error);
//     }
//   };

//   const onSubmit = async (formData) => {
//     const {
//       street, city, postalCode, country,
//       street2, city2, postalCode2, country2,
//       userName, email, phoneNumber, birthDate
//     } = formData;

//     await sendAddressData(
//       { street, city, postalCode, country },
//       { userName, email, phoneNumber, birthDate }
//     );

//     if (showSecondAddress && street2) {
//       await api.post(`${import.meta.env.VITE_ADDRESS}`, {
//         street: street2,
//         city: city2,
//         postalCode: postalCode2,
//         country: country2,
//         userId: user.id
//       });
//     }
//   };

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate("/login");
//     }
//     fetchData();
//   }, [isAuthenticated]);

//   return (
//     <div className="container">
//       <div className="row justify-content-center align-content-center">
//         <div className="col-12 p-5 text-center">
//           <img src={logo} alt="logo" />
//         </div>

//         <div className="col-12">
//           <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>

//             {/* User Info */}
//             <fieldset className="border p-4 rounded">
//               <legend className="w-auto px-2">User Info</legend>

//               <div className="col-md-6">
//                 <label className="form-label">UserName</label>
//                 <input type="text" className="form-control" {...register("userName", { required: true })} />
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label">Email</label>
//                 <input type="email" className="form-control" {...register("email", { required: true })} />
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label">Phone Number</label>
//                 <input type="tel" className="form-control" {...register("phoneNumber", { required: true })} />
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label">Birth Date</label>
//                 <input type="date" className="form-control" {...register("birthDate", { required: true })} />
//               </div>
//             </fieldset>

//             {/* Address 1 */}
//             <fieldset className="border p-4 rounded mt-4">
//               <legend className="w-auto px-2">Address 1 Info</legend>

//               <div className="col-12">
//                 <label className="form-label">Street</label>
//                 <input type="text" className="form-control" placeholder="1234 Main St" {...register("street", { required: true })} />
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label">City</label>
//                 <input type="text" className="form-control" {...register("city", { required: true })} />
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label">Postal Code</label>
//                 <input type="text" className="form-control" {...register("postalCode", { required: true })} />
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label">Country</label>
//                 <input type="text" className="form-control" {...register("country", { required: true })} />
//               </div>

//               {/* زرار Another Address */}
//               <div className="col-12 mt-2 text-end">
//                 {!showSecondAddress && (
//                   <button type="button" className="btn btn-link p-0" onClick={() => setShowSecondAddress(true)}>
//                     + Another Address
//                   </button>
//                 )}
//               </div>
//             </fieldset>

//             {/* Address 2 (optional) */}
//             {showSecondAddress && (
//               <fieldset className="border p-4 rounded mt-4">
//                 <legend className="w-auto px-2">Address 2 Info</legend>

//                 <div className="col-12">
//                   <label className="form-label">Street</label>
//                   <input type="text" className="form-control" placeholder="1234 Another St" {...register("street2")} />
//                 </div>

//                 <div className="col-md-6">
//                   <label className="form-label">City</label>
//                   <input type="text" className="form-control" {...register("city2")} />
//                 </div>

//                 <div className="col-md-6">
//                   <label className="form-label">Postal Code</label>
//                   <input type="text" className="form-control" {...register("postalCode2")} />
//                 </div>

//                 <div className="col-md-6">
//                   <label className="form-label">Country</label>
//                   <input type="text" className="form-control" {...register("country2")} />
//                 </div>

//                 <div className="col-12 mt-2 text-end">
//                   <button type="button" className="btn btn-link text-danger p-0" onClick={() => setShowSecondAddress(false)}>
//                     - Remove Address
//                   </button>
//                 </div>
//               </fieldset>
//             )}

//             <div className="col-12 mt-4 text-center">
//               <button type="submit" className="btn btn-primary w-50">Save</button>
//             </div>

//           </form>
//         </div>

//         <div className="col-12 mt-3 text-center">
//           <a href="/orders">Your Orders</a>
//         </div>
//       </div>
//     </div>
//   );
// }








// import React, { useEffect, useState } from 'react'
// import logo from "../../../../images/navLogo.png"
// import { useForm } from 'react-hook-form'
// import { api } from '../../utils/api'
// import toast from 'react-hot-toast'
// import { useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom'

// export default function Account() {
//   const { register, handleSubmit ,reset} = useForm()
//   const {user , isAuthenticated} = useSelector((state) => state.auth);
// const navigate = useNavigate()
// const [addressId, setAddressId] = useState([])
// const [iscreated, setIscreated] = useState([])
// const [showSecondAddress, setShowSecondAddress] = useState(false);


// const sendAddressData = async (updatedAddress,address2, updatedUser) => {
//    try{
//     //if address is created just update it
//    // await api.put(`${import.meta.env.VITE_ADDRESS}/${addressId}`,updatedAddress)
//    console.log(iscreated)
//    iscreated[0]==1?await api.put(`${import.meta.env.VITE_ADDRESS}/${addressId[0]}`,updatedAddress):await api.post(`${import.meta.env.VITE_ADDRESS}`,updatedAddress);
//    if(address2){
//     console.log("adddddd2",street2, city2, postalCode2 , country2)

//     iscreated[1]==1?await api.put(`${import.meta.env.VITE_ADDRESS}/${addressId[1]}`,address2):await api.post(`${import.meta.env.VITE_ADDRESS}`,address2);
//   }
//     await api.put(`${import.meta.env.VITE_USER}/${user.id}`,updatedUser);
//     toast.success('Data Updated Successfully!')
    
//    }
//    catch(error){
//     toast
// console.error('Failed to post address:', error);
// toast.error(error)
//    }
    
//   };
// const fetchData = async () => {
//    try{
    
//    const userData= await api.get(`${import.meta.env.VITE_USER}/${user.id}`);
//    const addresses= await api.get(`${import.meta.env.VITE_ADDRESS}`);
//    console.log(addresses)
//    let create=[],add=[]
//    addresses.data.forEach((address, index) => {
//     create[index] = 1;
//     add[index] = address.id;
//   });
  
//    setIscreated(create); setAddressId(add)
//    if(addresses.data.length>0){setIscreated(1); setAddressId(addresses.data[0].id)}

//    console.log(addresses.data.length, "length")
//    console.log(userData.data, addresses.data[0])
//    reset({ ...userData.data, ...addresses.data[0] ,...(showSecondAddress ? addresses.data[1] : {})}); // sets default values dynamically   
//    }
//    catch(error){
// console.error('Failed to fetch data', error);
//    }
//   };


//   const onSubmit = async(formData) => {
//     const {street, city, postalCode , country,street2, city2, postalCode2 , country2,userName, email, phoneNumber,birthDate} =formData
//     let address2={}
//     if (showSecondAddress && {street2, city2, postalCode2 , country2})
//    {address2={street2, city2, postalCode2 , country2}}
//     await sendAddressData({street, city, postalCode , country},address2,{userName, email, phoneNumber,birthDate})
    
//   }

//  useEffect(() => {
//   console.log(isAuthenticated)
//          if (!isAuthenticated) {
//              navigate("/login"); 
//          }
//          fetchData()
         
//      }, [isAuthenticated]);


//   return (
//     <div className="container">
//       <div className="row justify-content-center align-content-center">
//         <div className="col-12 p-5 text-center">
//           <img src={logo} alt="logo" />
//         </div>

//         <div className="col-12">
//           <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>

//             {/* User Info */}
//             <fieldset className="border p-4 rounded">
//               <legend className="w-auto px-2">User Info</legend>

//               <div className="col-md-6">
//                 <label className="form-label">UserName</label>
//                 <input  type="text" id="userName" className="form-control"  {...register("userName", { required: true })} />
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label">Email</label>
//                 <input type="email" className="form-control" id="email" {...register("email", { required: true })}/>
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label">Phone Number</label>
//                 <input {...register("phoneNumber",  { required: true })} type="tel" className="form-control" />
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label">Birth Date</label>
//                 <input {...register("birthDate",  { required: true })} type="date" className="form-control" />
//               </div>
//             </fieldset>

//             {/* Address1 Info */}
//             <fieldset className="border p-4 rounded mt-4">
//               <legend className="w-auto px-2">Address 1 Info</legend>

//               <div className="col-12">
//                 <label className="form-label">Street</label>
//                   <input {...register("street", { required: true })} type="text" className="form-control" placeholder="1234 Main St" />
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label">City</label>
//                 <input {...register("city" , { required: true })} type="text" className="form-control" />
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label">Postal Code</label>
//                 <input {...register("postalCode" , { required: true })} type="text" className="form-control" />
//               </div>
//               <div className="col-md-6">
//                 <label className="form-label">Country</label>
//                 <input {...register("country" , { required: true })} type="text" className="form-control" />
//               </div>
//             </fieldset>
//             <div className="col-12 mt-2 text-end">
//                 {!showSecondAddress && (
//                   <button type="button" className="btn btn-link p-0" onClick={() => setShowSecondAddress(true)}>
//                     + Another Address
//                   </button>
//                 )}
//               </div>

//             {showSecondAddress && (
//               <fieldset className="border p-4 rounded mt-4">
//                 <legend className="w-auto px-2">Address 2 Info</legend>

//                 <div className="col-12">
//                   <label className="form-label">Street</label>
//                   <input type="text" className="form-control" placeholder="1234 Another St" {...register("street2")} />
//                 </div>

//                 <div className="col-md-6">
//                   <label className="form-label">City</label>
//                   <input type="text" className="form-control" {...register("city2")} />
//                 </div>

//                 <div className="col-md-6">
//                   <label className="form-label">Postal Code</label>
//                   <input type="text" className="form-control" {...register("postalCode2")} />
//                 </div>

//                 <div className="col-md-6">
//                   <label className="form-label">Country</label>
//                   <input type="text" className="form-control" {...register("country2")} />
//                 </div>

//                 <div className="col-12 mt-2 text-end">
//                   <button type="button" className="btn btn-link text-danger p-0" onClick={() => setShowSecondAddress(false)}>
//                     - Remove Address
//                   </button>
//                 </div>
//               </fieldset>
//             )}

//             <div className="col-12 mt-4 text-center">
//               <button type="submit" className="btn btn-primary w-50">Save</button>
//             </div>

//           </form>
//         </div>

//         <div className="col-12 mt-3 text-center" >
//           <Link to={"/orders"}>Your Orders</Link>
          
//         </div>
//       </div>
//     </div>
//   )
// }







// //amina second
// import React, { useEffect, useState } from 'react'
// import logo from "../../../../images/navLogo.png"
// import { useForm } from 'react-hook-form'
// import { api } from '../../utils/api'
// import toast from 'react-hot-toast'
// import { useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom'

// export default function Account() {
//   const { register, handleSubmit ,reset} = useForm()
//   const {user , isAuthenticated} = useSelector((state) => state.auth);
// const navigate = useNavigate()
// const [addressId, setAddressId] = useState([null,null])
// //const [addresses, setAddresses] = useState([])
// const [showSecondAddress, setShowSecondAddress] = useState(false);

//   const updateUserData = async (updatedUser) => {
//     try{
    
//      await api.put(`${import.meta.env.VITE_USER}/${user.id}`,updatedUser);
//      toast.success('User Updated Successfully!')
     
//     }
//     catch(error){
//       toast.error('Failed to update user')
//  console.error('Failed to update user', error);
 
//     }  
//    };

//    const sendAddressData = async (updatedAddress,addressId, addressNum) => {
//     try{
    
//    // console.log(addressNum ,"= number")
//    if (addressId) {
//     await api.put(`${import.meta.env.VITE_ADDRESS}/${addressId}`, updatedAddress);
//     toast.success(`Address ${addressNum} updated successfully!`);
//   } else {
//     await api.post(`${import.meta.env.VITE_ADDRESS}`, updatedAddress);
//     toast.success(`Address ${addressNum} created successfully!`);
//   }
// } catch (error) {
//   toast.error(`Failed to update address ${addressNum}`);
//   console.error(`Failed to update address ${addressNum}`, error);
// }    
//    };

// const fetchData = async () => {
//    try{
//    const userData= await api.get(`${import.meta.env.VITE_USER}/${user.id}`);
//    const res= await api.get(`${import.meta.env.VITE_ADDRESS}`);
//    const addresses=res.data
//    let addId=[null,null];
//    if (addresses[0]) addId[0] = addresses[0].id;
//   if (addresses[1]) addId[1] = addresses[1].id;
  
//    setAddressId(addId)
//    //setAddresses(addresses)
//    setShowSecondAddress(addresses[1]!=null); // only show if address 2 exists
//    reset({
//     ...userData.data,
//     ...addresses[0],
//     ...(addresses[1] ? {
//       street2: addresses[1].street,
//       city2: addresses[1].city,
//       postalCode2: addresses[1].postalCode,
//       country2: addresses[1].country
//     } : {})
//   });   }
//    catch(error){
// console.error('Failed to fetch data', error);
//    }
//   };

//   const onSubmit = async(formData) => {
//     const {street, city, postalCode , country,street2, city2, postalCode2 , country2,userName, email, phoneNumber,birthDate} =formData
//     await(updateUserData({userName, email, phoneNumber,birthDate}))
//     await sendAddressData({street, city, postalCode , country},addressId[0], 1)
//     if (showSecondAddress)
//     {      
//       await sendAddressData({ street: street2, city: city2, postalCode: postalCode2, country: country2 },addressId[1], 2)
//   }
    
//   }

//  useEffect(() => {
//   console.log(isAuthenticated)
//          if (!isAuthenticated) {
//              navigate("/login"); 
//          }
//          fetchData()
         
         
//      }, [isAuthenticated]);


//   return (
//     <div className="container">
//       <div className="row justify-content-center align-content-center">
//         <div className="col-12 p-5 text-center">
//           <img src={logo} alt="logo" />
//         </div>

//         <div className="col-12">
//           <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>

//             {/* User Info */}
//             <fieldset className="border p-4 rounded">
//               <legend className="w-auto px-2">User Info</legend>

//               <div className="col-md-6">
//                 <label className="form-label">UserName</label>
//                 <input  type="text" id="userName" className="form-control"  {...register("userName", { required: true })} />
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label">Email</label>
//                 <input type="email" className="form-control" id="email" {...register("email", { required: true })}/>
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label">Phone Number</label>
//                 <input {...register("phoneNumber",  { required: true })} type="tel" className="form-control" />
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label">Birth Date</label>
//                 <input {...register("birthDate",  { required: true })} type="date" className="form-control" />
//               </div>
//             </fieldset>

//             {/* Address1 Info */}
//             <fieldset className="border p-4 rounded mt-4">
//               <legend className="w-auto px-2">Address 1 Info</legend>

//               <div className="col-12">
//                 <label className="form-label">Street</label>
//                   <input {...register("street", { required: true })} type="text" className="form-control" placeholder="1234 Main St" />
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label">City</label>
//                 <input {...register("city" , { required: true })} type="text" className="form-control" />
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label">Postal Code</label>
//                 <input {...register("postalCode" , { required: true })} type="text" className="form-control" />
//               </div>
//               <div className="col-md-6">
//                 <label className="form-label">Country</label>
//                 <input {...register("country" , { required: true })} type="text" className="form-control" />
//               </div>
//             </fieldset>
//             <div className="col-12 mt-2 text-end">
//                 {!showSecondAddress && (
//                   <button type="button" className="btn btn-link p-0" onClick={() => setShowSecondAddress(true)}>
//                     + Another Address
//                   </button>
//                 )}
//               </div>

//             {showSecondAddress && (
//               <fieldset className="border p-4 rounded mt-4">
//                 <legend className="w-auto px-2">Address 2 Info</legend>

//                 <div className="col-12">
//                   <label className="form-label">Street</label>
//                   <input type="text" className="form-control" placeholder="1234 Another St" {...register("street2" , { required: true })} />
//                 </div>

//                 <div className="col-md-6">
//                   <label className="form-label">City</label>
//                   <input type="text" className="form-control" {...register("city2", { required: true })} />
//                 </div>

//                 <div className="col-md-6">
//                   <label className="form-label">Postal Code</label>
//                   <input type="text" className="form-control" {...register("postalCode2", { required: true })} />
//                 </div>

//                 <div className="col-md-6">
//                   <label className="form-label">Country</label>
//                   <input type="text" className="form-control" {...register("country2", { required: true })} />
//                 </div>

//                 <div className="col-12 mt-2 text-end">
//                   <button type="button" className="btn btn-link text-danger p-0" onClick={() => setShowSecondAddress(false)}>
//                     - Remove Address
//                   </button>
//                 </div>
//               </fieldset>
//             )}

//             <div className="col-12 mt-4 text-center">
//               <button type="submit" className="btn btn-primary w-50">Save</button>
//             </div>

//           </form>
//         </div>

//         <div className="col-12 mt-3 text-center" >
//           <Link to={"/orders"}>Your Orders</Link>
          
//         </div>
//       </div>
//     </div>
//   )
// }


// import React, { useEffect, useState } from 'react'
// import logo from "../../../../images/navLogo.png"
// import { useForm } from 'react-hook-form'
// import { api } from '../../utils/api'
// import toast from 'react-hot-toast'
// import { useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom'

// export default function Account() {
//   const { register, handleSubmit, reset } = useForm()
//   const { user, isAuthenticated } = useSelector((state) => state.auth);
//   const navigate = useNavigate()
//   const [addressId, setAddressId] = useState([null, null])
//   const [addresses, setAddresses] = useState([])
//   const [showSecondAddress, setShowSecondAddress] = useState(false);

//   const updateUserData = async (updatedUser) => {
//     try {
//       await api.put(`${import.meta.env.VITE_USER}/${user.id}`, updatedUser);
//       toast.success('User Updated Successfully!')
//     }
//     catch (error) {
//       toast.error('Failed to update user');
//       console.error('Failed to update user', error);
//     }
//   };

//   const sendAddressData = async (updatedAddress, addressId, addressNum) => {
//     try {
//       // Check if address exists and update, otherwise create
//       if (addressId) {
//         await api.put(`${import.meta.env.VITE_ADDRESS}/${addressId}`, updatedAddress);
//         toast.success(`Address ${addressNum} updated successfully!`);
//       } else {
//         await api.post(`${import.meta.env.VITE_ADDRESS}`, updatedAddress);
//         toast.success(`Address ${addressNum} created successfully!`);
//       }
//     } catch (error) {
//       toast.error(`Failed to update address ${addressNum}`);
//       console.error(`Failed to update address ${addressNum}`, error);
//     }
//   };

//   const fetchData = async () => {
//     try {
//       const userData = await api.get(`${import.meta.env.VITE_USER}/${user.id}`);
//       const res = await api.get(`${import.meta.env.VITE_ADDRESS}`);
//       const addressesData = res.data;
//       let addId = [null, null];
//       if (addressesData[0]) addId[0] = addressesData[0].id;
//       if (addressesData[1]) addId[1] = addressesData[1].id;

//       setAddressId(addId);
//       setAddresses(addressesData);
//       setShowSecondAddress(addressesData[1] != null); // only show if address 2 exists
//       reset({
//         ...userData.data,
//         ...addressesData[0],
//         ...(addressesData[1] ? {
//           street2: addressesData[1].street,
//           city2: addressesData[1].city,
//           postalCode2: addressesData[1].postalCode,
//           country2: addressesData[1].country
//         } : {})
//       });
//     } catch (error) {
//       console.error('Failed to fetch data', error);
//     }
//   };

//   const onSubmit = async (formData) => {
//     const { street, city, postalCode, country, street2, city2, postalCode2, country2, userName, email, phoneNumber, birthDate } = formData;
//     await updateUserData({ userName, email, phoneNumber, birthDate });
//     await sendAddressData({ street, city, postalCode, country }, addressId[0], 1);
//     if (showSecondAddress) {
//       await sendAddressData({ street: street2, city: city2, postalCode: postalCode2, country: country2 }, addressId[1], 2);
//     }
//   };

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate("/login");
//     }
//     fetchData();
//   }, [isAuthenticated]);

//   return (
//     <div className="container">
//       <div className="row justify-content-center align-content-center">
//         <div className="col-12 p-5 text-center">
//           <img src={logo} alt="logo" />
//         </div>

//         <div className="col-12">
//           <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>

//             {/* User Info */}
//             <fieldset className="border p-4 rounded">
//               <legend className="w-auto px-2">User Info</legend>

//               <div className="col-md-6">
//                 <label className="form-label">UserName</label>
//                 <input type="text" id="userName" className="form-control" {...register("userName", { required: true })} />
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label">Email</label>
//                 <input type="email" className="form-control" id="email" {...register("email", { required: true })} />
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label">Phone Number</label>
//                 <input {...register("phoneNumber", { required: true })} type="tel" className="form-control" />
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label">Birth Date</label>
//                 <input {...register("birthDate", { required: true })} type="date" className="form-control" />
//               </div>
//             </fieldset>

//             {/* Address1 Info */}
//             <fieldset className="border p-4 rounded mt-4">
//               <legend className="w-auto px-2">Address 1 Info</legend>

//               <div className="col-12">
//                 <label className="form-label">Street</label>
//                 <input {...register("street", { required: true })} type="text" className="form-control" placeholder="1234 Main St" />
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label">City</label>
//                 <input {...register("city", { required: true })} type="text" className="form-control" />
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label">Postal Code</label>
//                 <input {...register("postalCode", { required: true })} type="text" className="form-control" />
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label">Country</label>
//                 <input {...register("country", { required: true })} type="text" className="form-control" />
//               </div>
//             </fieldset>

//             <div className="col-12 mt-2 text-end">
//               {!showSecondAddress && (
//                 <button type="button" className="btn btn-link p-0" onClick={() => setShowSecondAddress(true)}>
//                   + Another Address
//                 </button>
//               )}
//             </div>

//             {showSecondAddress && (
//               <fieldset className="border p-4 rounded mt-4">
//                 <legend className="w-auto px-2">Address 2 Info</legend>

//                 <div className="col-12">
//                   <label className="form-label">Street</label>
//                   <input type="text" className="form-control" placeholder="1234 Another St" {...register("street2", { required: true })} />
//                 </div>

//                 <div className="col-md-6">
//                   <label className="form-label">City</label>
//                   <input type="text" className="form-control" {...register("city2", { required: true })} />
//                 </div>

//                 <div className="col-md-6">
//                   <label className="form-label">Postal Code</label>
//                   <input type="text" className="form-control" {...register("postalCode2", { required: true })} />
//                 </div>

//                 <div className="col-md-6">
//                   <label className="form-label">Country</label>
//                   <input type="text" className="form-control" {...register("country2", { required: true })} />
//                 </div>

//                 <div className="col-12 mt-2 text-end">
//                   <button type="button" className="btn btn-link text-danger p-0" onClick={() => setShowSecondAddress(false)}>
//                     - Remove Address
//                   </button>
//                 </div>
//               </fieldset>
//             )}

//             <div className="col-12 mt-4 text-center">
//               <button type="submit" className="btn btn-primary w-50">Save</button>
//             </div>

//           </form>
//         </div>

//         <div className="col-12 mt-3 text-center">
//           <Link to={"/orders"}>Your Orders</Link>
//         </div>
//       </div>
//     </div>
//   );
// }
// import React, { useEffect, useState } from 'react'
// import logo from "../../../../images/navLogo.png"
// import { useForm } from 'react-hook-form'
// import { api } from '../../utils/api'
// import toast from 'react-hot-toast'
// import { useSelector } from 'react-redux'
// import { Link, useNavigate } from 'react-router-dom'

// export default function Account() {
//   const { register, handleSubmit, reset } = useForm()
//   const { user, isAuthenticated } = useSelector((state) => state.auth)
//   const navigate = useNavigate()

//   const [addresses, setAddresses] = useState([])
//   const [showSecondAddress, setShowSecondAddress] = useState(false)

//   const fetchData = async () => {
//     try {
//       const userData = await api.get(`${import.meta.env.VITE_USER}/${user.id}`)
//       const addressesRes = await api.get(`${import.meta.env.VITE_ADDRESS}?userId=${user.id}`)
//       const fetchedAddresses = addressesRes.data || []

//       setAddresses(fetchedAddresses)

//       const formValues = {
//         ...userData.data,
//         ...fetchedAddresses[0],
//       }

//       if (fetchedAddresses[1]) {
//         formValues.street2 = fetchedAddresses[1].street
//         formValues.city2 = fetchedAddresses[1].city
//         formValues.postalCode2 = fetchedAddresses[1].postalCode
//         formValues.country2 = fetchedAddresses[1].country
//         setShowSecondAddress(true)
//       }

//       reset(formValues)
//     } catch (error) {
//       console.error('Failed to fetch data', error)
//     }
//   }

//   const onSubmit = async (formData) => {
//     try {
//       const { userName, email, phoneNumber, birthDate } = formData
//       await api.put(`${import.meta.env.VITE_USER}/${user.id}`, { userName, email, phoneNumber, birthDate })

//       const address1 = {
//         userId: user.id,
//         street: formData.street,
//         city: formData.city,
//         postalCode: formData.postalCode,
//         country: formData.country,
//       }

//       if (addresses[0]) {
//         await api.put(`${import.meta.env.VITE_ADDRESS}/${addresses[0].id}`, address1)
//       } else {
//         await api.post(`${import.meta.env.VITE_ADDRESS}`, address1)
//       }

//       if (showSecondAddress) {
//         const address2 = {
//           userId: user.id,
//           street: formData.street2,
//           city: formData.city2,
//           postalCode: formData.postalCode2,
//           country: formData.country2,
//         }

      //   if (addresses[1]) {
      //     await api.put(`${import.meta.env.VITE_ADDRESS}/${addresses[1].id}`, address2)
      //   } else {
      //     await api.post(`${import.meta.env.VITE_ADDRESS}`, address2)
      //   }
      // }

//       toast.success('Data Updated Successfully!')
//     } catch (error) {
//       console.error('Failed to submit data', error)
//       toast.error('Failed to update data')
//     }
//   }

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate("/login")
//     }
//     fetchData()
//   }, [isAuthenticated])

//   return (
//     <div className="container">
//       <div className="row justify-content-center align-content-center">
//         <div className="col-12 p-5 text-center">
//           <img src={logo} alt="logo" />
//         </div>

//         <div className="col-12">
//           <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
//             {/* User Info */}
//             <fieldset className="border p-4 rounded">
//               <legend className="w-auto px-2">User Info</legend>
//               <div className="col-md-6">
//                 <label className="form-label">UserName</label>
//                 <input type="text" className="form-control" {...register("userName", { required: true })} />
//               </div>
//               <div className="col-md-6">
//                 <label className="form-label">Email</label>
//                 <input type="email" className="form-control" {...register("email", { required: true })} />
//               </div>
//               <div className="col-md-6">
//                 <label className="form-label">Phone Number</label>
//                 <input type="tel" className="form-control" {...register("phoneNumber", { required: true })} />
//               </div>
//               <div className="col-md-6">
//                 <label className="form-label">Birth Date</label>
//                 <input type="date" className="form-control" {...register("birthDate", { required: true })} />
//               </div>
//             </fieldset>

//             {/* Address 1 */}
//             <fieldset className="border p-4 rounded mt-4">
//               <legend className="w-auto px-2">Address 1 Info</legend>
//               <div className="col-12">
//                 <label className="form-label">Street</label>
//                 <input {...register("street", { required: true })} type="text" className="form-control" />
//               </div>
//               <div className="col-md-6">
//                 <label className="form-label">City</label>
//                 <input {...register("city", { required: true })} type="text" className="form-control" />
//               </div>
//               <div className="col-md-6">
//                 <label className="form-label">Postal Code</label>
//                 <input {...register("postalCode", { required: true })} type="text" className="form-control" />
//               </div>
//               <div className="col-md-6">
//                 <label className="form-label">Country</label>
//                 <input {...register("country", { required: true })} type="text" className="form-control" />
//               </div>
//             </fieldset>

//             {/* Toggle Second Address */}
//             {!showSecondAddress && (
//               <div className="col-12 text-end">
//                 <button type="button" className="btn btn-link" onClick={() => setShowSecondAddress(true)}>
//                   + Another Address
//                 </button>
//               </div>
//             )}

//             {/* Address 2 */}
//             {showSecondAddress && (
//               <fieldset className="border p-4 rounded mt-4">
//                 <legend className="w-auto px-2">Address 2 Info</legend>
//                 <div className="col-12">
//                   <label className="form-label">Street</label>
//                   <input {...register("street2")} type="text" className="form-control" />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">City</label>
//                   <input {...register("city2")} type="text" className="form-control" />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">Postal Code</label>
//                   <input {...register("postalCode2")} type="text" className="form-control" />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">Country</label>
//                   <input {...register("country2")} type="text" className="form-control" />
//                 </div>
//                 <div className="col-12 text-end">
//                   <button type="button" className="btn btn-link text-danger" onClick={() => setShowSecondAddress(false)}>
//                      Remove Address 2
//                   </button>
//                 </div>
//               </fieldset>
//             )}

//             <div className="col-12 mt-4 text-center">
//               <button type="submit" className="btn btn-primary w-50">Save</button>
//             </div>
//           </form>
//         </div>

//         <div className="col-12 mt-3 text-center">
//           <Link to={"/orders"}>Your Orders</Link>
//         </div>
//       </div>
//     </div>
//   )
// }


// mai edit 

// import React, { useEffect, useState } from 'react';
// import logo from "../../../../images/navLogo.png";
// import { useForm } from 'react-hook-form';
// import { api } from '../../utils/api';
// import toast from 'react-hot-toast';
// import { useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';

// export default function Account() {
//   const { register, handleSubmit, reset } = useForm();
//   const { user, isAuthenticated } = useSelector((state) => state.auth);
//   const navigate = useNavigate();

//   const [addresses, setAddresses] = useState([]);
//   const [showSecondAddress, setShowSecondAddress] = useState(false);

//   const fetchData = async () => {
//     try {
//       if (!user) {
//         console.log("User not loaded yet, skipping fetchData");
//         return;
//       }

//       const userData = await api.get(`${import.meta.env.VITE_USER}/${user.id}`);
//       const addressesRes = await api.get(`${import.meta.env.VITE_ADDRESS}?userId=${user.id}`);
//       const fetchedAddresses = addressesRes.data || [];

//       setAddresses(fetchedAddresses);

//       const formValues = {
//         ...userData.data,
//         ...fetchedAddresses[0],
//       };

//       if (fetchedAddresses[1]) {
//         formValues.street2 = fetchedAddresses[1].street;
//         formValues.city2 = fetchedAddresses[1].city;
//         formValues.postalCode2 = fetchedAddresses[1].postalCode;
//         formValues.country2 = fetchedAddresses[1].country;
//         setShowSecondAddress(true);
//       }

//       reset(formValues);
//     } catch (error) {
//       console.error('Failed to fetch data', error);
//     }
//   };

//   const onSubmit = async (formData) => {
//     try {
//       if (!user) {
//         toast.error('User not authenticated.');
//         return;
//       }

//       const { userName, email, phoneNumber, birthDate } = formData;
//       await api.put(`${import.meta.env.VITE_USER}/${user.id}`, { userName, email, phoneNumber, birthDate });

//       const address1 = {
//         userId: user.id,
//         street: formData.street,
//         city: formData.city,
//         postalCode: formData.postalCode,
//         country: formData.country,
//       };

//       if (addresses[0]) {
//         await api.put(`${import.meta.env.VITE_ADDRESS}/${addresses[0].id}`, address1);
//       } else {
//         await api.post(`${import.meta.env.VITE_ADDRESS}`, address1);
//       }

//       if (showSecondAddress) {
//         const address2 = {
//           userId: user.id,
//           street: formData.street2,
//           city: formData.city2,
//           postalCode: formData.postalCode2,
//           country: formData.country2,
//         };

//         if (addresses[1]) {
//           await api.put(`${import.meta.env.VITE_ADDRESS}/${addresses[1].id}`, address2);
//         } else {
//           await api.post(`${import.meta.env.VITE_ADDRESS}`, address2);
//         }
//       }

//       toast.success('Data Updated Successfully!');
//     } catch (error) {
//       console.error('Failed to submit data', error);
//       toast.error('Failed to update data');
//     }
//   };

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate("/login");
//       return;
//     }

//     if (user) {
//       fetchData();
//     }
//   }, [isAuthenticated, user]); // <-- add `user` to dependencies

//   return (
//     <div className="container">
//       {/* Same JSX Form Code */}
//       {/* No changes needed below */}
//     </div>
//   );
// }


//mai edit 2

// import React, { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { api } from '../../utils/api';
// import toast from 'react-hot-toast';
// import { logout } from '../../store/slices/AuthSlices'; // ✅ import logout

// export default function Account() {
//   const { register, handleSubmit, reset } = useForm();
//   const { user, isAuthenticated } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [addresses, setAddresses] = useState([]);
//   const [showSecondAddress, setShowSecondAddress] = useState(false);

//   const fetchData = async () => {
//     if (!user?.id) return;

//     try {
//       const userData = await api.get(`${import.meta.env.VITE_USER}/${user.id}`);
//       const addressesRes = await api.get(`${import.meta.env.VITE_ADDRESS}?userId=${user.id}`);
//       const fetchedAddresses = addressesRes.data || [];

//       setAddresses(fetchedAddresses);

//       const formValues = { ...userData.data, ...fetchedAddresses[0] };

//       if (fetchedAddresses[1]) {
//         formValues.street2 = fetchedAddresses[1].street;
//         formValues.city2 = fetchedAddresses[1].city;
//         formValues.postalCode2 = fetchedAddresses[1].postalCode;
//         formValues.country2 = fetchedAddresses[1].country;
//         setShowSecondAddress(true);
//       }

//       reset(formValues);
//     } catch (error) {
//       console.error('Failed to fetch account data', error);
//     }
//   };

//   const onSubmit = async (formData) => {
//     try {
//       await api.put(`${import.meta.env.VITE_USER}/${user.id}`, {
//         userName: formData.userName,
//         email: formData.email,
//         phoneNumber: formData.phoneNumber,
//         birthDate: formData.birthDate,
//       });

//       const address1 = {
//         userId: user.id,
//         street: formData.street,
//         city: formData.city,
//         postalCode: formData.postalCode,
//         country: formData.country,
//       };

//       if (addresses[0]) {
//         await api.put(`${import.meta.env.VITE_ADDRESS}/${addresses[0].id}`, address1);
//       } else {
//         await api.post(`${import.meta.env.VITE_ADDRESS}`, address1);
//       }

//       if (showSecondAddress) {
//         const address2 = {
//           userId: user.id,
//           street: formData.street2,
//           city: formData.city2,
//           postalCode: formData.postalCode2,
//           country: formData.country2,
//         };

//         if (addresses[1]) {
//           await api.put(`${import.meta.env.VITE_ADDRESS}/${addresses[1].id}`, address2);
//         } else {
//           await api.post(`${import.meta.env.VITE_ADDRESS}`, address2);
//         }
//       }

//       toast.success('Account updated successfully!');
//     } catch (error) {
//       console.error('Failed to update account', error);
//       toast.error('Failed to update account');
//     }
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//     toast.success('Logged out successfully!');
//   };

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate("/login");
//     } else {
//       fetchData();
//     }
//   }, [isAuthenticated, user]);

//   return (
//     <div className="container mt-4">
//       <h1 className="mb-4">My Account</h1>
      
//       {/* Logout Button */}
//       <div className="d-flex justify-content-end">
//         <button className="btn btn-danger mb-4" onClick={handleLogout}>
//           Logout
//         </button>
//       </div>

//       {/* Your account update form here */}
//       <form onSubmit={handleSubmit(onSubmit)}>
//         {/* Example fields */}
//         <div className="mb-3">
//           <label>Name</label>
//           <input type="text" className="form-control" {...register("userName")} />
//         </div>

//         <div className="mb-3">
//           <label>Email</label>
//           <input type="email" className="form-control" {...register("email")} />
//         </div>

//         {/* Add more fields as you have */}

//         <button className="btn btn-primary" type="submit">
//           Save Changes
//         </button>
//       </form>
//     </div>
    
//     <div className="container">
//       <div className="row justify-content-center align-content-center">
//         <div className="col-12 p-5 text-center">
//           <img src={logo} alt="logo" />
//         </div>

//         <div className="col-12">
//           <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
//             {/* User Info */}
//             <fieldset className="border p-4 rounded">
//               <legend className="w-auto px-2">User Info</legend>
//               <div className="col-md-6">
//                 <label className="form-label">UserName</label>
//                 <input type="text" className="form-control" {...register("userName", { required: true })} />
//               </div>
//               <div className="col-md-6">
//                 <label className="form-label">Email</label>
//                 <input type="email" className="form-control" {...register("email", { required: true })} />
//               </div>
//               <div className="col-md-6">
//                 <label className="form-label">Phone Number</label>
//                 <input type="tel" className="form-control" {...register("phoneNumber", { required: true })} />
//               </div>
//               <div className="col-md-6">
//                 <label className="form-label">Birth Date</label>
//                 <input type="date" className="form-control" {...register("birthDate", { required: true })} />
//               </div>
//             </fieldset>

//             {/* Address 1 */}
//             <fieldset className="border p-4 rounded mt-4">
//               <legend className="w-auto px-2">Address 1 Info</legend>
//               <div className="col-12">
//                 <label className="form-label">Street</label>
//                 <input {...register("street", { required: true })} type="text" className="form-control" />
//               </div>
//               <div className="col-md-6">
//                 <label className="form-label">City</label>
//                 <input {...register("city", { required: true })} type="text" className="form-control" />
//               </div>
//               <div className="col-md-6">
//                 <label className="form-label">Postal Code</label>
//                 <input {...register("postalCode", { required: true })} type="text" className="form-control" />
//               </div>
//               <div className="col-md-6">
//                 <label className="form-label">Country</label>
//                 <input {...register("country", { required: true })} type="text" className="form-control" />
//               </div>
//             </fieldset>

//             {/* Toggle Second Address */}
//             {!showSecondAddress && (
//               <div className="col-12 text-end">
//                 <button type="button" className="btn btn-link" onClick={() => setShowSecondAddress(true)}>
//                   + Another Address
//                 </button>
//               </div>
//             )}

//             {/* Address 2 */}
//             {showSecondAddress && (
//               <fieldset className="border p-4 rounded mt-4">
//                 <legend className="w-auto px-2">Address 2 Info</legend>
//                 <div className="col-12">
//                   <label className="form-label">Street</label>
//                   <input {...register("street2")} type="text" className="form-control" />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">City</label>
//                   <input {...register("city2")} type="text" className="form-control" />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">Postal Code</label>
//                   <input {...register("postalCode2")} type="text" className="form-control" />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">Country</label>
//                   <input {...register("country2")} type="text" className="form-control" />
//                 </div>
//                 <div className="col-12 text-end">
//                   <button type="button" className="btn btn-link text-danger" onClick={() => setShowSecondAddress(false)}>
//                      Remove Address 2
//                   </button>
//                 </div>
//               </fieldset>
//             )}

//             <div className="col-12 mt-4 text-center">
//               <button type="submit" className="btn btn-primary w-50">Save</button>
//             </div>
//           </form>
//         </div>

//         <div className="col-12 mt-3 text-center">
//           <Link to={"/orders"}>Your Orders</Link>
//         </div>
//       </div>
//     </div>
  
//   );
// }

//mai edit 3

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../../utils/api';
import toast from 'react-hot-toast';
import { logout } from '../../store/slices/AuthSlices'; // import logout action
import logo from '../../../../images/navLogo.png'; // update with actual path for your logo

export default function Account() {
  const { register, handleSubmit, reset } = useForm();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [showSecondAddress, setShowSecondAddress] = useState(false);

  const fetchData = async () => {
    if (!user?.id) return;

    try {
      const userData = await api.get(`${import.meta.env.VITE_USER}/${user.id}`);
      const addressesRes = await api.get(`${import.meta.env.VITE_ADDRESS}?userId=${user.id}`);
      const fetchedAddresses = addressesRes.data || [];

      setAddresses(fetchedAddresses);

      const formValues = { ...userData.data, ...fetchedAddresses[0] };

      if (fetchedAddresses[1]) {
        formValues.street2 = fetchedAddresses[1].street;
        formValues.city2 = fetchedAddresses[1].city;
        formValues.postalCode2 = fetchedAddresses[1].postalCode;
        formValues.country2 = fetchedAddresses[1].country;
        setShowSecondAddress(true);
      }

      reset(formValues);

      // Save user data in localStorage
      localStorage.setItem('userData', JSON.stringify(formValues));

    } catch (error) {
      console.error('Failed to fetch account data', error);
    }
  };

  const onSubmit = async (formData) => {
    try {
      await api.put(`${import.meta.env.VITE_USER}/1`, {
        userName: formData.userName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        birthDate: formData.birthDate,
      });

      const address1 = {
        userId: user.id,
        street: formData.street,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
      };

      if (addresses[0]) {
        await api.put(`${import.meta.env.VITE_ADDRESS}/${addresses[0].id}`, address1);
      } else {
        await api.post(`${import.meta.env.VITE_ADDRESS}`, address1);
      }

      if (showSecondAddress) {
        const address2 = {
          userId: user.id,
          street: formData.street2,
          city: formData.city2,
          postalCode: formData.postalCode2,
          country: formData.country2,
        };

        if (addresses[1]) {
          await api.put(`${import.meta.env.VITE_ADDRESS}/${addresses[1].id}`, address2)
        } else {
          await api.post(`${import.meta.env.VITE_ADDRESS}`, address2)
        }
      }

      toast.success('Account updated successfully!');
      
      // Update localStorage with new form data after submit
      localStorage.setItem('userData', JSON.stringify(formData));

    } catch (error) {
      console.error('Failed to update account', error);
      toast.error('Failed to update account');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    toast.success('Logged out successfully!');
    localStorage.removeItem('userData'); // Clear user data from localStorage on logout
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      // Check if user data exists in localStorage before fetching it
      const savedUserData = localStorage.getItem('userData');
      if (savedUserData) {
        reset(JSON.parse(savedUserData));
      } else {
        fetchData();
      }
    }
  }, [isAuthenticated, user]);

  return (
    <div className="container mt-4">
      <div className="col-12 p-5 text-center">
        <img src={logo} alt="logo" />
      </div>

      <h1 className="mb-4">My Account</h1>

      <div className="d-flex justify-content-end">
        <button className="btn btn-danger mb-4" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-5">
        <fieldset className="border p-4 rounded">
          <legend className="w-auto px-2">User Info</legend>
          <div className="mb-3">
            <label className="form-label">UserName</label>
            <input type="text" className="form-control" {...register("userName", { required: true })} />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" {...register("email", { required: true })} />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input type="tel" className="form-control" {...register("phoneNumber", { required: true })} />
          </div>
          <div className="mb-3">
            <label className="form-label">Birth Date</label>
            <input type="date" className="form-control" {...register("birthDate", { required: true })} />
          </div>
        </fieldset>

        <fieldset className="border p-4 rounded mt-4">
          <legend className="w-auto px-2">Address 1 Info</legend>
          <div className="mb-3">
            <label className="form-label">Street</label>
            <input {...register("street", { required: true })} type="text" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">City</label>
            <input {...register("city", { required: true })} type="text" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Postal Code</label>
            <input {...register("postalCode", { required: true })} type="text" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Country</label>
            <input {...register("country", { required: true })} type="text" className="form-control" />
          </div>
        </fieldset>

        {!showSecondAddress && (
          <div className="col-12 text-end">
            <button type="button" className="btn btn-link" onClick={() => setShowSecondAddress(true)}>
              + Add Another Address
            </button>
          </div>
        )}

        {showSecondAddress && (
          <fieldset className="border p-4 rounded mt-4">
            <legend className="w-auto px-2">Address 2 Info</legend>
            <div className="mb-3">
              <label className="form-label">Street</label>
              <input {...register("street2")} type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">City</label>
              <input {...register("city2")} type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Postal Code</label>
              <input {...register("postalCode2")} type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Country</label>
              <input {...register("country2")} type="text" className="form-control" />
            </div>
            <div className="col-12 text-end">
              <button type="button" className="btn btn-link text-danger" onClick={() => setShowSecondAddress(false)}>
                Remove Address 2
              </button>
            </div>
          </fieldset>
        )}

        <div className="col-12 mt-4 text-center">
          <button type="submit" className="btn btn-primary w-50">Save</button>
        </div>
      </form>

      <div className="col-12 mt-3 text-center">
        <Link to="/orders">View Your Orders</Link>
      </div>
    </div>
  );
}

