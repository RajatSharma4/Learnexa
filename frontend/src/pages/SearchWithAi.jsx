import React from 'react'
import { FaArrowLeft } from "react-icons/fa";
import Ai from '../assets/ai.png'
import { RiMicAiFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios'
import { serverUrl } from '../App';
import start from "../assets/start.mp3"

const SearchWithAi = () => {
  const startSound = new Audio(start)
  const navigate = useNavigate()

  const [input, setInput] = useState("")
  const [recommendations, setRecommendations] = useState([])
  const [listening, setListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  function speak(message) {
    let utterance = new SpeechSynthesisUtterance(message)
    window.speechSynthesis.speak(utterance)
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  const recognition = new SpeechRecognition()

  if (!recognition) {
    toast.error("Speech Recognition is not Supported")
  }

  const handleSearch = async () => {
    if (!recognition) return;
    setListening(true)
    recognition.start()
    startSound.play()
    recognition.onresult = async (e) => {
      const transcript = e.results[0][0].transcript.trim()
      setInput(transcript)
      setListening(false)
      setIsProcessing(true)
      await handleRecommendation(transcript)
      setIsProcessing(false)
    }
  }

  const handleNaturalSearch = async () => {
    if (!input.trim()) return;
    setIsProcessing(true)
    await handleRecommendation(input)
    setIsProcessing(false)
  }

  const handleRecommendation = async (querry) => {
    try {
      const result = await axios.post(serverUrl + "/api/course/search", { input: querry }, { withCredentials: true })
      console.log(result.data);
      setRecommendations(result.data)
      if (result.data.length > 0) {
        speak("These are the top course i found for You")
      } else {
        speak("No course found")
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching recommendations")
    } finally {
      setIsProcessing(false)
    }
  }
  
  return (
    <div className='min-h-screen bg-linear-to-br from-black to-gray-900 text-white flex flex-col items-center px-4 py-1'>

      {/* search container */}
      <div className='bg-white shadow-xl rounded-3xl p-6 mt-10 sm:p-8 w-full max-w-2xl text-center relative'>
        <FaArrowLeft className='text-black h-5.5 w-5.5 cursor-pointer absolute' onClick={() => navigate("/")} />
        <h1 className='text-2xl sm:text-3xl font-bold text-gray-600 mb-6 flex items-center justify-center gap-2'>
          <img src={Ai} className='w-8 h-6 sm:w-7.5 sm:h-7.5' alt="" /> Search with <span className='text-[#CB99C7]'>AI</span>
        </h1>

        <div className='flex items-center bg-gray-700 rounded-full overflow-hidden shadow-lg relative w-full'>
          <input type="text" className='grow px-4 py-3 bg-transparent text-white
               placeholder-gray-400 focus:outline-none text-sm sm:text-base' placeholder='What do you want to Learn ? (e.g. AI, MERN, Cloud...)'
            onChange={(e) => setInput(e.target.value)} value={input} />

          {input && <button className='absolute right-14 sm:right-16 bg-white rounded-full cursor-pointer'>
            <img src={Ai} alt="" className='w-10 h-10 p-2 rounded-full' onClick={handleNaturalSearch} /></button>}

          <button className='absolute right-2 bg-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer' onClick={handleSearch}>
            <RiMicAiFill className='w-5 h-5 text-[#cb87c5]' /></button>
        </div>
      </div>

      {/* Processing animation while waiting for API response */}
      {isProcessing && (
        <div className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50'>
          <div className='bg-linear-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-center'>
            <div className='flex flex-col items-center space-y-4'>
              {/* Animated circles */}
              <div className='flex space-x-2'>
                <div className='w-3 h-3 bg-white rounded-full animate-bounce' style={{ animationDelay: '0s' }}></div>
                <div className='w-3 h-3 bg-white rounded-full animate-bounce' style={{ animationDelay: '0.2s' }}></div>
                <div className='w-3 h-3 bg-white rounded-full animate-bounce' style={{ animationDelay: '0.4s' }}></div>
              </div>
              
              {/* Spinning loader */}
              <div className='w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin'></div>
              
              {/* Text */}
              <p className='text-white text-lg font-semibold'>
                AI is finding courses for you...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Results display */}
      {!isProcessing && recommendations.length > 0 ? (
        <div className='w-full max-w-6xl mt-12 px-2 sm:px-4'>
          <h1 className='text-xl sm:text-2xl font-semibold mb-6 text-white text-center '>AI Search Results</h1>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8'>
            {recommendations?.map((course, index) => (
              <div key={index} className='bg-white text-black p-5 rounded-2xl shadow-md 
                hover:shadow-indigo-500/30 transition-all duration-200 border border-gray-200
                cursor-pointer hover:bg-gray-200 ' onClick={()=>navigate(`/viewcourse/${course._id}`)}>
                <h2 className='text-lg font-bold sm:text-xl'>{course?.title}</h2>
                <p className='text-sm text-gray-600 mt-1 '>{course?.category}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        !isProcessing && listening ? 
          <h1 className='text-center text-xl sm:text-2xl mt-10 text-gray-400'>Listening...</h1> :
        !isProcessing && !listening && recommendations.length === 0 && 
          <h1 className='text-center text-xl sm:text-2xl mt-10 text-gray-400'>No Courses Found Yet</h1>
      )}
    </div>
  )
}

export default SearchWithAi



























