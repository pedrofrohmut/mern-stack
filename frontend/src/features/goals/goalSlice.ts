import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { add, getAll, remove } from "./goalThunks"

import { Goal, GoalState } from "../types"

const initialState: GoalState = {
  goals: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: ""
}

export const goalSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    reset: () => initialState
  },
  extraReducers: (builder: any) => {
    builder
      // Get All
      .addCase(getAll.pending, (state: GoalState) => {
        state.isLoading = true
      })
      .addCase(getAll.fulfilled, (state: GoalState, action: PayloadAction<Goal[]>) => {
        state.isLoading = false
        state.isSuccess = true
        const goals = action.payload
        state.goals = goals
      })
      .addCase(getAll.rejected, (state: GoalState, action: PayloadAction<string>) => {
        state.isLoading = false
        state.isError = true
        const errorMessage = action.payload
        state.message = errorMessage
      })
      // Add
      .addCase(add.pending, (state: GoalState) => {
        state.isLoading = true
      })
      .addCase(add.fulfilled, (state: GoalState, action: PayloadAction<Goal>) => {
        state.isLoading = false
        state.isSuccess = true
        const addedGoal = action.payload
        state.goals.push(addedGoal)
      })
      .addCase(add.rejected, (state: GoalState, action: PayloadAction<string>) => {
        state.isLoading = false
        state.isError = true
        const errorMessage = action.payload
        state.message = errorMessage
      })
      // Delete
      .addCase(remove.pending, (state: GoalState) => {
        state.isLoading = true
      })
      .addCase(remove.fulfilled, (state: GoalState, action: PayloadAction<string>) => {
        state.isLoading = false
        state.isSuccess = true
        const removedGoalId = action.payload
        state.goals = state.goals.filter(goal => goal.id !== removedGoalId)
      })
      .addCase(remove.rejected, (state: GoalState, action: PayloadAction<string>) => {
        state.isLoading = false
        state.isError = true
        const errorMessage = action.payload
        state.message = errorMessage
      })
  }
})

export const { reset } = goalSlice.actions

export default goalSlice.reducer
