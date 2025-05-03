import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { api, formDataApi } from '../../../utils/api';

export default function Edit() {
    
    const location = useLocation();
    const { productId } = location.state || {};
    const navigate = useNavigate();
    const [categoryData, setCategoryData] = useState([]);
    const [selectedImageFile, setSelectedImageFile] = useState(null);


    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        stock: '',
        description: '',
        image: '',
    });

    

    // Separate function to fetch product details
    const fetchProductDetails = async () => {
        try {
            const response = await formDataApi.get(`${import.meta.env.VITE_PRODUCTS_LIST}/${productId}`);
            const { name, categoryId, price, stock, description, image } = response.data;
            setFormData({ name, categoryId, price, stock, description, image });
        } catch (error) {
            console.error('Failed to fetch product:', error);
        }
    };

            const getCategory = async () => {
                try {
                    const res = await api.get(import.meta.env.VITE_CATEGORY_LIST);
                    setCategoryData(res.data.categories);
                } catch (error) {
                    console.error("Failed to load categories", error);
                }
            };

    useEffect(() => {
        if (productId) {
            fetchProductDetails();
            getCategory();
        }
    }, [productId]);

    // Handle text field changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    // Handle image file selection
    const handleImageSelection = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImageFile(file);
            setFormData((prevFormData) => ({
                ...prevFormData,
                image: URL.createObjectURL(file), // Show preview
            }));
        }
    };

    // Submit updated product
    const updateProductDetails = async (e) => {
        e.preventDefault();
        try {
            const updatedFormData = new FormData();
            updatedFormData.append('name', formData.name);
            updatedFormData.append('categoryId', formData.categoryId);
            updatedFormData.append('price', formData.price);
            updatedFormData.append('stock', formData.stock);
            updatedFormData.append('description', formData.description);
            if (selectedImageFile) {
                updatedFormData.append('file', selectedImageFile);
            }

            await formDataApi.put(
                `${import.meta.env.VITE_PRODUCTS_LIST}/${productId}`,
                updatedFormData
            );

            alert('Product updated successfully!');
            navigate('/admin/product/list');
        } catch (error) {
            console.error('Failed to update product:', error);
            alert('Failed to update product.');
        }
    };



    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Edit Product</h1>
            <Form onSubmit={updateProductDetails} className="p-4 shadow rounded bg-light">
                <Form.Group className="mb-3">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter product name"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select name="categoryId" value={formData.categoryId}
                        onChange={handleInputChange}>
                        <option value="">Select a Category</option>
                        {categoryData.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="Enter price"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>stock</Form.Label>
                    <Form.Control
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                        placeholder="Enter stock"
                    />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Enter description"
                    />
                </Form.Group>

                <Form.Group className="mb-4 text-center">
                    <Form.Label>Product Image</Form.Label>
                    <div className="mb-3">
                        {formData.image && (
                            <img
                                src={formData.image}
                                alt="Product Preview"
                                style={{ width: '200px', height: 'auto', borderRadius: '10px', objectFit: 'cover' }}
                                className="img-thumbnail"
                            />
                        )}
                    </div>
                    <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelection}
                    />
                </Form.Group>

                <div className="text-center">
                    <Button variant="primary" type="submit"  size="lg">
                        <FontAwesomeIcon icon={faUpload} /> Update Product
                    </Button>
                </div>
            </Form>
        </div>
    );
}
