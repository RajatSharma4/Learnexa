import express from 'express'
import { googleAuth, Login, Logout, resetPassword, sendOTP, SignUp, verifyOTP } from '../controller/authController.js'

const authRouter = express.Router()

authRouter.post("/signup", SignUp)
authRouter.post("/login", Login)
authRouter.get("/logout", Logout)


//Change Password routes
authRouter.post("/sendotp", sendOTP)
authRouter.post("/verifyotp", verifyOTP)
authRouter.post("/resetpassword", resetPassword)
authRouter.post("/googleauth", googleAuth)

export default authRouter