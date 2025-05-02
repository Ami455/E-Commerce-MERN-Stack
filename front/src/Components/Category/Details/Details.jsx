import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '../../../utils/api';
import RatingDisplay from '../../Review/RatingDisplay';
import CartButton from '../Products/CartButton/CartButton';

export default function Details() {
    const location = useLocation();
    const { productId } = location.state || {};
    const [product, setProduct] = useState(null);
    // console.log(productId)
    const [rating, setRating] = useState(0);
    const [reviews, setReviews] = useState([]);
    const getRating = async () => {
        try {
            const res = await api.get(`${import.meta.env.VITE_REVIEW}/${productId}`);
            const { reviews, averageRating } = res.data;
            setRating(averageRating);
            setReviews(reviews)
            console.log(reviews.length)
            console.log(reviews)
        }
        catch (error) {
            console.error('Failed to fetch average rating:', error);
        }
    }
    const [cart, setCart] = useState([]);

    const getCart = async () => {
        try {
            const res = await api.get(`${import.meta.env.VITE_CARTPRODUCT}`);
            setCart(res.data.products);
        } catch (err) {
            console.error('Failed to fetch cart:', err);
        }
    };


    const getProductQuantity = (productId) => {
        const cartItem = cart.find(item => item.id === productId);
        return cartItem ? cartItem.CartProduct.quantity : 0;
    };


    const getData = async () => {
        try {
            const response = await api.get(
                `${import.meta.env.VITE_PRODUCTS_LIST}/${productId}`
            );
            setProduct(response.data);
        } catch (error) {
            console.error("Failed to fetch product:", error);
        }
    };



    useEffect(() => {

        if (productId) {

            getData();
            getRating();
            getCart();
        }
    }, [productId]);

    if (!product) {
        return <h3>Loading product details...</h3>;
    }
    // console.log(product)

    // Helper function to generate stars based on rating
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - Math.ceil(rating);

        const stars = [];

        // Add full stars
        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={`full-${i}`} className="star filled">★</span>);
        }

        // Add half star if applicable
        if (hasHalfStar) {
            stars.push(<span key="half" className="star half-filled">☆</span>);
        }

        // Add empty stars
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<span key={`empty-${i}`} className="star empty">☆</span>);
        }

        return stars;
    };

    return (
        <>
            <div className=' m-5'>
                <div className=' d-flex justify-content-between  container  m-5 p-5' >
                    <div className='col-6'>
                        <img 
                            src={`${import.meta.env.VITE_LOCAL_HOST}/uploads/${product.image}`} 
                            className='w-100 m-2' 
                            alt={product.name}
                        />
                    </div>
                    <div className='col-6 ps-5'>
                        <h1>{product.name}</h1>
                        <h2>${product.price}</h2>
                        <p>Category: {product.category}</p>

                        <p>
                            Rating: <span className="star-rating">
                                {renderStars(rating)}
                            </span>
                            <br />
                            <span>{reviews.length} Reviews</span>
                        </p>

                        <h2>Description</h2>
                        <p>{product.description}</p>

                        <CartButton
                            product={product}
                            getProductQuantity={getProductQuantity}
                            getCart={getCart}
                            getProducts={getData}
                        />
                    </div>
                </div>

                <div className="container">
                    <h3>Reviews:</h3>
                    {reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <div key={index} className="border p-3 my-2 rounded">
                                <p><strong>User:</strong> {review.user.userName}</p> {/* Display userId (you can replace this with real user name) */}
                                <p><strong>Comment:</strong> {review.comment}</p>
                                <p><strong>Rating:</strong> {renderStars(review.rating)}</p>
                            </div>
                        ))
                    ) : (
                        <p>No reviews yet.</p>
                    )}
                </div>
            </div>
        </>
    );
}
