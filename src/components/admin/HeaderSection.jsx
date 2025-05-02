import React from "react";
import images from "../../assets/assets";
import { Search } from "lucide-react";
import { useLocation } from "react-router-dom";

const HeaderSection = () => {
  const location = useLocation();
  const title = location.pathname === "/admin"
    ? "Dashboard"
    : location.pathname.split("/").filter(Boolean).slice(-1)[0];
  const formattedTitle = title.charAt(0).toUpperCase() + title.slice(1);

  return (
    <div className="flex flex-row h-[80px] px-6 pr-12 justify-between items-center bg-web-third">
      <div className="text-2xl font-semibold text-black">{formattedTitle}</div>
      <div className="flex flex-row items-center">
        <div className="flex items-center bg-white rounded-md w-[300px] px-3 py-2 mr-6 shadow-inner">
          <Search className="text-gray-500 mr-2 w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            className="outline-none text-sm text-gray-700 bg-transparent placeholder-gray-400"
          />
        </div>
        <div className="flex flex-row items-center gap-3">
          <img className="h-[40px]" src={images.user_icon} alt="user" />
          <div className="text-black">Admin</div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;