import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../../utils/api';
import toast from 'react-hot-toast'; // optional, for success/fail messages

export default function EditOrder() {
  const navigate = useNavigate();
  const { orderId } = useLocation().state || {};

  const [status, setStatus] = useState("");

  const updateOrder = async () => {
    try {
      await api.put(`${import.meta.env.VITE_ORDER}/${orderId}`, { status });
      toast.success("Order updated successfully!");
      navigate("../order/list"); // after updating, go back to orders
    } catch (error) {
      console.error("Failed to update order", error);
      toast.error("Failed to update order!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!status) {
      toast.error("Please select a status first!");
      return;
    }
    updateOrder();
  };

  return (
    <div className="container py-5">
      <div className="card w-50 shadow-sm p-4">
        <h2 className="mb-4 text-center">Edit Order Status</h2>
        <Form onSubmit={handleSubmit}>
          <div className="d-flex flex-column gap-3">

            <Form.Check
              type="radio"
              id="pending"
              label="Pending"
              name="orderStatus"
              value="pending"
              checked={status === "pending"}
              onChange={(e) => setStatus(e.target.value)}
            />

            <Form.Check
              type="radio"
              id="processing"
              label="Processing"
              name="orderStatus"
              value="processing"
              checked={status === "processing"}
              onChange={(e) => setStatus(e.target.value)}
            />

            <Form.Check
              type="radio"
              id="shipped"
              label="Shipped"
              name="orderStatus"
              value="shipped"
              checked={status === "shipped"}
              onChange={(e) => setStatus(e.target.value)}
            />

            <Form.Check
              type="radio"
              id="delivered"
              label="Delivered"
              name="orderStatus"
              value="delivered"
              checked={status === "delivered"}
              onChange={(e) => setStatus(e.target.value)}
            />

            <Form.Check
              type="radio"
              id="cancelled"
              label="Cancelled"
              name="orderStatus"
              value="cancelled"
              checked={status === "cancelled"}
              onChange={(e) => setStatus(e.target.value)}
            />

          </div>

          <div className="text-center mt-4">
            <Button type="submit" variant="primary" className="px-5">
              Save Changes
            </Button>
          </div>
        </Form>
      </div>
    </div>

  );
}
