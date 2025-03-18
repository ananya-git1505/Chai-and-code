import dotenv from "dotenv";
import {DB_Name} from "./constants.js";
import DB_connection from "./db/index.js";
import {app} from "./app.js"
dotenv.config({
    path:'./public/.env'
});
DB_connection()
 .then(()=>{
  app.listen(process.env.PORT||4000,()=>{
console.log(`server is running at${process.env.PORT}`)
  })
})
.catch((err)=>{
  console.log("error:",err);
})
/*import express from "express"
const app = express();

(async()=>{
  try{
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`)
    app.on("error",(error)=>{
         console.log("err:",error);
         throw error
    })
    app.listen(process.env.PORT,()=>{
        console.log("app is listening on:","${process.env.PORT}");
    })
  } 
  catch(err){
    console.log("ERROR:",err)
  } 
})()*/


