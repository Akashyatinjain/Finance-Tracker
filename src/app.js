import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pkg from "pg";
import { requireAuth } from "@clerk/express"; // Clerk middleware
import accountRoutes from "./routes/accountRoutes.js";

// -----------------
// Load env variables
// -----------------
dotenv.config();

// -----------------
// Postgres connection
// -----------------
const { Pool } = pkg;
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
});

const connectDB = async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("✅ PostgreSQL Connected");
  } catch (err) {
    console.error("❌ PostgreSQL connection failed:", err.message);
    process.exit(1);
  }
};
connectDB();

// -----------------
// Express app
// -----------------
const app = express();
app.use(cors());
app.use(express.json());

// -----------------
// Routes
// -----------------
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// Clerk protected route example
app.use("/api/accounts", requireAuth(), accountRoutes);

// -----------------
// Start server
// -----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
