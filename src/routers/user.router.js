import express from "express";
import {  loginUser, logoutUser, regenerateAccessToken, registerUser } from "../controllers/user.controller.js";




const router = express.Router();

router.post("/register" , registerUser)
router.post("/login" , loginUser)
router.post("/logout" , logoutUser)
router.post("/regeneratetoken" , regenerateAccessToken)

export default router;