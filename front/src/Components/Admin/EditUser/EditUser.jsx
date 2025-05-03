import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../../../utils/api';

export default function EditUser() {
  const location = useLocation();
  const { userId } = location.state || {};
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    phoneNumber: '',
    birthDate: '',
    role: 'user',
    IsActive: 'true',
  });

  const [isLoading, setIsLoading] = useState(true);

  const fetchUserDetails = async () => {
    try {
      const response = await api.get(`${import.meta.env.VITE_USER}/${userId}`);
      const {
        userName,
        email,
        password,
        phoneNumber,
        birthDate,
        role,
        IsActive,
      } = response.data;

      console.log(response)

      setFormData({
        userName,
        email,
        phoneNumber,
        birthDate: birthDate?.split("T")[0] || '',
        role,
        IsActive: IsActive.toString(),
      });
    } catch (error) {
      console.error('Failed to fetch user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateUserDetails = async (e) => {
    e.preventDefault();

    console.log('Updating user with data:', formData); // ✅ Visible JSON log

    try {
      await api.put(`${import.meta.env.VITE_USER}/${userId}`, {
        ...formData
      });

      alert('User updated successfully!');
      navigate('/admin/user/list');
    } catch (error) {
      console.error('Failed to update user:', error);
      alert('Failed to update user.');
    }
  };

  if (isLoading) return <p>Loading user data...</p>;

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Edit User</h1>
      <Form onSubmit={updateUserDetails} className="p-4 shadow rounded bg-light">
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleInputChange}
            placeholder="Enter username"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="Enter phone number"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter password"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Role</Form.Label>
          <Form.Select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Is Active</Form.Label>
          <Form.Select
            name="IsActive"
            value={formData.IsActive}
            onChange={handleInputChange}
            required
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </Form.Select>
        </Form.Group>

        <div className="text-center">
          <Button variant="primary" type="submit" size="lg">
            <FontAwesomeIcon icon={faUpload} /> Update User
          </Button>
        </div>
      </Form>
    </div>
  );
}
