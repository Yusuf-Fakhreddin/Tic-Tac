import express from "express";

import {
	facebookController,
	forgotPassword,
	googleController,
	registerUser,
	resetPassword,
	login,
} from "../controllers/authController.js";
const router = express.Router();

router.post("/googlelogin", googleController);
router.post("/facebooklogin", facebookController);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resettoken", resetPassword);
router.post("/login", login);
router.post("/", registerUser);

export default router;
