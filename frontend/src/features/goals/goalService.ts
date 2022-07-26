import axios from "axios"

import { Goal, UpdatedGoal } from "../types"

const GOALS_API_URL = "http://localhost:5000/api/goals"

const getTokenFromLocalStorage = () => {
  const localStorageUser = JSON.parse(localStorage.getItem("user") || "")
  if (!localStorageUser) {
    throw new Error("Not authenticated")
  }
  return localStorageUser.token
}

const getHeaders = (token: string) => ({ Authorization: `Bearer ${token}` })

export const add = async (goal: Goal) => {
  const token = getTokenFromLocalStorage()
  const headers = getHeaders(token)
  await axios.post(GOALS_API_URL, goal, { headers })
}

export const getAll = async (): Promise<Goal[]> => {
  const token = getTokenFromLocalStorage()
  const headers = getHeaders(token)
  const response = await axios.get(GOALS_API_URL, { headers })
  const goals = response.data.map(({ _id, text, userId }: any) => ({ id: _id, text, userId }))
  return goals
}

export const update = async (updatedGoal: UpdatedGoal) => {
  const token = getTokenFromLocalStorage()
  const headers = getHeaders(token)
  await axios.put(`${GOALS_API_URL}/${updatedGoal.id}`, updatedGoal, { headers })
}

export const remove = async (goalId: string) => {
  const token = getTokenFromLocalStorage()
  const headers = getHeaders(token)
  await axios.delete(`${GOALS_API_URL}/${goalId}`, { headers })
}
