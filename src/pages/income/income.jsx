import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Income = () => {
  const { userAuth } = useSelector((state) => state.user);

  const [incomeData, setIncomeData] = useState({
    title: "",
    amount: "",
    description: "",
    userId: "",
    date: new Date().toISOString().split("T")[0], // Auto-filled date
  });

  useEffect(() => {
    if (userAuth) {
      setIncomeData((prevData) => ({
        ...prevData,
        userId: userAuth._id, // Auto-fill user ID
      }));
    }
  }, [userAuth]);

  const handleChange = (e) => {
    setIncomeData({ ...incomeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Income Data Submitted:", incomeData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="max-w-lg w-full bg-green-500 shadow-lg rounded-lg p-6">
        {/* Image Section */}
        <div className="flex justify-center mb-4">
          <img
            src="/income.svg" // Make sure this image is inside the public folder
            alt="Income"
            className="w-20 h-20"
          />
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Add New Income
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Field */}
          <div className="flex items-center">
            <label className="w-1/3 text-gray-700 font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={incomeData.title}
              onChange={handleChange}
              required
              className="w-2/3 px-3 py-2 border bg-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter income title"
            />
          </div>

          {/* Amount Field */}
          <div className="flex items-center">
            <label className="w-1/3 text-gray-700 font-medium">Amount</label>
            <input
              type="number"
              name="amount"
              value={incomeData.amount}
              onChange={handleChange}
              required
              className="w-2/3 px-3 py-2 border bg-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter amount"
            />
          </div>

          {/* Description Field */}
          <div className="flex items-center">
            <label className="w-1/3 text-gray-700 font-medium">Description</label>
            <textarea
              name="description"
              value={incomeData.description}
              onChange={handleChange}
              required
              className="w-2/3 px-3 py-2 border bg-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter description"
            ></textarea>
          </div>

          {/* User ID (Auto-filled) */}
          <div className="flex items-center">
            <label className="w-1/3 text-gray-700 font-medium">User ID</label>
            <input
              type="text"
              name="userId"
              value={incomeData.userId}
              readOnly
              className="w-2/3 px-3 py-2 border bg-blue-100 rounded-md focus:outline-none"
            />
          </div>

         

          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Submit Income
          </button>
        </form>
      </div>
    </div>
  );
};

export default Income;
