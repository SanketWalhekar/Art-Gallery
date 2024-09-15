import mongoose from "mongoose";

export const connectDB=async()=>
{
    await mongoose.connect('mongodb+srv://sanketwalhekar83:9665998329@cluster0.sevwc.mongodb.net/project_art').then(()=>console.log("DB Connected"));
}