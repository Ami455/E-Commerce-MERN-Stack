
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../../utils/api';
import toast from 'react-hot-toast';
import { logout } from '../../store/slices/AuthSlices';
import { clearCartCount } from '../../store/slices/CartSlice';
import { clearFavoriteCount } from '../../store/slices/FavoriteSlices';



export default function Account() {
  const { register, handleSubmit, reset } = useForm();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [showSecondAddress, setShowSecondAddress] = useState(false);
  const [loading, setLoading] = useState(false); // new loading state

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
  
      // 1. Update user basic info
      await api.put(`${import.meta.env.VITE_USER}/${user.id}`, {
        userName: formData.userName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        birthDate: formData.birthDate,
      });
  
      // 2. Update or Create Address 1
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
  
      // 3. Update or Create Address 2 if shown
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
    <div className="container mt-4">
     
      <h1 className="mb-4">My Account</h1>

      <div className="d-flex justify-content-end">
        <button className="btn btn-danger mb-4" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-5">
        <fieldset className="border p-4 rounded">
          <legend className="w-auto px-2">User Info</legend>
          <div className="mb-3">
            <label className="form-label">UserName</label>
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
        </fieldset>

        <fieldset className="border p-4 rounded mt-4">
          <legend className="w-auto px-2">Address 1 Info</legend>
          <div className="mb-3">
            <label className="form-label">Street</label>
            <input {...register("street", { required: true })} type="text" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">City</label>
            <input {...register("city", { required: true })} type="text" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Postal Code</label>
            <input {...register("postalCode", { required: true })} type="text" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Country</label>
            <input {...register("country", { required: true })} type="text" className="form-control" />
          </div>
        </fieldset>

        {!showSecondAddress && (
          <div className="col-12 text-end">
            <button
              type="button"
              className="btn btn-link"
              onClick={() => setShowSecondAddress(true)}
            >
              + Add Another Address
            </button>
          </div>
        )}

        {showSecondAddress && (
          <fieldset className="border p-4 rounded mt-4">
            <legend className="w-auto px-2">Address 2 Info</legend>
            <div className="mb-3">
              <label className="form-label">Street</label>
              <input {...register("street2")} type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">City</label>
              <input {...register("city2")} type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Postal Code</label>
              <input {...register("postalCode2")} type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Country</label>
              <input {...register("country2")} type="text" className="form-control" />
            </div>
            <div className="col-12 text-end">
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
          </fieldset>
        )}

        <div className="col-12 mt-4 text-center">
          <button
            type="submit"
            className="btn btn-primary w-50"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>

      <div className="col-12 mt-3 text-center">
        <Link to="/orders">View Your Orders</Link>
      </div>
    </div>
  );
}


