import React from "react";
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
  FaMobileAlt,
  FaDatabase,
  FaCloudUploadAlt,
  FaShieldVirus,
  FaHeadset,
  FaRobot,
  FaMoneyBillWave,
  FaFileAlt,
  FaStar
} from "react-icons/fa";
import { motion } from "framer-motion";
import Navbar from "../Components/Header";
import Footer from "../Components/Footer";

const FeaturesPage = () => {
  const mainFeatures = [
    {
      icon: FaBuilding,
      title: "Smart Complaint Management",
      desc: "Raise, track, and resolve maintenance issues instantly with real-time updates and status tracking.",
      features: ["Instant complaint registration", "Photo upload support", "Priority setting", "Real-time status updates"]
    },
    {
      icon: FaTools,
      title: "Automated Technician Assignment",
      desc: "AI-powered system automatically assigns the right technician based on skills, availability, and location.",
      features: ["Smart skill matching", "Workload balancing", "Location-based assignment", "Performance tracking"]
    },
    {
      icon: FaComments,
      title: "Real-time Chat System",
      desc: "Direct communication between residents, admins, and technicians for faster issue resolution.",
      features: ["Instant messaging", "File sharing", "Group chats", "Chat history"]
    },
    {
      icon: FaBell,
      title: "Smart Notifications",
      desc: "Get instant alerts via email, SMS, and in-app notifications for all important updates.",
      features: ["Email notifications", "SMS alerts", "Push notifications", "Custom preferences"]
    },
    {
      icon: FaChartLine,
      title: "Analytics Dashboard",
      desc: "Track performance metrics with beautiful charts and detailed reports for better decision making.",
      features: ["Real-time analytics", "Custom reports", "Performance metrics", "Trend analysis"]
    },
    {
      icon: FaShieldAlt,
      title: "Secure & Reliable",
      desc: "Enterprise-grade security with role-based access control and data encryption.",
      features: ["Role-based access", "Data encryption", "Secure authentication", "Regular backups"]
    }
  ];

  const additionalFeatures = [
    { icon: FaRobot, title: "AI-Powered Suggestions", desc: "Smart suggestions for complaint categorization and resolution" },
    { icon: FaMoneyBillWave, title: "Payment Integration", desc: "Seamless online payments for maintenance fees and utilities" },
    { icon: FaFileAlt, title: "Digital Documentation", desc: "Store and manage all property documents in one place" },
    { icon: FaHeadset, title: "24/7 Support", desc: "Round-the-clock customer support for all your needs" },
    { icon: FaMobileAlt, title: "Mobile Friendly", desc: "Fully responsive design works on all devices" },
    { icon: FaDatabase, title: "Data Backup", desc: "Automatic cloud backup for all your important data" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-teal-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-72 h-72 bg-teal-200 rounded-full filter blur-3xl opacity-30"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-30"></div>
        </div>
        
        <div className="relative container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 shadow-sm">
              <FaRocket className="text-teal-600" />
              <span className="text-sm font-semibold text-teal-600">Powerful Features</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-slate-800 mb-6">
              Everything You Need to
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600"> Manage Your Property</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Discover the complete suite of tools designed to streamline apartment management and enhance community living.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {mainFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition border border-slate-100"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="text-2xl text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                    <p className="text-slate-600 mb-4">{feature.desc}</p>
                    <ul className="space-y-2">
                      {feature.features.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                          <FaCheckCircle className="text-teal-500 text-xs" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">More Amazing Features</h2>
            <p className="text-lg text-slate-600">Everything you need in one powerful platform</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-50 rounded-xl p-6 hover:bg-white hover:shadow-md transition border border-slate-100"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-teal-100 to-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="text-xl text-teal-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-slate-800 rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Experience These Features?</h2>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              Start your free trial today and see why thousands of properties trust MaintainEase
            </p>
            <Link to="/signup" className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-400 to-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition">
              Start Free Trial <FaRocket />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FeaturesPage;