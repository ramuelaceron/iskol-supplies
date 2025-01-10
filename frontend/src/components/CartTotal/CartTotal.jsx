import React, { useContext } from 'react'
import { ShopContext } from '../../context/ShopContext'
import './CartTotal.css'

const CartTotal = () => {

  const {currency, getCartAmount, service_fee} = useContext(ShopContext)

  return (
    <div>
      <div className="cart-total-container">
        <div className="cart-title">
          <h2>CART TOTALS</h2>
        </div>
        <div className="cart-total-details">
          <div className="cart-row">
            <p>Subtotal:</p>
            <p>{currency} {getCartAmount()}.00</p>
          </div>
          <hr className="cart-divider" />
          <div className="cart-row">
            <p>Service Fee:</p>
            <p>{currency} {service_fee}.00</p>
          </div>
          <div className="cart-row cart-total">
            <b>Total: </b>
            <b>{currency} {getCartAmount() === 0 ? 0 : getCartAmount() + service_fee}.00</b>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
