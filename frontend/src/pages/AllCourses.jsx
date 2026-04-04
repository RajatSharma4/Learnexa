import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import ai from '../assets/SearchAi.png'
import { useSelector } from 'react-redux';
import Card from '../components/Card';


const AllCourses = () => {
  const navigate = useNavigate()
  const { courseData } = useSelector(state => state.course)
  const [category, setCategory] = useState([])
  const [filterCourses, setFilterCourses] = useState([])
  const [isSidebarVisible, setIsSidebarVisible] = useState(false)

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(c => c !== e.target.value))
    }
    else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let courseCopy = courseData?.slice()
    if (category.length > 0) {
      courseCopy = courseCopy.filter(c => category.includes(c.category))
    }
    setFilterCourses(courseCopy)
  }

  useEffect(() => {
    setFilterCourses(courseData)
  }, [courseData])

  useEffect(() => {
    applyFilter()
  }, [category])
  return (
    <div className='flex min-h-screen bg-gray-50'>
      <Navbar />

      <button className='fixed top-20 left-4 z-50 bg-white text-black px-3 py-1 rounded md:hidden border-2 border-black'
        onClick={() => setIsSidebarVisible(prev => !prev)}>
        {isSidebarVisible ? 'Hide' : 'Show'} Filters
      </button>

      {/* sidebar */}
      <aside className={`w-65 h-screen overflow-y-auto bg-black 
        fixed top-0 left-0 p-6 py-32.5 border-r border-gray-200 
        shadow-md transition-transform duration-300 z-5 ${isSidebarVisible? "translate-x-0" : "-translate-x-full"} md:block md:translate-x-0`}>

        <h2 className='text-xl flex items-center justify-center font-bold gap-2 text-gray-50 mb-6 '>
          <FaArrowLeft className='text-white cursor-pointer' onClick={() => navigate("/")} />Filter by Category</h2>

        <form action="" onSubmit={(e) => e.preventDefault()} className='space-y-4 text-sm bg-gray-600 border-white text-white border p-5 rounded-2xl'>

          <button className='px-2.5 py-2.5 bg-black text-white
               rounded-[10px] text-[15px] font-light flex items-center
                justify-center gap-2 cursor-pointer' onClick={()=>navigate("/search")}>Search with AI <img src={ai} alt="" className='w-7.5 h-7.5 rounded-full' /></button>

          <label htmlFor="" className='flex items-center gap-4 cursor-pointer hover:text-gray-200 transition'>
            <input type="checkbox" name="" id="" className='accent-black rounded-md h-4 w-4'
              value={"App Development"} onChange={toggleCategory} /> App Development
          </label>
          <label htmlFor="" className='flex items-center gap-4 cursor-pointer hover:text-gray-200 transition'>
            <input type="checkbox" name="" id="" className='accent-black rounded-md h-4 w-4'
              value={"AI/ML"} onChange={toggleCategory} /> AI/ML
          </label>
          <label htmlFor="" className='flex items-center gap-4 cursor-pointer hover:text-gray-200 transition'>
            <input type="checkbox" name="" id="" className='accent-black rounded-md h-4 w-4'
              value={"AI Tools"} onChange={toggleCategory} /> AI Tools
          </label>
          <label htmlFor="" className='flex items-center gap-4 cursor-pointer hover:text-gray-200 transition'>
            <input type="checkbox" name="" id="" className='accent-black rounded-md h-4 w-4'
              value={"Data Science"} onChange={toggleCategory} /> Data Science
          </label>
          <label htmlFor="" className='flex items-center gap-4 cursor-pointer hover:text-gray-200 transition'>
            <input type="checkbox" name="" id="" className='accent-black rounded-md h-4 w-4'
              value={"Data Analytics"} onChange={toggleCategory} /> Data Analytics
          </label>
          <label htmlFor="" className='flex items-center gap-4 cursor-pointer hover:text-gray-200 transition'>
            <input type="checkbox" name="" id="" className='accent-black rounded-md h-4 w-4'
              value={"Ethical Hacking"} onChange={toggleCategory} /> Ethical Hacking
          </label>
          <label htmlFor="" className='flex items-center gap-4 cursor-pointer hover:text-gray-200 transition'>
            <input type="checkbox" name="" id="" className='accent-black rounded-md h-4 w-4'
              value={"UI/UX Designing"} onChange={toggleCategory} /> UI/UX Designing
          </label>
          <label htmlFor="" className='flex items-center gap-4 cursor-pointer hover:text-gray-200 transition'>
            <input type="checkbox" name="" id="" className='accent-black rounded-md h-4 w-4'
              value={"Web Development"} onChange={toggleCategory} /> Web Development
          </label>
          <label htmlFor="" className='flex items-center gap-4 cursor-pointer hover:text-gray-200 transition'>
            <input type="checkbox" name="" id="" className='accent-black rounded-md h-4 w-4'
              value={"Others"} onChange={toggleCategory} /> Others
          </label>

        </form>

      </aside>

      <main className='w-full transition-all md:pl-75
         duration-300 py-0  flex items-center 
         justify-center md:justify-start flex-wrap gap-6 px-2.5 mt-35 lg:mt-25'>
        {
          filterCourses.map((course, index) => {
            console.log(filterCourses);

            return (
              <Card key={index}
                thumbnail={course.thumbnail}
                title={course.title}
                category={course.category}
                price={course.price}
                id={course._id}
                reviews={course.reviews} />
            )
          })
        }
      </main>

    </div>
  )
}

export default AllCourses
