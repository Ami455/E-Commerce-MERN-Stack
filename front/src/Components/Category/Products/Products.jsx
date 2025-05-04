import React, { useEffect, useState } from 'react';
import ProductCard from '../../Card/ProductCard';
import CartButton from './CartButton/CartButton';
import { api } from '../../../utils/api';
import { useSearchParams } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';
import FavoriteButton from '../../favorite/favoriteButton';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Col, Container, FormControl, InputGroup, Row } from 'react-bootstrap';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const {favoriteCount} = useSelector((state) => state.favorites); 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const selectedCategoryName = searchParams.get('category') || '';
  const selectedMinPrice = searchParams.get('min_price') || '';
  const selectedMaxPrice = searchParams.get('max_price') || '';
  const selectedLimit = searchParams.get('limit') || 12;  // default 9 products per page
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
        ...(selectedMinPrice && { min_price: selectedMinPrice }),
        ...(selectedMaxPrice && { max_price: selectedMaxPrice }),
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
    getCategory();
    getCart();
    getFavorites();
  }, [favoriteCount]);

  useEffect(() => {
    if (categoryData.length > 0) {
      getProducts(currentPage);
    }
  }, [searchParams, categoryData, currentPage]);

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

          {/* Price Filter */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Price Range</label>
            <input
              type="number"
              placeholder="Min Price"
              className="form-control mb-2"
              value={selectedMinPrice}
              onChange={(e) => handleFilterChange('min_price', e.target.value)}
            />
            <input
              type="number"
              placeholder="Max Price"
              className="form-control"
              value={selectedMaxPrice}
              onChange={(e) => handleFilterChange('max_price', e.target.value)}
            />
          </div>

          {/* Limit Filter */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Products Per Page</label>
            <select
              className="form-select"
              value={selectedLimit}
              onChange={(e) => handleFilterChange('limit', e.target.value)}
            >
              <option value="">Default (9)</option>
              <option value="3">3</option>
              <option value="6">6</option>
              <option value="9">9</option>
              <option value="12">12</option>
              <option value="16">16</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Category</label>
            <select
              className="form-select"
              value={selectedCategoryName}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <option value="">All Categories</option>
              {categoryData.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

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





//min max price debounce 
// import React, { useEffect, useState } from 'react';
// import ProductCard from '../../Card/ProductCard';
// import CartButton from './CartButton/CartButton';
// import { api } from '../../../utils/api';
// import { useSearchParams } from 'react-router-dom';
// import Pagination from 'react-bootstrap/Pagination';
// import FavoriteButton from '../../favorite/favoriteButton';
// import toast from 'react-hot-toast';
// import { useSelector } from 'react-redux';
// import { Col, Container, FormControl, InputGroup, Row } from 'react-bootstrap';

// export default function Products() {
//   const [products, setProducts] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [favorites, setFavorites] = useState([]);
//   const [error, setError] = useState(null);
//   const [categoryData, setCategoryData] = useState([]);
//   const [searchParams, setSearchParams] = useSearchParams();
//   const {favoriteCount} = useSelector((state) => state.favorites); 
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const selectedCategoryName = searchParams.get('category') || '';
//   const selectedMinPrice = searchParams.get('min_price') || '';
//   const selectedMaxPrice = searchParams.get('max_price') || '';
//   const [debouncedMinPrice, setDebouncedMinPrice] = useState(selectedMinPrice);
//   const [debouncedMaxPrice, setDebouncedMaxPrice] = useState(selectedMaxPrice);
//   const [minPrice, setMinPrice] = useState(selectedMinPrice);
//   const [maxPrice, setMaxPrice] = useState(selectedMaxPrice);

//   const selectedLimit = searchParams.get('limit') || 12;  // default 9 products per page
//   const selectedSort = searchParams.get('sort') || '';

//   const getCart = async () => {
//     try {
//       const res = await api.get(`${import.meta.env.VITE_CARTPRODUCT}`);
//       setCart(res.data.products);
//     } catch (err) {
//       console.error('Failed to fetch cart:', err);
//     }
//   };
//   const getFavorites = async () => {
    
//     try {
//       const res = await api.get(`${import.meta.env.VITE_FAVORITE_PRODUCTS}`);
//       setFavorites(res.data.products);
//     } catch (err) {
//       console.error('Failed to fetch favorites:', err);
//     }
//   };
//   const getProducts = async (page = 1) => {
//     try {
//       let categoryId = '';
//       if (selectedCategoryName) {
//         const foundCategory = categoryData.find(c => c.name === selectedCategoryName);
//         categoryId = foundCategory ? foundCategory.id : '';
//       }

//       const params = {
//         ...(debouncedMinPrice && { min_price: debouncedMinPrice  }),
//         ...(debouncedMaxPrice && { max_price: debouncedMaxPrice  }),
//         ...(selectedLimit && { limit: selectedLimit }),
//         ...(selectedSort && { sort: selectedSort }),
//         ...(categoryId && { categoryId }),
//         page,
//       };

//       const res = await api.get(`${import.meta.env.VITE_PRODUCTS_LIST}`, { params });

//       if (res.status >= 200 && res.status < 300) {
//         setProducts(res.data.items);
//         setTotalPages(res.data.totalPages);
//         setCurrentPage(res.data.currentPage);
//         setError(null);
//       } else {
//         setError(res.statusText);
//         setProducts([]);
//       }
//     } catch (err) {
//       setError('Failed to fetch products.');
//       setProducts([]);
//     }
//   };

//   const getCategory = async () => {
//     try {
//       const res = await api.get(`${import.meta.env.VITE_CATEGORY_LIST}`);
//       setCategoryData(res.data.categories);
//     } catch (err) {
//       console.error("Error fetching categories:", err);
//     }
//   };
// // Debounce min_price and max_price
// useEffect(() => {
//   const timer = setTimeout(() => {
//     setDebouncedMinPrice(minPrice);
//     setDebouncedMaxPrice(maxPrice);
//   }, 500); // 500ms debounce delay

//   return () => clearTimeout(timer); // Cleanup timeout on change
// }, [minPrice, maxPrice]);

//   useEffect(() => {
//     getCategory();
//     getCart();
//     getFavorites();
//   }, [favoriteCount]);

//   useEffect(() => {
//     if (categoryData.length > 0) {
//       getProducts(currentPage);
//     }
//   }, [searchParams, categoryData, currentPage]);

//   const handleFilterChange = (key, value) => {
//     const params = Object.fromEntries([...searchParams]);
//     if (value) {
//       params[key] = value;
//     } else {
//       delete params[key];
//     }
//     setSearchParams(params);
//     setCurrentPage(1); // Reset to page 1 when filters change
//   };

//   const handleClearFilters = () => {
//     setSearchParams({});
//     setCurrentPage(1);
//   };

//   const getProductQuantity = (productId) => {
//     const cartItem = cart.find(item => item.id === productId);
//     return cartItem ? cartItem.CartProduct.quantity : 0;
//   };

//   const renderPagination = () => {
//     let items = [];
//     for (let number = 1; number <= totalPages; number++) {
//       items.push(
//         <Pagination.Item 
//           key={number} 
//           active={number === currentPage} 
//           onClick={() => setCurrentPage(number)}
//         >
//           {number}
//         </Pagination.Item>
//       );
//     }

//     return (
//       <Pagination className="justify-content-center mt-4">
//         <Pagination.Prev 
//           onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)} 
//           disabled={currentPage === 1}
//         />
//         {items}
//         <Pagination.Next 
//           onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)} 
//           disabled={currentPage === totalPages}
//         />
//       </Pagination>
//     );
//   };

//   return (
//     <>
//       {error && <p className="text-danger text-center">{error}</p>}

//       <section style={{ backgroundColor: '#0c2c4d', padding: '5rem 0' }}>
//       <Container className="text-center">
//         <h2 className="fw-bold text-white mb-3">Shop Our Collection</h2>
//         <p className="text-light mb-4">
//           Discover our carefully curated furniture pieces designed for modern living.
//         </p>
//       </Container>
//     </section>

//       <section className="container-fluid py-5">
//   <div className="container">
//     <div className="row">

//       {/* Sidebar Filters */}
//       <aside className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
//         <div className="p-4 border rounded-4 shadow-sm bg-white">
//           <h5 className="fw-bold mb-4">Shop By</h5>

//           {/* Price Filter */}
//           <div className="mb-4">
//             <label className="form-label fw-semibold">Price Range</label>
//             <input
//               type="number"
//               placeholder="Min Price"
//               className="form-control mb-2"
//               value={minPrice}
//               onChange={(e) => handleFilterChange('min_price', e.target.value)}
//             />
//             <input
//               type="number"
//               placeholder="Max Price"
//               className="form-control"
//               value={maxPrice}
//               onChange={(e) => handleFilterChange('max_price', e.target.value)}
//             />
//           </div>

//           {/* Limit Filter */}
//           <div className="mb-4">
//             <label className="form-label fw-semibold">Products Per Page</label>
//             <select
//               className="form-select"
//               value={selectedLimit}
//               onChange={(e) => handleFilterChange('limit', e.target.value)}
//             >
//               <option value="">Default (9)</option>
//               <option value="3">3</option>
//               <option value="6">6</option>
//               <option value="9">9</option>
//               <option value="12">12</option>
//               <option value="16">16</option>
//             </select>
//           </div>

//           {/* Category Filter */}
//           <div className="mb-4">
//             <label className="form-label fw-semibold">Category</label>
//             <select
//               className="form-select"
//               value={selectedCategoryName}
//               onChange={(e) => handleFilterChange('category', e.target.value)}
//             >
//               <option value="">All Categories</option>
//               {categoryData.map((category) => (
//                 <option key={category.id} value={category.name}>
//                   {category.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Clear Filters */}
//           <div className="d-grid">
//             <button 
//               onClick={handleClearFilters} 
//               className="btn btn-outline-dark"
//             >
//               Clear Filters
//             </button>
//           </div>
//         </div>
//       </aside>

//       {/* Products Section */}
//       <div className="col-12 col-md-8 col-lg-9">

//         {/* Sort Dropdown */}
//         <div className="d-flex justify-content-end align-items-center mb-4">
//           <select
//             className="form-select w-auto"
//             value={selectedSort}
//             onChange={(e) => handleFilterChange('sort', e.target.value)}
//           >
//             <option value="">Sort: Default</option>
//             <option value="price_asc">Price: Low to High</option>
//             <option value="price_desc">Price: High to Low</option>
//             <option value="name_asc">Name: A to Z</option>
//             <option value="name_desc">Name: Z to A</option>
//             <option value="created_asc">Newest First</option>
//             <option value="created_desc">Oldest First</option>
//           </select>
//         </div>

//         {/* Products Grid */}
//         <div className="row g-4">
//           {products.length > 0 ? (
//             products.map((product) => (
//               <div key={product.id} className="col-12 col-sm-6 col-md-6 col-lg-4">
//                 <div className="text-center h-100">
//                   <ProductCard product={product} />
//                   <FavoriteButton
//                     favorite={favorites.some((fav) => fav.id === product.id)}
//                     productId={product.id}
//                   />
//                   <CartButton
//                     product={product}
//                     getProductQuantity={getProductQuantity}
//                     getCart={getCart}
//                     getProducts={() => getProducts(currentPage)}
//                   />
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center">No products found.</p>
//           )}
//         </div>

//         {/* Pagination */}
//         <div className="mt-5">
//           {renderPagination()}
//         </div>
//       </div>

//     </div>
//   </div>
// </section>

//     </>
//   );
// }
