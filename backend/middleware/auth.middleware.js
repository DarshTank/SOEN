import jwt from "jsonwebtoken";
import redisClient from "../services/redis.service.js";

export const authUser = async (req, res, next) => {
  try {
    // Get token from cookies or authorization header
    const token =
      req.cookies?.token || // From cookies (requires cookie-parser middleware)
      (req.headers.authorization && req.headers.authorization.split(" ")[1]); // From Authorization header

    // Check if token exists
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized User: No token provided" });
    }

    const isBlackListed = await redisClient.get(token);

    if (isBlackListed) {
      res.cookie("token", "");

      res.status(401).send({ error: "Unauthorized User" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request object
    req.user = decoded;

    // Proceed to the next middleware
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized User: Invalid token" });
  }
};
