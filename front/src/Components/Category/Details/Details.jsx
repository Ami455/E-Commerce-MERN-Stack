import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { api } from '../../../utils/api';
import FavoriteButton from '../../favorite/favoriteButton';
import RatingDisplay from '../../Review/RatingDisplay';
import ReviewForm from '../../Review/ReviewForm';
import CartButton from '../Products/CartButton/CartButton';

import './Details.css'; // We'll use this for CSS variables

export default function Details() {
    const location = useLocation();
    const { productId } = location.state || {};
    const [product, setProduct] = useState(null);
    // console.log(productId)
    const [rating, setRating] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [refreshReviews, setRefreshReviews] = useState(false);
    const [bought, setBought] = useState(false);
    const { favoriteCount } = useSelector((state) => state.favorites);
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    const [isFavorite, setIsFavorite] = useState([]);
    const getIsFavorite = async () => {

        try {
            const res = await api.get(`${import.meta.env.VITE_FAVORITE_PRODUCTS}/${productId}`);
            setIsFavorite(res.data.isFavorite);
            console.log(isFavorite)
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
      
            console.log("bouaght", response.data)
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
    }, [productId, favoriteCount, isAuthenticated,refreshReviews])

  if (!product) return <h3 className="text-center mt-5">Loading product details...</h3>;

  

  return (
    <div className="container my-5">
      {/* Product Info */}
      <div className="row g-5 align-items-start">
        
        {/* Image */}
        <div className="col-md-6">
          <div className="position-relative shadow-lg rounded overflow-hidden ">
            <img
              src={`${import.meta.env.VITE_LOCAL_HOST}/uploads/${product.image}`}
              alt={product.name}
              className="img-fluid w-100 object-fit-cover"
              style={{ borderRadius: '1rem' }}
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="col-md-6">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="fw-bold ">{product.name}</h1>
            <FavoriteButton favorite={isFavorite} productId={productId} />
          </div>

          <h3 className="text-success fw-semibold my-3">${product.price}</h3>

          <p className="mb-2">
            <strong>Category:</strong> {product.category}
          </p>

          <p className="mb-2">
            <strong>Rating:</strong> <RatingDisplay rating={rating} /> ({reviews.length} Reviews)
          </p>

          <h5 className="mt-4">Description</h5>
          <p className="text-muted">{product.description}</p>

          {/* Add to Cart */}
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

      {/* Reviews Section */}
      <div className="mt-5">
        {bought && (
          <div className="mb-5">
            <h3 className="fw-bold">My Review</h3>
            <div className="w-25 w-md-50">
              <ReviewForm
                productId={productId}
                onReviewSubmit={() => setRefreshReviews(prev => !prev)}
              />
            </div>
          </div>
        )}

        <h3 className="fw-bold mb-4">Customer Reviews</h3>

        {reviews.length ? (
          reviews.map((rev, i) => (
            <div key={i} className="card mb-3 shadow-sm border-0">
              <div className="card-body">
                <h6 className="card-title fw-semibold">
                  <FontAwesomeIcon icon={faCircleUser} className="me-2 text-primary" />
                  {rev.user.userName}
                </h6>
                <p className="mb-2">{rev.comment}</p>
                <div className="star-rating">
                  <RatingDisplay rating={rev.rating} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">No reviews yet.</p>
        )}
      </div>
    </div>
  );
}
