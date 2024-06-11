const express = require("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const multer = require("multer")
const path = require("path")
const cors = require("cors")
const { type } = require("os")

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static("upload"))

const key = "48d2cf6bb0d3e4765aebcddee223ef660ae880ad1cbc4978c5c24252e8e5d225"
//Database Connection
const connectMongoDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://srisankar2001:ABc20011112@cluster0.fbizpdl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/e-commerce")
        console.log("MongoDB connected Successfully")
        app.listen(3001, (err) => {
            if (err) {
                console.log("Server Running Error")
            } else {
                console.log("Server Running Successfully")
            }
        })
    }
    catch (err) {
        console.log("MongoDB connection Error")
    }
}
connectMongoDB()


//Image Storage 
const storage = multer.diskStorage({
    destination: "./upload/images",
    filename: (req,file,cb) => {
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage
})

//Schema for Creating Product
const ProductSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    new_price:{
        type: Number,
        required: true
    },
    old_price:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    avalible:{
        type: Boolean,
        default: true
    },
})
const Product = mongoose.model("Product",ProductSchema)

//Insert Product
app.post("/addproduct",upload.single("image"),async(req,res)=>{
    let products = await Product.find({})
    let id
    if(products.length > 0){
        let last_product_array = products.slice(-1)
        let last_product = last_product_array[0]
        id = last_product.id+1
    }else{
        id = 1
    }
    const product = new Product({
        id : id,
        name : req.body.name,
        category : req.body.category,
        new_price : req.body.new_price,
        old_price : req.body.old_price,
        avalible : req.body.avalible,
        image : req.file.filename
    })
    await product.save()
    return res.json({
        success:true,
        name: req.body.name
    })
})

//Delete Product
app.post("/removeproduct",async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id})
    res.json({
        success:true,
        name: req.body.name
    })
})

//Get All Product
app.get("/allproducts",async(req,res)=>{
    let products = await Product.find({})
    res.send(products)
})

//Get New Product
app.get("/newcollection",async(req,res)=>{
    let products = await Product.find({})
    let newCollection = products.slice(1).slice(-8)
    res.send(newCollection)
})

//Get Popular Product
app.get("/popularinwomen",async(req,res)=>{
    let products = await Product.find({category:"women"})
    let popular = products.slice(0,4)
    res.send(popular)
})

//creating middleware to fetchuser
const fetchUser = async(req,res,next)=>{
    const token = req.header("token")
    if(!token){
        return res.send({message:"Login first"})
    }else{
        try{
            const data = jwt.verify(token,key)
            req.user = data.user
            next()
        }catch(error){
            return res.send({message:"Error in verify token"})
        }
    }
}

//add to cart
app.post("/addtocart",fetchUser,async(req,res)=>{
    let user = await User.findOne({_id:req.user.id})
    user.cartData[req.body.itemId] += 1
    await User.findOneAndUpdate({_id:req.user.id},{cartData:user.cartData})
    res.send({message:"Product added Successfully"})
})

//remove from cart
app.post("/removefromcart",fetchUser,async(req,res)=>{
    let user = await User.findOne({_id:req.user.id})
    if(user.cartData[req.body.itemId] > 0)
    user.cartData[req.body.itemId] -= 1
    await User.findOneAndUpdate({_id:req.user.id},{cartData:user.cartData})
    res.send({message:"Product Removed Successfully"})
})

app.post("/getcart",fetchUser,async(req,res)=>{
    let user = await User.findOne({_id:req.user.id})
    res.send(user.cartData)
})

//Sechema for user
const userSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

const User = mongoose.model("User",userSchema)

// Register Api
app.post("/signup",async(req,res)=>{
    let check = await User.findOne({email:req.body.email})
    if(check){
        return res.json({success:false,message:"Email Already Exist"})
    }
    let cart = {}
    for (let i=0; i<300;i++){
        cart[i] = 0
    }
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })
    await user.save()
    
    const data = {
        user:{
            id:user.id
        }
    }

    const token = jwt.sign(data,key)
    res.json({success:true,token:token})
})

//Login Api
app.post("/login",async(req,res)=>{
    let user = await User.findOne({email:req.body.email})
    if(!user){
        return res.json({success:false,message:"Email Not Registed"})
    }else{
        if(req.body.password === user.password){
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,key)
            res.json({success:true,token:token})
        }else{
            return res.json({success:false,message:"Password is wrong"})
        }
    }
})