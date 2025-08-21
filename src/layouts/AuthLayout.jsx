import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-tr from-blue-500 to-purple-600">
        <img
          src="/logo.svg"
          alt="Logo"
          className="w-32 h-auto"
        />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center px-4">
        <div className="w-full max-w-md min-h-[500px] flex items-center justify-center p-6 bg-white dark:bg-gray-800 shadow-xl rounded-lg">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
