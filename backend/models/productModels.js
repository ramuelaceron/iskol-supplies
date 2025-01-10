import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {type:String, required:true},
    price: {type: Number, required:true},
    description: {type:String, required:true},
    image: {types:Array, required: true},
    category: {type:String, required: true},
    choice: {types:Array, required:true},
    bestProduct: {type:Boolean},
    date: {type:Number, required:true},
})

const productModel = mongoose.models.product || mongoose.model('product', productSchema);

export default productModel