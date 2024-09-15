import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import ArtRouter from "./routes/ArtRoute.js"

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

app.get("/",(req,res)=>{
    res.send("API working")
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})

//mongodb+srv://sanketwalhekar83:<db_password>@cluster0.sevwc.mongodb.net/?