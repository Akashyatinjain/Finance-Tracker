const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true, index: true },
    name: { type: String, trim: true },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Invalid email format"]
    },
  },
  { timestamps: true } // createdAt, updatedAt auto add hoga
);

module.exports = mongoose.model("Account", AccountSchema);
