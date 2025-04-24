import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import Layout from "./Components/Layout/Layout.jsx"
import Products from "./Components/Category/Products/Products.jsx"
import Category from "./Components/Category/Category.jsx"
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Components/Login/Login.jsx'
import Register from './Components/Register/Register.jsx'
import Admin from './Components/Admin/Admin.jsx'
import Add from './Components/Admin/Add/Add.jsx'
import List from './Components/Admin/List/List.jsx'
import User from './Components/Admin/Users/User.jsx'
import AddProudctDB from './Components/Admin/Add/AddProudctDB.jsx'
import Edit from './Components/Admin/EditProduct/Edit.jsx'


  let router = createBrowserRouter([{
    path: '/',element:<Layout/>,children:[
      {index:true,element:<App/>},
      {path: '/category',element:<Category/>,children:[
        {path: 'products',element:<Products/>},     /*todo:add categories as children or a query*/
      ]},
      {path: '/login',element:<Login/>},
      {path: '/register',element:<Register/>},
      {path: '/auth',element:<User/>},
      {path: '/create',element:<AddProudctDB/>},

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
