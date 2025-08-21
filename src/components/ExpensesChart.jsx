// ---------------- ExpensesChart.jsx ----------------
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const ExpensesChart = () => {
  const [categories, setCategories] = useState([]);
  const [amounts, setAmounts] = useState([]);
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark") ||
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  // Listen to theme change
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => setIsDark(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Fetch API data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/transactions/by-category");
        const data = await res.json();

        setCategories(data.map((item) => item.category));
        setAmounts(data.map((item) => parseFloat(item.total) || 0));
      } catch (error) {
        console.error("Error fetching expenses data:", error);
      }
    };
    fetchData();
  }, []);

  const chartData = {
    labels: categories,
    datasets: [
      {
        label: "Expenses",
        data: amounts,
        backgroundColor: [
          "#3b82f6", // blue
          "#f97316", // orange
          "#10b981", // green
          "#ef4444", // red
          "#8b5cf6", // purple
          "#14b8a6", // teal
        ],
        borderRadius: 8,
        barThickness: 28,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `₹${context.raw.toLocaleString()}`,
        },
        backgroundColor: isDark ? "#1f2937" : "#ffffff",
        titleColor: isDark ? "#f3f4f6" : "#111827",
        bodyColor: isDark ? "#e5e7eb" : "#111827",
        borderColor: isDark ? "#374151" : "#d1d5db",
        borderWidth: 1,
      },
      datalabels: {
        anchor: "end",
        align: "end",
        color: isDark ? "#f9fafb" : "#374151",
        font: { weight: "bold", size: 12 },
        formatter: (value) => `₹${value.toLocaleString()}`,
      },
    },
    scales: {
      y: {
        ticks: {
          color: isDark ? "#d1d5db" : "#6b7280",
          callback: (value) => `₹${value}`,
        },
        grid: { color: isDark ? "rgba(255,255,255,0.1)" : "rgba(148,163,184,0.2)" },
      },
      x: {
        ticks: {
          color: isDark ? "#d1d5db" : "#6b7280",
          font: { weight: "bold", size: 13 },
        },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md">
      <div style={{ height: "240px" }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ExpensesChart;
