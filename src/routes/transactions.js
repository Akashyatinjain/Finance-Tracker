import express from "express";
import { pool } from "../config/db.js";

const router = express.Router();

// ----------------------------
// Add a transaction
// ----------------------------
router.post("/", async (req, res) => {
  try {
    const userId = 1; // TODO: auth ke baad dynamic karna
    const { amount, category, type, date, note } = req.body;

    const result = await pool.query(
      `INSERT INTO transactions (user_id, amount, category, type, date, note)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [userId, amount, category || "General", type || "debit", date || new Date(), note || ""]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error adding transaction:", err.message);
    res.status(500).json({ error: "Error adding transaction" });
  }
});

// ----------------------------
// Get all transactions (list)
// ----------------------------
router.get("/", async (req, res) => {
  try {
    const userId = 1;
    const result = await pool.query(
      `SELECT * FROM transactions
       WHERE user_id = $1
       ORDER BY date DESC`,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching transactions:", err.message);
    res.status(500).json({ error: "Error fetching transactions" });
  }
});

// ----------------------------
// Get transactions by category
// ----------------------------
router.get("/by-month", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        TO_CHAR(DATE_TRUNC('month', date), 'YYYY-MM') AS month,
        SUM(CASE WHEN type = 'credit' THEN amount ELSE 0 END) AS income,
        SUM(CASE WHEN type = 'debit' THEN amount ELSE 0 END) AS expense
      FROM transactions
      GROUP BY DATE_TRUNC('month', date)
      ORDER BY month;
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching monthly trend:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
// ----------------------------
// Get transactions by category
// ----------------------------
router.get("/by-category", async (req, res) => {
  try {
    const userId = 1;
    const result = await pool.query(
      `SELECT category, SUM(amount)::numeric AS total
       FROM transactions
       WHERE user_id = $1 AND type = 'debit'
       GROUP BY category
       ORDER BY total DESC`,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching category breakdown:", err.message);
    res.status(500).json({ error: "Error fetching data" });
  }
});

// ----------------------------
// Get monthly summary
// ----------------------------


export default router;
