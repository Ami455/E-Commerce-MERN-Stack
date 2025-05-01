import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { fetchMe } from './store/slices/AuthSlices.js';
import Layout from "./Components/Layout/Layout.jsx";
import Home from './Components/Home/Home.jsx';
import Account from './Components/account/Account.jsx';
import About from './Components/About/About';
import Login from './Components/Login/Login.jsx';
import Register from './Components/Register/Register.jsx';
import Cart from './Components/Cart/Cart.jsx';
import Checkout from './Components/Cart/Checkout/Checkout.jsx';
import Orders from './Components/order/orders.jsx';
import Order from './Components/order/Order.jsx';
import Category from './Components/Category/Category.jsx';
import Products from './Components/Category/Products/Products.jsx';
import Details from './Components/Category/Details/Details.jsx';
import FindByCategory from './Components/Category/ProductInCategory/FindByCategory.jsx';
import Admin from './Components/Admin/Admin.jsx';
import Add from './Components/Admin/AddProduct/AddProduct.jsx';
import List from './Components/Admin/ListProduct/ListProduct.jsx';
import Edit from './Components/Admin/EditProduct/EditProduct.jsx';
import AddUser from './Components/Admin/AddUser/AddUser.jsx';
import ListUser from './Components/Admin/ListUser/ListUser.jsx';
import EditUser from './Components/Admin/EditUser/EditUser.jsx';
import ListOrder from './Components/Admin/ListOrder/ListOrder.jsx';
import EditOrder from './Components/Admin/EditOrder/EditOrder.jsx';
import OrderDetail from './Components/Admin/OrderDetail/OrderDetail.jsx';
import SearchResults from './Components/Category/Search/Search.jsx';
import Favorite from './Components/favorite/Favorite.jsx';

function AppRoutes() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: '/account', element: <Account /> },
        { path: '/about', element: <About /> },
        { path: '/search', element: <SearchResults /> },
        { path: '/category', element: <Category />, children: [
          { path: 'products', element: <Products /> },
          { path: 'details', element: <Details /> },
          { path: ':categoryId', element: <FindByCategory /> }
        ]},
        { path: '/login', element: isAuthenticated ? <Home /> : <Login /> },
        { path: '/register', element: <Register /> },
        { path: '/cart', element: <Cart /> },
        { path: '/favorites', element: <Favorite /> },
        { path: '/checkout', element: <Checkout /> },
        { path: '/orders', element: <Orders /> },
        { path: '/order/:orderId', element: <Order /> },
        { path: '/admin', element: <Admin />, children: [
          { path: 'product/add', element: <Add /> },
          { path: 'product/list', element: <List /> },
          { path: 'product/edit', element: <Edit /> },
          { path: 'user/add', element: <AddUser /> },
          { path: 'user/list', element: <ListUser /> },
          { path: 'user/edit', element: <EditUser /> },
          { path: 'order/list', element: <ListOrder /> },
          { path: 'order/edit', element: <EditOrder /> },
          { path: 'order/details', element: <OrderDetail /> },
        ]},
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(fetchMe());
    }
  }, [dispatch]);

  return <AppRoutes />;
}
