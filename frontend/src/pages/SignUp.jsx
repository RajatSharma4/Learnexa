import React from 'react'
import Logos from '../assets/Logos.png'
import google from '../assets/google.jpg'
import { IoEyeOutline } from "react-icons/io5"
import { IoEyeSharp } from "react-icons/io5";
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { serverUrl } from '../App';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners'
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { auth, provider } from '../../utils/firebase';
import { signInWithPopup } from 'firebase/auth'
import { FaArrowLeft } from "react-icons/fa";


const SignUp = () => {

    const [show, setShow] = useState(false)
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("student")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()


    const handleSignup = async () => {
        setLoading(true)
        try {
            const result = await axios.post(serverUrl + "/api/auth/signup", { name, email, password, role }, { withCredentials: true })
            dispatch(setUserData(result.data))
            setLoading(false)
            navigate("/login")
            toast.success("SignUp Succesfully")

        } catch (error) {
            console.log(error);
            setLoading(false)
            toast.error(error.response.data.message)

        }
    }

    const googleSignup = async () => {
        try {
            const response = await signInWithPopup(auth, provider)
            let user = response.user
            let name = user.displayName
            let email = user.email

            const result = await axios.post(serverUrl + "/api/auth/googleauth", { name, email, role }, { withCredentials: true })
            dispatch(setUserData(result.data))
            navigate("/")
            toast.success("SignUp Succesfully")

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)


        }


    }

    return (
        <div className='bg-[#dddbdb] w-screen min-h-screen flex justify-center items-center p-4'>

            <form className='w-full max-w-4xl bg-white shadow-xl rounded-2xl flex flex-col md:flex-row' onSubmit={(e) => e.preventDefault()}>

                {/* Left div */}
                <FaArrowLeft className='text-[40px] cursor-pointer px-2 py-2' onClick={() => navigate("/")} />

                <div className='w-full md:w-1/2 flex flex-col items-center justify-center gap-3 py-8'>

                    <div className='text-center'>
                        <h1 className='font-semibold text-black text-2xl'>Let's get Started</h1>
                        <h2 className='text-[#999797] text-[18px]'>Create your Account</h2>
                    </div>

                    {/* Name */}
                    <div className='flex flex-col gap-1 w-[85%]'>
                        <label htmlFor="name" className='font-semibold'>Name</label>
                        <input
                            type="text"
                            id='name'
                            className='border w-full h-10 border-[#e7e6e6] text-[15px] px-4 rounded'
                            placeholder='Enter Your Name'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>

                    {/* Email */}
                    <div className='flex flex-col gap-1 w-[85%]'>
                        <label htmlFor="email" className='font-semibold'>Email</label>
                        <input
                            type="email"
                            id='email'
                            className='border w-full h-10 border-[#e7e6e6] text-[15px] px-4 rounded'
                            placeholder='Enter Your Email'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>

                    {/* Password */}
                    <div className='flex flex-col gap-1 w-[85%] relative'>
                        <label htmlFor="password" className='font-semibold'>Password</label>
                        <input
                            type={show ? "text" : "password"}
                            id="password"
                            className='border w-full h-10 border-[#e7e6e6] text-[15px] px-4 pr-10 rounded'
                            placeholder='Enter Your Password'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        {!show ?
                            <IoEyeOutline className='absolute right-3 top-9 text-xl text-gray-500 cursor-pointer' onClick={() => setShow(prev => !prev)} /> :
                            <IoEyeSharp className='absolute right-3 top-9 text-xl text-gray-500 cursor-pointer' onClick={() => setShow(prev => !prev)} />}
                    </div>

                    {/* Role */}
                    <div className='flex w-[85%] items-center justify-around'>
                        <span className={`px-3 py-1 border-2 border-[#e7e6e6] rounded-xl cursor-pointer hover:border-black ${role === "student" ? "border-black" : "border-[#646464]"}`}
                            onClick={() => setRole("student")}
                        >
                            Student
                        </span>
                        <span className={`px-3 py-1 border-2 border-[#e7e6e6] rounded-xl cursor-pointer hover:border-black ${role === "educator" ? "border-black" : "border-[#646464]"}`}
                            onClick={() => setRole("educator")}
                        >
                            Educator
                        </span>
                    </div>

                    {/* Button */}
                    <button className='w-[85%] h-10 bg-black text-white rounded-md cursor-pointer' onClick={handleSignup} disabled={loading}>
                        {loading ? <ClipLoader size={30} color='white' /> : "SignUp"}
                    </button>

                    {/* Divider */}
                    <div className='w-[85%] flex items-center gap-2'>
                        <div className='flex-1 h-px bg-[#c4c4c4]'></div>
                        <span className='text-[15px] text-[#6f6f6f]'>or continue</span>
                        <div className='flex-1 h-px bg-[#c4c4c4]'></div>
                    </div>

                    {/* Google */}
                    <div className='w-[85%] h-10 border border-black rounded-md flex items-center justify-center cursor-pointer' onClick={googleSignup}>
                        <img src={google} className='w-6' alt="google" />
                        <span className='text-[18px] text-gray-500'>oogle</span>
                    </div>

                    <div className='text-[#6f6f6f]'> Already have an Account ?
                        <span className='underline underline-offset-1 text-black cursor-pointer' onClick={() => navigate("/login")}>Login</span>
                    </div>
                </div>

                {/* Right div */}
                <div className='hidden md:flex w-1/2 bg-black rounded-r-2xl items-center justify-center flex-col gap-4'>
                    <img src={Logos} alt="logo" className='w-72 shadow-2xl' />
                    <span className='text-4xl text-white tracking-wide'>LEARNEXA</span>
                </div>

            </form>
        </div>
    )
}

export default SignUp
