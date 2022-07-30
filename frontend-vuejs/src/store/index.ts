import { createStore } from "vuex"

import type { Goal, RootState } from "../types"

const myGoals: Partial<Goal>[] = [
  { id: "1", text: "First Goal", userId: "123" },
  { id: "2", text: "Second Goal", userId: "123" },
  { id: "3", text: "Third Goal", userId: "123" },
  { id: "4", text: "Fourth Goal", userId: "123" }
]

const store = createStore({
  state: () => ({
    goals: myGoals
  }),
  getters: {
    getAll: (state: RootState) => state.goals
  },
  mutations: {
    addGoal: (state: RootState, newGoal: Goal) => {
      state.goals.push(newGoal)
    },
    removeGoal: (state: RootState, goalId: string) => {
      state.goals = state.goals.filter(goal => goal.id !== goalId)
    }
  }
})

export default store
