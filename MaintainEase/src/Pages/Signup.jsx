import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaHome,
  FaSpinner
} from "react-icons/fa";

import { validateEmail,validateConfirmPassword,validatePassword ,isNumberOnly,isCharacterOnly} from "../utils/validation";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    unit: "",
    role: "Resident",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handlePhoneChange = (value) => {
    setForm({ ...form, phone: value });
  };

  const validateForm = () => {
    const newErrors = {
      name: isCharacterOnly(form.name, 2, 50),
      email: validateEmail(form.email),
      phone: validatePhone(form.phone, 10, 15),
      unit: isNumberOnly(form.unit, 1, 9999),
      password: validatePassword(form.password, 8, 50),
      confirmPassword: validateConfirmPassword(form.password, form.confirmPassword)
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some((err) => err);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        console.log("Form Submitted:", form);
        alert("Account created successfully!");
        setIsSubmitting(false);
        // Reset form if needed
        // setForm({ name: "", email: "", phone: "", unit: "", role: "Resident", password: "", confirmPassword: "" });
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* LEFT PANEL */}
      <div className="lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white flex flex-col justify-center items-center p-8 lg:p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-white rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="relative z-10 text-center">
          <div className="text-4xl lg:text-5xl font-bold mb-8">
            MaintainEase
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop"
              alt="Modern Apartment Building"
              className="w-full h-64 object-cover rounded-xl"
            />
          </div>
          
          <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
            Connecting Homes & Care
          </h2>
          
          <p className="text-center text-white/90 max-w-md mx-auto text-lg">
            The modern concierge platform for apartment maintenance.
            Seamlessly bridge the gap between residents and technicians.
          </p>
          
          <div className="flex justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm opacity-80">Properties</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">10k+</div>
              <div className="text-sm opacity-80">Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">98%</div>
              <div className="text-sm opacity-80">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="lg:w-1/2 bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center items-center p-6 lg:p-10">
        <div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-10 w-full max-w-lg">
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Create Account
            </h2>
            <p className="text-gray-500">
              Join MaintainEase to manage your property effortlessly
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* FULL NAME */}
            <div>
              <div className="relative group">
                <FaUser className="absolute left-3 top-3 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  className={`w-full pl-10 p-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all
                    ${errors.name ? "border-red-500" : "border-gray-200"}`}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <div className="relative group">
                <FaEnvelope className="absolute left-3 top-3 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full pl-10 p-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all
                    ${errors.email ? "border-red-500" : "border-gray-200"}`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>


            {/* UNIT + ROLE */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="relative group">
                  <FaHome className="absolute left-3 top-3 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                  <input
                    type="text"
                    name="unit"
                    placeholder="Unit #"
                    value={form.unit}
                    onChange={handleChange}
                    className={`w-full pl-10 p-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all
                      ${errors.unit ? "border-red-500" : "border-gray-200"}`}
                  />
                </div>
                {errors.unit && (
                  <p className="text-red-500 text-xs mt-1">{errors.unit}</p>
                )}
              </div>

              <div>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                >
                  <option value="Resident">🏠 Resident</option>
                  <option value="Technician">🔧 Technician</option>
                  <option value="Admin">👑 Admin</option>
                </select>
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <div className="relative group">
                <FaLock className="absolute left-3 top-3 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-10 p-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all
                    ${errors.password ? "border-red-500" : "border-gray-200"}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
              {form.password && !errors.password && (
                <p className="text-green-500 text-xs mt-1">✓ Password strength: Good</p>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <div className="relative group">
                <FaLock className="absolute left-3 top-3 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-10 p-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all
                    ${errors.confirmPassword ? "border-red-500" : "border-gray-200"}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <FaSpinner className="animate-spin" /> Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              <button type="button" className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all">
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                Google
              </button>
              <button type="button" className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all">
                <img src="https://github.com/favicon.ico" alt="GitHub" className="w-5 h-5" />
                GitHub
              </button>
            </div>
          </form>

          <p className="text-center text-gray-500 mt-8">
            Already have an account?{" "}
            <a href="/login" className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;