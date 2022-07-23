import { createAsyncThunk } from "@reduxjs/toolkit"

import * as authService from "./authService"

import { SessionUser, User, UserCredentials } from "../types"

export const signup = createAsyncThunk(
  "auth/signup",
  async (user: User, thunkAPI: any): Promise<void> => {
    try {
      await authService.signup(user)
    } catch (err: any) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const signin = createAsyncThunk(
  "auth/signin",
  async (userCredentials: UserCredentials, thunkAPI: any): Promise<SessionUser> => {
    try {
      const sessionUser = await authService.signin(userCredentials)
      return sessionUser
    } catch (err: any) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const signout = createAsyncThunk("auth/signout", (): void => {
  authService.signout()
})
