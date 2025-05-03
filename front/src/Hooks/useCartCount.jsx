import React, { useCallback, useEffect, useState } from 'react'
import { api } from '../utils/api';
import {useDispatch}  from 'react-redux';
import { setCartCount } from '../store/slices/CartSlice';

export default function useCartCount() {
    
    const dispatch = useDispatch(); // To dispatch actions to Redux
    const getCartCount= useCallback(async () => {
      try{
        const res = await api.get(`${import.meta.env.VITE_CARTPRODUCT}`)
                 //console.log(res.data.products)
         const count = res.data.products.reduce((acc, product) => acc + product.CartProduct.quantity, 0);
        dispatch(setCartCount(count)); 
        //console.log(count)
      }catch(error){
        console.log("failed to fetch cart count: ", error)
      }
    },[])

   
useEffect(() => {
  getCartCount();
}, []); 
  return {getCartCount};
}
  