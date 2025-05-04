import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '../../../utils/api';
import RatingDisplay from '../../Review/RatingDisplay';
import CartButton from '../Products/CartButton/CartButton';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FavoriteButton from '../../favorite/favoriteButton';
import { useSelector } from 'react-redux';
import ReviewForm from '../../Review/ReviewForm';

import './Details.css'; // We'll use this for CSS variables

export default function Details() {
    const location = useLocation();
    const { productId } = location.state || {};
    const [product, setProduct] = useState(null);
    // console.log(productId)
    const [rating, setRating] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [bought, setBought] = useState(false);
    const { favoriteCount } = useSelector((state) => state.favorites);
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    const [isFavorite, setIsFavorite] = useState([]);
    const getIsFavorite = async () => {

        try {
            const res = await api.get(`${import.meta.env.VITE_FAVORITE_PRODUCTS}/${productId}`);
            setIsFavorite(res.data.isFavorite);
        } catch (err) {
            console.error('Failed to fetch favorite:', err);
        }
    };
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

    const findProductInOrder = async () => {
        try {

            const response = await api.get(`${import.meta.env.VITE_ORDER_PRODUCT}/${productId}`);
            setBought(response.data.bought);
        } catch (error) {
            console.error('Error fetching product in order:', error);
        }
    };



    useEffect(() => {

        if (productId) {

            getData();
            getRating();
            getCart();
            getIsFavorite();
        }
        if (isAuthenticated) { findProductInOrder() }
    }, [productId, favoriteCount, isAuthenticated])

  if (!product) return <h3 className="text-center mt-5">Loading product details...</h3>;

  

  return (
    
    <div className="container my-5">
      <div className="row g-4 align-items-start">
        <div className="col-md-6 position-relative">
          <img
            src={`${import.meta.env.VITE_LOCAL_HOST}/uploads/${product.image}`}
            alt={product.name}
            className="img-fluid rounded shadow-sm w-100"
          />
          <div className="position-absolute top-0 end-0 m-4 ">
          <FavoriteButton favorite={isFavorite} productId={productId} size="xxxl" />
          </div>
        </div>
        <div className="col-md-6">
          <h1 className="text-main-sub">{product.name}</h1>
          <h3 className="text-main">${product.price}</h3>
          <p><strong>Category:</strong> {product.category}</p>
          <p>
            <strong>Rating:</strong> <span>{renderStars(rating)}</span> ({reviews.length} Reviews)
          </p>
          <h5>Description</h5>
          <p>{product.description}</p>
          <div className="mt-4">
            <CartButton
              product={product}
              getProductQuantity={getProductQuantity}
              getCart={getCart}
              getProducts={getData}
            />
          </div>
        </div>
      </div>

      <div className="mt-5">
                    {console.log(bought, "bought")}
                    {bought && <div className='mb-5'>
                        <h3>My Review</h3>
                        <ReviewForm productId={productId} />
                    </div>}
        <h3 className="text-main-sub">Customer Reviews</h3>
        {reviews.length ? reviews.map((rev, i) => (
          <div key={i} className="card my-3 shadow-sm">
            <div className="card-body">
              <h6 className="card-title">
                <FontAwesomeIcon icon={faCircleUser} className="me-2 text-main-sub" />
                {rev.user.userName}
              </h6>
              <p className="mb-1">{rev.comment}</p>
              <div className="star-rating">
                <span className="text-warning "> <RatingDisplay rating={rev.rating}/> </span>

              </div>
            </div>
          </div>
        )) : (
          <p className="text-muted">No reviews yet.</p>
        )}
      </div>
    </div>
  );
}
