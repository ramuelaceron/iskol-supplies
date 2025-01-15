import React, { useContext, useState } from 'react'
import { ShopContext } from "../../context/ShopContext"
import CartTotal from '../../components/CartTotal/CartTotal'
import { useNavigate } from "react-router-dom";
import './Checkout.css'
import axios from 'axios'
import { backendUrl } from '../../App'
import { toast } from 'react-toastify'

const Checkout = () => {

    const [method, setMethod] = useState("cash")
    const navigate = useNavigate();
    const { cartItems, setCartItems, getCartAmount, service_fee, products, token} = 
        useContext(ShopContext);
    
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        yearAndCourse: "",
        phone: "",
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target; // Destructure name and value from the event.target
    
        setFormData((data) => ({ ...data, [name]: value })); // Update the state correctly
    };


    const onSubmitHandler = async () => {
        event.preventDefault();

        try {
            let orderItems = [];

            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(
                            products.find((product) => product._id === items) 
                        );

                        if (itemInfo) {
                            itemInfo.optionValues = item;
                            itemInfo.quantity = cartItems[items][item];
                            orderItems.push(itemInfo);
                        }
                    }
                }
            }

            let orderData = {
                yearAndSection: formData,
                items: orderItems,
                amount: getCartAmount() + service_fee,
            };

            switch (method) {
                case "cash":
                    const response = await axios.post(
                        backendUrl + '/api/order/place', 
                        orderData,
                        {headers: {token}}
                    );
                    // console.log(response.data)
                    if(response.data.success){
                        setCartItems({})
                        navigate("/order")
                    }
                    else{
                        toast.error(response.data.message)
                    }
                    
                    break;
            
                default:
                    break;
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    };

  return (
    <form className="form-container" onSubmit={onSubmitHandler}>
        
        {/* Left Section || Delivery information section */}
        <div className="form-left">
            <fieldset className="payment-method">
                <legend>Payment Options</legend>
                <div className="payment-options">
                    <div 
                    onClick={()=> setMethod("cash")}
                    className={`payment-option ${method === "cash" ? "selected" : ""}`}>
                        <span className="payment-text">PAY CASH</span>
                    </div>
                </div>
            </fieldset>

            <div className="form-title">
                <h2>Payment Information</h2>
            </div>
            <div className="form-row">
                <input 
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    className="form-input"
                    placeholder="First Name"
                    onChange={onChangeHandler}
                />
                <input 
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    className="form-input"
                    placeholder="Last Name"
                    onChange={onChangeHandler}
                />
            </div>
            <div className="form-column">
                <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    className="form-input"
                    placeholder="Email Address"
                    onChange={onChangeHandler}
                />
                <input 
                    type="text"
                    name="yearAndCourse"
                    value={formData.yearAndCourse}
                    className="form-input"
                    placeholder="Year & Section"
                    onChange={onChangeHandler}
                />
                <input 
                    type="number"
                    name="phone"
                    value={formData.phone}
                    className="form-input"
                    placeholder="Phone Number"
                    onChange={onChangeHandler}
                />
            </div>

        </div>

        {/* Right Section */}
      <div className="form-right">
        <CartTotal />
        <button type="submit" className="checkout-submit-button">
          PLACE ORDER
        </button>
        
      </div>
      
    </form>
    
  )
}

export default Checkout
