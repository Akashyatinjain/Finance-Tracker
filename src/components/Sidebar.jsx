import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaMoneyCheckAlt,
  FaRegCreditCard,
  FaChartLine,
  FaUserTie,
} from 'react-icons/fa';

const Sidebar = () => {
  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-md transition font-medium
     ${isActive 
       ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-white' 
       : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'}`;

  return (
    <aside className="w-64 min-h-screen bg-gray-50 dark:bg-gray-950 p-4 border-r dark:border-gray-800 shadow-sm">
      <nav className="space-y-2">
        <NavLink to="/app" end className={linkClasses}>
          <FaTachometerAlt className="text-blue-500" />
          Dashboard
        </NavLink>
        <NavLink to="/app/transactions" className={linkClasses}>
          <FaMoneyCheckAlt className="text-yellow-500" />
          Transactions
        </NavLink>
        <NavLink to="/app/subscriptions" className={linkClasses}>
          <FaRegCreditCard className="text-purple-500" />
          Subscriptions
        </NavLink>
        <NavLink to="/app/reports" className={linkClasses}>
          <FaChartLine className="text-green-500" />
          Reports
        </NavLink>
        <NavLink to="/app/account" className={linkClasses}>
          <FaUserTie className="text-indigo-500" />
          Account
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
