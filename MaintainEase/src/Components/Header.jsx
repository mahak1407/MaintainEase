import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaUser, FaSignInAlt, FaUserPlus, FaHome, FaInfoCircle, FaEnvelope, FaBuilding, FaGem } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const isLoggedIn = Boolean(user);

  const navLinks = [
    { name: "Home", path: "/", icon: FaHome },
    { name: "Features", path: "/features", icon: FaBuilding },
    { name: "About", path: "/about", icon: FaInfoCircle },
    { name: "Contact", path: "/contact", icon: FaEnvelope }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-100">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg flex items-center justify-center transform group-hover:rotate-6 transition shadow-sm">
              <FaGem className="text-white text-xl" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              MaintainEase
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="flex items-center gap-2 text-slate-600 hover:text-teal-600 transition-colors font-medium"
              >
                <link.icon className="text-sm" />
                {link.name}
              </Link>
            ))}
            
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/dashboard"
                  className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:shadow-md transition"
                >
                  Dashboard
                </Link>
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                  <FaUser className="text-slate-600" />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-4 py-2 text-teal-600 border-2 border-teal-600 rounded-lg hover:bg-teal-600 hover:text-white transition"
                >
                  <FaSignInAlt /> Login
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg hover:shadow-md transition"
                >
                  <FaUserPlus /> Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-600 hover:text-teal-600 transition"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-slate-100">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="flex items-center gap-2 py-3 text-slate-600 hover:text-teal-600 transition"
                onClick={() => setIsOpen(false)}
              >
                <link.icon /> {link.name}
              </Link>
            ))}
            
            {isLoggedIn ? (
              <Link
                to="/dashboard"
                className="block w-full mt-4 text-center bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
            ) : (
              <div className="space-y-3 mt-4">
                <Link
                  to="/login"
                  className="block w-full text-center px-4 py-2 text-teal-600 border-2 border-teal-600 rounded-lg hover:bg-teal-600 hover:text-white transition"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block w-full text-center px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg hover:shadow-md transition"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;