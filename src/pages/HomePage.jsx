import React from "react";
import { motion } from "framer-motion";
import { SignInButton, SignUpButton } from "@clerk/clerk-react";
import { FaWallet, FaChartPie, FaBell } from "react-icons/fa";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-r from-blue-700 via-teal-600 to-cyan-500 text-white overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-800 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-teal-700 rounded-full opacity-20 animate-pulse"></div>

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6 relative z-10">
        <h1 className="text-3xl font-bold">FinTrack</h1>
        <div className="space-x-4">
          <SignInButton>
            <button className="px-5 py-2 rounded-lg bg-white text-blue-700 font-semibold shadow-lg hover:bg-gray-100 transition">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton>
            <button className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-500 transition">
              Sign Up
            </button>
          </SignUpButton>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-8 md:px-16 py-16 relative z-10">
        {/* Text */}
        <div className="max-w-xl space-y-6">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold leading-tight"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            Smart Finance <span className="text-yellow-400">Tracking</span> Made Easy
          </motion.h1>
          <motion.p
            className="text-gray-200 text-lg md:text-xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Manage your expenses, bills, and savings in one intuitive dashboard. 
            Stay in control of your finances effortlessly.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.6 }}
          >
            <SignUpButton>
              <button className="px-8 py-3 bg-yellow-400 text-blue-900 font-bold rounded-lg shadow-lg hover:bg-yellow-300 transition">
                Get Started
              </button>
            </SignUpButton>
          </motion.div>
        </div>

        {/* Hero Image / Chart */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center mb-12 md:mb-0"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="w-80 h-80 bg-white rounded-3xl shadow-2xl flex items-center justify-center text-blue-700 text-6xl font-bold animate-bounce">
            💰
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="px-8 md:px-16 py-16 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-12">Why Choose FinTrack?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center text-center hover:scale-105 transition"
            whileHover={{ scale: 1.05 }}
          >
            <FaWallet className="text-yellow-400 text-5xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Expense Tracking</h3>
            <p>Automatically categorize and monitor your spending with ease.</p>
          </motion.div>
          <motion.div
            className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center text-center hover:scale-105 transition"
            whileHover={{ scale: 1.05 }}
          >
            <FaBell className="text-yellow-400 text-5xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Bill Reminders</h3>
            <p>Never miss a payment thanks to smart, customizable alerts.</p>
          </motion.div>
          <motion.div
            className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center text-center hover:scale-105 transition"
            whileHover={{ scale: 1.05 }}
          >
            <FaChartPie className="text-yellow-400 text-5xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI Analytics</h3>
            <p>Visualize your spending habits and make smarter financial decisions.</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-200 relative z-10">
        © {new Date().getFullYear()} FinTrack. All rights reserved.
      </footer>
    </div>
  );
}
