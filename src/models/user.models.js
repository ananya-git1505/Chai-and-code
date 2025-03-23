import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const UserSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        index:true,
        trim:true
    },
    email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            index:true,
            trim:true
        
    },
    fullname:{
        type:String,
        required:true,
        index:true
    },
    avatar:{
        type:String,//store at cloud ,url of image is here
        required:true

    },
    coverImage:{
        type:String
    },
    watchHistory:[{
        type:Schema.Types.ObjectId,
        ref:"Video"
    }
],
    password:{
        type:String,
        required:[true,"password is required"]
    },
    refreshToken:{
        type:String

    }
},{
    timestamps:true
})
UserSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    this.password =  await bcrypt.hash(this.password,10)
})
 UserSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password,this.password)//return boolean

}  
UserSchema.methods.generateAccessToken = function(){
   return jwt.sign(
        {
            _id:this._id,
            email:this.email,
           username:this.username,
           fullname:this.fullname 
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
UserSchema.methods.generateRefreshToken = function(){
   return  jwt.sign(
        {
            _id:this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User",UserSchema)