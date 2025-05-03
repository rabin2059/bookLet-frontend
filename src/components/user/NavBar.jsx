import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown, CircleUserRound, Heart } from "lucide-react";
import images from "../../assets/assets";
import SignUp from "../user/auth/SignUpSection";
import SignIn from "../user/auth/SignInSection";
import { AppContext } from "../../context/AppContext";

const NavBar = () => {
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { cart } = useContext(AppContext) || { cart: [] };

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkLogin();

    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  return (
    <div className="w-full sticky top-0 z-50 bg-web-background">
      {/* Top promotion bar */}
      <div className="w-full bg-web-secondary text-web-primary py-4 text-center">
        <div className="container bg-web-secondary mx-auto flex items-center justify-center">
          <span className="text-md text-white bg-web-secondary">
            Get a 80% off on Purchase Rs 2000
          </span>
          <NavLink
            to="/shop"
            className="text-web-primary bg-web-secondary font-bold hover:text-yellow-200 ml-1 inline-flex items-center underline"
          >
            Shop Now
            <img
              className="w-[16px] bg-web-secondary ml-3"
              src={images.arrow}
              alt=""
            />
          </NavLink>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto py-4 px-4 md:px-0">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-extrabold flex items-center text-gray-700">
              <img className="h-[40px]" src={images.logo} alt="" />
              Booklett
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center py-2 px-3 text-l font-bold transition-colors ${
                  isActive
                    ? "bg-gray-700 text-web-primary rounded-full px-5"
                    : "text-gray-700 hover:text-gray-900"
                }`
              }
            >
              Home
            </NavLink>

            <div
              className="relative"
              onMouseEnter={() => setCategoryDropdownOpen(true)}
              onMouseLeave={() => setCategoryDropdownOpen(false)}
            >
              <NavLink
                to="/books"
                className={({ isActive }) =>
                  `flex items-center py-2 px-3 text-l font-bold transition-colors ${
                    isActive
                      ? "bg-gray-700 text-web-primary rounded-full px-5"
                      : "text-gray-700 hover:text-gray-900"
                  }`
                }
              >
                Books
                <ChevronDown className="w-4 h-4 ml-1" />
              </NavLink>
              {categoryDropdownOpen && (
                <div className="absolute w-[800px] mt-1 bg-white shadow-lg z-10 py-8 px-16">
                  <div className="flex justify-between max-w-7xl mx-auto">
                    <div className="w-1/4">
                      <h3 className="text-md font-bold text-black mb-4">
                        Category
                      </h3>
                      <NavLink
                        to="/category/fiction"
                        onClick={() => setCategoryDropdownOpen(false)}
                        className="block text-sm text-gray-700 hover:text-black mb-2"
                      >
                        Fiction
                      </NavLink>
                      <NavLink
                        to="/category/non-fiction"
                        onClick={() => setCategoryDropdownOpen(false)}
                        className="block text-sm text-gray-700 hover:text-black mb-2"
                      >
                        Non-Fiction
                      </NavLink>
                      <NavLink
                        to="/category/children"
                        onClick={() => setCategoryDropdownOpen(false)}
                        className="block text-sm text-gray-700 hover:text-black mb-2"
                      >
                        Children's Books
                      </NavLink>
                      <NavLink
                        to="/category/academic"
                        onClick={() => setCategoryDropdownOpen(false)}
                        className="block text-sm text-gray-700 hover:text-black mb-2"
                      >
                        Academic
                      </NavLink>
                    </div>
                    <div className="w-1/4">
                      <h3 className="text-md font-bold text-black mb-4">
                        Top Sell
                      </h3>
                      <a
                        className="block text-sm text-gray-700 hover:text-black mb-2"
                        href="#"
                      >
                        Top 100
                      </a>
                      <a
                        className="block text-sm text-gray-700 hover:text-black mb-2"
                        href="#"
                      >
                        Best Authors
                      </a>
                    </div>
                    <div className="w-1/4">
                      <h3 className="text-md font-bold text-black mb-4">
                        Most Popular
                      </h3>
                      <a
                        className="block text-sm text-gray-700 hover:text-black mb-2"
                        href="#"
                      >
                        Trending Now
                      </a>
                      <a
                        className="block text-sm text-gray-700 hover:text-black mb-2"
                        href="#"
                      >
                        Top Rated
                      </a>
                    </div>
                    <div className="w-1/4">
                      <h3 className="text-md font-bold text-black mb-4">
                        Genres
                      </h3>
                      <a
                        className="block text-sm text-gray-700 hover:text-black mb-2"
                        href="#"
                      >
                        Romance
                      </a>
                      <a
                        className="block text-sm text-gray-700 hover:text-black mb-2"
                        href="#"
                      >
                        Mystery
                      </a>
                      <a
                        className="block text-sm text-gray-700 hover:text-black mb-2"
                        href="#"
                      >
                        Sci-Fi
                      </a>
                      <a
                        className="block text-sm text-gray-700 hover:text-black mb-2"
                        href="#"
                      >
                        Fantasy
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <NavLink
              to="/new-arrivals"
              className={({ isActive }) =>
                `py-2 px-3 text-l font-bold transition-colors ${
                  isActive
                    ? "bg-gray-700 text-web-primary rounded-full px-5"
                    : "text-gray-700 hover:text-gray-900"
                }`
              }
            >
              New Arrivals
            </NavLink>
            <NavLink
              to="/best-selling"
              className={({ isActive }) =>
                `py-2 px-3 text-l font-bold transition-colors ${
                  isActive
                    ? "bg-gray-700 text-web-primary rounded-full px-5"
                    : "text-gray-700 hover:text-gray-900"
                }`
              }
            >
              Best Selling Books
            </NavLink>
            <NavLink
              to="/deal-of-the-day"
              className={({ isActive }) =>
                `py-2 px-3 text-l font-bold transition-colors ${
                  isActive
                    ? "bg-gray-700 text-web-primary rounded-full px-5"
                    : "text-gray-700 hover:text-gray-900"
                }`
              }
            >
              Deal of The Day
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `py-2 px-3 text-l font-bold transition-colors ${
                  isActive
                    ? "bg-gray-700 text-web-primary rounded-full px-5"
                    : "text-gray-700 hover:text-gray-900"
                }`
              }
            >
              Contact Us
            </NavLink>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <NavLink
              to="/cart"
              className="relative p-2 bg-web-secondary rounded-full"
            >
              <img
                className="h-[34px] bg-transparent"
                src={images.shoppingBag}
                alt=""
              />
              <span className="absolute bottom-2 right-2 bg-orange-500 text-white text-[9px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            </NavLink>
            <NavLink
              to="/wishlist"
              className="p-2 rounded-full border border-gray-400"
            >
              <Heart className="bg-transparent h-[32px] w-[32px]" />
            </NavLink>
            {isLoggedIn ? (
              <>
                <NavLink
                  to="/profile"
                  className="p-2 rounded-full border border-gray-400"
                >
                  <CircleUserRound className="bg-transparent h-[32px] w-[32px]" />
                </NavLink>
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("role");
                    setIsLoggedIn(false);
                  }}
                  className="bg-red-500 text-white py-2 px-4 rounded-full"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowSignIn(true)}
                className="bg-web-primary text-l font-bold text-gray-700 py-2 border border-gray-800 px-4 rounded-full px-5 flex items-center space-x-1 transition-colors"
              >
                <span className="bg-transparent h-[24px]">Sign In</span>
                <CircleUserRound className="bg-transparent" />
              </button>
            )}
          </div>
        </div>
      </div>
      {showSignIn && (
        <SignIn
          onClose={() => setShowSignIn(false)}
          setShowSignUp={setShowSignUp}
        />
      )}
      {showSignUp && (
        <SignUp
          onClose={() => setShowSignUp(false)}
          setShowSignIn={setShowSignIn}
        />
      )}
    </div>
  );
};

export default NavBar;
