import pool from "../config/db.js";

export const updateAccount = async (req, res) => {
  const { clerkId } = req.params;
  const { name, email } = req.body;

  try {
    const result = await pool.query(
      `UPDATE users 
       SET name = COALESCE($1, name), 
           email = COALESCE($2, email)
       WHERE clerk_id = $3
       RETURNING *`,
      [name, email, clerkId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.json({ message: "✅ Account updated successfully", account: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
