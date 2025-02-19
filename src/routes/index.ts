const express = require("express");
const router = express.Router();
import userRoutes from "./user";
import * as authController from "../controllers/authController"
import { authMiddleware, userMiddleware } from "../auth";

//Auth
router.get("/login", authController.login);
router.post("/signin", authController.createUser);

//user
router.use("/user", [authMiddleware, userMiddleware], userRoutes);

//region


export default router;
