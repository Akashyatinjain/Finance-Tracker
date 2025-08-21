import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

const ExpenseCard = () => {
  const [data, setData] = useState({ availableBalance: 0, totalExpenses: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newExpense, setNewExpense] = useState({ 
  amount: "", 
  description: "", 
  category: "general",   // default
  type: "debit"        // default
});

  let theme = "light";
  try {
    const themeCtx = useTheme();
    if (themeCtx && themeCtx.theme) {
      theme = themeCtx.theme;
    }
  } catch (err) {
    console.warn("ThemeContext not found, fallback to light");
  }

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = () => {
    fetch("http://localhost:5000/api/expenses-summary")
      .then((res) => {
        if (!res.ok) throw new Error("API failed");
        return res.json();
      })
      .then((apiData) => {
        setData({
          availableBalance: apiData.availableBalance ?? 0,
          totalExpenses: apiData.totalExpenses ?? 0,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching expense summary:", err);
        setError("Failed to load data");
        setLoading(false);
      });
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newExpense),
      });

      if (!res.ok) throw new Error("Failed to add expense");

      setNewExpense({ amount: "", description: "" });
      setShowForm(false);
      fetchSummary(); // refresh data after adding
    } catch (err) {
      console.error("Error adding expense:", err);
    }
  };

  if (loading) {
    return (
      <div
        className={`shadow p-4 rounded-xl ${
          theme === "dark" ? "bg-gray-800 text-gray-300" : "bg-white"
        }`}
      >
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`shadow p-4 rounded-xl ${
          theme === "dark" ? "bg-gray-800 text-red-400" : "bg-white text-red-600"
        }`}
      >
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div
      className={`shadow p-4 rounded-xl ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white"
      }`}
    >
      <h2 className="text-lg font-semibold">₹ Available Balance</h2>
      <p className="text-2xl font-bold text-green-500">
        ₹{Number(data?.availableBalance || 0).toFixed(2)}
      </p>

      <h2 className="text-lg font-semibold">Total Expenses This Month</h2>
      <p className="text-2xl font-bold text-red-500">
        ₹{Number(data?.totalExpenses || 0).toFixed(2)}
      </p>

      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Cancel" : "Add Expense"}
      </button>

      {showForm && (
       <form onSubmit={handleAddExpense} className="mt-4 flex flex-col gap-2">
  <input
    type="number"
    placeholder="Amount"
    value={newExpense.amount}
    onChange={(e) =>
      setNewExpense({ ...newExpense, amount: e.target.value })
    }
    className="p-2 border rounded"
    required
  />
  <input
    type="text"
    placeholder="Description"
    value={newExpense.description}
    onChange={(e) =>
      setNewExpense({ ...newExpense, description: e.target.value })
    }
    className="p-2 border rounded"
    required
  />
  <select
    value={newExpense.category}
    onChange={(e) =>
      setNewExpense({ ...newExpense, category: e.target.value })
    }
    className="p-2 border rounded"
    required
  >
    <option value="">Select Category</option>
    <option value="Food">Food</option>
    <option value="Travel">Travel</option>
    <option value="Shopping">Shopping</option>
    <option value="Bills">Bills</option>
    <option value="Other">Other</option>
  </select>
  <button
    type="submit"
    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
  >
    Save
  </button>
</form>
      )}
    </div>
  );
};

export default ExpenseCard;
