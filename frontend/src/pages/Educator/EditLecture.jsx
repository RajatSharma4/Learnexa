import React, { useState, useEffect } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import { serverUrl } from '../../App';
import { setLectureData } from '../../redux/lectureSlice';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

const EditLecture = () => {
    const { courseId, lectureId } = useParams()
    const { lectureData } = useSelector(state => state.lecture)

    const selectedLecture = lectureData?.find(
        lecture => lecture._id === lectureId
    )

    const navigate = useNavigate()

    const [lectureTitle, setLectureTitle] = useState("")
    const [videoUrl, setVideoUrl] = useState("") // now stores URL
    const [isPreviewFree, setIsPreviewFree] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loading1, setLoading1] = useState(false)
    const [uploadingVideo, setUploadingVideo] = useState(false) // State for video upload
    const [isVideoUploaded, setIsVideoUploaded] = useState(false) // Track if user uploaded a new video
    const dispatch = useDispatch()

    useEffect(() => {
        if (selectedLecture) {
            setLectureTitle(selectedLecture.lectureTitle)
            setIsPreviewFree(selectedLecture.isPreviewFree)
            setVideoUrl(selectedLecture.videoUrl || "")
            setIsVideoUploaded(false) // Reset when loading existing lecture
        }
    }, [selectedLecture])

    const uploadVideoToCloudinary = async (file) => {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET)

        try {
            setUploadingVideo(true) // Start uploading state
            const res = await axios.post(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/video/upload`,
                formData
            )
            console.log("Setting videoUrl:", res.data.secure_url)

            setVideoUrl(res.data.secure_url)
            setIsVideoUploaded(true) // Mark that a new video was uploaded
            toast.success("Video Uploaded")
        } catch (error) {
            console.log(error)
            toast.error("Upload Failed")
            setIsVideoUploaded(false)
        } finally {
            setUploadingVideo(false) // Stop uploading state
        }
    }

    const handleEditLecture = async () => {
        setLoading1(true)
        try {
            const result = await axios.post(
                serverUrl + `/api/course/editlecture/${lectureId}`,
                {
                    lectureTitle,
                    videoUrl,
                    isPreviewFree
                },
                { withCredentials: true }
            )
            console.log(result.data);


            dispatch(setLectureData(
                lectureData.map(l =>
                    l._id === lectureId ? result.data : l
                )
            ))

            toast.success("Lecture Updated")
            navigate("/courses")

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        } finally {
            setLoading1(false)
        }
    }

    const removeLecture = async () => {
        setLoading(true)
        try {
            const result = await axios.delete(
                serverUrl + `/api/course/deletelecture/${lectureId}`,
                { withCredentials: true }
            )

            dispatch(setLectureData(
                lectureData.filter(lecture => lecture._id !== lectureId)
            ))

            navigate(`/createlecture/${courseId}`)
            toast.success("Lecture Removed")

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center p-4 bg-gray-100'>
            <div className='w-full max-w-xl bg-white rounded-xl shadow-lg p-6 space-y-6 '>

                {/*header  */}
                <div className='flex items-center gap-2 mb-2'>
                    <FaArrowLeft className='text-gray-600 cursor-pointer' onClick={() => navigate(`/createlecture/${courseId}`)} />
                    <h2 className='text-xl font-semibold text-gray-800 '>Update Course Lecture</h2>
                </div>

                <button className='mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm transition-all cursor-pointer'
                    onClick={removeLecture} disabled={loading}>{loading ? <ClipLoader /> : "Remove Lecture"}</button>

                <div className='space-y-4'>
                    <div >
                        <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>Lecture Title *</label>
                        <input type="text" className='w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-black focus:outline-none' required
                            onChange={(e) => setLectureTitle(e.target.value)} value={lectureTitle} />
                    </div>

                    <div>
                        <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>Video *</label>
                        <input type="file" name="" id="" className='w-full border border-gray-300
                         rounded-md p-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0
                          file:text-sm file:bg-gray-700 file:text-white hover:file:bg-gray-500' required accept='video/*'
                            onChange={(e) => uploadVideoToCloudinary(e.target.files[0])} />
                        
                        {/* Show uploading status below input field */}
                        {uploadingVideo && (
                            <p className="mt-2 text-sm text-gray-600">Uploading video... Please wait</p>
                        )}
                        
                        {/* Show uploaded status only when a new video was uploaded */}
                        {!uploadingVideo && isVideoUploaded && videoUrl && (
                            <p className="mt-2 text-sm text-green-600">✓ Video uploaded successfully</p>
                        )}
                        
                       
                    </div>

                    <div className='flex items-center gap-3'>
                        <input type="checkbox" className='accent-black h-4 w-4' id='isFree' checked={isPreviewFree} onChange={() => setIsPreviewFree(prev => !prev)} />
                        <label htmlFor="isFree">Is this video FREE ?</label>
                    </div>

                    {loading ? <p>Uploading Video...Please Wait</p> : ""}

                </div>

                <div className='pt-4'>
                    <button 
                        className='w-full bg-black text-white rounded-md text-sm
                      font-medium hover:bg-gray-700 transition py-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed' 
                        disabled={loading1 || uploadingVideo} 
                        onClick={handleEditLecture}
                    >
                        {loading1 ? <ClipLoader size={30} color='white' /> : "Update Lecture"}
                    </button>
                    {uploadingVideo && (
                        <p className="mt-2 text-sm text-gray-500 text-center">Please wait for video upload to complete before updating</p>
                    )}
                </div>
            </div>

        </div>
    )
}
export default EditLecture