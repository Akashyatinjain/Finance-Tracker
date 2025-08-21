import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";
import React from "react";
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative flex items-center w-14 h-8 rounded-full transition-colors duration-300 ${
        theme === "light" ? "bg-gray-300" : "bg-gray-700"
      }`}
    >
      <div
        className={`absolute left-1 top-1 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
          theme === "light"
            ? "translate-x-0 bg-white text-yellow-500"
            : "translate-x-6 bg-black text-white"
        }`}
      >
        {theme === "light" ? <Sun size={16} /> : <Moon size={16} />}
      </div>
    </button>
  );
};

export default ThemeToggle;
