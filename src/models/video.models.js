import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const VideoSchema = new mongoose.Schema({
   videoFile:{
    type:String,
    require:true
   },
   thumbnail:{
    type:String,
    require:true
   },
   description:{
    type:String,
    require:true
   },
   title:{
    type:String,
    require:true
   },
   Owner:{
    type:Schema.Types.ObjectId,
    ref:User
   },
   Duration:{
    type:Number,
    require:true
   },
   views:{
    type:Number,
    default:0
   },
   ispublished:{
    type:Boolean,
    default:true
   }
},{
  timestamps:true  
})
VideoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video",VideoSchema)