import React from 'react'
import {Routes, Route} from "react-router-dom"
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Cart from './pages/Cart/Cart'
import Checkout from './pages/Checkout/Checkout'
import Collection from './pages/Collection/Collection'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


export const backendUrl = 'http://localhost:4000'

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path='/category/:category' element={<Collection />} />     {/*Dynamic Routing*/}
        <Route path='/product/:productId' element={<ProductDetails />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App


