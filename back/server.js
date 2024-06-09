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
        return cb(null,`${file.fieldname}_${Date.now}${path.extname(file.originalname)}`)
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

app.post("/addProduct",upload.single("image"),async(req,res)=>{
    const product = new Product({
        id : req.body.id,
        name : req.body.name,
        category : req.body.category,
        new_price : req.body.new_price,
        old_price : req.body.old_price,
        avalible : req.body.avalible,
        image : req.file.filename
    })
    console.log(product)
    await product.save()
    console.log("Saved")
    return res.json({
        success:true,
        message:"Product Added Successfully"
    })
})