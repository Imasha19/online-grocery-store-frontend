import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector to get the user state from Redux store

import bg from "../img/finance.jpg";
import dataSvg from "../img/data.svg";

const FinanceWelcome = () => {
  const navigate = useNavigate();
  const userAuth = useSelector((state) => state.user.userAuth); // Get userAuth from Redux store

  // Handle Logout
  const handleLogout = () => {
    // Perform any logout logic here (e.g., clearing user session)
    navigate("/"); // Redirect to Wlcm.jsx after logout
  };

  // Handle navigation to Expenses List
  const handleExpensesListClick = () => {
    if (userAuth?.isAdmin) {
      navigate("/expenses-list");
    } else {
      alert("You do not have permission to view the Expenses List.");
    }
  };

  // Handle navigation to Income List (same logic as Expenses List)
  const handleIncomeListClick = () => {
    if (userAuth?.isAdmin) {
      navigate("/income-list");
    } else {
      alert("You do not have permission to view the Income List.");
    }
  };

    // Handle navigation to Dashboard
    const handleDashboardClick = () => {
      if (userAuth?.isAdmin) {
        navigate("/dashboard");
      } else {
        alert("You do not have permission to view the Income List.");
      }
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
          <button
            onClick={handleExpensesListClick} // Updated to check permissions
            className="px-4 py-2 bg-gray-700 rounded-lg shadow-md hover:bg-gray-900"
          >
            Expenses List
          </button>
          <button
            onClick={handleIncomeListClick} // Updated to check permissions
            className="px-4 py-2 bg-gray-700 rounded-lg shadow-md hover:bg-gray-900"
          >
            Income List
          </button>
          <button
            onClick={handleDashboardClick}
            className="px-4 py-2 bg-gray-700 rounded-lg shadow-md hover:bg-gray-900"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="px-4 py-2 bg-gray-700 rounded-lg shadow-md hover:bg-gray-900"
          >
            Profile
          </button>
        </div>

        {/* Right Side Actions */}
        <div className="flex space-x-4">
          <button
            onClick={() => navigate("/new-expense")}
            className="px-4 py-2 bg-green-600 rounded-lg shadow-md hover:bg-green-800"
          >
            New Expense
          </button>
          <button
            onClick={() => navigate("/new-income")}
            className="px-4 py-2 bg-blue-600 rounded-lg shadow-md hover:bg-blue-800"
          >
            New Income
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 rounded-lg shadow-md hover:bg-red-800"
          >
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
