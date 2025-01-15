import orderModel from "../models/orderModels.js"
import userModel from "../models/userModels.js";


// Order data for admin panel
const allOrder = async(req, res) => {
    try {
        const orders = await orderModel.find({})

        res.json({success:true, orders});
    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }
}

// Order data for frontend
const userOrders = async(req, res) => {
    try {
        const {userId} = req.body;

        const orders = await orderModel.find({userId})

        res.json({success:true, orders})
    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }
}

// Placing order using cash payment
const placeOrder = async(req, res) => {
    try {
        const {userId, items, amount, yearAndSection} = req.body
        const orderData = {
            userId, 
            items, 
            amount, 
            yearAndSection, 
            paymentMethod: "Cash",
            payment: false,
            date: Date.now()
        };

        const newOrder = new orderModel(orderData);

        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, {
            cartData: {}
        })

        res.json({success:true, message: 'Order Placed'})

    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }
}

// Handle updating status from admin panel
const updateStatus = async(req, res) => {
    try {
        const {orderId, status} = req.body;

        await orderModel.findByIdAndUpdate(orderId, {status})

        res.json({success:true, message: 'Status Updated'})
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }
}

export {allOrder, userOrders, placeOrder, updateStatus}