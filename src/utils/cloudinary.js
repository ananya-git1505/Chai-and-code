import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const cloudinaryUpload = async(LocalFilePath)=>{
    try{
        if(!LocalFilePath) return null;
           const response= await cloudinary.uploader.upload(LocalFilePath,{
        resource_type:"auto"
     })
     console.log("File has been uploaded successfully",response.url)
     return response ;    
    }
    catch(err){
        fs.unlinkSync(LocalFilePath)
        
        return null;

    }
}


export {cloudinaryUpload }

