import express from 'express';
import { getArtistById, updateArtistById } from '../controllers/profileupdate.js';

const profilerouter = express.Router();

import multer from "multer"



const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }

})

const upload =multer({storage:storage})


// Route to get artist by ID
profilerouter.get('/info/:id', getArtistById);

// Route to update artist by ID
profilerouter.put('/update/:id', upload.single("profilePicture"),updateArtistById);

export default profilerouter;