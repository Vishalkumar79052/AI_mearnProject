import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/connectDb.js'
dotenv.config()
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRouter from './routes/auth.route.js'
import helmet from "helmet";
import userRouter from './routes/user.route.js'
import interviewRouter from './routes/interview.route.js'
import paymentRouter from './routes/payment.route.js'

// app.use(helmet());

const app = express()

app.use(
  helmet({
    crossOriginOpenerPolicy: false,   // 🔥 MUST be false
    crossOriginEmbedderPolicy: false, // 🔥 also disable this
  })
);

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3000"
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true
}))

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRouter)

app.use("/api/user", userRouter)

app.use("/api/interview", interviewRouter)

app.use("/api/payment", paymentRouter)

const PORT = process.env.PORT



// app.get("/",(req , res) =>{
//     return res.json({message:"Server Started"})
// })

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
  connectDb()
})