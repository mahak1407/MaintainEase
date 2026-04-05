import React, { useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import maintainance from '../assets/maintainance.json'

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <motion.div
        className="w-1/2 bg-gray-100 flex flex-col justify-center items-center p-12"
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-[490px]">
          <img src="public\LoginImage.png" alt="" />
        </div>

        <h1 className="text-4xl font-bold mt-6 text-indigo-600">
          Streamline your{" "}
          <span className="text-green-600">property</span> care today.
        </h1>

        <p className="text-gray-600 mt-4 max-w-md">
          Join the modern ecosystem for property maintenance. Fast,
          professional, and seamless for both owners and technicians.
        </p>

        <div className="flex gap-12 mt-8">
          <div>
            <p className="text-indigo-600 text-2xl font-bold">15k+</p>
            <p className="text-gray-500 text-sm">Properties</p>
          </div>

          <div>
            <p className="text-green-600 text-2xl font-bold">99.8%</p>
            <p className="text-gray-500 text-sm">Uptime</p>
          </div>
        </div>
      </motion.div>


      {/* RIGHT SIDE */}
      <motion.div
        className="w-1/2 flex justify-center items-center bg-white"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-[380px]">

          <h2 className="text-3xl font-bold mb-2">Welcome back</h2>
          <p className="text-gray-500 mb-8">
            Please enter your details to sign in.
          </p>

          <form className="space-y-5">

            {/* EMAIL */}
            <div>
              <label className="text-gray-600 text-sm">
                Email address
              </label>

              <input
                type="email"
                placeholder="name@company.com"
                className="w-full mt-2 px-4 py-3 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-gray-600 text-sm">
                Password
              </label>

              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3 text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>


            {/* REMEMBER */}
            <div className="flex justify-between text-sm text-gray-500">
              <label className="flex gap-2 items-center">
                <input type="checkbox" />
                Remember me
              </label>

              <a href="#" className="text-orange-500">
                Forgot password?
              </a>
            </div>

            {/* LOGIN BUTTON */}
            <button className="w-full py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">
              Login
            </button>
          </form>


          {/* DIVIDER */}
          <div className="flex items-center gap-4 my-6">
            <hr className="flex-1" />
            <span className="text-gray-400 text-sm">
              Or continue with
            </span>
            <hr className="flex-1" />
          </div>


          {/* SOCIAL LOGIN */}
          <div className="flex gap-4">

            <button className="flex-1 border rounded-full py-3 flex justify-center items-center gap-2 hover:bg-gray-100">
              <FcGoogle size={20} />
              Google
            </button>

            <button className="flex-1 border rounded-full py-3 flex justify-center items-center gap-2 hover:bg-gray-100">
              <FaLinkedin size={20} className="text-blue-600" />
              LinkedIn
            </button>

          </div>

          {/* FOOTER */}
          <p className="text-gray-400 text-xs text-center mt-8">
            © 2024 MaintainEase. All rights reserved.
          </p>

          <div className="flex justify-center gap-4 text-gray-400 text-xs mt-2">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Help Center</a>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;