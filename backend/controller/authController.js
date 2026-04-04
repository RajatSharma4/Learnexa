import validator from 'validator'
import bcrypt from 'bcryptjs'
import User from "../model/userModel.js"
import { genToken } from '../config/token.js'
import sendMail from '../config/sendMail.js'

export const SignUp = async (req, res) => {
    try {

        const { name, email, password, role } = req.body
        let existUser = await User.findOne({ email })
        if (existUser) {
            return res.status(400).json({ message: "User Already exist" })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Enter Valid email" })
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Enter Strong password" })
        }
        let hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        })

        let token = await genToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(201).json(user);


    } catch (error) {
        return res.status(500).json({ message: `SignUp error ${error}` })
    }
}

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        let isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect Password" })
        }

        let token = await genToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        // console.log(user);

        return res.status(200).json(user)

    } catch (error) {
        return res.status(500).json({ message: `Login error ${error}` })
    }
}

export const Logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "lax",
            secure: false
        })
        return res.status(200).json({ message: "Logout Succesfully" })
    } catch (error) {
        return res.status(500).json({ message: `Logout error ${error}` })
    }
}

export const sendOTP = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email })
        console.log(user);

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const otp = Math.floor(1000 + Math.random() * 9000).toString()

        user.resetOtp = otp
        user.otpExpires = Date.now() + 5 * 60 * 1000
        user.isOtpVerified = false

        await user.save()
        await sendMail(email, otp)

        return res.status(200).json({ message: "Otp sent successfully" })
    } catch (error) {
        console.log("FULL ERROR:", error);
        return res.status(500).json({ message: "Otp sending failed" });

    }
}

export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body
        const user = await User.findOne({ email })
        if (!user || user.resetOtp != otp || user.otpExpires < Date.now()) {
            return res.status(404).json({ message: "Invalid OTP" })
        }

        user.isOtpVerified = true
        user.resetOtp = undefined
        user.otpExpires = undefined

        await user.save()

        return res.status(200).json({ message: "OTP verified successfully" })


    } catch (error) {
        return res.status(500).json({ message: `OTP verification error ${error}` })

    }
}

export const resetPassword = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user || !user.isOtpVerified) {
            return res.status(404).json({ message: "OTP verification is required" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        user.password = hashedPassword,
            user.isOtpVerified = false

        await user.save()

        return res.status(200).json({ message: "Reset Password successfull" })


    } catch (error) {
        return res.status(500).json({ message: `Reset password error ${error}` })

    }
}


export const googleAuth = async (req,res) => {
   try {
     const {name, email, role} = req.body
    let user = await User.findOne({email})
    if(!user){
        user = await User.create({
            name,
            email,
            role
        })
    }
       let token = genToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json(user)
   } catch (error) {
        return res.status(500).json({ message: `Google Authentication error ${error}` })
    
   }
    
}




