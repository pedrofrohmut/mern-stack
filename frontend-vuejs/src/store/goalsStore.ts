import { ActionContext } from "vuex"

import axios from "axios"

import type { Goal, NewGoal, GoalState, RootState } from "../types"

// TODO: this is for testing. To be replaced by the real one after
const TEMP_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDg3N2FjMjhmYWRkNzhkNDQ2OWJlNyIsImlhdCI6MTY1OTM2NjE0MSwiZXhwIjoxNjYxOTU4MTQxfQ.dvVGMAtqtBOyN5oICsmOxI_cTfSkatYOAKrMX5ma_TY"

const BASE_URL = "http://localhost:5000/api"
const headers = { Authorization: `Bearer ${TEMP_TOKEN}` }

const goalsStore = {
  state: () => ({
    goals: []
  }),
  mutations: {
    setGoals: (state: GoalState, goals: Partial<Goal>[]) => {
      state.goals = goals
    },
    addGoal: (state: GoalState, newGoal: Goal) => {
      state.goals.push(newGoal)
    },
    removeGoal: (state: GoalState, goalId: string) => {
      state.goals = state.goals.filter(goal => goal.id !== goalId)
    }
  },
  actions: {
    getAllGoals: async (context: ActionContext<GoalState, RootState>) => {
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
    addGoal: async (context: ActionContext<GoalState, RootState>, newGoal: NewGoal) => {
      await axios.post(`${BASE_URL}/goals`, newGoal, { headers })
      context.commit("addGoal", newGoal)
    },
    removeGoal: async (context: ActionContext<GoalState, RootState>, goalId: string) => {
      await axios.delete(`${BASE_URL}/goals/${goalId}`, { headers })
      context.commit("removeGoal", goalId)
    }
  }
}

export default goalsStore
