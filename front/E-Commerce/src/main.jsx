import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.jsx'
import Layout from "./Components/Layout/Layout.jsx"
import Products from "./Components/Category/Products/Product.jsx"
import Category from "./Components/Category/Category.jsx"

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

  let router = createBrowserRouter([{
    path: '/',element:<Layout/>,children:[
      {index:true,element:<App/>},
      {path: '/category',element:<Category/>,children:[
        {path: 'products',element:<Products/>},     /*todo:add categories as childen or a query*/
      ]}
      // {path: '/about',element:<Favorite/>},
      // {path: '/cart',element:<Cart/>},
      // {path: '/favorites',element:<Favorites/>},
      // {path: '*',element:<Error/>},

    ]
  }])

   
createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
