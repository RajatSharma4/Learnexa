import React, { useState } from 'react'
import axios from 'axios'
import { serverUrl } from '../App';
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../redux/userSlice';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';


const EditProfile = () => {
    const navigate = useNavigate()
    const { userData } = useSelector(state => state.user)
    const [name, setName] = useState(userData.name || "")
    const [description, setDescription] = useState(userData.description || "")
    const [photoUrl, setPhotoUrl] = useState(null)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()



    const handleEditProfile = async () => {
        setLoading(true)
        const formData = new FormData()
        formData.append("name", name)
        formData.append("description", description)
        if (photoUrl) {
            formData.append("photoUrl", photoUrl)
        }
        try {
            const result = await axios.post(serverUrl + "/api/user/profile", formData, { withCredentials: true })
            dispatch(setUserData(result.data))
            setLoading(false)
            navigate("/")
            toast.success("Profile Updated")
        } catch (error) {
            setLoading(false)
            console.log(error);
            toast.error(error.response.data.message)

        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center px-4 py-10 bg-gray-100'>
            <div className='bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full relative'>
                <FaArrowLeft className='absolute top-[8%] w-5.5 h-5.5 cursor-pointer' onClick={() => navigate("/profile")} />

                <h2 className='text-2xl font-bold text-center text-gray-800 mb-6'>Edit Profile</h2>

                <form action="" className='space-y-5' onSubmit={(e) => e.preventDefault()}>
                    <div className='flex flex-col items-center text-center'>

                        {userData?.photoUrl && userData.photoUrl.trim() !== "" ? (

                            <img
                                src={userData.photoUrl}
                                className='w-24 h-24 rounded-full object-cover border-4 border-black'
                                alt="profile"
                            />

                        ) : (

                            <div className='w-24 h-24 rounded-full text-white flex items-center justify-center text-[30px] border-2 bg-black border-white'>
                                {userData?.name?.charAt(0)?.toUpperCase() || "U"}
                            </div>

                        )}

                    </div>

                    {/* for picture */}
                    <div>
                        <label htmlFor="image" className='text-sm font-medium text-gray-700 '>Select Avatar</label>
                        <input id='image' type="file" name='photoUrl' placeholder='photoUrl' accept='image/*' className='w-full px-4 py-2 border rounded-md text-sm'
                            onChange={(e) => {
                                const file = e.target.files[0]

                                if (file.size > 2 * 1024 * 1024) {
                                    alert("Image must be under 2MB")
                                    return
                                }

                                setPhotoUrl(file)
                            }
                            } />
                    </div>

                    {/* for Usrname */}
                    <div>
                        <label htmlFor="name" className='text-sm font-medium text-gray-700 '>UserName</label>
                        <input id='name' type="text" placeholder={userData.name} className='w-full px-4 py-2 border rounded-md text-sm'
                            onChange={(e) => setName(e.target.value)} value={name} />
                    </div>

                    {/* for email */}
                    <div>
                        <label className='text-sm font-medium text-gray-700 '>Email</label>
                        <input readOnly id='email' type="email" placeholder={userData.email} className='w-full px-4 py-2 border rounded-md text-sm' />
                    </div>

                    {/* for textArea */}
                    <div>
                        <label className='text-sm font-medium text-gray-700 '>Bio</label>
                        <textarea rows={3} name='description' placeholder='Tell Us About Yourself' className='w-full mt-1 px-4 py-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-[black]'
                            onChange={(e) => setDescription(e.target.value)} value={description}
                        />
                    </div>

                    <button disabled={loading} className='w-full bg-black active:bg-[#454545] text-white py-2 rounded-md font-medium transition cursor-pointer' onClick={handleEditProfile}>{loading ? <ClipLoader size={30} color='white' /> : "Save Changes"}</button>

                </form>
            </div>

        </div>
    )
}

export default EditProfile
