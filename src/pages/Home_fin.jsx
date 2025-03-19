import React from "react";
import { useNavigate } from "react-router-dom";

import bg from "../img/finance.jpg";
import dataSvg from "../img/data.svg";

const FinanceWelcome = () => {
  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = () => {
    // Perform any logout logic here (e.g., clearing user session)
    navigate("/"); // Redirect to Wlcm.jsx after logout
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Header with Navigation Buttons */}
      <header className="w-full bg-black bg-opacity-50 backdrop-blur-md p-4 shadow-md flex justify-between items-center">
        {/* Left Side Navigation */}
        <div className="flex space-x-4">
          <button onClick={() => navigate("/expenses-list")} className="px-4 py-2 bg-gray-700 rounded-lg shadow-md hover:bg-gray-900">
            Expenses List
          </button>
          <button onClick={() => navigate("/income")} className="px-4 py-2 bg-gray-700 rounded-lg shadow-md hover:bg-gray-900">
            Income List
          </button>
          <button onClick={() => navigate("/dashboard")} className="px-4 py-2 bg-gray-700 rounded-lg shadow-md hover:bg-gray-900">
            Dashboard
          </button>
        <button onClick={() => navigate("/profile")} className="px-4 py-2 bg-gray-700 rounded-lg shadow-md hover:bg-gray-900">
            Profile
          </button>
        </div>

        {/* Right Side Actions */}
        <div className="flex space-x-4">
          <button onClick={() => navigate("/new-expense")} className="px-4 py-2 bg-green-600 rounded-lg shadow-md hover:bg-green-800">
            New Expense
          </button>
          <button onClick={() => navigate("/new-income")} className="px-4 py-2 bg-blue-600 rounded-lg shadow-md hover:bg-blue-800">
            New Income
          </button>
          <button onClick={handleLogout} className="px-4 py-2 bg-red-600 rounded-lg shadow-md hover:bg-red-800">
            Logout
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-grow flex items-center justify-center px-6 text-center">
        <div className="max-w-2xl">
          <img src={dataSvg} alt="Finance Data" className="mb-6 w-32 mx-auto" />
          <h2 className="text-4xl font-bold drop-shadow-md">Manage Your Finances with Ease</h2>
          <p className="text-lg text-gray-300 mt-3">
            Keep track of your income and expenses effortlessly with our powerful financial dashboard.
          </p>
          <div className="mt-6">
            <button
              onClick={() => navigate("/performance")}
              className="bg-yellow-500 text-white py-3 px-6 rounded-lg shadow-md transition duration-300 hover:bg-yellow-600"
            >
              Track Your Performance
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-black bg-opacity-50 text-white text-center py-4">
        <p>&copy; 2025 Finance Tracker | All rights reserved.</p>
      </footer>
    </div>
  );
};

export default FinanceWelcome;
