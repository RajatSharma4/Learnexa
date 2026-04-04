import React from 'react'
import Navbar from '../components/Navbar'
import home from '../assets/LMSHome.jpg'
import { SiViaplay } from "react-icons/si";
import ai from '../assets/ai.png'
import ai1 from '../assets/SearchAi.png'
import Logos from '../components/Logos';
import ExploreCourses from '../components/ExploreCourses';
import CardPage from '../components/CardPage';
import { useNavigate } from 'react-router-dom';
import About from '../components/About';
import Footer from '../components/Footer';
import ReviewPage from '../components/ReviewPage';

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className='w-full overflow-hidden'>

      <div className='relative w-full h-screen'>

        {/* Navbar */}
        <Navbar />

        {/* Background Image */}
        <img
          src={home}
          className='w-full h-full object-cover'
          alt="hero"
        />

        {/* Dark Overlay */}
        <div className='absolute inset-0 bg-black/60'></div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">

          {/* Headings */}
          <h1 className="text-white font-bold leading-tight text-3xl md:text-5xl lg:text-7xl">
            Grow Your Skills to Advance
          </h1>

          <h1 className="text-white font-bold mt-2 text-3xl md:text-5xl lg:text-7xl">
            Your Career Path
          </h1>

          {/* Buttons */}
          <div className='flex flex-wrap gap-4 mt-8 justify-center'>

            {/* View Courses Button */}
            <button className='group flex items-center cursor-pointer gap-2 px-6 py-3 border-2 border-white text-white rounded-lg text-base md:text-lg hover:bg-white hover:text-black transition transform hover:scale-105'
            onClick={()=>navigate("/allcourses")}>

              <span>View All Courses</span>

              <SiViaplay className='w-5 h-5 md:w-6 md:h-6 fill-white group-hover:fill-black transition' />

            </button>


            {/* AI Search Button */}
            <button className='flex items-center gap-2 px-6 py-3 cursor-pointer bg-white text-black rounded-lg text-base md:text-lg hover:bg-gray-200 transition transform hover:scale-105' onClick={()=>navigate("/search")}>

              <span>Search with AI</span>

              {/* Desktop Icon */}
              <img
                src={ai}
                className='w-5 h-5 md:w-6 md:h-6 rounded-full hidden lg:block'
                alt="ai"
              />

              {/* Mobile Icon */}
              <img
                src={ai1}
                className='w-5 h-5 md:w-6 md:h-6 rounded-full lg:hidden'
                alt="ai"
              />

            </button>

          </div>

        </div>


      </div>

      <Logos/>
      <ExploreCourses/>
      <CardPage/>
      <About/>
      <ReviewPage/>
      <Footer/>
    </div>
  )
}

export default Home
