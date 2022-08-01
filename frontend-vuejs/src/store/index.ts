import { createStore } from "vuex"
import axios from "axios"

import type { Goal, RootState } from "../types"

// TODO: this is for testing. To be replaced by the real one after
const TEMP_TOKEN = ""

const BASE_URL = "http://localhost:5000/api"
const headers = { Authorization: `Bearer ${TEMP_TOKEN}` }

const store = createStore<RootState>({
  state: () => ({
    goals: []
  }),
  mutations: {
    setGoals: (state: RootState, goals: Partial<Goal>[]) => {
      state.goals = goals
    },
    addGoal: (state: RootState, newGoal: Goal) => {
      state.goals.push(newGoal)
    },
    removeGoal: (state: RootState, goalId: string) => {
      state.goals = state.goals.filter(goal => goal.id !== goalId)
    }
  },
  actions: {
    getAllGoals: async context => {
      const response = await axios.get(`${BASE_URL}/goals`, { headers })
      const goals = response.data.map(({ _id, text, userId, createdAt, updatedAt }: any) => ({
        id: _id,
        text,
        userId,
        createdAt,
        updatedAt
      }))
      context.commit("setGoals", goals)
    },
    addGoal: async (context, newGoal) => {
      await axios.post(`${BASE_URL}/goals`, newGoal, { headers })
      context.commit("addGoal", newGoal)
    },
    removeGoal: async (context, goalId) => {
      await axios.delete(`${BASE_URL}/goals/${goalId}`, { headers })
      context.commit("removeGoal", goalId)
    }
  }
})

export default store
