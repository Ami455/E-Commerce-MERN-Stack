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

  const [min_price, setMinPrice] = useState('');
  const [max_price, setMaxPrice] = useState('');
  const [limit, setLimit] = useState(6);
  const [sort, setSort] = useState('default');
  const [search, setSearch] = useState('');

  const getProducts = async () => {
    try {
      // Using the state values for query parameters
      const params = {
        min_price,
        max_price,
        limit,
        sort
      };

      const res = await api.get(`${import.meta.env.VITE_PRODUCTS_LIST}`, { params });

      if (res.status >= 200 && res.status < 300) {
        setProducts(res.data.items);
        setError(null);
      } else {
        setError(res.statusText);
        setProducts([]);
      }
    } catch (err) {
      setError('Failed to fetch products.');
      setProducts([]);
    }
  };

  

  useEffect(() => {
    getProducts();
    getCart();
  }, [min_price, max_price, limit, sort]); // Dependency array to re-fetch products when these change

  const getProductQuantity = (productId) => {
    const cartItem = cart.find(item => item.id === productId);
    return cartItem ? cartItem.CartProduct.quantity : 0;
  };

  return (
    <>
      {error && <p>{error}</p>}
      
      <section className='d-flex justify-content-center mt-5'>
        <div className="row w-100" style={{ maxWidth: '900px' }}>
          <div className="col-md-2 mb-4">
            <h5 className="fw-bold mb-3">SHOP BY</h5>
            {/* Price filter */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Price</label>
              <input
                type="number"
                placeholder="Min Price"
                className="form-control mb-2"
                value={min_price}
                onChange={e => setMinPrice(e.target.value)}
              />
              <input
                type="number"
                placeholder="Max Price"
                className="form-control"
                value={max_price}
                onChange={e => setMaxPrice(e.target.value)}
              />
            </div>
            {/* Limit filter */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Limit</label>
              <select className="form-select" value={limit} onChange={e => setLimit(Number(e.target.value))}>
                <option value="3">3</option>
                <option value="6">6</option>
                <option value="9">9</option>
                <option value="12">12</option>
              </select>
            </div>
          </div>
          
          <div className="col-md-9">
            <div className="d-flex justify-content-between align-items-center mb-4">
              {/* Sorting */}
              <select className="form-select w-auto" value={sort} onChange={e => setSort(e.target.value)}>
                <option value="default">Default</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="name_asc">Name: A to Z</option>
                <option value="name_desc">Name: Z to A</option>
              </select>
            </div>

            <div className="row product-list">
              {products.length > 0 &&
                products.map((product) => (
                  <div key={product.id} className="col-md-4 mb-4">
                    <div className="row text-center">
                      <ProductCard product={product} />
                    </div>
                    <div className="row justify-content-center">
                      <CartButton
                        product={product}
                        getProductQuantity={getProductQuantity}
                        getCart={getCart}
                        getProducts={getProducts}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
