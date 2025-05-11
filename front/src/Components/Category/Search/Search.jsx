import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { formDataApi } from '../../../utils/api';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function SearchResults() {
    const query = useQuery();
    const search = query.get("search");
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await formDataApi.get(`${import.meta.env.VITE_PRODUCTS_LIST}`, { params: { search } });
                setProducts(res.data.items);
            } catch (err) {
                setError("Failed to load products.");
            }
        };

        if (search) getProducts();
    }, [search]);

    return (
        <div className="container mt-4">
            <h4>Search Results for "{search}":</h4>
            {error && <div className="alert alert-danger">{error}</div>}
            {products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <div className="row">
                    {products.map((product) => (
                        <div key={product.id} className="col-md-4 mb-4">
                            <div className="card h-100">
                                {product.image && (
                                    <img
                                        src={`${import.meta.env.VITE_LOCAL_HOST}/uploads/${product.image}`}
                                        className="card-img-top"
                                        alt={product.name}
                                        style={{ height: '200px', objectFit: 'cover' }}
                                    />
                                )}
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">{product.description || "No description available."}</p>
                                    <p className="card-text fw-bold">${product.price}</p>
                                    <Link to="/category/details" state={{ productId: product.id }} className="btn btn-primary">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

