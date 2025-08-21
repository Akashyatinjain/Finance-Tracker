import React from "react";
import { Route, Routes } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

import Dashboard from "../pages/Dashboard";
import Transactions from "../pages/Transactions";
import Subscriptions from "../pages/Subscriptions";
import Reports from "../pages/Reports";
import Account from "../pages/Account";

const ProtectedLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {/* Header */}
      <Header />

      <div className="flex flex-1 pt-[70px]">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-4 overflow-auto">
            <Routes>
              {/* All protected routes under /app */}
              <Route path="/" element={<Dashboard />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="subscriptions" element={<Subscriptions />} />
              <Route path="reports" element={<Reports />} />
              <Route path="account" element={<Account />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ProtectedLayout;
