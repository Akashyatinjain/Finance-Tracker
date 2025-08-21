import React, { useEffect, useState } from "react";
import ExpenseCard from "../components/ExpenseCard";
import BalanceChart from "../components/BalanceChart";
import ExpensesChart from "../components/ExpensesChart";
import CategoryDoughnut from "../components/CategoryDoughnut";
import MonthlyTrendChart from "../components/MonthlyTrendChart";

const Dashboard = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // detect Tailwind dark mode
    const observer = new MutationObserver(() => {
      setTheme(
        document.documentElement.classList.contains("dark")
          ? "dark"
          : "light"
      );
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // initial check
    setTheme(
      document.documentElement.classList.contains("dark")
        ? "dark"
        : "light"
    );

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-blue-50 dark:bg-gray-900 text-blue-900 dark:text-gray-100 min-h-screen pt-20 px-6 transition-colors duration-300">
      
      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Section */}
        <div className="space-y-6">
          {/* Available Balance Card */}
          <div className="hover:scale-[1.02] transform transition-transform duration-300">
            <ExpenseCard />
          </div>

          {/* Expense Breakdown + Category Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Expense Breakdown - Bar Chart */}
            <div className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl p-6 rounded-2xl transition-shadow duration-300">
              <h2 className="text-lg font-semibold mb-4 text-blue-800 dark:text-blue-300">
                Expense Breakdown
              </h2>
              <div className="h-64">
                <ExpensesChart theme={theme} />
              </div>
            </div>

            {/* Category Breakdown - Doughnut Chart */}
            <div className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl p-6 rounded-2xl flex flex-col items-center transition-shadow duration-300">
              <h2 className="text-lg font-semibold mb-4 text-blue-800 dark:text-blue-300">
                Category Breakdown
              </h2>
              <div className="w-full h-full flex justify-center items-center">
                <CategoryDoughnut theme={theme} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-6">
          {/* Balance Chart */}
          <div className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl p-6 rounded-2xl transition-shadow duration-300">
            <h2 className="text-lg font-semibold mb-4 text-blue-800 dark:text-blue-300 text-center">
              Balance Chart
            </h2>
            <div className="w-full h-72">
              <BalanceChart theme={theme} />
            </div>
          </div>

          {/* Monthly Trend Chart */}
          <div className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl 
                  p-6 rounded-2xl flex flex-col transition-all duration-300 w-full h-[500px]">
            <div className="w-full h-72">
              <MonthlyTrendChart theme={theme} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
