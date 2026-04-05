import React, { useState } from "react";
import { 
  FaEnvelope, 
  FaArrowLeft, 
  FaSpinner,
  FaCheckCircle,
  FaTimesCircle,
  FaPaperPlane,
  FaLock
} from "react-icons/fa";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!regex.test(email)) return "Invalid email address";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const emailError = validateEmail(email);
    if (emailError) {
      setErrors({ email: emailError });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Password reset requested for:", email);
      setIsEmailSent(true);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-white rounded-full filter blur-3xl opacity-10"></div>
      </div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 transform transition-all">
          
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              MaintainEase
            </div>
            <div className="h-1 w-20 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto mt-2 rounded-full"></div>
          </div>

          {!isEmailSent ? (
            <>
              <div className="text-center mb-8">
                <div className="bg-indigo-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaLock className="text-indigo-600 text-3xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Forgot Password?
                </h2>
                <p className="text-gray-500 mt-2 text-sm">
                  Enter your email to receive a reset link
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({});
                      }}
                      className={`w-full pl-10 p-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500
                        ${errors.email ? "border-red-500" : "border-gray-200"}`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <FaTimesCircle className="text-xs" /> {errors.email}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <FaSpinner className="animate-spin" /> Sending...
                    </span>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>

                <div className="text-center">
                  <a 
                    href="/login" 
                    className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 text-sm font-semibold"
                  >
                    <FaArrowLeft className="text-xs" /> Back to Login
                  </a>
                </div>
              </form>
            </>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheckCircle className="text-green-600 text-3xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Email Sent!
                </h2>
                <p className="text-gray-500 mt-2 text-sm">
                  Check your email for the reset link
                </p>
                <p className="text-indigo-600 font-semibold mt-3 text-sm break-all">
                  {email}
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => setIsEmailSent(false)}
                  className="w-full bg-gray-100 text-gray-700 p-3 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                >
                  Use Different Email
                </button>

                <a 
                  href="/login"
                  className="block text-center w-full border-2 border-indigo-600 text-indigo-600 p-3 rounded-xl font-semibold hover:bg-indigo-50 transition-all"
                >
                  Return to Login
                </a>
              </div>
            </>
          )}

          {/* Help text */}
          <p className="text-center text-xs text-gray-400 mt-6">
            Didn't receive the email? Check your spam folder or{" "}
            <a href="/support" className="text-indigo-600 hover:underline">
              contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;