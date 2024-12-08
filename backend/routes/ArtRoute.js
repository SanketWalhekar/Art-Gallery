import express from "express";
import { addArtItem, artfetchlist, artlist,removeArt } from "../controllers/artController.js";
import multer from "multer"

const ArtRouter=express.Router();

//Image Storage Engine


const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }

})

const upload =multer({storage:storage})

ArtRouter.post("/add",upload.single("image"),addArtItem)

ArtRouter.get("/list/:id",artlist)

ArtRouter.get("/list",artfetchlist)


ArtRouter.post("/remove",removeArt);
export default ArtRouter;