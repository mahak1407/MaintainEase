import React from "react";
import { Link } from "react-router-dom";
import { 
  FaUsers, 
  FaBuilding, 
  FaTrophy, 
  FaHeart, 
  FaRocket, 
  FaCheckCircle,
  FaQuoteLeft,
  FaAward,
  FaGlobe,
  FaClock,
  FaShieldAlt
} from "react-icons/fa";
import { motion } from "framer-motion";
import Navbar from "../Components/Header";
import Footer from "../Components/Footer";

const AboutPage = () => {
  const teamMembers = [
    { name: "Rahul Mehta", role: "CEO & Founder", image: "https://randomuser.me/api/portraits/men/32.jpg", bio: "10+ years in property management tech" },
    { name: "Priya Sharma", role: "CTO", image: "https://randomuser.me/api/portraits/women/68.jpg", bio: "AI and Machine Learning expert" },
    { name: "Amit Kumar", role: "Head of Product", image: "https://randomuser.me/api/portraits/men/45.jpg", bio: "Product design specialist" },
    { name: "Neha Gupta", role: "Customer Success", image: "https://randomuser.me/api/portraits/women/23.jpg", bio: "Ensuring customer happiness" }
  ];

  const milestones = [
    { year: "2020", title: "Company Founded", desc: "Started with a vision to transform property management", icon: FaRocket },
    { year: "2021", title: "First 100 Properties", desc: "Reached 100 properties within first year", icon: FaBuilding },
    { year: "2022", title: "AI Integration", desc: "Launched AI-powered technician assignment", icon: FaUsers },
    { year: "2023", title: "500+ Properties", desc: "Expanded to 500+ properties across India", icon: FaTrophy }
  ];

  const values = [
    { icon: FaHeart, title: "Customer First", desc: "We prioritize our customers' needs above everything else" },
    { icon: FaShieldAlt, title: "Trust & Security", desc: "Your data security is our top priority" },
    { icon: FaRocket, title: "Innovation", desc: "Continuously improving with cutting-edge technology" },
    { icon: FaUsers, title: "Community", desc: "Building stronger communities through better management" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-teal-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-teal-200 rounded-full filter blur-3xl opacity-30"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-30"></div>
        </div>
        
        <div className="relative container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 shadow-sm">
              <FaHeart className="text-teal-600" />
              <span className="text-sm font-semibold text-teal-600">Our Story</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-slate-800 mb-6">
              Revolutionizing Property
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600"> Management</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We're on a mission to make apartment management seamless, efficient, and enjoyable for everyone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Our Mission</h2>
              <p className="text-lg text-slate-600 mb-6">
                To empower property managers and residents with cutting-edge technology that simplifies daily operations, 
                enhances communication, and builds stronger communities.
              </p>
              <div className="space-y-4">
                {[
                  "Simplify complaint management process",
                  "Reduce response time by 70%",
                  "Improve resident satisfaction",
                  "Enable data-driven decision making"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <FaCheckCircle className="text-teal-500" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl p-1">
                <img 
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop"
                  alt="Team working"
                  className="rounded-xl w-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Properties", icon: FaBuilding },
              { number: "10K+", label: "Active Users", icon: FaUsers },
              { number: "98%", label: "Satisfaction", icon: FaTrophy },
              { number: "24/7", label: "Support", icon: FaClock }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex p-3 bg-white rounded-xl mb-3 shadow-sm">
                  <stat.icon className="text-2xl text-teal-600" />
                </div>
                <div className="text-3xl font-bold text-slate-800">{stat.number}</div>
                <div className="text-slate-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Our Core Values</h2>
            <p className="text-lg text-slate-600">The principles that guide everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 bg-slate-50 rounded-xl hover:bg-white hover:shadow-md transition border border-slate-100"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-teal-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="text-2xl text-teal-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{value.title}</h3>
                <p className="text-slate-600">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Meet Our Leadership Team</h2>
            <p className="text-lg text-slate-600">Passionate experts dedicated to your success</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition border border-slate-100"
              >
                <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                <h3 className="text-xl font-bold text-slate-800">{member.name}</h3>
                <p className="text-teal-600 mb-2">{member.role}</p>
                <p className="text-slate-500 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Our Journey</h2>
            <p className="text-lg text-slate-600">Key milestones in our growth story</p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-teal-400 to-blue-400 hidden lg:block"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative lg:flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  <div className="lg:w-1/2 p-6">
                    <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg flex items-center justify-center">
                          <milestone.icon className="text-white text-xl" />
                        </div>
                        <span className="text-2xl font-bold text-teal-600">{milestone.year}</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">{milestone.title}</h3>
                      <p className="text-slate-600">{milestone.desc}</p>
                    </div>
                  </div>
                  <div className="hidden lg:block lg:w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Join Us in Our Mission</h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Be part of the property management revolution. Start your journey with MaintainEase today.
            </p>
            <Link to="/signup" className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition">
              Get Started <FaRocket />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;