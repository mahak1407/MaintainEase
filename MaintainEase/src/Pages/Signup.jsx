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

import { useNavigate, Link } from "react-router-dom";
import {
  validateEmail,
  validateConfirmPassword,
  validatePassword,
  isNumberOnly,
  isCharacterOnly,
  validatePhone,
} from "../utils/validation";
import { useAuth } from "../context/AuthContext";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    unit: "",
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
    setApiError("");

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await register({
          name: form.name,
          email: form.email,
          phone: form.phone,
          apartmentNumber: form.unit,
          password: form.password,
        });
        navigate("/dashboard");
      } catch (err) {
        setApiError(err.response?.data?.message || "Registration failed. Try a different email.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* LEFT PANEL */}
      <div className="lg:w-1/2 bg-gradient-to-br from-teal-600 via-blue-600 to-slate-800 text-white flex flex-col justify-center items-center p-8 lg:p-12 relative overflow-hidden">
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
      <div className="lg:w-1/2 bg-gradient-to-br from-slate-50 via-teal-50/30 to-blue-50/40 flex justify-center items-center p-6 lg:p-10">
        <div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-10 w-full max-w-lg">
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Create Account
            </h2>
            <p className="text-gray-500">
              Join MaintainEase to manage your property effortlessly
            </p>
          </div>

          {apiError && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 text-red-800 text-sm px-4 py-3">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* FULL NAME */}
            <div>
              <div className="relative group">
                <FaUser className="absolute left-3 top-3 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  className={`w-full pl-10 p-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all
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
                <FaEnvelope className="absolute left-3 top-3 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full pl-10 p-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all
                    ${errors.email ? "border-red-500" : "border-gray-200"}`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Phone</label>
              <PhoneInput
                country={"in"}
                value={form.phone}
                onChange={handlePhoneChange}
                inputClass={`!w-full !pl-12 !py-3 !rounded-xl !border-2 ${
                  errors.phone ? "!border-red-500" : "!border-gray-200"
                }`}
                buttonClass="!rounded-l-xl !border-r-0"
                dropdownClass="!text-left"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            {/* UNIT */}
            <div>
              <div className="relative group">
                <FaHome className="absolute left-3 top-3 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
                <input
                  type="text"
                  name="unit"
                  placeholder="Apartment / unit number"
                  value={form.unit}
                  onChange={handleChange}
                  className={`w-full pl-10 p-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all
                    ${errors.unit ? "border-red-500" : "border-gray-200"}`}
                />
              </div>
              {errors.unit && <p className="text-red-500 text-xs mt-1">{errors.unit}</p>}
              <p className="text-xs text-slate-500 mt-2">
                Staff accounts (technician, admin) are created by your administrator for security.
              </p>
            </div>

            {/* PASSWORD */}
            <div>
              <div className="relative group">
                <FaLock className="absolute left-3 top-3 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-10 p-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all
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
                <FaLock className="absolute left-3 top-3 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-10 p-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all
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
              className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white p-3 rounded-xl font-semibold hover:opacity-95 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
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
            <Link to="/login" className="text-teal-600 hover:text-teal-800 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;