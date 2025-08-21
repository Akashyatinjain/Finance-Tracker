import express from "express";
import { pool } from "../config/db.js";

const router = express.Router();

// ---------------------------
// Add Expense
// ---------------------------
router.post("/", async (req, res) => {
  try {
    const userId = 1; // 🔒 hardcoded until auth integrate karega
    const { amount, category, note } = req.body;

    // 1. Insert into expenses table
    const expenseResult = await pool.query(
      `INSERT INTO expenses (user_id, amount, category, type, date, note)
       VALUES ($1, $2, $3, $4, NOW(), $5)
       RETURNING *`,
      [userId, amount, category || "General", "debit", note || ""]
    );

    const expense = expenseResult.rows[0];

    // 2. Insert into transactions table also
    await pool.query(
      `INSERT INTO transactions (user_id, amount, category, type, date, note)
       VALUES ($1, $2, $3, $4, NOW(), $5)`,
      [userId, amount, category || "General", "debit", note || ""]
    );

    res.json(expense);
  } catch (err) {
    console.error("Error adding expense:", err.message);
    res.status(500).json({ error: "Error adding expense" });
  }
});

// ---------------------------
// Get expenses by category
// ---------------------------
router.get("/by-category", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT category, SUM(amount) as total
       FROM transactions
       WHERE type = 'debit'
       GROUP BY category
       ORDER BY total DESC`
    );

    res.json(result.rows);
    // Example Response:
    // [
    //   { category: "Food", total: "100.00" },
    //   { category: "Travel", total: "2.00" }
    // ]
  } catch (error) {
    console.error("Error fetching expenses by category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
