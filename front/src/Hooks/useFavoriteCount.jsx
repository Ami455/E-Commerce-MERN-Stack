import React, { useCallback, useEffect, useState } from 'react'
import { api } from '../utils/api';
import toast from 'react-hot-toast';
import {useDispatch}  from 'react-redux';
import { setFavoriteCount } from '../store/slices/FavoriteSlices';

export default function useFavoriteCount() {
    
    const dispatch = useDispatch(); // To dispatch actions to Redux
    const getFavCount= useCallback(async () => {
      try{
        const res = await api.get(import.meta.env.VITE_FAVORITE_PRODUCTS);
        const count=res.data.products.length
        dispatch(setFavoriteCount(count)); // Update Redux state with the favorite count
        //toast.success("Favorites updated!")
      }catch(error){
        console.log("failed to fetch favorites count: ", error)
      }
    },[])

   const ToggleFav =async(productId)=> {
    try {
      await api.post(`${import.meta.env.VITE_FAVORITE_PRODUCTS}/${productId}`)
      getFavCount()
      
     
  } catch (error) {
      console.log(error)
  }
}
useEffect(() => {
  getFavCount();
}, []); 
  return {ToggleFav,getFavCount};
}
  