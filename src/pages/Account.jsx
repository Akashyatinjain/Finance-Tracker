import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const AccountSettings = () => {
  const { isLoaded, user } = useUser(); 

  const [account, setAccount] = useState({
    email_reports: false,
    transaction_alerts: false,
    default_currency: "INR",
    week_starts_on: "Monday",
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Fetch account settings from backend
  useEffect(() => {
    if (!isLoaded) return;

    const fetchAccount = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/api/account`);
        setAccount({
          email_reports: res.data.email_reports ?? false,
          transaction_alerts: res.data.transaction_alerts ?? false,
          default_currency: res.data.default_currency || "INR",
          week_starts_on: res.data.week_starts_on || "Monday",
        });
        setMessage("");
      } catch (err) {
        console.error("Error fetching account:", err.response || err.message);
        setMessage("⚠ Failed to load account settings");
        setMessageType("error");
      } finally {
        setLoading(false);
      }
    };

    fetchAccount();
  }, [isLoaded]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAccount((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Save updated settings
  const handleSave = async () => {
    try {
      setLoading(true);
      await axios.put(`${API_URL}/api/account`, account, {
        headers: { "Content-Type": "application/json" },
      });
      setMessage("✅ Settings updated successfully!");
      setMessageType("success");
    } catch (err) {
      console.error("Error updating account:", err.response || err.message);
      setMessage("⚠ Failed to update settings");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded || loading) {
    return (
      <div className="text-center mt-10 text-black dark:text-white">
        Loading Account Settings...
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white dark:bg-gray-800 dark:text-white">
      <h2 className="text-2xl font-bold mb-4">Account Settings</h2>

      {message && (
        <p
          className={`mb-3 text-sm ${
            messageType === "success"
              ? "text-green-500 dark:text-green-400"
              : "text-red-500 dark:text-red-400"
          }`}
        >
          {message}
        </p>
      )}

      {/* Email Reports */}
      <div className="mb-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="email_reports"
            checked={account.email_reports}
            onChange={handleChange}
          />
          Enable Email Reports
        </label>
      </div>

      {/* Transaction Alerts */}
      <div className="mb-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="transaction_alerts"
            checked={account.transaction_alerts}
            onChange={handleChange}
          />
          Enable Transaction Alerts
        </label>
      </div>

      {/* Default Currency */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Default Currency</label>
        <select
          name="default_currency"
          value={account.default_currency}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded text-black dark:text-white dark:bg-gray-700"
        >
          <option value="INR">INR</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
      </div>

      {/* Week Starts On */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Week Starts On</label>
        <select
          name="week_starts_on"
          value={account.week_starts_on}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded text-black dark:text-white dark:bg-gray-700"
        >
          <option value="Monday">Monday</option>
          <option value="Sunday">Sunday</option>
        </select>
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        disabled={loading}
      >
        Save Changes
      </button>
    </div>
  );
};

export default AccountSettings;
