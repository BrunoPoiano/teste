const express = require("express");
const router = express.Router();
import * as userController from "../controllers/userController";

router.post("", userController.createUser);
router.get("/teste", userController.teste);
router.get("/logged-user", userController.loggedUser);

export default router;
