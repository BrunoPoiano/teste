const express = require("express");
const router = express.Router();
import userRoutes from "./user";
import * as authController from "../controllers/authController"
import { authMiddleware, userMiddleware } from "../auth";

router.use("/user", [authMiddleware, userMiddleware], userRoutes);
router.get("/login", authController.login);

export default router;
