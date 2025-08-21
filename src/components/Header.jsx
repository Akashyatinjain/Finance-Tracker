import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  SignInButton,
  SignOutButton,
  UserButton,
  useUser
} from '@clerk/clerk-react';
import ThemeToggle from './ThemeToggle'; // 👈 import
import logo from '../assets/logo.svg';
import { SlCalender } from "react-icons/sl";

const Header = () => {
  const { isLoaded, isSignedIn } = useUser();
  const location = useLocation();

  if (!isLoaded) return null;

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return 'Dashboard';
      case '/transactions': return 'Transactions';
      case '/subscriptions': return 'Subscriptions';
      case '/reports': return 'Reports';
      case '/account': return 'Account';
      default: return '';
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 h-16 flex items-center justify-between px-6 bg-white border-b shadow-sm dark:bg-gray-900 dark:text-white">
      
      {/* Left Side: Logo + Welcome + Date */}
      <div className="flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-10 w-10" />
          <div className="flex flex-col">
            <span className="text-lg font-bold">Budget Tracker</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Welcome back, Akash 👋
            </span>
          </div>
        </Link>

        {/* Calendar & Date */}
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <SlCalender className="text-xl" />
          <span className="text-sm font-medium">
            {new Date().toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}
          </span>
        </div>
      </div>

      {/* Center: Page Title */}
      <div className="absolute left-1/2 transform -translate-x-1/2 text-gray-800 dark:text-gray-200 text-lg font-medium hidden md:block">
        {getPageTitle()}
      </div>

      {/* Right Side: Theme & Auth */}
      <div className="flex items-center gap-3">
        <ThemeToggle />
        {!isSignedIn ? (
          <SignInButton mode="modal" forceRedirectUrl="#/dashboard">
            <button className="px-4 py-1.5 bg-black text-white text-sm rounded-md hover:bg-gray-900">
              Log In
            </button>
          </SignInButton>
        ) : (
          <>
            <UserButton afterSignOutUrl="/" />
            <SignOutButton asChild>
              <button className="h-9 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition">
                Sign Out
              </button>
            </SignOutButton>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
