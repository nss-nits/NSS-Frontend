import React, { useState } from "react";
import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { IoMailOutline, IoLocationOutline } from "react-icons/io5";
import Logo from "../images/nss.png";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://nss-backend-az92.onrender.com/api/mail/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if(!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Failed to send message');
      }

      const data = await res.json();
      if (data.success || data.message) {
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } else {
      alert(" " + (data.message || "Unknown error"));
    }
    } catch (error) {
      console.error(error);
      alert("⚠️ Error sending message");
    }
  };
  


  const socialLinks = {
    facebook: "https://www.facebook.com/profile.php?id=61560321509500",
    instagram: "https://www.instagram.com/nss_nits/",
   
  };

  const importantLinks = [
    { name: "National Service Scheme", url: "https://project-nss.vercel.app/" },
    { name: "NIT Silchar", url: "http://www.nits.ac.in/" },
    { name: "Youth and Sports", url: "https://www.india.gov.in/topics/youth-sports" }
  ];

  const handleLinkClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 py-8">
          {/* Brand Section */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src={Logo}
                alt="NSS Logo"
                className="w-14 h-14 object-contain"
              />
              <div>
                <h3 className="text-lg font-bold leading-tight">NATIONAL SERVICE SCHEME</h3>
                <h4 className="text-blue-200 font-semibold text-base">NIT SILCHAR</h4>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <IoLocationOutline className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-300" />
                <span className="text-sm text-gray-200 leading-relaxed">
                  NIT SILCHAR<br />
                  Silchar-788010<br />
                  Assam, IN
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <IoMailOutline className="w-5 h-5 text-blue-300" />
                <span className="text-sm text-gray-200">nssnits@nits.ac.in</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-gradient-to-r after:from-cyan-400 after:to-blue-400">
                Follow Us
              </h4>
              <div className="flex space-x-3">
                {[
                  { Icon: FaFacebookF, color: "hover:bg-blue-600", key: "facebook" },
                  { Icon: FaInstagram, color: "hover:bg-pink-600", key: "instagram" },
                  
                ].map(({ Icon, color, key }) => (
                  <div
                    key={key}
                    className={`w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110 ${color}`}
                    onClick={() => handleLinkClick(socialLinks[key])}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 md:col-span-1">
            <div className="space-y-3">
              <h4 className="text-lg font-semibold relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-gradient-to-r after:from-cyan-400 after:to-blue-400">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {importantLinks.map((link, index) => (
                  <li
                    key={index}
                    className="group cursor-pointer transition-all duration-300 border-b border-white/10 pb-2 last:border-b-0"
                    onClick={() => handleLinkClick(link.url)}
                  >
                    <span className="text-gray-200 text-base group-hover:text-cyan-300 group-hover:translate-x-1 transition-all duration-300 block">
                      {link.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-5 md:col-span-2">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-gradient-to-r after:from-cyan-400 after:to-blue-400">
                Send us a Message
              </h4>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-200 block">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-sm"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-200 block">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-sm"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-200 block">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-sm"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-200 block">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-sm resize-none"
                    placeholder="Type your message here..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transform hover:-translate-y-0.5 transition-all duration-300 shadow-md hover:shadow-lg text-base"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/20 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-gray-300 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} National Service Scheme, NIT Silchar. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm">
              {["Privacy Policy", "Terms of Service", "Accessibility"].map((item, index) => (
                <span
                  key={index}
                  className="text-gray-300 hover:text-cyan-300 cursor-pointer transition-colors duration-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
