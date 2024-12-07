import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import ArtRouter from "./routes/ArtRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import artistRouter from "./routes/artistRouter.js"
import LoginRouter from "./routes/loginRouter.js"
import RegisterRouter from "./routes/RegisterRoute.js"

//App Config
const app=express()
const port=4000

//middleware
app.use(express.json())
app.use(cors())

//db connection

connectDB();

//API endpoints

app.use("/api/Art_data",ArtRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
app.use("/api/artists", artistRouter)
app.use("/api/login",LoginRouter);
app.use("/api/register",RegisterRouter);



app.get("/",(req,res)=>{
    res.send("API working")
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})
