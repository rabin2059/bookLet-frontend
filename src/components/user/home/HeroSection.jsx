import React, { useState } from "react";
import images from "../../../assets/assets";
const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="bg-[#fefdf9] py-20 px-6 pb-80 sm:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Left text */}
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-5xl font-extrabold text-[#1e1e4b] leading-tight">
            New Releases This Week
          </h1>
          <p className="text-[#444] text-lg">
            It’s time to update your reading list with some of the latest and greatest
            releases in the literary world. From heart-pumping thrillers to captivating
            memoirs, this week's new releases offer something for everyone.
          </p>

          {/* Gradient search bar */}
          <div className="flex items-center bg-gradient-to-r from-yellow-100 to-purple-100 rounded-full p-1 shadow-md max-w-md">
            <div className="pl-4 pr-2 text-gray-500">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search book..."
              className="flex-grow bg-transparent focus:outline-none px-2 py-2 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm hover:bg-gray-700"
            >
              Search
            </button>
          </div>
        </div>

        {/* Right image stack */}
        <div className="md:w-1/2 relative h-72 md:h-96 flex justify-center items-start">
          
          <img
            src={images.herobook}
            alt="Book 1"
            className="h-[150%]"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
