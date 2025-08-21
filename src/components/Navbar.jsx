import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-white shadow px-6 py-3 flex justify-between items-center border-b border-gray-200">
    <NavLink
      to="/dashboard"
      className={({ isActive }) =>
        `text-xl font-bold transition-colors ${
          isActive ? 'text-blue-600' : 'text-gray-800 hover:text-blue-500'
        }`
      }
    >
      MyFinanceTracker
    </NavLink>

    <div className="flex items-center gap-4">
    </div>
  </nav>
);

export default Navbar;
