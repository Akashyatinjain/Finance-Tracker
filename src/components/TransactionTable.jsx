import React from 'react';

const TransactionTable = () => (
  <table className="min-w-full table-auto shadow rounded-xl overflow-hidden">
    <thead className="bg-gray-100">
      <tr>
        <th className="px-4 py-2">Date</th>
        <th className="px-4 py-2">Category</th>
        <th className="px-4 py-2">Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="px-4 py-2">2025-07-28</td>
        <td className="px-4 py-2">Groceries</td>
        <td className="px-4 py-2">₹1,200</td>
      </tr>
    </tbody>
  </table>
);

export default TransactionTable;