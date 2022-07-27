import { createAsyncThunk } from "@reduxjs/toolkit"

import * as goalService from "./goalService"

import { Goal } from "../types"

export const add = createAsyncThunk("goal/add", async (goal: Goal, thunkAPI: any) => {
  try {
    const addedGoal = await goalService.add(goal)
    return addedGoal
  } catch (err: any) {
    const message =
      (err.response && err.response.data && err.response.data.message) ||
      err.message ||
      err.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const getAll = createAsyncThunk("goal/getAll", async (_, thunkAPI: any) => {
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

export const remove = createAsyncThunk("goal/remove", async (goalId: string, thunkAPI: any) => {
  try {
    await goalService.remove(goalId)
    return goalId
  } catch (err: any) {
    const message =
      (err.response && err.response.data && err.response.data.message) ||
      err.message ||
      err.toString()
    return thunkAPI.rejectWithValue(message)
  }
})
