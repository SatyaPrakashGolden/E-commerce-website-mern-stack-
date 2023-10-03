import React from 'react'
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route } from 'react-router-dom'
import Footer from "./components/footer/Footer";
import Cart from "./components/cart/Cart";
import Final from './components/final/Final';
import ProductDetail from "./components/productDetail/ProductDetail";
import Create from "./components/create/Create";
import Login from "./components/login/Login";
import Checkout from './components/checkout/Checkout';
import Register from "./components/register/Register";
import AddressPage from "./components/addressPage/AddressPage";
import './App.css'
function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={< Checkout />} />
        <Route path='/final' element={< Final />} />
        <Route path='/create' element={< Create />} />
        <Route path='/addressDetails' element={< AddressPage />} />
        <Route path='/productDetail/:id' element={< ProductDetail />} />
      </Routes>
      <Footer/>
    </div>
  )
}
export default App