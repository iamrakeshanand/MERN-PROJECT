import Product from "../models/product.js";
import mongoose from 'mongoose';

export const getproducts= async(req,res)=>{
    try{
        const products=await Product.find({});
        res.status(200).json({success:true, data:products});
    }
    catch(error){
        console.log("ERROR IN FETCHING PRODUCTS", error.message);
        res.status(500).json({success:false, message:"Server Error"});
    }
}

export const createproduct=async (req,res)=>{
    const product=req.body; //user will send this data

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success:false, message:"provide all fields"});
    }

    const newproduct= new Product(product);

    try{
        await newproduct.save();
        res.status(201).json({success:true, data:newproduct});
    }
    catch(error){
        console.error("Error in create product:", error.message);
        res.status(500).json({success:false, message:"Server Error"});
    }
}

export const updateprod=async (req,res)=>{
    const {id}=req.params;
    const product=req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"Invalid prod id"});
    }

    try{
        const updatedprod=await Product.findByIdAndUpdate(id,product,{new:true});
        res.status(200).json({success:true,data:updatedprod})

    }
    catch(error){
        console.log("ERROR IN UPDATING PRODUCTS", error.message);
        res.status(500).json({success:false, message:"Server Error"});
    }
}

export const delprod=async (req,res)=>{
    const {id}=req.params;
    
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true, message:"Product deleted"});
    }
    catch(error){
        console.log("ERROR IN DEL THE PROD",error.message);
        res.status(404).json({success:false, message:"Product not found"});
    }
}