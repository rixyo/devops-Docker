const express=require("express");
const {MONGO_IP, MONGO_PORT,MONGO_USER,MONGO_PASSWORD}=require("./config/config")

require("dotenv").config()
const connectDB=require("./DB/connect");

const app=express()
const port=process.env.PORT|| 5000;
app.get("/",(req,res)=>{
    res.send("<h1>Home page</h1>")
})
const Start=async()=>{
    try {
        await connectDB(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`)
        //console.log(process.env.MONGO_URI)
        app.listen(port,()=>{
            console.log(`Server is listening on port ${port}`)
        })
        
    } catch (error) {
        console.log(error)
        setTimeout(Start,5000)
        
    }
 
}

Start()