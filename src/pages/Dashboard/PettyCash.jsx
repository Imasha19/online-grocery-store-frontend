import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import baseURL from "../../utils/baseURL";

const PettyCash = () => {
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    amount: "",
    category: "",
    description: "",
    type: "expense", // or "income"
    date: new Date().toISOString().split("T")[0], // default to today's date
  });
  const [balance, setBalance] = useState(0);
  const userAuth = useSelector((state) => state.user.userAuth);

  useEffect(() => {
    if (userAuth?.token) {
      fetchTransactions(userAuth.token);
    }
  }, [userAuth]);

  const fetchTransactions = async (token) => {
    try {
      const response = await fetch(`${baseURL}/petty-cash/transactions`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }
      const data = await response.json();
      setTransactions(data.transactions);
      calculateBalance(data.transactions);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  const calculateBalance = (transactions) => {
    let balance = 0;
    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        balance += transaction.amount;
      } else {
        balance -= transaction.amount;
      }
    });
    setBalance(balance);
  };

  const handleTransactionChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({
      ...newTransaction,
      [name]: value,
    });
  };

  const handleAddTransaction = async () => {
    try {
      const response = await fetch(`${baseURL}/petty-cash/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userAuth.token}`,
        },
        body: JSON.stringify(newTransaction),
      });
      if (!response.ok) {
        throw new Error("Failed to add transaction");
      }
      const addedTransaction = await response.json();
      setTransactions([...transactions, addedTransaction]);
      calculateBalance([...transactions, addedTransaction]);
      setNewTransaction({
        amount: "",
        category: "",
        description: "",
        type: "expense",
        date: new Date().toISOString().split("T")[0],
      });
    } catch (err) {
      console.error("Error adding transaction:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold text-gray-700">Petty Cash Management</h1>

      {/* Petty Cash Balance */}
      <div className="my-4">
        <h3 className="text-xl font-bold text-gray-700">Current Balance</h3>
        <p className="text-2xl font-bold text-green-600">RS. {balance}</p>
      </div>

      {/* Add New Transaction Form */}
      <div className="bg-white p-6 rounded-lg shadow-md my-6">
        <h3 className="text-lg font-semibold text-gray-700">Add New Transaction</h3>
        <div className="space-y-4">
          <input
            type="number"
            name="amount"
            value={newTransaction.amount}
            onChange={handleTransactionChange}
            placeholder="Amount"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="category"
            value={newTransaction.category}
            onChange={handleTransactionChange}
            placeholder="Category"
            className="w-full p-2 border rounded"
          />
          <textarea
            name="description"
            value={newTransaction.description}
            onChange={handleTransactionChange}
            placeholder="Description"
            className="w-full p-2 border rounded"
          />
          <select
            name="type"
            value={newTransaction.type}
            onChange={handleTransactionChange}
            className="w-full p-2 border rounded"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <input
            type="date"
            name="date"
            value={newTransaction.date}
            onChange={handleTransactionChange}
            className="w-full p-2 border rounded"
          />
          <button
            onClick={handleAddTransaction}
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Transaction
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700">Transaction History</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-3 text-left">Date</th>
              <th className="border p-3 text-left">Category</th>
              <th className="border p-3 text-left">Description</th>
              <th className="border p-3 text-right">Amount (RS.)</th>
              <th className="border p-3 text-left">Type</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td className="border p-3">{transaction.date}</td>
                <td className="border p-3">{transaction.category}</td>
                <td className="border p-3">{transaction.description}</td>
                <td className={`border p-3 text-right ${transaction.type === "expense" ? "text-red-600" : "text-green-600"}`}>
                  RS. {transaction.amount}
                </td>
                <td className="border p-3">{transaction.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PettyCash;
