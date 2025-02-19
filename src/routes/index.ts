const express = require("express");
const router = express.Router();
import userRoutes from "./user";
import * as authController from "../controllers/authController"

router.use("/user", userRoutes);
router.get("/login", authController.login);

export default router;
