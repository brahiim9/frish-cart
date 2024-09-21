import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import Wishlist from './components/Wishlist/Wishlist';
import Products from './components/Products/Products';
import Categories from './components/Categories/Categories';
import Brands from './components/Brands/Brands';
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import UserContextProvider from './Context/userContext';
import Forgotpass from './components/Forgotpass/Forgotpass';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CartContextProvider from './Context/cartContext';
import { Toaster } from 'react-hot-toast';
import WishlistContextProvider from './Context/wishlistContext';
import Checkout from './components/Checkout/Checkout';
import Allorders from './components/Allorders/Allorders';


let x = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute> <Cart /> </ProtectedRoute> },
      { path: 'wish list', element: <ProtectedRoute> <Wishlist /></ProtectedRoute> },
      { path: 'products', element: <ProtectedRoute> <Products /></ProtectedRoute> },
      { path: 'categories', element: <ProtectedRoute> <Categories /></ProtectedRoute> },
      { path: 'brands', element: <ProtectedRoute> <Brands /></ProtectedRoute> },
      { path: 'productdetails/:id', element: <ProtectedRoute> <ProductDetails /></ProtectedRoute> },
      { path: 'checkout', element: <ProtectedRoute> <Checkout /></ProtectedRoute> },
      { path: 'allorders', element: <ProtectedRoute> <Allorders /></ProtectedRoute> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: 'forgotpass', element: <Forgotpass /> }
    ]
  }
])

export default function App() {
  return <UserContextProvider >
    <CartContextProvider>
      <WishlistContextProvider>
        <RouterProvider router={x}></RouterProvider>
        <Toaster />
      </WishlistContextProvider>
    </CartContextProvider>
  </UserContextProvider>

}
