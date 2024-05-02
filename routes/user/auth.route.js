import AuthController from "../../controllers/user/auth.controller.js";
import express from "express";
const router = express.Router();
const authController = new AuthController();

router.post("/login", authController.login);
router.post("/verify-otp", authController.verifyOtp);
router.post("/resend-otp", authController.resendOtp);
router.get("/refresh", authController.refresh);


export default router