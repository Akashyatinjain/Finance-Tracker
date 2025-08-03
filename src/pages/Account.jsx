import React from 'react';
import { FaUserTie } from 'react-icons/fa';

const Account = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
        <FaUserTie className="text-blue-600" />
        Account Settings
      </h2>

      {/* Sample Account Info Section */}
      <div className="bg-white shadow-md p-4 rounded-md">
        <p className="text-gray-700">Welcome to your account settings page.</p>
        <p className="text-sm text-gray-500 mt-1">Here you can manage your profile, password, and preferences.</p>
      </div>
    </div>
  );
};

export default Account;
