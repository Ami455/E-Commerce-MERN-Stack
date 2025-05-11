import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../../utils/api';
import toast from 'react-hot-toast';
import { logout } from '../../store/slices/AuthSlices';
import { clearCartCount } from '../../store/slices/CartSlice';
import { clearFavoriteCount } from '../../store/slices/FavoriteSlices';

import './Account.css';


export default function Account() {
  const { register, handleSubmit, reset } = useForm();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [showSecondAddress, setShowSecondAddress] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!user?.id) return;
    try {
      const userData = await api.get(`${import.meta.env.VITE_USER}/${user.id}`);
      const addressesRes = await api.get(`${import.meta.env.VITE_ADDRESS}/users/${user.id}`);
      const fetchedAddresses = addressesRes.data || [];

      setAddresses(fetchedAddresses);
      const formValues = { ...userData.data, ...fetchedAddresses[0] };

      if (fetchedAddresses[1]) {
        formValues.street2 = fetchedAddresses[1].street;
        formValues.city2 = fetchedAddresses[1].city;
        formValues.postalCode2 = fetchedAddresses[1].postalCode;
        formValues.country2 = fetchedAddresses[1].country;
        setShowSecondAddress(true);
      } else {
        setShowSecondAddress(false);
      }

      reset(formValues);
      localStorage.setItem('userData', JSON.stringify(formValues));
    } catch (error) {
      console.error('Failed to fetch account data', error);
    }
  };

  const onSubmit = async (formData) => {
    try {
      setLoading(true);

      await api.put(`${import.meta.env.VITE_USER}/${user.id}`, {
        userName: formData.userName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        birthDate: formData.birthDate,
      });

      if (addresses[0]) {
        await api.put(`${import.meta.env.VITE_ADDRESS}/${addresses[0].id}`, {
          userId: user.id,
          street: formData.street,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        });
      } else if (formData.street && formData.city && formData.postalCode && formData.country) {
        await api.post(`${import.meta.env.VITE_ADDRESS}`, {
          userId: user.id,
          street: formData.street,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        });
      }

      if (showSecondAddress && (formData.street2 || formData.city2 || formData.postalCode2 || formData.country2)) {
        if (addresses[1]) {
          await api.put(`${import.meta.env.VITE_ADDRESS}/${addresses[1].id}`, {
            userId: user.id,
            street: formData.street2,
            city: formData.city2,
            postalCode: formData.postalCode2,
            country: formData.country2,
          });
        } else {
          await api.post(`${import.meta.env.VITE_ADDRESS}`, {
            userId: user.id,
            street: formData.street2,
            city: formData.city2,
            postalCode: formData.postalCode2,
            country: formData.country2,
          });
        }
      }

      toast.success('Account updated successfully!');
      localStorage.setItem('userData', JSON.stringify(formData));
      await fetchData();

    } catch (error) {
      console.error('Failed to update account', error);
      toast.error('Failed to update account');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCartCount());
    dispatch(clearFavoriteCount());
    navigate("/login");
    toast.success('Logged out successfully!');
    localStorage.removeItem('userData');
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      const savedUserData = localStorage.getItem('userData');
      if (savedUserData) {
        reset(JSON.parse(savedUserData));
      }
      fetchData();
    }
  }, [isAuthenticated, user]);

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className=" texcol">My Account</h2>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card mb-4">
          <div className="card-header bagr  texcol">User Info</div>
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">User Name</label>
              <input type="text" className="form-control" {...register("userName", { required: true })} />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" {...register("email", { required: true })} />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input type="tel" className="form-control" {...register("phoneNumber", { required: true })} />
            </div>
            <div className="mb-3">
              <label className="form-label">Birth Date</label>
              <input type="date" className="form-control" {...register("birthDate", { required: true })} />
            </div>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-header bagr  texcol">Address 1 Info</div>
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">Street</label>
              <input type="text" className="form-control" {...register("street", { required: true })} />
            </div>
            <div className="mb-3">
              <label className="form-label">City</label>
              <input type="text" className="form-control" {...register("city", { required: true })} />
            </div>
            <div className="mb-3">
              <label className="form-label">Postal Code</label>
              <input type="text" className="form-control" {...register("postalCode", { required: true })} />
            </div>
            <div className="mb-3">
              <label className="form-label">Country</label>
              <input type="text" className="form-control" {...register("country", { required: true })} />
            </div>
          </div>
        </div>

        {!showSecondAddress && (
          <div className="mb-3 text-end">
            <button type="button" className="btn btn-outline-secondary" onClick={() => setShowSecondAddress(true)}>
              + Another Address
            </button>
          </div>
        )}

        {showSecondAddress && (
          <div className="card mb-4">
            <div className="card-header bagr  texcol">Address 2 Info</div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Street</label>
                <input type="text" className="form-control" {...register("street2")} />
              </div>
              <div className="mb-3">
                <label className="form-label">City</label>
                <input type="text" className="form-control" {...register("city2")} />
              </div>
              <div className="mb-3">
                <label className="form-label">Postal Code</label>
                <input type="text" className="form-control" {...register("postalCode2")} />
              </div>
              <div className="mb-3">
                <label className="form-label">Country</label>
                <input type="text" className="form-control" {...register("country2")} />
              </div>
              <div className="text-end">
                <button
                  type="button"
                  className="btn btn-link text-danger"
                  onClick={() => {
                    setShowSecondAddress(false);
                    reset((prev) => ({
                      ...prev,
                      street2: '',
                      city2: '',
                      postalCode2: '',
                      country2: ''
                    }));
                  }}
                >
                  Remove Address 2
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mb-4">
          <button type="submit" className="btn btn-primary px-5" disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>

      <div className="text-center">
        <Link to="/orders" className="btn ">
          View Your Orders
        </Link>
      </div>
    </div>
  );
}
