import express from "express";
import cookieParser, { signedCookie } from "cookie-parser";
import cors from "cors";
const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    Credential:true
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true},{limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser()) 

// userroute import
import userRouter from './routes/user.routes.js'

//declaration of middlewares for routing 

app.use("/users",userRouter)

export {app}