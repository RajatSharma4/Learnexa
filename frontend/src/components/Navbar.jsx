import React, { useState } from 'react'
import Logos from '../assets/Logo.png'
import { IoPersonCircleSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import { toast } from 'react-toastify';
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";

const Navbar = () => {

    const { userData } = useSelector(state => state.user)
    // console.log(userData);

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const [showHam, setShowHam] = useState(false)

    const handleLogOut = async () => {
        try {
            const result = await axios.get(
                serverUrl + "/api/auth/logout",
                { withCredentials: true }
            )
            dispatch(setUserData(null))
            toast.success("Logout Successfully")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div className='w-full h-17.5 fixed top-0 px-5 py-2.5 flex items-center justify-between bg-[#00000076] z-10'>

                {/* Logo */}
                <div className='lg:w-[20%] w-[40%] lg:pl-12.5 cursor-pointer' onClick={()=>navigate("/")}>
                    <img
                        src={Logos}
                        alt="logo"
                        className='w-15 rounded-[5px] border-2 border-black shadow-amber-50'
                    />
                </div>

                {/* Desktop Right Section */}
                <div className='w-[30%] lg:flex items-center justify-center gap-4 hidden'>

                    {!userData ? (
                        <IoPersonCircleSharp
                            className='w-12 h-12 fill-white cursor-pointer border border-black'
                            onClick={() => setShow(prev => !prev)}
                        />
                    ) : userData.photoUrl ? (
                        <img
                            src={userData.photoUrl}
                            className='w-12 h-12 rounded-full cursor-pointer border border-black'
                            onClick={() => setShow(prev => !prev)}
                        />
                    ) : (
                        <div
                            className='w-12 h-12 rounded-full bg-black text-white
        flex items-center justify-center cursor-pointer border border-black'
                            onClick={() => setShow(prev => !prev)}
                        >
                            {userData.name?.slice(0, 1).toUpperCase()}
                        </div>
                    )}

                    {/* Dashboard */}
                    {userData?.role === "educator" && (
                        <div className='px-5 py-2.5 border-2 border-white
                        text-white bg-black rounded-[10px]
                        text-[18px] font-light cursor-pointer' onClick={() => navigate("/dashboard")}>
                            Dashboard
                        </div>
                    )}

                    {/* Login / Logout */}
                    {!userData ? (
                        <span
                            className='px-5 py-2.5 border-2 border-white text-white
                            rounded-[10px] text-[18px] font-light cursor-pointer bg-[#000000d5]'
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </span>
                    ) : (
                        <span
                            className='px-5 py-2.5 bg-white text-black
                            rounded-[10px] shadow-sm shadow-black
                            text-[18px] cursor-pointer'
                            onClick={handleLogOut}
                        >
                            LogOut
                        </span>
                    )}

                    {/* Profile Dropdown */}
                    {show && (
                        <div className='absolute top-[110%] right-[15%]
                        flex flex-col items-center gap-2
                        text-[16px] rounded-md bg-white
                        px-3.75 py-2.5 border-2 border-black
                        cursor-pointer hover:bg-black'>
                            <span className='bg-black text-white px-7.5 py-2.5 rounded-2xl hover:bg-gray-600 border-2 hover:border-white' onClick={() => navigate("/profile")}>
                                My Profile
                            </span>
                            <span className='bg-black text-white px-7.5 py-2.5 rounded-2xl hover:bg-gray-600 border-2 hover:border-white' onClick={()=>navigate("/mycourses")}>
                                My Courses
                            </span>
                        </div>
                    )}
                </div>

                {/* Hamburger */}
                <GiHamburgerMenu
                    className='w-7.5 h-7.5 lg:hidden fill-white cursor-pointer'
                    onClick={() => setShowHam(prev => !prev)}
                />

                {/* Mobile Slider */}
                <div
                    className={`fixed top-0 left-0 h-screen w-screen
                    bg-[#000000d6] flex items-center justify-center
                    flex-col gap-5 z-10 lg:hidden
                    ${showHam ? "translate-x-0" : "-translate-x-full"}
                    transition duration-500`}
                >
                    <RxCross1
                        className='w-8.75 h-8.75 absolute text-white top-5 right-[4%]'
                        onClick={() => setShowHam(prev => !prev)}
                    />

                    {!userData && (
                        <IoPersonCircleSharp className='w-12 h-12 fill-white cursor-pointer' />
                    )}

                    {userData?.photoUrl ? <img src={userData.photoUrl} className='w-12 h-12 rounded-full bg-black text-white
                        border-2 border-white shadow-md
                        flex items-center justify-center text-[20px] cursor-pointer'/> : (
                        <div className='w-12 h-12 rounded-full bg-black text-white
                        border-2 border-white shadow-md
                        flex items-center justify-center text-[20px] cursor-pointer'>
                            {userData?.name.slice(0, 1).toUpperCase()}


                        </div>

                    )}

                    <div className='w-50 h-15 border-2 border-white flex items-center justify-center
                        text-white bg-black rounded-[10px]
                        text-[18px] font-light cursor-pointer' onClick={() => navigate("/profile")}>
                        My Profile
                    </div>

                    <div className='w-50 h-15 border-2 border-white flex items-center justify-center
                        text-white bg-black rounded-[10px]
                        text-[18px] font-light cursor-pointer'  onClick={()=>navigate("/mycourses")}>
                        My Courses
                    </div>

                    {userData?.role === "educator" && (
                        <div className='w-50 h-15 border-2 border-white  flex items-center justify-center
                        text-white bg-black rounded-[10px]
                        text-[18px] font-light cursor-pointer' onClick={() => navigate("/dashboard")}>
                            Dashboard
                        </div>
                    )}

                    {!userData ? (
                        <span
                            className='w-50 h-15 border-2 border-white  flex items-center justify-center
                        text-white bg-black rounded-[10px]
                        text-[18px] font-light cursor-pointer'
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </span>
                    ) : (
                        <span
                            className='w-50 h-15 border-2 border-white  flex items-center justify-center
                        text-white bg-black rounded-[10px]
                        text-[18px] font-light cursor-pointer'
                            onClick={handleLogOut}
                        >
                            LogOut
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar
