import userModel from "../models/user.model.js";
import * as userService from "../services/user.service.js";
import { validationResult } from "express-validator";

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
