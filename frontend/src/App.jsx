import React from 'react'
import {Routes, Route} from "react-router-dom"
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Cart from './pages/Cart/Cart'
import Collection from './pages/Collection/Collection'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import Navbar from './components/Navbar/Navbar'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/category/:category' element={<Collection />} />     {/*Dynamic Routing*/}
        <Route path='/product/:productId' element={<ProductDetails />} />
      </Routes>
    </div>
  )
}

export default App


