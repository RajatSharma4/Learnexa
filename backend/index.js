import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/connectDb.js'
import cookieParser from 'cookie-parser'
import authRouter from './route/authRoute.js'
import cors from 'cors'
import userRouter from './route/userRoute.js'
import courseRouter from './route/courseRoute.js'
import paymentRouter from './route/orderRoute.js'
import reviewRouter from './route/reviewRoute.js'
import { generate } from './chatbot.js'
dotenv.config()

const port = process.env.PORT
const app = express()

//middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"https://learnexa-1.onrender.com",
    // origin: "http://localhost:5173",
    credentials:true
}))

//routes
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/course", courseRouter)
app.use("/api/order", paymentRouter)
app.use("/api/review", reviewRouter)

app.post('/api/chat', async (req, res) => {
  try {
    const { message, threadId } = req.body;

    if (!message || !threadId) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const result = await generate(message, threadId);

    res.json({ message: result });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
});

// app.get("/", (req,res)=>{
//     res.send("Hello from server")
// })

app.listen(port, ()=>{
    console.log("Server Started");
    connectDb()
    
})
