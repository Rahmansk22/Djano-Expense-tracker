import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://127.0.0.1:8000/api/";

function ExpenseTracker() {
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    category: "",
    description: "",
    amount: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Filters
  const [filterCategory, setFilterCategory] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    fetchCategories();
    fetchExpenses();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [expenses, filterCategory, filterMonth, sortBy]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}categories/`);
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(`${API_URL}expenses/`);
      setExpenses(res.data);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`${API_URL}expenses/${formData.id}/`, formData);
        setIsEditing(false);
      } else {
        await axios.post(`${API_URL}expenses/`, formData);
      }
      setFormData({ id: null, category: "", description: "", amount: "" });
      fetchExpenses();
    } catch (err) {
      console.error("Error saving expense:", err);
    }
  };

  const handleEdit = (exp) => {
    setFormData({
      id: exp.id,
      category: exp.category,
      description: exp.description,
      amount: exp.amount,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;
    try {
      await axios.delete(`${API_URL}expenses/${id}/`);
      fetchExpenses();
    } catch (err) {
      console.error("Error deleting expense:", err);
    }
  };

  // ✅ Apply Filters + Sorting
  const applyFilters = () => {
    let filtered = [...expenses];

    // Filter by category
    if (filterCategory) {
      filtered = filtered.filter(
        (exp) =>
          exp.category_name?.toLowerCase() ===
          categories.find((c) => c.id === parseInt(filterCategory))?.name.toLowerCase()
      );
    }

    // Filter by month
    if (filterMonth) {
      filtered = filtered.filter((exp) => {
        const expMonth = new Date(exp.date).getMonth() + 1;
        return expMonth === parseInt(filterMonth);
      });
    }

    // Sorting
    if (sortBy === "amountAsc") filtered.sort((a, b) => a.amount - b.amount);
    if (sortBy === "amountDesc") filtered.sort((a, b) => b.amount - a.amount);
    if (sortBy === "dateAsc")
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    if (sortBy === "dateDesc")
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

    setFilteredExpenses(filtered);
  };

  const total = filteredExpenses.reduce(
    (sum, e) => sum + parseFloat(e.amount || 0),
    0
  );

  return (
    <div className="app-container">
      <div className="expense-box">
        <h1 className="title">💰 Expense Tracker</h1>

        {/* Add / Edit Form */}
        <form onSubmit={handleSubmit} className="expense-form">
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="select-field"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="input-field"
            required
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="input-field"
            required
          />

          <button className="add-btn" type="submit">
            {isEditing ? "Update" : "Add"}
          </button>
        </form>

        {/* 🔍 Filters and Sorting */}
        <div className="filter-bar">
          <select
            className="select-field"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">Filter by Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <select
            className="select-field"
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
          >
            <option value="">Filter by Month</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>

          <select
            className="select-field"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="amountAsc">Amount (Low → High)</option>
            <option value="amountDesc">Amount (High → Low)</option>
            <option value="dateAsc">Date (Oldest)</option>
            <option value="dateDesc">Date (Newest)</option>
          </select>
        </div>

        {/* Expenses Table */}
        <h2 className="sub-title">Expenses</h2>
        <table className="expense-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Description</th>
              <th>Amount (₹)</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((exp) => (
              <tr key={exp.id}>
                <td>{exp.category_name || exp.category}</td>
                <td>{exp.description}</td>
                <td>{exp.amount}</td>
                <td>{exp.date}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(exp)}
                  >
                    ✏️
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(exp.id)}
                  >
                    ❌
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="total">Total: ₹{total.toFixed(2)}</div>
      </div>
    </div>
  );
}

export default ExpenseTracker;
