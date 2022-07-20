import { Request, Response } from "express"
import asyncHandler from "express-async-handler"

// @desc Get All Goals
// @Route GET api/goals
// @Access Private
export const getGoals = asyncHandler(async (_req: Request, res: Response) => {
  res.status(200).json([])
})

// @desc Add a goal
// @Route POST api/goals
// @Access Private
export const addGoal = asyncHandler(async (req: Request, res: Response) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error("Invalid request no text in the request body")
  }
  res.status(201).json()
})

// @desc Update a goal
// @Route PUT api/goals/:id
// @Access Private
export const updateGoal = asyncHandler(async (req: Request, res: Response) => {
  const goalId = req.params.id
  if (!goalId) {
    res.status(400)
    throw new Error("Invalid request. No ID in the request parameters")
  }
  const updatedGoal = req.body
  if (!updatedGoal.text) {
    res.status(400)
    throw new Error("Invalid request. No text in the request body")
  }
  res.status(204).json()
})

// @desc Delete a goal
// @Route DELETE api/goals/:id
// @Access Private
export const deleteGoal = asyncHandler(async (req: Request, res: Response) => {
  const goalId = req.params.id
  if (!goalId) {
    res.status(400)
    throw new Error("Invalid request. No ID in the request parameters")
  }
  res.status(204).json()
})
