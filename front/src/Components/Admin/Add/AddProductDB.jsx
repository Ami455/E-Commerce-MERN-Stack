import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export default function AddProductDB() {
    // const location = useLocation();
    
    // // ✅ Updated to extract categoryId correctly
    // const { name, description, categoryId, price, stock, action } = location.state || {};
    // const [message, setMessage] = useState("");

    // const createProduct = async () => {
    //     try {
    //         console.log("Creating product with:", { name, description, categoryId, price, stock });

    //         const response = await axios.post(`${import.meta.env.VITE_LOCAL_HOST}/${import.meta.env.VITE_PRODUCTS_LIST}`, {
    //             name,
    //             description,
    //             categoryId, // ✅ sending the correct property now
    //             price,
    //             stock
    //         });

    //         const data = response.data;
    //         console.log("Data", data);
    //         setMessage("Product added successfully!");
    //         localStorage.setItem("Data", JSON.stringify(data));
    //     } catch (err) {
    //         console.error("Error adding product:", err.message);
    //         setMessage(err.response?.data?.message || "Failed to add product.");
    //     }
    // };

    // useEffect(() => {
    //     if (action === 'create') {
    //         createProduct();
    //     }
    // }, [action]);

    return (
        <></>
        // <div style={{
        //     position: "relative",
        //     top: '20%',
        //     padding: '100px',
        //     background: 'lightblue',
        // }}>
        //     <p>{message}</p>
        // </div>
    );
}
