import React, { useEffect, useState } from 'react';
import ProductCard from '../../Card/ProductCard';
import CartButton from './CartButton/CartButton';
import { Container, Row, Col, NavDropdown } from 'react-bootstrap';
import { api } from '../../../utils/api';
import { Link } from 'react-router-dom';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [min_price, setMinPrice] = useState();
  const [max_price, setMaxPrice] = useState();
  const [limit, setLimit] = useState();
  const [sort, setSort] = useState();

  const getCart = async () => {
    try {
      const res = await api.get(`${import.meta.env.VITE_CARTPRODUCT}`);
      setCart(res.data.products);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    }
  };

  const getProducts = async () => {
    try {
      const params = {
        min_price,
        max_price,
        limit,
        sort,
        ...(min_price && { min_price }),      // only include if not empty
      ...(max_price && { max_price }),      // only include if not empty
        ...(selectedCategory && { categoryId: selectedCategory }), // Only add if selected
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

  const getCategory = async () => {
    try {
      const res = await api.get(`${import.meta.env.VITE_CATEGORY_LIST}`);
      setCategoryData(res.data.categories);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    getProducts();
  }, [min_price, max_price, limit, sort, selectedCategory]);

  useEffect(() => {
    getCategory();
    getCart();
  }, []);

  const getProductQuantity = (productId) => {
    const cartItem = cart.find(item => item.id === productId);
    return cartItem ? cartItem.CartProduct.quantity : 0;
  };

  return (
    <>
      {error && <p className="text-danger text-center">{error}</p>}

      <section className="d-flex justify-content-center mt-5">
        <div className="row w-100" style={{ maxWidth: '1200px' }}>
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold mb-3">SHOP BY</h5>

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

            <div className="mb-3">
              <label className="form-label fw-semibold">Limit</label>
              <select className="form-select" value={limit} onChange={e => setLimit(Number(e.target.value))}>
                <option value="3">3</option>
                <option value="6">6</option>
                <option value="9">9</option>
                <option value="12">12</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Category</label>
              <select
                className="form-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categoryData.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-md-9">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <select className="form-select w-auto" value={sort} onChange={e => setSort(e.target.value)}>
                <option value="default">Default</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="name_asc">Name: A to Z</option>
                <option value="name_desc">Name: Z to A</option>
              </select>
            </div>

            <div className="row product-list">
              {products.length > 0 ? (
                products.map((product) => (
                  <div key={product.id} className="col-md-4 mb-4">
                    <div className="text-center">
                      <ProductCard product={product} />
                      <CartButton
                        product={product}
                        getProductQuantity={getProductQuantity}
                        getCart={getCart}
                        getProducts={getProducts}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center">No products found.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
