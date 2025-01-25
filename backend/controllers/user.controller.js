import userModel from "../models/user.model.js";
// import redisClient from "../services/redis.service.js";
import * as userService from "../services/user.service.js";
import { validationResult } from "express-validator";
import redisClient from "../services/redis.service.js";

export const createUserController = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  try {
    const { email, password } = req.body; // Ensure these fields are passed to the service
    const user = await userService.createUser(email, password); // Fix the function call

    const token = user.generateJWT(); // Fixed: `generateJWT` is called on the `user` instance, not `await`

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const loginController = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ errors: "Invalid Credentials" });
    }

    const isMatch = await user.isValidPassword(password);

    if (!isMatch) {
      return res.status(401).json({ errors: "Invalid Credentials" });
    }

    const token = await user.generateJWT();

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const profileController = async (req, res) => {
  console.log(req.user);

  res.status(200).json({
    user: req.user,
  });
};
