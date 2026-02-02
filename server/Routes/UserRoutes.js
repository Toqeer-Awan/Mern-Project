import express from "express";
import { RegisterUser, LoginUser } from "../Controllers/UserController.js";

const router = express.Router();

// Register route
router.post("/register", RegisterUser);
// Login route
router.post("/login", LoginUser);

export default router;