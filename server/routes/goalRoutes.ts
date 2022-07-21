import { Router } from "express"

import { getGoals, addGoal, updateGoal, deleteGoal } from "../controllers/goalController"
import { protectRoute } from "../middlewares/authMiddleware"

const router = Router()

router.get("/", protectRoute, getGoals)

router.post("/", protectRoute, addGoal)

router.put("/:id", protectRoute, updateGoal)

router.delete("/:id", protectRoute, deleteGoal)

export default router
