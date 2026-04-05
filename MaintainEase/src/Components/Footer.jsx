import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBuilding, FaHeart, FaGem } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" }
  ];

  const services = [
    "Complaint Management",
    "Technician Assignment",
    "Real-time Chat",
    "Analytics Dashboard",
    "Smart Notifications",
    "Payment Integration"
  ];

  return (
    <footer className="bg-slate-800 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-blue-500 rounded-lg flex items-center justify-center">
                <FaGem className="text-white text-xl" />
              </div>
              <span className="text-2xl font-bold text-white">
                MaintainEase
              </span>
            </div>
            <p className="text-slate-300 mb-4">
              The ultimate apartment management system connecting residents, technicians, and admins seamlessly.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-teal-600 transition">
                <FaFacebook className="text-slate-300" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-teal-600 transition">
                <FaTwitter className="text-slate-300" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-teal-600 transition">
                <FaLinkedin className="text-slate-300" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-teal-600 transition">
                <FaInstagram className="text-slate-300" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-teal-600 transition">
                <FaGithub className="text-slate-300" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="text-slate-300 hover:text-teal-400 transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index} className="text-slate-300 hover:text-teal-400 transition cursor-pointer">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-slate-300">
                <FaMapMarkerAlt className="text-teal-400" />
                <span>123 Business Avenue, Tech Park, Mumbai - 400001</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <FaEnvelope className="text-teal-400" />
                <a href="mailto:support@maintainease.com" className="hover:text-teal-400">
                  support@maintainease.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <FaPhone className="text-teal-400" />
                <a href="tel:+919876543210" className="hover:text-teal-400">
                  +91 98765 43210
                </a>
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="font-semibold text-white mb-2">Subscribe to Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-l-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-teal-400"
                />
                <button className="bg-gradient-to-r from-teal-500 to-blue-500 px-4 py-2 rounded-r-lg hover:shadow-md transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © {currentYear} MaintainEase. All rights reserved.
            </p>
            <p className="text-slate-400 text-sm flex items-center gap-1">
              Made with <FaHeart className="text-teal-400 animate-pulse" /> by MaintainEase Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;