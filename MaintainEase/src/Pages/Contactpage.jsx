import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaClock, 
  FaFacebook, 
  FaTwitter, 
  FaLinkedin, 
  FaInstagram,
  FaCheckCircle,
  FaSpinner
} from "react-icons/fa";
import { motion } from "framer-motion";
import Navbar from "../Components/Header";
import Footer from "../Components/Footer";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Contact form submitted:", formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const contactInfo = [
    { icon: FaEnvelope, title: "Email Us", details: "support@maintainease.com", link: "mailto:support@maintainease.com", color: "text-teal-600" },
    { icon: FaPhone, title: "Call Us", details: "+91 98765 43210", link: "tel:+919876543210", color: "text-blue-600" },
    { icon: FaMapMarkerAlt, title: "Visit Us", details: "123 Business Avenue, Tech Park, Mumbai - 400001", color: "text-slate-600" },
    { icon: FaClock, title: "Working Hours", details: "Mon-Fri: 9AM - 6PM", color: "text-cyan-600" }
  ];

  const faqs = [
    { q: "How do I get started?", a: "Simply sign up for a free trial and start exploring the platform. No credit card required." },
    { q: "Is there a mobile app?", a: "Yes, we have mobile apps for both iOS and Android platforms." },
    { q: "What kind of support do you offer?", a: "We offer 24/7 email support and during business hours phone support." },
    { q: "Can I cancel anytime?", a: "Yes, you can cancel your subscription at any time with no hidden fees." }
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
              <FaEnvelope className="text-teal-600" />
              <span className="text-sm font-semibold text-teal-600">Get in Touch</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-slate-800 mb-6">
              We'd Love to
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600"> Hear From You</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Have questions? We're here to help. Reach out to us anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.link}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition border border-slate-100 group"
              >
                <div className={`w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gradient-to-r group-hover:from-teal-500 group-hover:to-blue-500 transition`}>
                  <info.icon className={`text-2xl ${info.color} group-hover:text-white transition`} />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{info.title}</h3>
                <p className="text-slate-600 text-sm">{info.details}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Send Us a Message</h2>
              
              {isSubmitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                  <FaCheckCircle className="text-green-500" />
                  <span className="text-green-700">Thank you! We'll get back to you soon.</span>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-slate-700 text-sm font-semibold mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-teal-400 transition"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label className="block text-slate-700 text-sm font-semibold mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-teal-400 transition"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-slate-700 text-sm font-semibold mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-teal-400 transition"
                    placeholder="How can we help?"
                  />
                </div>
                
                <div>
                  <label className="block text-slate-700 text-sm font-semibold mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full p-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-teal-400 transition"
                    placeholder="Tell us more..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white p-3 rounded-lg font-semibold hover:shadow-md transition disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <FaSpinner className="animate-spin" /> Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
              
              {/* Social Links */}
              <div className="mt-8">
                <p className="text-slate-600 mb-4">Connect with us on social media</p>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-teal-600 hover:text-white transition">
                    <FaFacebook />
                  </a>
                  <a href="#" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-teal-600 hover:text-white transition">
                    <FaTwitter />
                  </a>
                  <a href="#" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-teal-600 hover:text-white transition">
                    <FaLinkedin />
                  </a>
                  <a href="#" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-teal-600 hover:text-white transition">
                    <FaInstagram />
                  </a>
                </div>
              </div>
            </motion.div>
            
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Find Us Here</h2>
              <div className="bg-slate-100 rounded-xl overflow-hidden h-96">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.563829127389!2d72.877232!3d19.075983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c7f1c8c9b8e1%3A0x8b9c9c9c9c9c9c9c!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Office Location"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-slate-600">Find quick answers to common questions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition border border-slate-100"
              >
                <h3 className="text-lg font-bold text-slate-800 mb-2">{faq.q}</h3>
                <p className="text-slate-600">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Still Have Questions?</h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Our support team is always ready to assist you. Reach out anytime.
            </p>
            <a href="mailto:support@maintainease.com" className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition">
              Email Support <FaEnvelope />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;