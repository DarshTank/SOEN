import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

function connect() {
  // Ensure the MongoDB URI is defined
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("Error: MONGODB_URI is not defined in the environment variables.");
    process.exit(1); 
  }

  mongoose
    .connect(uri)
    .then(() => {
      console.log("Connected to Database");
    })
    .catch((err) => {
      console.error("Error connecting to the database:", err.message);
      process.exit(1);
    });
}

export default connect;
