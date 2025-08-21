import React, { useEffect, useState } from "react";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");

  useEffect(() => {
    fetch("http://localhost:5000/api/transactions")
      .then((res) => {
        if (!res.ok) throw new Error("API failed");
        return res.json();
      })
      .then((data) => {
        console.log("Transactions from API:", data);
        setTransactions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching transactions:", err);
        setError("Failed to load transactions");
        setLoading(false);
      });
  }, []);

  // Filter and sort transactions
  const filteredTransactions = transactions
    .filter((tx) =>
      tx.category.toLowerCase().includes(search.toLowerCase())
    )
    .filter((tx) =>
      filterType === "all" ? true : tx.type.toLowerCase() === filterType
    )
    .sort((a, b) => {
      if (sortBy === "amount-asc") return a.amount - b.amount;
      if (sortBy === "amount-desc") return b.amount - a.amount;
      if (sortBy === "date-asc") return new Date(a.date) - new Date(b.date);
      if (sortBy === "date-desc") return new Date(b.date) - new Date(a.date);
      return 0;
    });

  if (loading)
    return (
      <p className="p-6 text-center text-blue-600 font-semibold">Loading...</p>
    );
  if (error)
    return (
      <p className="p-6 text-center text-red-600 font-semibold">{error}</p>
    );

  return (
    <div className="p-6 bg-blue-50 min-h-screen transition-colors duration-300">
      <h1 className="text-2xl font-bold text-blue-800 mb-6">Transactions</h1>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none w-full md:w-1/3"
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none w-full md:w-1/4"
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none w-full md:w-1/4"
        >
          <option value="date-desc">Date: Newest First</option>
          <option value="date-asc">Date: Oldest First</option>
          <option value="amount-desc">Amount: High to Low</option>
          <option value="amount-asc">Amount: Low to High</option>
        </select>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-blue-100 text-blue-800">
              <th className="px-4 py-3 text-left font-semibold">Date</th>
              <th className="px-4 py-3 text-left font-semibold">Category</th>
              <th className="px-4 py-3 text-left font-semibold">Type</th>
              <th className="px-4 py-3 text-right font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="hover:bg-blue-50 transition-colors even:bg-blue-50/30"
                >
                  <td className="px-4 py-3 border-t">
                    {new Date(tx.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 border-t">{tx.category}</td>
                  <td className="px-4 py-3 border-t">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        tx.type.toLowerCase() === "income"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {tx.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 border-t text-right font-semibold text-blue-700">
                    ₹{Number(tx.amount).toFixed(2)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-6 text-center text-gray-500">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
