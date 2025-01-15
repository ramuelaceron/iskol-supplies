import React from "react";
import { useState } from "react";
import { backendUrl, currency } from "../../App";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import './Orders.css'

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      // console.log(response.data);
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Undo updating status for order
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if(response.data.success){
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message)      
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3 className="order-title">All Orders</h3>
      <div className="order-container">
        {orders.map((order, index) => (
          <div className="order-card" key={index}>
            <div className="order-details">
              <div className="user-order-details">
                <p className="order-customer">
                  <span>Customer</span> {order.yearAndSection.firstName}{" "}
                  {order.yearAndSection.lastName}
                </p>
                <p>
                  <span>Phone no.</span> {order.yearAndSection.phone}{" "}
                </p>
                <div className="order-info">
                  <span>Year & Section:</span>{" "}
                  {order.yearAndSection.yearAndCourse}
                </div>
              </div>

              <div className="order-items">
                {order.items.map((item, index) => (
                  <div className="order-item" key={index}>
                    <p>
                      <span>Product: </span>
                      {item.name}
                    </p>
                    <p>
                      <span>Quantity: </span>
                      {item.quantity}
                    </p>
                    <p>
                      <span>Size: </span>
                      {item.optionValues}
                    </p>
                  </div>
                ))}
              </div>
              <div className="payment-method">
                <p>
                  <span>Items: </span>
                  {order.items.length}
                </p>
                <p>
                  <span>Method of Payment: </span>
                  {order.paymentMethod}
                </p>
                <p>
                  <span>Payment: </span>
                  {order.payment ? "Done" : "Pending"}
                </p>
                <p>
                  <span>Date: </span>
                  {new Date(order.date).toLocaleString()}
                </p>
              </div>
              <h2 className="order-amount">
                {currency} {order.amount}.00
              </h2>
              <select onChange={(event)=>statusHandler(event, order._id)} value={order.status} className="order-status">
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Out of Order">Out of Order</option>
                <option value="Order Payed">Order Payed</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
