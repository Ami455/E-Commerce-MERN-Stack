import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export default function AddProductDB() {
    const location = useLocation();
    const { name, description, category, subCategory, price, image,availableColors, action } = location.state || {};
    const [message, setMessage] = useState(""); // State for message
    // const [token, setToken] = useState(""); // State for token (if needed)

    const createProduct = async () => {
        
            console.log("Creating product with:", { name, description, category, subCategory, price});
            await axios.post(`${import.meta.env.VITE_LOCAL_HOST}/${import.meta.env.VITE_PRODUCTS_LIST}`, {
                name,
                description,
                category,
                subCategory,
                price,
                // availableColors,
                // image
            }).then( (res) =>{

            const data = res.data;
            console.log("Data", data);
            setMessage("Product added successfully!"); // Set success message
            localStorage.setItem("Data", JSON.stringify(data)); // Save data in localStorage
    })
        .catch ((err)=> {
            console.error("Error adding product:", err.message);
            setMessage(err.response.data?.message || "Failed to add product."); // Set error message
        });
    };


    const deleteProduct = () => {
        console.log("Registering with:", userName, email, password);
        axios.post(`${import.meta.env.VITE_LOCAL_HOST}/${import.meta.env.VITE_PRODUCTS_LIST}`, { userName, email, password })
            .then((res) => {
                const data = res.data;
                console.log("delete successful,", data);
                setMessage("deleted successful!"); // Set success message
                localStorage.setItem("data", data);
            })
            .catch((err) => {
                console.error("Registration error:", err.response?.data?.message || err.message);
                setMessage(err.response?.data?.message || "Registration failed."); // Set error message
            });
    };

    useEffect(() => {
        if (action === 'create') {
            createProduct();
        } else if (action === 'delete') {
            deleteProduct();
        }
    }, [action]); // Depend on action to call the correct function

    return (
        < >
            <div style={{
                position: "relative",
                top: '20%',
                padding: '100px',
                background: 'lightblue',

            }}><p>

                </p><br />
                <p>{message}</p> {/* Render the message here */}
                <br />
                {/* <div style={{ width: '400px' }}> <br />
                Name: {name}, Description: {description}, Category: {category}, SubCategory: {subCategory}, Price: {price}, Image: {image}
                </div> */}
            </div>
        </>
    )
}
