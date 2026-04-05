import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  FaBuilding, 
  FaTools, 
  FaComments, 
  FaBell, 
  FaChartLine, 
  FaShieldAlt,
  FaRocket,
  FaCheckCircle,
  FaUsers,
  FaClock,
  FaArrowRight,
  FaStar,
  FaQuoteLeft,
  FaGem
} from "react-icons/fa";
import { motion } from "framer-motion";
import Navbar from "../Components/Header";
import Footer from "../Components/Footer";

const HomePage = () => {
  const features = [
    { icon: FaBuilding, title: "Smart Complaint Management", desc: "Raise, track, and resolve issues instantly with real-time updates", color: "from-teal-400 to-cyan-500" },
    { icon: FaTools, title: "Automated Technician Assignment", desc: "AI-powered system assigns the right technician based on skills", color: "from-slate-400 to-gray-500" },
    { icon: FaComments, title: "Real-time Chat System", desc: "Direct communication between residents, admins, and technicians", color: "from-blue-400 to-indigo-500" },
    { icon: FaBell, title: "Smart Notifications", desc: "Get instant alerts via email, SMS, and in-app notifications", color: "from-teal-500 to-green-400" },
    { icon: FaChartLine, title: "Analytics Dashboard", desc: "Track performance metrics with beautiful charts and reports", color: "from-slate-500 to-gray-600" },
    { icon: FaShieldAlt, title: "Secure & Reliable", desc: "Enterprise-grade security with role-based access control", color: "from-blue-500 to-cyan-400" }
  ];

  const stats = [
    { number: "500+", label: "Properties", icon: FaBuilding, color: "text-teal-600", bg: "bg-teal-50" },
    { number: "10K+", label: "Happy Residents", icon: FaUsers, color: "text-blue-600", bg: "bg-blue-50" },
    { number: "98%", label: "Satisfaction Rate", icon: FaStar, color: "text-slate-600", bg: "bg-slate-50" },
    { number: "15min", label: "Avg Response Time", icon: FaClock, color: "text-cyan-600", bg: "bg-cyan-50" }
  ];

  const testimonials = [
    { name: "Rahul Sharma", role: "Resident, Green Heights", text: "MaintainEase transformed how we manage our apartment. Issues get resolved in hours, not days!", rating: 5, image: "https://randomuser.me/api/portraits/men/1.jpg" },
    { name: "Priya Patel", role: "Admin, Sunrise Towers", text: "The analytics dashboard is a game-changer. We can track everything from one place!", rating: 5, image: "https://randomuser.me/api/portraits/women/2.jpg" },
    { name: "Amit Kumar", role: "Technician", text: "The automated assignment system makes my work organized and efficient.", rating: 5, image: "https://randomuser.me/api/portraits/men/3.jpg" }
  ];

  const steps = [
    { step: "01", title: "Register Your Account", desc: "Sign up as Resident, Technician, or Admin", icon: FaUsers, color: "bg-teal-500" },
    { step: "02", title: "Raise a Complaint", desc: "Describe the issue with images and priority", icon: FaBuilding, color: "bg-blue-500" },
    { step: "03", title: "AI-Powered Assignment", desc: "System assigns the right technician automatically", icon: FaRocket, color: "bg-slate-500" },
    { step: "04", title: "Track & Resolve", desc: "Monitor progress in real-time. Create account and get start", icon: FaCheckCircle, color: "bg-cyan-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-teal-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Soft Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-teal-200 rounded-full filter blur-3xl opacity-30"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-30"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-slate-200 rounded-full filter blur-3xl opacity-20"></div>
        </div>
        
        <div className="relative container mx-auto px-6 py-20 lg:py-32">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 shadow-sm">
                  <span className="text-sm font-semibold text-teal-600">🚀 Next-Gen Property Management</span>
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight text-slate-800">
                  Manage Your Apartment
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600"> Effortlessly</span>
                </h1>
                <p className="text-xl mb-8 text-slate-600">
                  The ultimate platform connecting residents, technicians, and admins for seamless apartment maintenance and management.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link to="/signup" className="group bg-gradient-to-r from-teal-600 to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all transform hover:scale-105 inline-flex items-center gap-2">
                    Get Started Free <FaArrowRight className="group-hover:translate-x-1 transition" />
                  </Link>
                  <Link to="/login" className="border-2 border-slate-300 text-slate-700 px-8 py-3 rounded-full font-semibold hover:bg-slate-100 transition-all">
                    Login
                  </Link>
                </div>
                <div className="flex items-center gap-6 mt-8 justify-center lg:justify-start">
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map((i) => (
                      <img key={i} src={`https://randomuser.me/api/portraits/${i%2===0 ? 'women' : 'men'}/${i}.jpg`} alt="User" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                    ))}
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold text-slate-800">10,000+ Active Users</div>
                    <div className="text-slate-500">Trusted by 500+ properties</div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop"
                    alt="Modern Apartment"
                    className="w-full h-auto"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center">
                      <FaCheckCircle className="text-white text-2xl" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-800">98% Satisfaction</div>
                      <div className="text-sm text-slate-500">Based on 5,000+ reviews</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#f8fafc" fillOpacity="1" d="M0,192L48,197.3C96,203,192,213,288,208C384,203,480,181,576,181.3C672,181,768,203,864,208C960,213,1056,203,1152,186.7C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition border border-slate-100"
              >
                <div className={`inline-flex p-4 ${stat.bg} rounded-2xl mb-4`}>
                  <stat.icon className={`text-4xl ${stat.color}`} />
                </div>
                <div className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.number}</div>
                <div className="text-slate-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Powerful Features</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Everything you need to manage your apartment community efficiently
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-slate-50 rounded-2xl p-6 hover:bg-white hover:shadow-lg transition-all transform hover:-translate-y-2 border border-slate-100"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition shadow-sm`}>
                  <feature.icon className="text-2xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-teal-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">How It Works</h2>
            <p className="text-xl text-slate-600">Simple 4-step process to resolve any maintenance issue</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/4 left-full w-full h-0.5 bg-gradient-to-r from-teal-300 to-blue-300 -translate-y-1/2"></div>
                )}
                <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition border border-slate-100">
                  <div className={`inline-flex w-20 h-20 ${step.color} rounded-2xl items-center justify-center mb-4 mx-auto shadow-sm`}>
                    <step.icon className="text-3xl text-white" />
                  </div>
                  <div className="text-2xl font-bold text-teal-600 mb-2">{step.step}</div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{step.title}</h3>
                  <p className="text-slate-600">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">What Our Users Say</h2>
            <p className="text-xl text-slate-600">Loved by thousands of users across the globe</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-50 rounded-2xl p-6 hover:shadow-lg transition border border-slate-100"
              >
                <FaQuoteLeft className="text-3xl text-teal-400 mb-4" />
                <p className="text-slate-600 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full border-2 border-teal-400" />
                  <div>
                    <div className="font-bold text-slate-800">{testimonial.name}</div>
                    <div className="text-sm text-slate-500">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    <section className="py-20">
  <div className="container mx-auto px-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-white rounded-2xl p-12 border-2 border-slate-100 shadow-sm hover:shadow-md transition">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="lg:w-2/3 text-center lg:text-left">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-3">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-slate-600">
              Join thousands of satisfied users and transform how you manage your apartment
            </p>
            <div className="flex items-center gap-4 mt-4 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {[1,2,3].map((i) => (
                  <img key={i} src={`https://randomuser.me/api/portraits/${i%2===0 ? 'women' : 'men'}/${i}.jpg`} alt="User" className="w-8 h-8 rounded-full border-2 border-white" />
                ))}
              </div>
              <span className="text-sm text-slate-500">Join 10,000+ happy users</span>
            </div>
          </div>
          
          <div className="lg:w-1/3">
            <Link 
              to="/signup" 
              className="group w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-600 to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all transform hover:scale-105"
            >
              Create Free Account 
              <FaArrowRight className="group-hover:translate-x-1 transition" />
            </Link>
            <p className="text-center text-sm text-slate-500 mt-3">
              Free 14-day trial. No credit card required
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
</section>

{/* 
<section className="py-20">
  <div className="container mx-auto px-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-slate-800 rounded-3xl p-12 shadow-xl">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Property Management?
          </h2>
          
          <p className="text-lg text-slate-300 mb-8">
            Join over 500+ properties already using MaintainEase to streamline their operations
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup" 
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-teal-400 to-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all transform hover:scale-105"
            >
              Create Free Account 
              <FaArrowRight className="group-hover:translate-x-1 transition" />
            </Link>
            
            <Link 
              to="/login" 
              className="inline-flex items-center gap-2 border-2 border-slate-600 text-slate-300 px-8 py-3 rounded-full font-semibold hover:bg-slate-700 hover:border-slate-500 transition-all"
            >
              Existing User? Login
            </Link>
          </div>
          
          <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-slate-700">
            <div>
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-sm text-slate-400">Properties</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">10K+</div>
              <div className="text-sm text-slate-400">Active Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">98%</div>
              <div className="text-sm text-slate-400">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
</section> */}



      <Footer />
    </div>
  );
};

export default HomePage;