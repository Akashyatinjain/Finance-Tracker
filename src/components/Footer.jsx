import React from "react";
import { FaMoneyBillWave, FaRegEnvelope, FaShieldAlt } from "react-icons/fa";
import { MdOutlineGavel } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-100 via-green-50 to-green-100 border-t border-green-200 mt-10 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between text-sm text-green-800">
        
        <div className="flex items-center space-x-2 mb-2 md:mb-0">
          <FaMoneyBillWave className="text-green-600 text-lg" />
          <p className="font-semibold">
            © {new Date().getFullYear()} Finance Tracker — Track every rupee smartly!
          </p>
        </div>
        
        <div className="flex space-x-5">
          <a href="/privacy" className="flex items-center hover:text-green-600">
            <FaShieldAlt className="mr-1" />
            Privacy
          </a>
          <a href="/terms" className="flex items-center hover:text-green-600">
            <MdOutlineGavel className="mr-1" />
            Terms
          </a>
          <a href="mailto:hydargamin14@gmail.com" className="flex items-center hover:text-green-600">
            <FaRegEnvelope className="mr-1" />
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
