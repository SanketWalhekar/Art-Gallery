import mongoose from "mongoose";

const artistSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    
})

export default mongoose.model("Artist", artistSchema);
