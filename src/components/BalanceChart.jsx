import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const BalanceChart = () => {
  const [availableBalance, setAvailableBalance] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);

  // Detect Tailwind dark mode via <html class="dark">
  useEffect(() => {
    const checkTheme = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/expenses-summary");
        const data = await res.json();
        setAvailableBalance(parseFloat(data.availableBalance) || 0);
        setTotalExpenses(parseFloat(data.totalExpenses) || 0);
      } catch (error) {
        console.error("Error fetching balance data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Theme-aware colors (blue palette)
const chartColors = {
  available: isDark ? "#FACC15" : "#EAB308", // gold shades
  expenses: isDark ? "#1E3A8A" : "#3B82F6",  // navy/blue shades
  label: isDark ? "#E5E7EB" : "#374151"
};
  const chartData = {
    labels: ["Available Balance", "Expenses"],
    datasets: [
      {
        data: [availableBalance, totalExpenses],
        backgroundColor: [chartColors.available, chartColors.expenses],
        hoverBackgroundColor: [chartColors.available, chartColors.expenses],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: "bottom", 
        labels: { color: chartColors.label } 
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.label}: ₹${context.raw.toLocaleString()}`,
        },
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
    cutout: "70%", // bigger hole in middle
  };

  return (
    <div className="flex justify-center">
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 w-72 h-72 transition-colors duration-300">
        {loading ? (
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-300">
            Loading...
          </div>
        ) : (
          <>
            <Doughnut data={chartData} options={options} />
            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-sm text-gray-500 dark:text-gray-300">Available</p>
              <p className="text-xl font-semibold text-blue-700 dark:text-blue-400">
                ₹{availableBalance.toLocaleString()}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BalanceChart;
