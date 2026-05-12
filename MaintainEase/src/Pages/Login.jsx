import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <motion.div
        className="lg:w-1/2 bg-gradient-to-br from-teal-600 via-blue-600 to-slate-800 text-white flex flex-col justify-center p-10 lg:p-16 relative overflow-hidden"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-300 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-lg">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/80 mb-3">MaintainEase</p>
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            Apartment maintenance, <span className="text-teal-100">simplified.</span>
          </h1>
          <p className="mt-6 text-lg text-white/90">
            One workspace for residents, technicians, and administrators—aligned with your public site theme.
          </p>
          <div className="grid grid-cols-2 gap-6 mt-10">
            <div>
              <p className="text-3xl font-bold">Live</p>
              <p className="text-white/70 text-sm">Status & chat</p>
            </div>
            <div>
              <p className="text-3xl font-bold">Secure</p>
              <p className="text-white/70 text-sm">JWT & roles</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-slate-50 to-teal-50/40 p-8"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
          <h2 className="text-3xl font-bold text-slate-900">Welcome back</h2>
          <p className="text-slate-500 mt-2 mb-8">Sign in with your MaintainEase account.</p>

          {error && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 text-red-800 text-sm px-4 py-3">{error}</div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-medium text-slate-600">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Password</label>
              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="flex justify-between text-sm text-slate-500">
              <label className="flex gap-2 items-center">
                <input type="checkbox" className="rounded border-slate-300" />
                Remember me
              </label>
              <Link to="/forgot" className="text-teal-600 font-semibold hover:text-teal-800">
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold hover:opacity-95 disabled:opacity-60 transition shadow-md"
            >
              {loading ? "Signing in…" : "Login"}
            </button>
          </form>

          <p className="text-center text-slate-500 mt-8 text-sm">
            New here?{" "}
            <Link to="/signup" className="text-teal-600 font-semibold hover:underline">
              Create an account
            </Link>
          </p>
          <p className="text-center text-xs text-slate-400 mt-6">
            Demo: admin@maintainease.com / Admin@123 · tech@maintainease.com / Tech@123
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
