import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './Add.css';

// ...all your imports...

export default function Add() {
    const [categoryData, setCategoryData] = useState([]);
    const { register, handleSubmit, reset } = useForm();
    const nav = useNavigate();

    const getCategory = async () => {
        const data = await axios.get(
            `${import.meta.env.VITE_LOCAL_HOST}/${import.meta.env.VITE_CATEGORY_LIST}`
        );
        setCategoryData(data.data.categories);
    };

    useEffect(() => {
        getCategory();
    }, []);

    const sendLoginData = async (formdata) => {
        console.log("submit");
        console.log(formdata);

        //edit mohmed emad
        // const res = await axios.post('/admin', formdata)
        // // res.data

        // const formData = new FormData();

        // formData.append('name', formdata.name);
        // formData.append('file', formdata.file);
        

        // 

        // ✅ Pass categoryId to the route
        nav("/create", {
            state: {
                name: formdata.name,
                description: formdata.description,
                categoryId: formdata.category,
                price: formdata.price,
                stock: formdata.stock,
                action: 'create'
            }
        });
    };

    return (
        <div className="admin-panel">
            <div className="content ms-5 mt-3">
                <Form onSubmit={handleSubmit(sendLoginData)}>
                    <p>Upload Image</p>
                    <div className="upload-images mb-4">
                        <Form.Label htmlFor="file-upload">
                            <FontAwesomeIcon icon={faUpload} size="6x" />
                        </Form.Label>
                        <Form.Control id="file-upload" type="file" className="d-none" />
                    </div>

                    <article>
                        <Form.Label><p>Product name</p></Form.Label>
                        <Form.Control type="text" className="w-50" placeholder="Type here" {...register("name")} />
                        <br />

                        <Form.Label><p>Product description</p></Form.Label>
                        <Form.Control as="textarea" className="w-50" rows={3} {...register("description")} />

                        <div className="d-flex d-inline mt-3">
                            <section className="me-5">
                                <label><p>Product Category</p></label>
                                <Form.Select className="mt-2 w-100" {...register("category")}>
                                    <option value="">Select a Category</option>
                                    {categoryData.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </Form.Select>
                            </section>

                            <section>
                                <Form.Label><p>Product Price</p></Form.Label>
                                <Form.Control type="number" className="d-block w-75 text-center" {...register("price")} />
                            </section>
                            <section>
                                <Form.Label><p>Stock</p></Form.Label>
                                <Form.Control type="number" className="d-block w-75 text-center" {...register("stock")} />
                            </section>
                        </div>

                        <label>
                            <input type="checkbox" className="mt-3" /> Add to bestseller
                        </label>

                        <Button type="submit" variant="primary" size="lg" className="d-block mt-3">
                            Add Product
                        </Button>
                    </article>
                </Form>
            </div>
        </div>
    );
}
