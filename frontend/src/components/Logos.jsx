import React from 'react'
import { MdCastForEducation } from "react-icons/md";
import { SiOpenaccess } from "react-icons/si";
import { FaSackDollar } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";

const Logos = () => {
  return (
    <div className='w-full py-12 bg-gray-50'>

      <div className='max-w-7xl mx-auto px-6'>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>

          {/*  1 */}
          <div className='group flex flex-col items-center justify-center gap-3 p-5 rounded-2xl bg-gray-200 shadow-sm hover:shadow-lg transition cursor-pointer hover:-translate-y-1'>

            <MdCastForEducation className='w-10 h-10 text-[#2e6071] group-hover:scale-110 transition' />
            <p className='text-sm md:text-base font-semibold text-[#2e6071] text-center'>
              20k+ Online Courses
            </p>

          </div>

          {/*  2 */}
          <div className='group flex flex-col items-center justify-center gap-3 p-5 rounded-2xl bg-gray-200 shadow-sm hover:shadow-lg transition cursor-pointer hover:-translate-y-1'>

            <SiOpenaccess className='w-10 h-10 text-[#2e6071] group-hover:scale-110 transition' />
            <p className='text-sm md:text-base font-semibold text-[#2e6071] text-center'>
              Lifetime Access
            </p>

          </div>

          {/*  3 */}
          <div className='group flex flex-col items-center justify-center gap-3 p-5 rounded-2xl bg-gray-200 shadow-sm hover:shadow-lg transition cursor-pointer hover:-translate-y-1'>

            <FaSackDollar className='w-10 h-10 text-[#2e6071] group-hover:scale-110 transition' />
            <p className='text-sm md:text-base font-semibold text-[#2e6071] text-center'>
              Value for Money
            </p>

          </div>

          {/*  4 */}
          <div className='group flex flex-col items-center justify-center gap-3 p-5 rounded-2xl bg-gray-200 shadow-sm hover:shadow-lg transition cursor-pointer hover:-translate-y-1'>

            <FaUsers className='w-10 h-10 text-[#2e6071] group-hover:scale-110 transition' />
            <p className='text-sm md:text-base font-semibold text-[#2e6071] text-center'>
              Community Support
            </p>

          </div>

          {/*  5 */}
          <div className='group flex flex-col items-center justify-center gap-3 p-5 rounded-2xl bg-gray-200 shadow-sm hover:shadow-lg transition cursor-pointer hover:-translate-y-1'>

            <BiSupport className='w-10 h-10 text-[#2e6071] group-hover:scale-110 transition' />
            <p className='text-sm md:text-base font-semibold text-[#2e6071] text-center'>
              Lifetime Support
            </p>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Logos
