import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedCourse } from '../redux/courseSlice';
import { setUserData } from '../redux/userSlice'; // ✅ ADD THIS IMPORT
import img from '../assets/empty.jpg'
import { FaStar } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import axios from 'axios'
import { serverUrl } from '../App';
import Card from '../components/Card';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

const ViewCourse = () => {
  const navigate = useNavigate()
  const { courseData } = useSelector(state => state.course)
  const { courseId } = useParams()
  const { userData } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const { selectedCourse } = useSelector(state => state.course)
  const [selectedLecture, setSelectedLecture] = useState(null)
  const [creatorData, setCreatorData] = useState(null)
  const [creatorCourses, setCreatorCourses] = useState([])
  const [isEnrolled, setIsEnrolled] = useState(false)

  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(false)

  // Add this function to refetch user data after enrollment
  const fetchUserData = async () => {
    try {
      const response = await axios.get(serverUrl + "/api/user/getcurrentuser", { withCredentials: true })
      // Dispatch action to update user data in Redux
      dispatch(setUserData(response.data))
      return response.data
    } catch (error) {
      console.error("Error fetching user data:", error)
      return null
    }
  }

  const fetchCourseData = async () => {
    courseData.map((course) => {
      if (course._id === courseId) {
        dispatch(setSelectedCourse(course))
        console.log(selectedCourse);
        return null
      }
    })
  }

  useEffect(() => {
    const handleCreator = async () => {
      if (selectedCourse?.creator) {
        try {
          const result = await axios.post(serverUrl + "/api/course/creator", { userId: selectedCourse?.creator }, { withCredentials: true })
          console.log(result.data);
          setCreatorData(result.data)

        } catch (error) {

        }
      }
    }
    handleCreator()
  }, [selectedCourse])

  const checkEnrollment = () => {
    if (!userData?.enrolledCourses || !courseId) {
      console.log("No enrolled courses or courseId, setting isEnrolled to false");
      setIsEnrolled(false);
      return;
    }

    const verify = userData.enrolledCourses.some(c =>
      c._id.toString() === courseId.toString()
    );

    console.log("Enrollment verification result:", verify);
    setIsEnrolled(verify);
  }

  useEffect(() => {
    fetchCourseData()
  }, [courseData, courseId, userData])

  useEffect(() => {
    checkEnrollment()
  }, [userData, courseId])

  useEffect(() => {
    if (creatorData?._id && courseData.length > 0) {
      const creatorCourse = courseData.filter((course) => course.creator?.toString() === creatorData?._id?.toString() && course._id !== courseId)
      setCreatorCourses(creatorCourse)
    }
  }, [creatorData, courseData, courseId])

  const handleEnroll = async (userId, courseId) => {
    try {
      const orderData = await axios.post(serverUrl + "/api/order/razorpay-order", { userId, courseId }, { withCredentials: true })
      console.log(orderData);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.data.amount,
        currency: 'INR',
        name: "LEARNEXA",
        description: "COURSE ENROLLMENT PAYMENT",
        order_id: orderData.data.id,
        handler: async function (response) {
          console.log("Razorpay Response", response);
          try {
            const verifyPayment = await axios.post(serverUrl + "/api/order/verifypayment",
              { ...response, courseId, userId }, { withCredentials: true })

            // ✅ IMPORTANT: Fetch fresh user data after successful enrollment
            const updatedUserData = await fetchUserData()

            // ✅ Update local enrollment state
            setIsEnrolled(true)

            toast.success(verifyPayment.data.message)
          } catch (error) {
            toast.error(error.response?.data?.message || "Payment verification failed")
          }
        }

      }
      const rzp = new window.Razorpay(options)
      rzp.open()

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while Enrollment")
    }
  }

  const handleReview = async (req, res) => {
    setLoading(true)
    try {
      const result = await axios.post(serverUrl + "/api/review/createreview", { rating, comment, courseId }, { withCredentials: true })
      setLoading(false)
      toast.success("Review Added")
      console.log(result.data);
      setRating(0)
      setComment("")

    } catch (error) {
      console.log(error);
      setLoading(false)
      toast.error(error.response.data.message)
      setRating(0)
      setComment("")
    }
  }

  const calculateAvgReview = (reviews) => {
    if (!reviews || reviews.length === 0) {
      return 0
    }
    const total = reviews.reduce((sum, review) => sum + (review.rating || 0), 0)
    return (total / reviews.length).toFixed(1)
  }

  const avgRating = calculateAvgReview(selectedCourse?.reviews)

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-6xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6 relative'>

        {/* top section */}
        <div className='flex flex-col md:flex-row gap-6'>

          {/* thumbnail */}
          <div className='w-full md:w-1/2'>
            <FaArrowLeft className='text-black w-5.5 h-5.5 cursor-pointer' onClick={() => navigate("/")} />

            {selectedCourse?.thumbnail ? <img src={selectedCourse?.thumbnail} className='rounded-xl w-full object-cover' /> :
              <img src={img} className='rounded-xl w-full object-cover' />}
          </div>

          {/* courseInfo */}
          <div className='flex-1 space-y-2 mt-5'>
            <h2 className='text-2xl font-bold'>{selectedCourse?.title}</h2>
            <p className='text-gray-600'>{selectedCourse?.subTitle}</p>

            <div className='flex items-start flex-col justify-between'>

              <div className='text-yellow-500 font-medium flex gap-2'>
                <span className='flex items-center justify-start'><FaStar />{avgRating}</span>
                <span className='text-gray-400'>(1,200 Reviews)</span>
              </div>

              <div>
                <span className='text-xl text-black font-semibold'>₹{selectedCourse?.price}</span>{" "}
                <span className='line-through text-sm text-gray-400'>₹599</span>
              </div>

              <ul className='text-gray-700 text-sm space-y-1 pt-2'>
                <li>✅ 10+ hours of video content</li>
                <li>✅ Lifetime access to course materials</li>

              </ul>

              {!isEnrolled ? <button className='bg-black text-white px-6 py-2 rounded hover:bg-gray-700 mt-3
                 cursor-pointer' onClick={() => handleEnroll(userData._id, courseId)}>Enroll Now</button> :
                <button className='bg-green-200 text-green-800 px-6 py-2 rounded hover:bg-green-100 border border-green-400 mt-3
                 cursor-pointer' onClick={() => navigate(`/viewlecture/${courseId}`)}>Watch Now</button>}

            </div>
          </div>
        </div>

        <div>
          <h2 className='text-xl font-semibold mb-2'>What you'll learn</h2>
          <ul className='list-disc pl-6 text-gray-700 space-y-1'>
            <li>Learn {selectedCourse?.category} from Beginning</li>
          </ul>
        </div>

        <div>
          <h2 className='text-xl font-semibold mb-2'>Who ? This course is for</h2>
          <p className='text-gray-700'>Beginners, Aspiring Developes, and profesionals looking for upgrade skills.</p>
        </div>

        {/* lecture Area */}
        <div className='flex flex-col md:flex-row gap-6'>
          {/* left side */}
          <div className='bg-white w-full md:w-2/5 p-6 rounded-2xl shadow-lg border border-gray-200'>
            <h2 className='text-xl font-bold mb-1 text-gray-800'>Course Curriculum</h2>
            <p className='text-sm text-gray-500 mb-4'>
              {selectedCourse?.lectures?.length} Lectures
            </p>

            <div className='flex flex-col gap-3'>
              {selectedCourse?.lectures?.map((lecture, index) => (

                <button disabled={!lecture.isPreviewFree} onClick={() => {
                  if (lecture.isPreviewFree) {
                    setSelectedLecture(lecture)
                  }
                }}
                  key={index} className={`flex items-center gap-3 px-4 py-3 rounded-lg border 
                          transition-all duration-200 text-left ${lecture.isPreviewFree ? "hover:bg-gray-100 border-gray-300 cursor-pointer" :
                      "cursor-not-allowed opacity-60 border-gray-200"} ${selectedLecture?.lectureTitle === lecture.lectureTitle ? "bg-gray-100 border-gray-400" : ""}`}>
                  <span className='text-lg text-gray-700'>
                    {lecture?.isPreviewFree ? <FaPlayCircle /> : < FaLock />}
                  </span>
                  <span className='text-sm font-medium text-gray-800'>{lecture.lectureTitle}</span>
                </button>
              ))}
            </div>
          </div>

          {/* right div */}
          <div className='bg-white w-full md:w-3/5 p-6 rounded-2xl shadow-lg border border-gray-200'>
            <div className='aspect-video w-full rounded-lg overflow-hidden
                          mb-4 bg-black flex items-center justify-center'>{selectedLecture?.videoUrl ? <video className='w-full h-full object-cover' src={selectedLecture?.videoUrl} controls /> :
                <span className='text-white text-sm'>Select a preview lecture to watch.</span>}</div>
          </div>
        </div>

        {/* reviews */}
        <div className='mt-8 border-t pt-6'>
          <h2 className='text-xl font-semibold mb-2'>Write a Reviews</h2>
          <div className='mb-4'>
            <div className='flex gap-1 mb-2'>
              {
                [1, 2, 3, 4, 5].map((star) => (
                  <FaStar onClick={() => setRating(star)} key={star} className={star <= rating ? "fill-amber-300" : "fill-gray-300"} />
                ))
              }
            </div>
            <textarea onChange={(e) => setComment(e.target.value)} value={comment}
              className='w-full border border-gray-300 rounded-lg p-2' placeholder='Write your Review here...' rows={3} />
            <button className='bg-black text-white mt-3 px-4 py-2 rounded hover:bg-gray-800'
              onClick={handleReview}>{loading ? <ClipLoader size={30} color='white' disabled /> : "Submit Review"}</button>
          </div>

        </div>

        {/* creator information */}
        <div className='flex items-center gap-4 pt-4 border-t'>
          {creatorData?.photoUrl ? <img src={creatorData?.photoUrl} alt="" className='border border-gray-700 w-16 h-16 object-cover rounded-full' /> :
            <img src={img} alt="" className='border border-gray-700 w-16 h-16 object-cover rounded-full' />}
          <div>
            <h2 className='text-xl font-semibold'>{creatorData?.name}</h2>
            <p className='md:text-sm text-gray-600 text-[10px]'>{creatorData?.description}</p>
            <p className='md:text-sm text-gray-600 text-[10px]'>{creatorData?.email}</p>
          </div>
        </div>

        <div>
          <p className='text-xl font-semibold mb-2'>Other Published Courses by the Educator-</p>
        </div>

        <div className='w-full transition-all duration-300 py-5 flex items-center
            justify-center lg:justify-start flex-wrap gap-6 lg:px-20'>
          {
            creatorCourses?.map((course, index) => (
              <Card key={index} thumbnail={course?.thumbnail} id={course?._id}
                price={course?.price} title={course?.title} category={course?.category} />
            ))
          }
        </div>

      </div>

    </div>
  )
}

export default ViewCourse