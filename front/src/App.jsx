import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useSelector } from "react-redux";

import Layout from "./Components/Layout/Layout.jsx";
import Products from "./Components/Category/Products/Products.jsx";
import Category from "./Components/Category/Category.jsx";
import Login from './Components/Login/Login.jsx';
import Register from './Components/Register/Register.jsx';
import Admin from './Components/Admin/Admin.jsx';
import Add from './Components/Admin/Add/Add.jsx';
import List from './Components/Admin/List/List.jsx';
import User from './Components/Admin/Users/User.jsx';
import AddProductDB from './Components/Admin/Add/AddProductDB.jsx';
import Home from './Components/Home/Home.jsx';
import Edit from './Components/Admin/EditProduct/Edit.jsx';
import Details from './Components/Category/Details/Details.jsx';
import FindByCategory from './Components/Category/ProductInCategory/FindByCategory.jsx';
import Cart from './Components/Cart/Cart.jsx';
import Checkout from './Components/Cart/Checkout/Checkout.jsx';
import About from './Components/About/About';

function AppRoutes() {
    const { isAuthenticated } = useSelector((state) => state.auth);

    const router = createBrowserRouter([{
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: '/about', element: <About /> },
            { path: '/category', element: <Category />, children: [
                { path: 'products', element: <Products /> },
                { path: 'details', element: <Details /> },
                { path: ':categoryId', element: <FindByCategory /> }
            ]},

            { path: '/login', element: isAuthenticated ? <Home /> : <Login /> },

            { path: '/register', element: <Register /> },
            { path: '/auth', element: <User /> },
            { path: '/create', element: <AddProductDB /> },
            { path: '/cart', element: <Cart /> },
            { path: '/checkout', element: <Checkout /> },

            { path: '/admin', element: <Admin />, children: [
                { path: 'add', element: <Add /> },
                { path: 'list', element: <List /> },
                { path: 'edit', element: <Edit /> }
            ]},
            
        ]
    }]);

    return <RouterProvider router={router} />;
}

export default function App() {
    return (
        <>
            <AppRoutes />
        </>
    );
}
