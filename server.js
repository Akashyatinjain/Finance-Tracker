import express, { json } from "express";
import { config } from "dotenv";
import cors from "cors";
import connectDB, { pool } from "./src/config/db.js";
import accountRoutes from "./src/routes/account.js";
import expenseRoutes from "./src/routes/expenses.js";
import transactionsRoutes from "./src/routes/transactions.js";

config();

// Connect to DB
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(json());

// Routes
app.use("/api/transactions", transactionsRoutes);
app.use("/api/account", accountRoutes);
app.use("/api/expenses", expenseRoutes);

// Expenses Summary
app.get("/api/expenses-summary", async (req, res) => {
  try {
    const userId = 1; // Hardcoded for now; later from auth

    // Total expenses for this month
    const expensesQuery = `
      SELECT COALESCE(SUM(amount), 0) AS total_expenses
      FROM expenses
      WHERE user_id = $1
      AND date >= date_trunc('month', CURRENT_DATE)
    `;
    const expensesResult = await pool.query(expensesQuery, [userId]);

    // Total spending limit
    const limitQuery = `
      SELECT COALESCE(SUM(limit_amount), 0) AS total_limit
      FROM spending_limits
      WHERE user_id = $1
    `;
    const limitResult = await pool.query(limitQuery, [userId]);

    const availableBalance =
      parseFloat(limitResult.rows[0].total_limit) -
      parseFloat(expensesResult.rows[0].total_expenses);

    res.json({
      availableBalance: availableBalance.toFixed(2),
      totalExpenses: parseFloat(expensesResult.rows[0].total_expenses).toFixed(2),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
// transacitions
app.get("/api/transactions", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM transactions ORDER BY date DESC"
    );

    console.log(result.rows); // 👈 Ye correct hai, rows print karega

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching transactions:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});



// Get all expenses
app.get("/api/expenses", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM expenses ORDER BY date DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/expenses", async (req, res) => {
  try {
    const { amount, description } = req.body;

    if (!amount || !description) {
      return res.status(400).json({ error: "Amount and description required" });
    }

    const userId = 1; // Hardcoded until auth
    const category = "General";
    const type = "debit"; // ✅ keep consistent with your transactions
    const date = new Date(); // current date
    const note = description;
    const currency = "INR";

    // Insert into expenses
    const expenseResult = await pool.query(
      `INSERT INTO expenses (user_id, amount, category, type, date, note, currency)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [userId, amount, category, type, date, note, currency]
    );

    const expense = expenseResult.rows[0];

    // Insert same record into transactions
    await pool.query(
      `INSERT INTO transactions (user_id, amount, category, type, date, note, currency)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [userId, amount, category, type, date, note, currency]
    );

    res.status(201).json(expense);
  } catch (error) {
    console.error("Error adding expense:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Add a new expense (fixed for ExpenseCard)
// app.post("/api/expenses", async (req, res) => {
//   try {
//     const { amount, description } = req.body;

//     if (!amount || !description) {
//       return res.status(400).json({ error: "Amount and description required" });
//     }

//     const userId = 1; // Hardcoded until auth
//     const category = "General";
//     const type = "debit";
//     const date = new Date(); // current date
//     const note = description;
//     const currency = "INR";

//     const result = await pool.query(
//       `INSERT INTO expenses (user_id, amount, category, type, date, note, currency)
//        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
//       [userId, amount, category, type, date, note, currency]
//     );

//     res.status(201).json(result.rows[0]);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

app.listen(5000, () => console.log("✅ Server running on port 5000"));
