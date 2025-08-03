import React from 'react';
import ExpenseCard from '../components/ExpenseCard';
import BalanceChart from '../components/BalanceChart';

const Dashboard = () => (
  <div className="bg-white text-black dark:bg-gray-950 dark:text-white min-h-screen pt-20 px-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ExpenseCard />
      <BalanceChart />
    </div>
  </div>
);

export default Dashboard;
