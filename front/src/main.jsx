import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import Layout from "./Components/Layout/Layout.jsx"
import Products from "./Components/Category/Products/Product.jsx"
import Category from "./Components/Category/Category.jsx"
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Components/Login/login.jsx'
import Register from './Components/Register/Register.jsx'
import Admin from './Components/Admin/Admin.jsx'
import Add from './Components/Admin/Add/Add.jsx'
import List from './Components/Admin/List/List.jsx'


  let router = createBrowserRouter([{
    path: '/',element:<Layout/>,children:[
      {index:true,element:<App/>},
      {path: '/category',element:<Category/>,children:[
        {path: 'products',element:<Products/>},     /*todo:add categories as children or a query*/
      ]},
      {path: '/login',element:<Login/>},
      {path: '/register',element:<Register/>},
      {path:'/admin',element:<Admin/>,children:[
        {path:'add',element:<Add/>},
        {path:'list',element:<List/>}

      ]},
      
      // {path: '/cart',element:<Cart/>},
      // {path: '/favorites',element:<Favorites/>},
      // {path: '*',element:<Error/>},

    ]
  }])

   
createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
