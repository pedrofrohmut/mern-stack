import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { getAll } from "./goalThunks"

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
        state.goals = action.payload
      })
      .addCase(getAll.rejected, (state: GoalState, action: PayloadAction<string>) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { reset } = goalSlice.actions

export default goalSlice.reducer
