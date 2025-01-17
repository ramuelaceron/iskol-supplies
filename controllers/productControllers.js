import {v2 as cloudinary} from "cloudinary"
import productModel from "../models/productModels.js";


const addProduct = async (req, res) => {
    try {

        const {name, price, description, category, productOption, optionValues, bestseller,} = req.body;

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0] 

        const images = [image1, image2, image3, image4].filter((item)=>item !==undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
                return result.secure_url
            })
        )

        const productData = {
            name,
            description, 
            price: Number(price),
            category,
            bestseller: bestseller === "true" ? true : false,
            productOption,
            optionValues: JSON.parse(optionValues),
            image: imagesUrl,
            date: Date.now()
        }

        const product = new productModel(productData)
        await product.save()

        res.json({success:true, message:'Product added succesfully'})

        // console.log(name, price, description, category, choices, bestseller)

        // res.json({})

    } catch (error) {
        res.json({success: false, message:error.message})
        console.log(error)        
    }

}


const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({})
        res.json({success:true, products})
    } catch (error) {
        console.log("Error:", error.message)
        res.json({success:false, message:error.message})
    }
}


const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body._id)  // change here if error occurs
        res.json({success:true, message: 'Product deleted'})

    } catch (error) {
        console.log("Error:", error.message)
        res.json({success:false, message:error.message})
    }
    
}

const singleProduct = async (req, res) => {
    try {
        const {productId} = req.body
        const product = await productModel.findById(productId)
        res.json({success:true, product})
    } catch (error) {
        console.log("Error:", error.message)
        res.json({success:false, message:error.message})
    }
    
}

export {addProduct, listProducts, removeProduct, singleProduct}