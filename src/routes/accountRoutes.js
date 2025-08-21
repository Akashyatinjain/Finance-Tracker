import { pool } from "../server.js"; // or wherever your pool is

export const updateAccount = async (req, res) => {
  try {
    const { clerkId } = req.params;
    const { name, email } = req.body;

    // Prepare dynamic fields to update
    const fields = [];
    const values = [];
    let index = 1;

    if (name) {
      fields.push(`name = $${index++}`);
      values.push(name);
    }
    if (email) {
      fields.push(`email = $${index++}`);
      values.push(email);
    }

    if (fields.length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    // Add WHERE clause value
    values.push(clerkId);

    const query = `
      UPDATE accounts
      SET ${fields.join(", ")}
      WHERE clerk_id = $${index}
      RETURNING *;
    `;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      // Upsert logic: insert if not found
      const insertFields = ["clerk_id", ...fields.map(f => f.split(" = ")[0])];
      const insertValues = [clerkId, ...values.slice(0, -1)];
      const placeholders = insertValues.map((_, i) => `$${i + 1}`);

      const insertQuery = `
        INSERT INTO accounts (${insertFields.join(", ")})
        VALUES (${placeholders.join(", ")})
        RETURNING *;
      `;
      const insertResult = await pool.query(insertQuery, insertValues);
      return res.json({ message: "Account created successfully", account: insertResult.rows[0] });
    }

    res.json({ message: "Account updated successfully", account: result.rows[0] });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
