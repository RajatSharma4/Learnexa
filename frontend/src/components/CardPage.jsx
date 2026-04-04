import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Card from './Card'

const CardPage = () => {

    const { courseData } = useSelector(state => state.course)
    const [popularCourses, setPopularCourses] = useState([])

    useEffect(() => {
        setPopularCourses(courseData?.slice(0, 6) || [])
    }, [courseData])

    return (
        <div className='flex items-center justify-center flex-col '>
            <h1 className='md:text-[45px] text-[30px] font-semibold text-center mt-7.5 px-5'>Our Popular Courses</h1>
            <span className='lg:w-[50%] md:w-[80%] text-[15px] text-center mt-7.5 mb-5 px-5'>Explore top-rated courses designed to
                boost your skills, enhanced careers, and
                unlock opportunity in tech, AI, bussiness and beyond.
            </span>

            <div className='w-full flex items-center justify-center flex-wrap gap-12.5 lg:p-12.5 md:p-7.5 p-2 mb-10'>
                {
                    popularCourses.map((course, index) => {
                        return (
                            <Card
                                key={index}
                                thumbnail={course.thumbnail}
                                title={course.title}
                                category={course.category}
                                price={course.price}
                                id={course._id}
                                reviews={course.reviews}
                            />
                        )
                    })
                }
            </div>

        </div>
    )
}

export default CardPage
