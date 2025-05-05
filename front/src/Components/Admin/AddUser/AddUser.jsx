import React from 'react';
import { useForm } from 'react-hook-form';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { api } from "../../../utils/api";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function AddUser() {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (formdata) => {
        try {
            const {
                userName,
                email,
                password,
                phoneNumber,
                birthDate,
                role,
                IsActive
            } = formdata;

            const res = await api.post(import.meta.env.VITE_USER, {
                userName,
                email,
                password,
                phoneNumber,
                birthDate,
                role,
                IsActive: IsActive === "true"
            });

            console.log("User created:", res.data);
            reset();
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Add User</h1>
            <Form onSubmit={handleSubmit(onSubmit)} className="p-4 shadow rounded bg-light">
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        {...register("userName", { required: true })}
                        placeholder="Enter username"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        {...register("email", { required: true })}
                        placeholder="Enter email"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        type="number"
                        {...register("phoneNumber", { required: true })}
                        placeholder="Enter phone number"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        {...register("password", { required: true })}
                        placeholder="Enter password"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                        type="date"
                        {...register("birthDate", { required: true })}
                    />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Role</Form.Label>
                    <Form.Select {...register("role", { required: true })}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Is Active</Form.Label>
                    <Form.Select {...register("IsActive", { required: true })}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </Form.Select>
                </Form.Group>

                <div className="text-center">
                    <Button variant="primary" type="submit" size="lg">
                        <FontAwesomeIcon icon={faUpload} /> Add User
                    </Button>
                </div>
            </Form>
        </div>
    );
}
