import exp from "constants";
import artModel from "../models/artModel.js";
import fs from'fs'

//add Art Item

const addArtItem= async (req,res)=>{

    let image_filename=`${req.file.filename}`;

    const art=new artModel({
        name:req.body.name,
        features:req.body.features,
        price:req.body.price,
        image:image_filename,
        category:req.body.category

    })
    try{
        await art.save();
        res.json({success:true, message:"Art Added"})

    }
    catch(error)
    {
        console.log(error)
        res.json({success:false,message:"Error"})

    }

}

// All Art Item

const artlist=async(req,res)=>{

    try{
        const arts=await artModel.find({});
        res.json({success:true,data:arts})

    }catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})

    }

}

//remove art item
const removeArt=async(req,res)=>{
    try {
        const art=await artModel.findById(req.body.id);
        fs.unlink(`uploads/${art.image}`,()=>{

        })
        await artModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Art Removed"})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})

        
    }

}
export {addArtItem,artlist,removeArt}
