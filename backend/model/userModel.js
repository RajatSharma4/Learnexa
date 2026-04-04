import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false,
        unique: true
    },
    description: {
        type: String
    },
    role: {
        type: String,
        enum: ["student", "educator"],
        required: true
    },
    photoUrl: {
        type: String,
        default: ""
    },
    enrolledCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"

    }],
    resetOtp:{
        type:String
    },
    otpExpires:{
        type:Date
    },
    isOtpVerified:{
        type:Boolean,
        default:false
    }

}, {timestamps: true})

const User = mongoose.model("User", userSchema)
export default User