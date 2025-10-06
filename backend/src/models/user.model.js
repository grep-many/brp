import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { jwtExpire, jwtSecret } from "../config/env.js";
import jwt from "jsonwebtoken"

/**
 * User Schema
 * Fields:
 * - name: String, required
 * - email: String, required, unique
 * - password: String, required (hashed)
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select:false
    },
  },
  { timestamps: true } // automatically adds createdAt and updatedAt
);

/**
 * Pre-save middleware
 * - Runs before saving a document
 * - Hashes password if it has been created or modified
 * - Must use a **normal function** because `this` refers to the document
 */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

/**
 * Method: matchPassword
 * - Compares entered password with hashed password in DB
 * - Must use a **normal function** because `this` refers to the document
 */
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

/**
 * Method: generateAuthToken
 * - Optional helper to generate JWT
 * - Arrow function is fine here because `this` is not used
 */
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id }, jwtSecret, { expiresIn: jwtExpire });
};

const User = mongoose.model.User || mongoose.model("User", userSchema);

export default User;