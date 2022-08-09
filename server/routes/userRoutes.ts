import { Router } from "express"

import { addUser, signInUser, getCurrentUser, verifyToken } from "../controllers/userController"
import { protectRoute } from "../middlewares/authMiddleware"

const router = Router()

router.post("/", addUser)

router.post("/signin", signInUser)

router.post("/verify", verifyToken)

router.get("/current", protectRoute, getCurrentUser)

export default router
