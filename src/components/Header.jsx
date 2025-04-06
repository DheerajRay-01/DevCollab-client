import React, { useState, useEffect, useRef } from "react";
import { useNavigate, NavLink, useParams } from "react-router";
import { FiMenu, FiX, FiSearch, FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import { useSelector } from "react-redux";

function Header() {

  const user = useSelector((state) => state.user?.user?.user);

  const imgURL = user?.avatar_url || "./src/assets/avtar.png" || "https://justdataplease.com/static/static/images/avatar/github.jpg";

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hasShadow, setHasShadow] = useState(false);
  const dropdownRef = useRef(null);
  


  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    function handleEscapeKey(event) {
      if (event.key === "Escape") {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 bg-[#1E293B] text-white px-6 py-3 flex items-center justify-between 
      transition-shadow duration-300 ${hasShadow ? "shadow-lg" : "shadow-none"}`}
    >
      {/* Left - Logo & Mobile Menu */}
      <div className="flex items-center gap-6">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none transition-transform transform hover:scale-110"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Logo */}
        <div
          className="text-2xl font-bold text-indigo-400 cursor-pointer transition-all hover:text-indigo-300"
          onClick={() => navigate("/")}
        >
          DevCollab
        </div>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex space-x-6">
        {["Explore", "Create Post", "Saved", "My Repos"].map((item, index) => (
          <li key={index}>
            <NavLink
              to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all flex items-center ${
                  isActive ? "bg-gray-800 text-indigo-400" : "hover:text-gray-300"
                }`
              }
            >
              {item}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Right - Search & Profile */}
      <div className="flex items-center gap-4">
        {/* Search Bar (Hidden on Mobile) */}
        <div className="relative hidden md:flex items-center bg-gray-700 px-4 py-2 rounded-md shadow-md">
          <FiSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-white placeholder-gray-400 w-36 md:w-48 focus:ring-0 focus:w-56 transition-all duration-300"
          />
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          {/* Profile Avatar */}
          <img
            onClick={() => setDropdownOpen(!dropdownOpen)}
            src={imgURL}
            alt="User Avatar"
            className="h-10 w-10 rounded-full border-2 border-gray-500 cursor-pointer transition-all hover:scale-105 hover:shadow-lg"
          />

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 z-10 w-48 bg-white text-black rounded-lg shadow-xl border border-gray-200 opacity-0 animate-fadeIn">
              <ul className="py-2">
                <li
                  onClick={() => {
                    navigate(`/profile/my-profile/${user?.login}`);
                    setDropdownOpen(false);
                  }}
                  className="px-4 py-2 flex items-center gap-2 hover:bg-gray-200 cursor-pointer transition-all"
                >
                  <FiUser /> Profile
                </li>
                <li
                  onClick={() => {
                    navigate("/settings");
                    setDropdownOpen(false);
                  }}
                  className="px-4 py-2 flex items-center gap-2 hover:bg-gray-200 cursor-pointer transition-all"
                >
                  <FiSettings /> Settings
                </li>
                <li
                  onClick={() => {
                    navigate("/logout");
                    setDropdownOpen(false);
                  }}
                  className="px-4 py-2 flex items-center gap-2 hover:bg-red-500 hover:text-white cursor-pointer transition-all"
                >
                  <FiLogOut /> Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#1E293B] md:hidden shadow-lg transition-all duration-300 opacity-0 animate-slideDown">
          <ul className="flex flex-col space-y-2 p-4">
            {["Explore", "Create Post", "Saved", "My Repos"].map((item, index) => (
              <li key={index}>
                <NavLink
                  to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2 text-white hover:bg-gray-700 rounded transition-all"
                >
                  {item}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Header;
