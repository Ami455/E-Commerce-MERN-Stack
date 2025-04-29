import React, { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formDataApi, api } from "../../../utils/api";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export default function AddUser() {

  const { register, handleSubmit, reset } = useForm();
  const {userInfo , setUserInfo} = useState([]);


    const onSubmit = async (formdata) => {
      try {
          const formDataToSend = new FormData();
          formDataToSend.append('username', formdata.userName);
          formDataToSend.append('email', formdata.email);
          formDataToSend.append('password', formdata.password);
          formDataToSend.append('phone', formdata.phone);
          formDataToSend.append('birthday', formdata.birthday);
          formDataToSend.append('role', formdata.role);
          formDataToSend.append('IsActive', formdata.IsActive);
          console.log(formdata.file[0])
          if (formdata.file[0]) { // if an image is selected
              formDataToSend.append('file', formdata.file[0]);
          }

          const res = await formDataApi.post(import.meta.env.VITE_USER, formDataToSend);
          console.log("user created:", res.data);

          reset(); // clear form after success
      } catch (error) {
          console.error("Error adding user:", error);
            
      }
  };



  return (
    <>
      <div className="container mt-5">
            <h1 className="text-center mb-4">Add User</h1>
            <Form onSubmit={handleSubmit(onSubmit)} className="p-4 shadow rounded bg-light">
                {/* Product Name */}
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        {...register("userName", { required: true })}
                        placeholder="Enter username"
                    />
                </Form.Group>

                {/* Product Category */}
                <Form.Group className="mb-3">
                    <Form.Label>email</Form.Label>
                    <Form.Select name="email" {...register("email", { required: true })}>
                        <option value="">Email</option>
                        
                    </Form.Select>
                </Form.Group>

                
                <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        type="number"
                        name="phone"
                        {...register("price", { required: true })}
                        placeholder="Enter phone number"
                    />
                </Form.Group>

                {/* Product Stock */}
                <Form.Group className="mb-3">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control
                        type=""
                        name="birthday"
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
                        placeholder=""
                    />
                </Form.Group>

                {/* Submit Button */}
                <div className="text-center">
                    <Button variant="primary" type="submit" size="lg">
                        <FontAwesomeIcon icon={faUpload} /> Add Product
                    </Button>
                </div>

                
            </Form>
        </div>
    </>
  );
}

