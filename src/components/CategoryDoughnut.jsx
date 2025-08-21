// ---------------- CategoryDoughnut.jsx ----------------
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

function CategoryDoughnut() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/transactions/by-category")
      .then((res) => res.json())
      .then((data) =>
        setData(data.map((item) => ({ ...item, total: parseFloat(item.total) || 0 })))
      )
      .catch((err) => console.error("Error fetching category chart:", err));
  }, []);

  const chartData = {
    labels: data.map((item) => item.category),
    datasets: [
      {
        label: "Expenses by Category",
        data: data.map((item) => item.total),
        backgroundColor: [
          "#3b82f6",
          "#f97316",
          "#10b981",
          "#ef4444",
          "#8b5cf6",
          "#14b8a6",
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: "#111827", font: { size: 13, weight: "bold" } },
      },
      datalabels: {
        color: "#fff",
        font: { weight: "bold", size: 11 },
        formatter: (value, ctx) => {
          const total = ctx.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
          const percentage = ((value / total) * 100).toFixed(1);
          return `${percentage}%`;
        },
      },
    },
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-md flex justify-center">
      <div className="w-56 h-56">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
}

export default CategoryDoughnut;