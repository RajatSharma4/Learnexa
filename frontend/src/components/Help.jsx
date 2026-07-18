import React from 'react'

const Help = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        fixed
        bottom-6
        right-6
        w-20
        h-20
        rounded-full
        bg-blue-500
        hover:bg-blue-700
        text-white
        font-bold
        text-lg
        shadow-xl
        hover:scale-105
        active:scale-95
        transition-all
        duration-300
        z-50
        flex
        items-center
        justify-center
        cursor-pointer
      "
    >
      HELP
    </button>
  )
}

export default Help