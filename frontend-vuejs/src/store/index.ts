import { createStore } from "vuex"

import type { RootState } from "../types"

import goalsStore from "./goalsStore"
import authStore from "./authStore"

const store = createStore<RootState>({
  modules: {
    goals: goalsStore,
    auth: authStore
  }
})

export default store
