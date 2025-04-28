import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formDataApi, api } from "../../../utils/api";
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import './Add.css';

export default function Add() {
    const [categoryData, setCategoryData] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null); // State to store the selected image
    const { register, handleSubmit, reset } = useForm();
    const [message, setMessage] = useState("");

    // ✅ Get categories for the select input
    const getCategory = async () => {
        try {
            const res = await api.get(import.meta.env.VITE_CATEGORY_LIST);
            setCategoryData(res.data.categories);
        } catch (error) {
            console.error("Failed to load categories", error);
        }
    };

    useEffect(() => {
        getCategory();
    }, []);

    // Handle file selection and preview the selected image
    const handleImageSelection = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setSelectedImage(imageURL); // Update state to show the selected image
        }
    };

    // ✅ Submit form to create new product
    const onSubmit = async (formdata) => {
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formdata.name);
            formDataToSend.append('description', formdata.description);
            formDataToSend.append('categoryId', formdata.category);
            formDataToSend.append('price', formdata.price);
            formDataToSend.append('stock', formdata.stock);
            console.log(formdata.file[0])
            if (formdata.file[0]) { // if an image is selected
                formDataToSend.append('file', formdata.file[0]);
            }

            const res = await formDataApi.post(import.meta.env.VITE_PRODUCTS_LIST, formDataToSend);
            console.log("Product created:", res.data);

            setMessage(" Product added successfully!");
            reset(); // clear form after success
        } catch (error) {
            console.error("Error adding product:", error);
            setMessage(" Failed to add product.");
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Add Product</h1>
            <Form onSubmit={handleSubmit(onSubmit)} className="p-4 shadow rounded bg-light">
                {/* Product Name */}
                <Form.Group className="mb-3">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        {...register("name", { required: true })}
                        placeholder="Enter product name"
                    />
                </Form.Group>

                {/* Product Category */}
                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select name="category" {...register("category", { required: true })}>
                        <option value="">Select a Category</option>
                        {categoryData.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                {/* Product Price */}
                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        {...register("price", { required: true })}
                        placeholder="Enter price"
                    />
                </Form.Group>

                {/* Product Stock */}
                <Form.Group className="mb-3">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control
                        type="number"
                        name="stock"
                        {...register("stock", { required: true })}
                        placeholder="Enter quantity"
                    />
                </Form.Group>

                {/* Product Description */}
                <Form.Group className="mb-4">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        {...register("description", { required: true })}
                        placeholder="Enter description"
                    />
                </Form.Group>

                {/* Product Image */}
                <Form.Group className="mb-4 text-center">
                    <Form.Label>Product Image</Form.Label>
                    {/* Show the selected image preview */}
                    {selectedImage && (
                        <div className="mb-3">
                            <img
                                src={selectedImage}
                                alt="Selected Product"
                                style={{
                                    width: '200px',
                                    height: 'auto',
                                    borderRadius: '10px',
                                    objectFit: 'cover',
                                }}
                                className="img-thumbnail"
                            />
                        </div>
                    )}
                    <Form.Control
                        type="file"
                        accept="image/*"
                        {...register("file")}
                        onChange={handleImageSelection} // Set the image preview
                    />
                </Form.Group>

                {/* Submit Button */}
                <div className="text-center">
                    <Button variant="primary" type="submit" size="lg">
                        <FontAwesomeIcon icon={faUpload} /> Add Product
                    </Button>
                </div>

                {/* Message */}
                {message && <p className="mt-3">{message}</p>}
            </Form>
        </div>
    );
}
