import { Router } from "express";
import { postSignup, postSignin } from "../controllers/auth.controller.js";
const router = Router();

router.post("/signup", postSignup);
router.post("/signin", postSignin);
// router.get("/me",);

export default router;