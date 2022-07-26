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

export const add = async (goal: Goal): Promise<void> => {
  const token = getTokenFromLocalStorage()
  await axios.post(GOALS_API_URL, { data: goal, headers: { Authorization: `Bearer ${token}` } })
}

export const getAll = async (): Promise<Goal[]> => {
  const token = getTokenFromLocalStorage()
  const response = await axios.get(GOALS_API_URL, { headers: { Authorization: `Bearer ${token}` } })
  const goals = response.data.map(({ _id, text, userId }: any) => ({ id: _id, text, userId }))
  return goals
}

export const update = async (updatedGoal: UpdatedGoal): Promise<void> => {
  const token = getTokenFromLocalStorage()
  await axios.put(`${GOALS_API_URL}/${updatedGoal.id}`, {
    data: updatedGoal,
    headers: { Authorization: `Bearer ${token}` }
  })
}

export const remove = async (goalId: string): Promise<void> => {
  const token = getTokenFromLocalStorage()
  await axios.delete(`${GOALS_API_URL}/${goalId}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
}
