import React, { useState } from 'react'
import { api } from '../../utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import useFavoriteCount from '../../Hooks/useFavoriteCount';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

export default function FavoriteButton({ favorite = false, productId }) {
    const[isFavorite, setIsFavorite] = useState(favorite);
    const { ToggleFav } = useFavoriteCount();  // Use the hook for adding favorites
    const {favoriteCount} = useSelector((state) => state.favorites);  // Access global count from Redux
  
    const toggleFavorite = () => {
        //call favHook
        
        ToggleFav(productId)
        toast.success("Favorites updated");
       
        setIsFavorite(!isFavorite);
        
    };

    return (
        <>
            <button onClick={toggleFavorite} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                {isFavorite ? (
                    
                    <FontAwesomeIcon icon={faHeart}  style={{ color: 'red' ,fontSize:'30px' }} className="custom-icon" />
                ) : (
                   
                    <FontAwesomeIcon icon={faHeart} style={{fontSize:'30px'}} className="custom-icon" />
                )}
            </button></>
    )
}
