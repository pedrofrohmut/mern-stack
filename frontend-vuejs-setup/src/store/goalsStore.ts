import { ActionContext } from "vuex"
import axios from "axios"
import type { Goal, NewGoal, GoalState, RootState } from "../types"

const BASE_URL = "http://localhost:5000/api"

const getHeaders = (token: string) => ({ Authorization: `Bearer ${token}` })

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
            state.goals = state.goals.filter((goal) => goal.id !== goalId)
        }
    },
    actions: {
        getAllGoals: async (context: ActionContext<GoalState, RootState>) => {
            try {
                const headers = getHeaders(context.rootState.auth.user.token)
                const response = await axios.get(`${BASE_URL}/goals`, { headers })
                const goals = response.data.map(
                    ({ _id, text, userId, createdAt, updatedAt }: any) => ({
                        id: _id,
                        text,
                        userId,
                        createdAt,
                        updatedAt
                    })
                )
                context.commit("setGoals", goals)
            } catch (err) {
                console.log(err)
            }
        },
        addGoal: async (context: ActionContext<GoalState, RootState>, newGoal: NewGoal) => {
            try {
                const headers = getHeaders(context.rootState.auth.user.token)
                await axios.post(`${BASE_URL}/goals`, newGoal, { headers })
                context.commit("addGoal", newGoal)
            } catch (err) {
                console.log(err)
            }
        },
        removeGoal: async (context: ActionContext<GoalState, RootState>, goalId: string) => {
            try {
                const headers = getHeaders(context.rootState.auth.user.token)
                await axios.delete(`${BASE_URL}/goals/${goalId}`, { headers })
                context.commit("removeGoal", goalId)
            } catch (err) {
                console.log(err)
            }
        }
    }
}

export default goalsStore
