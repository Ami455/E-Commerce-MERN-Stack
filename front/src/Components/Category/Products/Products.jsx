import React, { useEffect, useState, useCallback } from 'react';
import ProductCard from '../../Card/ProductCard';
import CartButton from './CartButton/CartButton';
import { api } from '../../../utils/api';
import { useSearchParams } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';
import FavoriteButton from '../../favorite/favoriteButton';

import { useSelector } from 'react-redux';
import {  Container} from 'react-bootstrap';
import { useDebouncedCallback } from 'use-debounce';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { favoriteCount } = useSelector((state) => state.favorites);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Local states for min and max price inputs to enable debounced updating
  const [minPrice, setMinPrice] = useState(searchParams.get('min_price') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('max_price') || '');

  const selectedCategoryName = searchParams.get('category') || '';
  const selectedLimit = searchParams.get('limit') || 12;
  const selectedSort = searchParams.get('sort') || '';

  const getCart = async () => {
    try {
      const res = await api.get(`${import.meta.env.VITE_CARTPRODUCT}`);
      setCart(res.data.products);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    }
  };

  const getFavorites = async () => {
    try {
      const res = await api.get(`${import.meta.env.VITE_FAVORITE_PRODUCTS}`);
      setFavorites(res.data.products);
    } catch (err) {
      console.error('Failed to fetch favorites:', err);
    }
  };

  const getProducts = async (page = 1) => {
    try {
      let categoryId = '';
      if (selectedCategoryName) {
        const foundCategory = categoryData.find(c => c.name === selectedCategoryName);
        categoryId = foundCategory ? foundCategory.id : '';
      }

      const params = {
        ...(minPrice && { min_price: minPrice }),
        ...(maxPrice && { max_price: maxPrice }),
        ...(selectedLimit && { limit: selectedLimit }),
        ...(selectedSort && { sort: selectedSort }),
        ...(categoryId && { categoryId }),
        page,
      };

      const res = await api.get(`${import.meta.env.VITE_PRODUCTS_LIST}`, { params });

      if (res.status >= 200 && res.status < 300) {
        setProducts(res.data.items);
        setTotalPages(res.data.totalPages);
        setCurrentPage(res.data.currentPage);
        setError(null);
      } else {
        setError(res.statusText);
        setProducts([]);
      }
    } catch (err) {
      setError(`Failed to fetch products.:${err}`);
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
    getCategory();
    getCart();
    getFavorites();
  }, [favoriteCount]);

  // Fetch products when searchParams, categoryData or currentPage change
  // Note: currentPage and categoryData as dependencies, no longer minPrice and maxPrice here because searchParams updates for those
  useEffect(() => {
    if (categoryData.length > 0) {
      getProducts(currentPage);
    }
    
  }, [searchParams, categoryData, currentPage]);

  // Debounced callbacks to update search parameters for min and max price
  const debouncedMinPrice = useDebouncedCallback(
    useCallback((value) => {
      const params = Object.fromEntries([...searchParams]);
      if (value) {
        params['min_price'] = value;
      } else {
        delete params['min_price'];
      }
      setSearchParams(params);
      setCurrentPage(1);
    }, [searchParams, setSearchParams]),
    700,
    { maxWait: 2000 }
  );

  const debouncedMaxPrice = useDebouncedCallback(
    useCallback((value) => {
      const params = Object.fromEntries([...searchParams]);
      if (value) {
        params['max_price'] = value;
      } else {
        delete params['max_price'];
      }
      setSearchParams(params);
      setCurrentPage(1);
    }, [searchParams, setSearchParams]),
    700,
    { maxWait: 2000 }
  );

  const handleMinPriceChange = (e) => {
    const val = e.target.value;
    setMinPrice(val);
    debouncedMinPrice(val);
  };

  const handleMaxPriceChange = (e) => {
    const val = e.target.value;
    setMaxPrice(val);
    debouncedMaxPrice(val);
  };

  const handleFilterChange = (key, value) => {
    const params = Object.fromEntries([...searchParams]);
    if (value) {
      params[key] = value;
    } else {
      delete params[key];
    }
    setSearchParams(params);
    setCurrentPage(1); // Reset to page 1 when filters change
  };

  const handleClearFilters = () => {
    setSearchParams({});
    setMinPrice('');
    setMaxPrice('');
    setCurrentPage(1);
  };

  const getProductQuantity = (productId) => {
    const cartItem = cart.find(item => item.id === productId);
    return cartItem ? cartItem.CartProduct.quantity : 0;
  };

  const renderPagination = () => {
    let items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item 
          key={number} 
          active={number === currentPage} 
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    return (
      <Pagination className="justify-content-center mt-4">
        <Pagination.Prev 
          onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)} 
          disabled={currentPage === 1}
        />
        {items}
        <Pagination.Next 
          onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)} 
          disabled={currentPage === totalPages}
        />
      </Pagination>
    );
  };

  return (
    <>
      {error && <p className="text-danger text-center">{error}</p>}

      <section style={{ backgroundColor: '#0c2c4d', padding: '5rem 0' }}>
        <Container className="text-center">
          <h2 className="fw-bold text-white mb-3">Shop Our Collection</h2>
          <p className="text-light mb-4">
            Discover our carefully curated furniture pieces designed for modern living.
          </p>
        </Container>
      </section>

      <section className="container-fluid py-5">
        <div className="container">
          <div className="row">

            {/* Sidebar Filters */}
            <aside className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
              <div className="p-4 border rounded-4 shadow-sm bg-white">
                <h5 className="fw-bold mb-4">Shop By</h5>


          {/* Clear Filters */}
          <div className="d-grid">
            <button 
              onClick={handleClearFilters} 
              className="btn btn-outline-dark"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </aside>

      {/* Products Section */}
      <div className="col-12 col-md-8 col-lg-9">

        {/* Sort Dropdown */}
        <div className="d-flex justify-content-end align-items-center mb-4">
          <select
            className="form-select w-auto"
            value={selectedSort}
            onChange={(e) => handleFilterChange('sort', e.target.value)}
          >
            <option value="">Sort: Default</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="name_asc">Name: A to Z</option>
            <option value="name_desc">Name: Z to A</option>
            <option value="created_asc">Newest First</option>
            <option value="created_desc">Oldest First</option>
          </select>
        </div>

        <div className="row g-4">
  {products.length > 0 ? (
    products.map((product) => (
      <div
        key={product.id}
        className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch"
      >
        <div className="card border-0 shadow-sm w-100 h-100">
          <img
            src={`${import.meta.env.VITE_LOCAL_HOST}/uploads/${product.image}`}
            className="card-img-top"
            alt={product.name}
            style={{ height: '200px', objectFit: 'cover' }}
          />
          <div className="card-body d-flex flex-column justify-content-between">
            <h6 className="card-title">{product.name}</h6>
            <p className="card-text fw-semibold text-primary">
              ${product.price}
            </p>
            <div className="d-flex justify-content-between align-items-center mt-auto">
              <FavoriteButton
                favorite={favorites.some((fav) => fav.id === product.id)}
                productId={product.id}
              />
              <CartButton
                product={product}
                getProductQuantity={getProductQuantity}
                getCart={getCart}
                getProducts={() => getProducts(currentPage)}
              />
            </div>
          </div>
        </div>
      </div>
    ))
  ) : (
    <p className="text-center">No products found.</p>
  )}
</div>



            {/* Products Section */}
            <div className="col-12 col-md-8 col-lg-9">

              {/* Sort Dropdown */}
              <div className="d-flex justify-content-end align-items-center mb-4">
                <select
                  className="form-select w-auto"
                  value={selectedSort}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                >
                  <option value="">Sort: Default</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="name_asc">Name: A to Z</option>
                  <option value="name_desc">Name: Z to A</option>
                  <option value="created_asc">Newest First</option>
                  <option value="created_desc">Oldest First</option>
                </select>
              </div>

              {/* Products Grid */}
              <div className="row g-4">
                {products.length > 0 ? (
                  products.map((product) => (
                    <div key={product.id} className="col-12 col-sm-6 col-md-6 col-lg-4">
                      <div className="text-center h-100">
                        <ProductCard product={product} />
                        <FavoriteButton
                          favorite={favorites.some((fav) => fav.id === product.id)}
                          productId={product.id}
                        />
                        <CartButton
                          product={product}
                          getProductQuantity={getProductQuantity}
                          getCart={getCart}
                          getProducts={() => getProducts(currentPage)}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center">No products found.</p>
                )}
              </div>

              {/* Pagination */}
              <div className="mt-5">
                {renderPagination()}
              </div>
            </div>

          </div>
        </div>
      </section>

    </>
  );
}
