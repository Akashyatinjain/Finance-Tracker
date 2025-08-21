// ---------------- MonthlyTrendChart.jsx ----------------
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const MonthlyTrendChart = ({ theme = "dark" }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/transactions/by-month");
        const data = await res.json();

        if (!data || data.length === 0) {
          throw new Error("No API data found");
        }

        makeChart(data);
      } catch (err) {
        console.warn("⚠ Falling back to sample trend data:", err.message);

        // ✅ Fallback sample raw data
        const sampleData = [
          { month: "Jan", income: 12000, expense: 8000 },
          { month: "Feb", income: 15000, expense: 9000 },
          { month: "Mar", income: 10000, expense: 11000 },
          { month: "Apr", income: 18000, expense: 16000 },
          { month: "May", income: 22000, expense: 9500 },
          { month: "Jun", income: 25000, expense: 10000 },
          { month: "Jul", income: 14000, expense: 10500 },
          { month: "Aug", income: 20000, expense: 11500 },
          { month: "Sep", income: 23000, expense: 12000 },
          { month: "Oct", income: 19000, expense: 11000 },
          { month: "Nov", income: 21000, expense: 12500 },
          { month: "Dec", income: 24000, expense: 13000 },
        ];
        makeChart(sampleData);
      }
    };

    const makeChart = (data) => {
      const labels = data.map((item) => item.month);
      const income = data.map((item) => item.income);
      const expense = data.map((item) => item.expense);

      setChartData({
        labels,
        datasets: [
          {
            label: "Expenses",
            data: expense,
            borderColor: "rgba(255,99,132,1)",
            backgroundColor: "rgba(255,99,132,0.3)",
            fill: true,
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 0,
          },
          {
            label: "Income",
            data: income,
            borderColor: "rgba(0, 200, 0, 1)",
            backgroundColor: "transparent",
            borderDash: [6, 6], // dotted line
            fill: false,
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 0,
          },
        ],
      });
    };

    fetchData();
  }, []);

  const isDark = theme === "dark";

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: { color: isDark ? "white" : "black" },
      },
      tooltip: {
        callbacks: { label: (ctx) => `₹${ctx.raw}` },
      },
    },
    scales: {
      x: {
        ticks: { color: isDark ? "white" : "black" },
        grid: { color: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" },
      },
      y: {
        ticks: {
          color: isDark ? "white" : "black",
          callback: (val) => `₹${val}`,
        },
        grid: { color: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" },
      },
    },
  };

  return (
    <div
      className={`p-6 rounded-2xl shadow-lg ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-lg font-bold mb-4 text-center">
        Income & Expenses
      </h2>
      {chartData ? (
        <div className="h-[350px]">
          <Line data={chartData} options={options} />
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading trend data...</p>
      )}
    </div>
  );
};

export default MonthlyTrendChart;
