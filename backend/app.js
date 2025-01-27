import express from "express";
import morgan from "morgan";
import cors from "cors";
import connect from "./db/db.js";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
// import cors from "cors";

// Start DB connection with error handling
const startServer = async () => {
  try {
    await connect();
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection failed:", err);
    process.exit(1); // Exit if DB connection fails
  }
};

startServer();

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(cors()); // Enable CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API",
    availableRoutes: ["/users"],
  });
});

// Fallback for unhandled routes
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

export default app;
