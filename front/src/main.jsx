import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.jsx'
import { Provider } from "react-redux";
import { store } from "./store/index.js";

// =======
// import Account from '../account/account.jsx'
// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import Login from './Components/Login/Login.jsx'
// import Register from './Components/Register/Register.jsx'
// import Admin from './Components/Admin/Admin.jsx'
// import Add from './Components/Admin/Add/Add.jsx'
// import List from './Components/Admin/List/List.jsx'
// import User from './Components/Admin/Users/User.jsx'
// import AddProductDB from './Components/Admin/Add/AddProductDB.jsx'

// import Home from './Components/Home/Home.jsx'

// import Edit from './Components/Admin/EditProduct/Edit.jsx'
// import Details from './Components/Category/Details/Details.jsx'
// import FindByCategory from './Components/Category/ProductInCategory/FindByCategory.jsx'

// import Cart from './Components/Cart/Cart.jsx'
// import Checkout from './Components/Cart/Checkout/Checkout.jsx'

// // import Account from './Components/UserAccount/Account.jsx'





// import About from './Components/About/About';




//   let router = createBrowserRouter([{
//     path: '/',element:<Layout/>,children:[

//       {path:'/account',element:<Account/>},
//       {index:true,element:<Home/>},
//       {path:'/about',element:<About/>},
//       {path: '/category',element:<Category/>,children:[
//         {path: 'products',element:<Products/>},     /*todo:add categories as children or a query*/
//         {path:'details' , element:<Details/>},

//         {path: ':categoryId', element: <FindByCategory/>}

//       ]},
//       {path: '/login',element:<Login/>},
//       {path: '/register',element:<Register/>},
//       {path: '/auth',element:<User/>},
//       {path: '/create',element:<AddProductDB/>},


//       {path: '/cart',element:<Cart/>},
//       {path: '/checkout',element:<Checkout/>},



//       {path:'/admin',element:<Admin/>,children:[
//         {path:'add',element:<Add/>},
//         {path:'list',element:<List/>},
//         {path:'edit',element:<Edit/>}

//       ]},
      
//       // {path: '/cart',element:<Cart/>},
//       // {path: '/favorites',element:<Favorites/>},
//       // {path: '*',element:<Error/>},

//     ]
//   }])


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
    <App />
    </Provider>
  </StrictMode>,
)