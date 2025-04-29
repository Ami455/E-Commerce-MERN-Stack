import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '../../../utils/api';

export default function Details() {
    const location = useLocation();
    const { productId } = location.state || {};
    const [product, setProduct] = useState(null);
    // console.log(productId)

    useEffect(() => {
        if (productId) {
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
            getData();
        }
    }, [productId]);

    if (!product) {
        return <h3>Loading product details...</h3>;
    }
    // console.log(product)

    return (
        <>
            <div className=' m-5'>
                <div className='d-row d-flex justify-content-between  container  m-5 p-5' >
                    <div className='col-6'>
                        <img src={`${import.meta.env.VITE_LOCAL_HOST}/uploads/${product.image}`} className='w-100 m-2 ' />
                    </div>
                    <div className='col-6 ps-5'>
                        <h1>{product.name}</h1>
                        <h2>${product.price}</h2>
                        <p>Category: {product.category}</p>
                        <p>Rating: {product.rating}</p>
                        <h2>Description</h2>
                        <p>{product.description}</p>
                        <button className=' btn w-100'>Add to Cart</button>
                    </div>
                </div>
            </div>
        </>
    );
}
