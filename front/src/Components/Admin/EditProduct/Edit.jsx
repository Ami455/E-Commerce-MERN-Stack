import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Edit() {
    const location = useLocation();
    const navigate = useNavigate();
    const { productId } = location.state || {};
    const [product, setProduct] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        quantity: '',
        description: '',
        image: '',
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_LOCAL_HOST}/${import.meta.env.VITE_PRODUCTS_LIST}/${productId}`
                );
                setProduct(response.data);
                setFormData(response.data); // Pre-fill form
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent page reload
        try {
            await axios.put(
                `${import.meta.env.VITE_LOCAL_HOST}/${import.meta.env.VITE_PRODUCTS_LIST}/${productId}`,
                formData
            );
            alert("Product updated successfully!");
            navigate("/"); // redirect back to list
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    if (!product) return <p>Loading product data...</p>;

    return (
        <div className="container mt-4">
            <h1>Edit Product</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Control type="text" name="category" value={formData.category} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Image URL</Form.Label>
                    <div>
                        <img src={formData.image} alt="product" style={{ width: '150px', marginBottom: '10px' }} />
                    </div>
                    <Form.Control type="text" name="image" value={formData.image} onChange={handleChange} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    <FontAwesomeIcon icon={faUpload} /> Update Product
                </Button>
            </Form>
        </div>
    );
}
