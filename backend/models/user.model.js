import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Define the schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: [6, "Email must be at least 6 characters long"],
    maxLength: [50, "Email must not be longer than 50 characters"],
  },
  password: {
    type: String,
    required: true, // Ensure this is required
    select: false, // Ensure password is not retrieved unless explicitly requested
  },
});

// Add static methods to hash the password
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

// Add methods to validate the password
userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Add a method to generate JWT
userSchema.methods.generateJWT = function () {
  return jwt.sign({ email: this.email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// Create the model
const User = mongoose.model("User", userSchema);

export default User;
