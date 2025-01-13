import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../context/ShopContext'
import {MdDelete} from 'react-icons/md'
import CartTotal from '../../components/CartTotal/CartTotal'
import './Cart.css'

const Cart = () => {

  const {products, currency, cartItems, updatedQuantity} = useContext(ShopContext)

  const [cartData, setCartData] = useState([])

  useEffect(() => {
    if(products.length === 0) return;

    if(!cartItems || typeof cartItems !== 'object'){
      setCartData([])
      return;
    }

    const tempData = Object.entries(cartItems).flatMap(([itemId, optionValues]) =>
    Object.entries(optionValues).filter(([, quantity]) => quantity > 0).map(([optionValue, quantity]) => ({
      _id: itemId,
      optionValue,
      quantity
    })) 
    )
    setCartData(tempData)
  }, [cartItems, products])

  return (
    <div>
      <div className="cart-content-container">
        {
          cartData.map((item, index) => {
            const productData = products.find(product => product._id === item._id)
            return(
              <div key={index} className='cart-item'>
                <div className="cart-item-info">
                  <img src={productData.image[0]} alt="" className='product-cart-image'/>
                  <div className="product-details-cart">
                    <p className="cart-product-name">{productData.name}</p>
                    <div className="product-price-size">
                      <p className='cart-product-price'>{currency} {productData.price}.00</p>
                      <p className="optionValue">{item.optionValue}</p>
                    </div>
                  </div>
                </div>

                <input type="number" className='quantity-input' min={1} defaultValue={item.quantity}
                onChange={(e) => e.target.value === '' || e.target.value === 0 ? null : updatedQuantity(item._id, item.optionValue, Number(e.target.value))} />
              
                <MdDelete className='delete-icon' onClick={()=> updatedQuantity(item._id, item.optionValue, 0)} />
              </div>
            ) 
          })
        }
      </div>
      <div className="checkout-container">
        <div className="checkout-box">
          <CartTotal />
          <div className="checkout-button-container">
            <button className="checkout-button">PROCCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
      <hr className='footer-divider'/>
    </div>
  )
}

export default Cart
