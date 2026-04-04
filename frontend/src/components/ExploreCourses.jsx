import React from 'react'
import { SiViaplay } from "react-icons/si";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { FaUikit } from "react-icons/fa6";
import { MdAppShortcut } from "react-icons/md";
import { FaHackerrank } from "react-icons/fa";
import { SiOpenai } from "react-icons/si";
import { SiGoogledataproc } from "react-icons/si";
import { BsClipboardData } from "react-icons/bs";
import { SiOpenaigym } from "react-icons/si";
import { useNavigate } from 'react-router-dom';


const ExploreCourses = () => {
  const navigate = useNavigate()
  return (
    <div className='min-h-[50vh] w-screen lg:h-[50vh] flex flex-col lg:flex-row items-center justify-center gap-4 px-7.5'>

      {/* Left/Top div */}
      <div className='w-full lg:w-87.5 lg:h-full h-100 flex flex-col items-start justify-center md:px-10 gap-1 px-7.5'>
        <span className='text-[35px] font-semibold'>Explore</span>
        <span className='text-[35px] font-semibold'>Our Courses</span>
        <p className='text-[17px]'> Lorem sequi! Quasi commodi dolores facere obcaecati quos quibusdam laboriosam omnis natus, iste fuga iusto eius vel dolore. Aliquam?</p>
        <button className='px-5 py-2.5 border-2 cursor-pointer bg-black border-white text-white rounded-[10px] text-[18px] font-light gap-2 flex flex-light mt-10' 
        onClick={()=>navigate("allcourses")}>Explore Courses
          <SiViaplay className='w-5 h-5 md:w-6 md:h-6 fill-white transition' /> </button>
      </div>

      {/* Right/Bottom div */}
      <div className='w-180 max-w-[90%] lg:h-75 md:min-h-75 flex items-center justify-center lg:gap-15 gap-12.5 flex-wrap mb-12.5 lg:mb-0'>

        <div className='w-25 h-32.5 font-light text-[13px] flex flex-col gap-3 text-center'>
          <div className='w-25 h-22.5 bg-[#fbd9fb] rounded-lg flex items-center justify-center'>
            <TbDeviceDesktopAnalytics className='w-15 h-15 text-[#6d6c6c]'/>
          </div>
          Web Dev
        </div>

         <div className='w-25 h-32.5 font-light text-[13px] flex flex-col gap-3 text-center'>
          <div className='w-25 h-22.5 bg-[#c5f8c3] rounded-lg flex items-center justify-center'>
            <FaUikit className='w-15 h-15 text-[#6c6d6c]'/>
          </div>
          UI/UX Designing
        </div>

         <div className='w-25 h-32.5 font-light text-[13px] flex flex-col gap-3 text-center'>
          <div className='w-25 h-22.5 bg-[#fad2ba] rounded-lg flex items-center justify-center'>
            <MdAppShortcut className='w-15 h-15 text-[#6d6c6c]'/>
          </div>
          App Dev
        </div>

         <div className='w-25 h-32.5 font-light text-[13px] flex flex-col gap-3 text-center'>
          <div className='w-25 h-22.5 bg-[#bdf1fc] rounded-lg flex items-center justify-center'>
            <FaHackerrank  className='w-15 h-15 text-[#6d6c6c]'/>
          </div>
         Ethical Hacking
        </div>

         <div className='w-25 h-32.5 font-light text-[13px] flex flex-col gap-3 text-center'>
          <div className='w-25 h-22.5 bg-[#c5f6cd] rounded-lg flex items-center justify-center'>
            <SiOpenai className='w-15 h-15 text-[#6d6c6c]'/>
          </div>
          AI/ML
        </div>

         <div className='w-25 h-32.5 font-light text-[13px] flex flex-col gap-3 text-center'>
          <div className='w-25 h-22.5 bg-[#fad7fa] rounded-lg flex items-center justify-center'>
            <SiGoogledataproc className='w-15 h-15 text-[#6d6c6c]'/>
          </div>
          Data Science
        </div>

         <div className='w-25 h-32.5 font-light text-[13px] flex flex-col gap-3 text-center'>
          <div className='w-25 h-22.5 bg-[#dfe2fd] rounded-lg flex items-center justify-center'>
            <BsClipboardData className='w-15 h-15 text-[#6d6c6c]'/>
          </div>
          Data Analytics
        </div>

         <div className='w-25 h-32.5 font-light text-[13px] flex flex-col gap-3 text-center'>
          <div className='w-25 h-22.5 bg-[#ade5f1] rounded-lg flex items-center justify-center'>
            <SiOpenaigym className='w-15 h-15 text-[#6d6c6c]'/>
          </div>
          AI Tools
        </div>

      </div>
    </div>
  )
}

export default ExploreCourses
