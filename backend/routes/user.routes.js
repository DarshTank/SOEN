import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { body } from "express-validator";
import * as authmiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/register",
  body("email").isEmail().withMessage("Email must be a valid Email Address"), // Fix typo
  body("password")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 3 characters long"),
  userController.createUserController
);

router.post(
  "/login",
  body("email").isEmail().withMessage("Email must be a valid Email Address"), // Fix typo
  body("password")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 3 characters long"),
  userController.loginController
);

router.get(
  "/profile",
  authmiddleware.authUser,
  userController.profileController
);

router.get("/logout", authmiddleware.authUser, userController.logoutController);

export default router;
