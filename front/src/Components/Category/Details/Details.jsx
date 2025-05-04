import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '../../../utils/api';
import RatingDisplay from '../../Review/RatingDisplay';
import CartButton from '../Products/CartButton/CartButton';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FavoriteButton from '../../favorite/favoriteButton';
import { useSelector } from 'react-redux';
import './Details.css'; // We'll use this for CSS variables

export default function Details() {
  const location = useLocation();
  const { productId } = location.state || {};
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const { favoriteCount } = useSelector((state) => state.favorites);
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
      setReviews(reviews);
    } catch (error) {
      console.error('Failed to fetch average rating:', error);
    }
  };

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
      const response = await api.get(`${import.meta.env.VITE_PRODUCTS_LIST}/${productId}`);
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
      getIsFavorite();
    }
  }, [productId, favoriteCount]);

  if (!product) return <h3 className="text-center mt-5">Loading product details...</h3>;

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - Math.ceil(rating);
    return (
      <>
        {[...Array(full)].map((_, i) => <span key={`f${i}`} className="text-warning">★</span>)}
        {half && <span className="text-warning">☆</span>}
        {[...Array(empty)].map((_, i) => <span key={`e${i}`} className="text-muted">☆</span>)}
      </>
    );
  };

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
                <span className="text-warning ">{renderStars(rev.rating)}</span>

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
