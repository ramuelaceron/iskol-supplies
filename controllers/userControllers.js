import validator from "validator";
import userModel from "../models/userModels.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createToken = (id)=> {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

const loginUser = async (req,res) => {

    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({email});
        if (!user) {
            return res.status(404).json({error: "User not found"})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = createToken(user._id);
            res.json({success:true, message:"Login Successfully", token})
        }
        else{
            res.json({success:false, message:"Incorrect password entered"})
        }

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

const registerUser = async (req,res) => {
    
    try {
        const {name, email, password} = req.body;

        // check if user exist already
        const exists = await userModel.findOne({email});
        if (exists) {
            return res.status(400).json({message: "User already exist"})
        }

        if (!validator.isEmail(email)){
            return res.status(400).json({sucess: false, message: "Invalid email address"})
        }
        if (password.length < 8){
            return res.status(400).json({sucess: false, message: "Please enter strong password"})
        }

        // hash user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // create user
        const newUser = new userModel({
            name, email, password: hashedPassword
        })

        const user = await newUser.save();
        const token = createToken(user._id)
        res.json({sucess: true, message:"Account created successfully", token})

        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

const adminLogin = async(req,res) => {

    try {
        const {email, password} = req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success:true, token})
        } else {
            res.json({success:false, message: 'Invalid details'})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

export {loginUser, registerUser, adminLogin}