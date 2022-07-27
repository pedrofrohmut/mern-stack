import { Request, Response } from "express"
import asyncHandler from "express-async-handler"

import goalModel from "../models/goalModel"

// @desc Get All Goals
// @Route GET api/goals
// @Access Private
export const getGoals = asyncHandler(async (req: Request, res: Response) => {
  try {
    const goals = await goalModel.find({ userId: req.user?.id })
    res.status(200).json(goals)
  } catch (err) {
    throw new Error("Error to get all goals from Database")
  }
})

// @desc Add a goal
// @Route POST api/goals
// @Access Private
export const addGoal = asyncHandler(async (req: Request, res: Response) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error("Invalid request no text in the request body")
  }
  try {
    const addedGoal = await goalModel.create({ text: req.body.text, userId: req.user?.id })
    res.status(201).json(addedGoal)
  } catch (err) {
    throw new Error("Error to add a goal to the Database")
  }
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
  let goalToUpdate: any
  try {
    goalToUpdate = await goalModel.findById(goalId)
    if (goalToUpdate === null) {
      res.status(400).json({ message: "Goal to be update was not found" })
      return
    }
  } catch (err) {
    throw new Error("Error to get goal to update in the Database")
  }
  if (goalToUpdate.userId.toString() !== req.user?.id) {
    res.status(401)
    throw new Error("The current user is not of the resource owner")
  }
  try {
    await goalModel.findByIdAndUpdate(goalId, updatedGoal)
    res.status(204).json()
  } catch (err) {
    throw new Error("Error to update a goal in the Database")
  }
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
  let goalToDelete: any
  try {
    goalToDelete = await goalModel.findById(goalId)
    if (goalToDelete === null) {
      res.status(400).json({ message: "Goal to be deleted was not found" })
      return
    }
  } catch (err) {
    throw new Error("Error to get goal to delete in the Database")
  }
  if (goalToDelete.userId.toString() !== req.user?.id) {
    res.status(401)
    throw new Error("The current user is not of the resource owner")
  }
  try {
    await goalModel.deleteOne({ _id: goalId })
    res.status(204).json()
  } catch (err) {
    throw new Error("Error to delete a goal in the Database")
  }
})
