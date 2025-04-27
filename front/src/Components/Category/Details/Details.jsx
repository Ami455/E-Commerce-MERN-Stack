import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function Details() {
    const location = useLocation();
    const { productId } = location.state || {};
    const [product, setProduct] = useState(null);
    // console.log(productId)

    useEffect(() => {
        if (productId) {
            const getData = async () => {
                try {
                    const response = await axios.get(
                        `${import.meta.env.VITE_LOCAL_HOST}/${import.meta.env.VITE_PRODUCTS_LIST}/${productId}`
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
            <p>img:<img src={product.image} className='w-25 m-2 ' /></p>
            <h1>Name: {product.name}</h1>
            <h2>Price: ${product.price}</h2>
            <p>Description: {product.description}</p>
        </>
    );
}
