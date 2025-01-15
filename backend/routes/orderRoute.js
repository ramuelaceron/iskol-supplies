import express from 'express'
import {allOrder, userOrders, placeOrder, updateStatus} from '../controllers/orderControllers.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

// Admin Features
orderRouter.post('/list', adminAuth, allOrder)
orderRouter.post('/status', adminAuth, updateStatus)

// Payment Features
orderRouter.post('/place', authUser, placeOrder)

// User feature
orderRouter.post('/userorders', authUser, userOrders)

export default orderRouter