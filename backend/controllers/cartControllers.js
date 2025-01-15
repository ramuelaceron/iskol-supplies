import userModel from "../models/userModels.js"


const addToCart = async (req, res) => {

    try {
        const {userId, ItemId, optionValues} = req.body

        const userData = await userModel.findById(userId)

        let cartData = await userData.cartData

        if(!userData){
            return res.status(404).json({success:false, message: "User not found"})
        }

        if (cartData[ItemId]){
            if(cartData[ItemId][optionValues]){
                cartData[ItemId][optionValues] += 1;
            } else {
                cartData[ItemId][optionValues] = 1;
            }
        } else {
            cartData[ItemId] = { [optionValues]: 1 }
        }

        await userModel.findByIdAndUpdate(userId, {cartData})

        res.json({success: true, message: "Product added to cart"})
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }

}

const updateCart = async (req, res) => {
    
    try {
        const { userId, ItemId, optionValues, quantity } = req.body;

        const userData = await userModel.findById(userId)

        let cartData = await userData.cartData

        cartData[ItemId][optionValues] = quantity;

        await userModel.findByIdAndUpdate(userId, {cartData})

        res.json({success:true, message: "Cart Updated"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }

}

const getUserCart = async (req, res) => {
    
    try {
        const {userId} = req.body;
        
        const userData = await userModel.findById(userId);

        if(!userData){
            return res.json({success:false, message:"User not found"})
        }

        const cartData = userData.cartData

        res.json({success:true, cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message})
    }

}

export {addToCart, updateCart, getUserCart}