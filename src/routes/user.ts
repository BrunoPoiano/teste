const express = require("express");
const router = express.Router();
import * as userController from "../controllers/userController";

router.get("", userController.teste);

export default router;
