import React, { useState } from 'react'
import { api } from '../../utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export default function FavoriteButton({ favorite = false, productId ,onToggle }) {
    const[isFavorite, setIsFavorite] = useState(favorite);

    const toggleFavorite = async() => {
        
        try {
            await api.post(`${import.meta.env.VITE_FAVORITE_PRODUCTS}/${productId}`)
            console.log(isFavorite)
            setIsFavorite(!isFavorite);
            onToggle()
        } catch (error) {
            console.log(error)
        }
        
    };

    return (
        <>
            <button onClick={toggleFavorite} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                {isFavorite ? (
                    
                    <FontAwesomeIcon icon={faHeart} style={{ color: 'red' }} className="custom-icon" />
                ) : (
                   
                    <FontAwesomeIcon icon={faHeart} className="custom-icon" />
                )}
            </button></>
    )
}
