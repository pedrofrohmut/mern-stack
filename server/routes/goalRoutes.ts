import { Router } from "express"

import { getGoals, addGoal, updateGoal, deleteGoal } from "../controllers/goalController"

const router = Router()

router.get("/", getGoals)

router.post("/", addGoal)

router.put("/:id", updateGoal)

router.delete("/:id", deleteGoal)

export default router
