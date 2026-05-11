import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function QuickFun() {

  const navigate = useNavigate();

  const [selectedGame, setSelectedGame] = useState(null);

  const funApps = [
    {
      title: "Bubble Hit",
      description: "Check your focusing speed",
      link: "https://rajatsharma4.github.io/Bubble_Game/"
    },

    {
      title: "Weather App",
      description: "Check live weather updates",
      link: "https://rajatsharma4.github.io/WEATHER-APP/"
    },

    {
      title: "Memory Game",
      description: "Test your memory skills",
      link: "https://rajatsharma4.github.io/SIMON-SAYS-GAME/"
    },
  ];

  return (

    <div className="min-h-screen bg-black text-white">

      {/* IF GAME SELECTED */}

      {selectedGame ? (

        <div className="w-full h-screen">

          {/* Top Bar */}

          <div className="flex items-center gap-4 px-6 py-4 border-b border-white/20">

            <FaArrowLeft
              className="text-3xl cursor-pointer"
              onClick={() => setSelectedGame(null)}
            />

            <h1 className="text-2xl font-semibold">
              {selectedGame.title}
            </h1>

          </div>

          {/* IFRAME */}

          <iframe
            src={selectedGame.link}
            title={selectedGame.title}
            className="w-full h-[90vh] bg-white"
          />

        </div>

      ) : (

        <div className="px-6 py-5">

          {/* Back Button */}

          <FaArrowLeft
            className="text-[40px] cursor-pointer px-2 py-2"
            onClick={() => navigate("/")}
          />

          {/* Heading */}

          <div className="mb-10">

            <h1 className="text-4xl font-bold">
              Quick Fun 🎮
            </h1>

            <p className="text-gray-400 mt-2">
              Take a short break and refresh your mind
            </p>

          </div>

          {/* Cards */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {funApps.map((app, index) => (

              <div
                key={index}
                onClick={() => setSelectedGame(app)}
                className="
                  border border-white/20
                  bg-white/5
                  rounded-2xl
                  p-6
                  hover:bg-white
                  hover:text-black
                  transition-all
                  duration-300
                  hover:scale-105
                  shadow-lg
                  cursor-pointer
                "
              >

                <h2 className="text-2xl font-semibold mb-3">
                  {app.title}
                </h2>

                <p className="text-sm opacity-80">
                  {app.description}
                </p>

                <button
                  className="
                    mt-6
                    px-4
                    py-2
                    rounded-lg
                    border
                    border-current
                    text-sm
                    font-medium
                  "
                >
                  Open
                </button>

              </div>

            ))}

          </div>

        </div>

      )}

    </div>

  );

}

export default QuickFun;