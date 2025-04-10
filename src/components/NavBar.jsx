import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = ({ user, onSignOut }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-green-100 border-2 rounded-md border-green-700 text-green-900 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          IbadanSITI
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {user ? (
            <>
              <span className="font-medium">{user.name}</span>
              <span className="text-sm font-medium">{user.email}</span>
              <button
                onClick={onSignOut}
                className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-700"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/" className="text-white">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 p-4 bg-blue-700 flex flex-col space-y-2">
          {user ? (
            <>
              <span className="font-medium">{user.name}</span>
              <span className="text-sm text-gray-200">{user.email}</span>
              <button
                onClick={onSignOut}
                className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-700"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/login" className="text-white">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
