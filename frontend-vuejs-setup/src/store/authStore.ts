import axios from "axios"
import { ActionContext } from "vuex"
import type { RootState, UserCredentials, AuthState, NewUser, SessionUser } from "../types"

const BASE_URL = "http://localhost:5000/api"

const authStore = {
    state: () => ({
        user: null
    }),
    mutations: {
        setUser: (state: AuthState, user: SessionUser) => {
            state.user = user
        }
    },
    actions: {
        signInUserWithToken: async (
            context: ActionContext<AuthState, RootState>,
            token: string
        ) => {
            try {
                const response = await axios.get(`${BASE_URL}/users/current`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                const user = response.data
                localStorage.setItem("user", JSON.stringify(user))
                context.commit("setUser", user)
            } catch (err) {
                console.log(err)
            }
        },
        signInUser: async (
            context: ActionContext<AuthState, RootState>,
            credentials: UserCredentials
        ) => {
            try {
                const response = await axios.post(`${BASE_URL}/users/signin`, credentials)
                const user = response.data
                localStorage.setItem("user", JSON.stringify(user))
                context.commit("setUser", user)
            } catch (err) {
                console.log(err)
            }
        },
        signUpUser: async (_context: ActionContext<AuthState, RootState>, newUser: NewUser) => {
            try {
                await axios.post(`${BASE_URL}/users`, newUser)
            } catch (err) {
                console.log(err)
            }
        },
        signOutUser: (context: ActionContext<AuthState, RootState>) => {
            try {
                localStorage.removeItem("user")
                context.commit("setUser", null)
            } catch (err) {
                console.log(err)
            }
        }
    }
}

export default authStore
