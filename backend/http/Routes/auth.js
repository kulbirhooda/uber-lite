import { Router } from "express";
import { postSignup, postSignin, postSignupDriver, getMe} from "../controllers/auth.controller.js";
import { requireAuth } from "../Middlewares/requireAuth.js";
const router = Router();

router.post("/signup", postSignup);
router.post("/signin", postSignin);
router.get("/me", requireAuth, getMe);
router.post("/signup/driver", postSignupDriver);
export default router;