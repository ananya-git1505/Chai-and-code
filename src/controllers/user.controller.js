import {async_handler} from "../utils/asynchandler.js"
import {ApiError} from "../utils/api_error.js"
import { User } from "../models/user.models.js"
import {cloudinaryUpload } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/api_response.js"



const registerUser = async_handler(async(req ,res)=>{ 
    
 
        const {fullname,email,password,username } = req.body
        
       if(
        [fullname,email,password,username].some((field)=>field?.trim()==="")  //{} braces nhi lagaya hai isliye return nhi likhna hoga
    ){
        throw new ApiError(400,"ALL fields are required")
    }
    const existedUser = await User.findOne(
        { email}
        
    )
    
    console.log("hii")
   

    if(existedUser){
        throw new ApiError(409,"User with similar name or email already exist")
    }
        const avatarLocalPath= req.files?.avatar[0]?.path
        console.log(avatarLocalPath)
        const coverImageLocalPath= req.files?.coverImager[0]?.path
    if(!avatarLocalPath){
        throw new ApiError(400," Avatar file is required")
    }
     const avatar = await cloudinaryUpload(avatarLocalPath)
     const coverImage = await cloudinaryUpload(coverImageLocalPath)
     if(!avatar){
        throw new ApiError(400," Avatar file is required")
     }
       console.log(avatar.url)
       console.log(coverImage.url)
      const user = await User.create({
        fullname,
        email,
        password,
        username:username.toLowerCase(),
        avatar:avatar.url,
        coverImage:coverImage?.url||""
     })
       const createdUser = await User.findOne(user._id).select(
        "-password -refreshToken"
     )

     if(!createdUser){
        throw new ApiError(500,"something went wrong while registering the user")
     }

     return res.status(201).json(
        new ApiResponse(200,createdUser,"user created successfully")
      )

    res.status(200).json({
        message:"User Register Successfully"
})
})

export {registerUser}