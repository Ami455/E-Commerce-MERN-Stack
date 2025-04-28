import React, { useEffect, useState } from 'react';
import ProductCard from '../../Card/ProductCard'; // Import the ProductCard component
import CartButton from './CartButton/CartButton';  // Import the CartButton component
import { Container, Row, Col } from 'react-bootstrap';
import { api } from '../../../utils/api';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);

  const getCart = async () => {
    const cart = await api.get(`${import.meta.env.VITE_CARTPRODUCT}`);
    setCart(cart.data.products);
  };

  const getProducts = async () => {
    const res = await api.get(`${import.meta.env.VITE_PRODUCTS_LIST}`);
    if (res.status >= 200 && res.status < 300) {
      setProducts(res.data.items);
      // console.log(res.data.items)
      setError(null);
    } else {
      setError(res.statusText);
      setProducts([]);
    }
  };

  useEffect(() => {
    getProducts();
    getCart();
  }, []);

  const getProductQuantity = (productId) => {
    const cartItem = cart.find(item => item.id === productId);
    return cartItem ? cartItem.CartProduct.quantity : 0;
  };

  return (
    <>
      {error && <p>{error}</p>}
      <Container>
        <Row className="product-list">
          {products.length > 0 &&
            products.map((product) => (
              <Col key={product.id}>
              <div className=' container d-flex flex-column justify-content-center ' >
              <div className=' w-100 row'>
                <ProductCard product={product} />
                </div>
                <div className=' row  justify-content-center'>
                <CartButton
                  product={product}
                  getProductQuantity={getProductQuantity}
                  getCart={getCart}
                  getProducts={getProducts}
                />
                </div>
                </div>
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
}
