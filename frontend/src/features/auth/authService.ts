import axios from "axios"

import { SessionUser, User, UserCredentials } from "../types"

const API_URL = "http://localhost:5000/api/users"

// Sign Up users
export const signup = async (userData: User): Promise<void> => {
  await axios.post(API_URL, userData)
}

// Sign in a user
export const signin = async (userCredentials: UserCredentials): Promise<SessionUser> => {
  const response = await axios.post(`${API_URL}/signin`, userCredentials)
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data))
  }
  return response.data
}

// Log out session user
export const signout = (): void => {
  localStorage.removeItem("user")
}
