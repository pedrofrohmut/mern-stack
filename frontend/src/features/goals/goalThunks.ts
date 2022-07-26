import { createAsyncThunk } from "@reduxjs/toolkit"

import * as goalService from "./goalService"

import { Goal, UpdatedGoal } from "../types"

export const add = createAsyncThunk(
  "goal/add",
  async (goal: Goal, thunkAPI: any): Promise<void> => {
    try {
      await goalService.add(goal)
    } catch (err: any) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getAll = createAsyncThunk("goal/getAll", async (_, thunkAPI: any): Promise<Goal[]> => {
  try {
    const goals = await goalService.getAll()
    return goals
  } catch (err: any) {
    const message =
      (err.response && err.response.data && err.response.data.message) ||
      err.message ||
      err.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const update = createAsyncThunk(
  "goal/update",
  async (updatedGoal: UpdatedGoal, thunkAPI: any): Promise<void> => {
    try {
      await goalService.update(updatedGoal)
    } catch (err: any) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const remove = createAsyncThunk(
  "goal/remove",
  async (goalId: string, thunkAPI: any): Promise<void> => {
    try {
      await goalService.remove(goalId)
    } catch (err: any) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
