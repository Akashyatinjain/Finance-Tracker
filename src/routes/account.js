// backend/routes/account.js
import express from "express";
const router = express.Router();

// Dummy account data (baad me DB se fetch kar sakte ho)
let account = {
  name: "Akash Jain",
  email: "akash@example.com",
  balance: 5000
};

// GET /api/account
router.get("/", (req, res) => {
  res.json(account);
});

// PUT /api/account
router.put("/", (req, res) => {
  const { name, email, balance } = req.body;

  account = {
    ...account,
    name: name || account.name,
    email: email || account.email,
    balance: balance ?? account.balance
  };

  res.json(account);
});

export default router;
