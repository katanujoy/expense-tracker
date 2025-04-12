import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState(() => {
    const storedExpenses = localStorage.getItem("expenses");
    return storedExpenses ? JSON.parse(storedExpenses) : [];
  });

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    const newExpense = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      category,
      date: new Date().toLocaleDateString()
    };

    setExpenses([newExpense, ...expenses]);
    setDescription("");
    setAmount("");
  };

  const handleDelete = (id) => {
    const filtered = expenses.filter((exp) => exp.id !== id);
    setExpenses(filtered);
  };

  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="container">
      <header>
        <h1>💸 Expense Tracker</h1>
        <p className="subtitle">Track your daily expenses easily</p>
      </header>

      <form className="expense-form" onSubmit={handleAddExpense}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Dinner at Restaurant"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <input
            type="number"
            step="0.01"
            min="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Bills">Bills</option>
            <option value="Shopping">Shopping</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <button type="submit" className="add-btn">
          Add Expense
        </button>
      </form>

      <div className="summary">
        <h2>Total: <span className="total-amount">Ksh {total.toFixed(2)}</span></h2>
        <p className="expense-count">{expenses.length} {expenses.length === 1 ? 'expense' : 'expenses'} recorded</p>
      </div>

      <div className="expense-list-container">
        {expenses.length > 0 ? (
          <ul className="expense-list">
            {expenses.map((exp) => (
              <li key={exp.id} className="expense-item">
                <div className="expense-info">
                  <span className="expense-desc">{exp.description}</span>
                  <span className="expense-category">{exp.category}</span>
                  <span className="expense-date">{exp.date}</span>
                </div>
                <div className="expense-amount">
                  <span>Ksh {exp.amount.toFixed(2)}</span>
                  <button 
                    onClick={() => handleDelete(exp.id)} 
                    className="delete-btn"
                    aria-label="Delete expense"
                  >
                    ×
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-state">
            <p>No expenses added yet</p>
            <p>Add your first expense above</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;