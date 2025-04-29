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
import Add from './Components/Admin/AddProduct/Add.jsx';
import List from './Components/Admin/ListProduct/List.jsx';
import User from './Components/Admin/AddUser/AddUser.jsx';
import Home from './Components/Home/Home.jsx';
import Edit from './Components/Admin/EditProduct/Edit.jsx';
import Details from './Components/Category/Details/Details.jsx';
import FindByCategory from './Components/Category/ProductInCategory/FindByCategory.jsx';
import Cart from './Components/Cart/Cart.jsx';
import Checkout from './Components/Cart/Checkout/Checkout.jsx';
import About from './Components/About/About';

import SearchResults from './Components/Category/Search/Search.jsx';
import AddUser from './Components/Admin/AddUser/AddUser.jsx';
import ListUser from './Components/Admin/ListUser/ListUser.jsx';
import EditUser from './Components/Admin/EditUser/EditUser.jsx';

function AppRoutes() {
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    const router = createBrowserRouter([{
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: '/about', element: <About /> },
            {path: '/search', element: <SearchResults />},
            { path: '/category', element: <Category />, children: [
                { path: 'products', element: <Products /> },
                { path: 'details', element: <Details /> },
                { path: ':categoryId', element: <FindByCategory /> }
            ]},

            { path: '/login', element: isAuthenticated ? <Home /> : <Login /> },

            { path: '/register', element: <Register /> },
            { path: '/cart', element: <Cart /> },
            { path: '/checkout', element: <Checkout /> },

            { path: '/admin', element: <Admin />, children: [

                { path: 'product/add', element: <Add /> },
                { path: 'product/list', element: <List /> },
                { path: 'product/edit', element: <Edit /> }
                { path: 'user/add', element: <AddUser /> },
                { path: 'user/list', element: <ListUser /> },
                { path: 'user/edit', element: <EditUser /> }
                { path: 'order/add', element: <Add /> },
                { path: 'order/list', element: <List /> },
                { path: 'order/edit', element: <Edit /> }
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
