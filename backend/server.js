import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';
import path from 'path';


dotenv.config();
const app=express();
const port=process.env.PORT || 5000; //using or if you forget to give the val in .env file

const __dirname=path.resolve();

app.use(express.json()); //allows us to accept json data in the req.body

app.use("/api/products",productRoutes);

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"/frontend/dist")));

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
    });
}

app.listen(port, ()=>{
    connectDB();
    console.log("server is at port 5000 ");
});

//bIpOzuvpNyWEVs55
//https://www.chakra-ui.com/
