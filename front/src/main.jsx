import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import Layout from "./Components/Layout/Layout.jsx"
import Products from "./Components/Category/Products/Products.jsx"
import Category from "./Components/Category/Category.jsx"
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import Account from '../account/account.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Components/Login/Login.jsx'
import Register from './Components/Register/Register.jsx'
import Admin from './Components/Admin/Admin.jsx'
import Add from './Components/Admin/Add/Add.jsx'
import List from './Components/Admin/List/List.jsx'
import User from './Components/Admin/Users/User.jsx'
import AddProductDB from './Components/Admin/Add/AddProductDB.jsx'

import Home from './Components/Home/Home.jsx'

import Edit from './Components/Admin/EditProduct/Edit.jsx'
import Details from './Components/Category/Details/Details.jsx'
import FindByCategory from './Components/Category/ProductInCategory/FindByCategory.jsx'

import Cart from './Components/Cart/Cart.jsx'
import Checkout from './Components/Cart/Checkout/Checkout.jsx'
// import Account from './Components/UserAccount/Account.jsx'







  let router = createBrowserRouter([{
    path: '/',element:<Layout/>,children:[

      {path:'/account',element:<Account/>},
      {index:true,element:<Home/>},
      {path:"/account/:id", element:<Account/>},
      {path: '/category',element:<Category/>,children:[
        {path: 'products',element:<Products/>},     /*todo:add categories as children or a query*/
        {path:'details' , element:<Details/>},

        {path: ':categoryId', element: <FindByCategory/>}

      ]},
      {path: '/login',element:<Login/>},
      {path: '/register',element:<Register/>},
      {path: '/auth',element:<User/>},
      {path: '/create',element:<AddProductDB/>},


      {path: '/cart',element:<Cart/>},
      {path: '/checkout',element:<Checkout/>},



      {path:'/admin',element:<Admin/>,children:[
        {path:'add',element:<Add/>},
        {path:'list',element:<List/>},
        {path:'edit',element:<Edit/>}

      ]},
      
      // {path: '/cart',element:<Cart/>},
      // {path: '/favorites',element:<Favorites/>},
      // {path: '*',element:<Error/>},

    ]
  }])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
