

import mongoose from "mongoose";
import {DB_Name} from "../constants.js";


const DB_connection = async()=>{
    try{
        const ConnectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`);
    console.log(`\n mongodb connection successful:)!! connection host :${ConnectionInstance.connection.host}`);
    }
    catch(error){
        console.log(`Mongodb connection error ${error}`);
        console.log(`${process.env.MONGODB_URI}`)
        process.exit(1)
    }
}
export  default DB_connection 