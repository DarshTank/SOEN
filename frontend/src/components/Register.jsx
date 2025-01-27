import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../config/axios.js";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error messages

  const navigate = useNavigate();

  function submitHandler(e) {
    e.preventDefault();

    // Basic form validation
    if (!email || !password) {
      setError("Please fill out all fields.");
      return;
    }

    // Password length validation
    if (password.length < 3) {
      setError("Password must be at least 3 characters long.");
      return;
    }

    // Reset error before making the request
    setError("");

    axios
      .post("/users/register", { email, password })
      .then((res) => {
        console.log("Response:", res.data);
        navigate("/"); // Redirect on success
      })
      .catch((err) => {
        console.error("Error:", err.response?.data || err.message);

        // Set an appropriate error message
        if (err.response?.status === 400) {
          setError(err.response.data.message || "Invalid input. Please try again.");
        } else {
          setError("An unexpected error occurred. Please try again later.");
        }
      });
  }

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 text-left rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-white">Register</h2>

        {/* Display Error Message */}
        {error && <p className="text-sm text-red-500">{error}</p>}

        <form className="space-y-4" onSubmit={submitHandler}>
          <div>
            <label htmlFor="email" className="block text-sm text-gray-300">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-gray-300">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
