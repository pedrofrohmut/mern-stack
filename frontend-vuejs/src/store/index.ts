import { createStore } from "vuex"

import type { RootState } from "../types"

import goalsStore from "./goalsStore"

const store = createStore<RootState>({
  modules: {
    goals: goalsStore
  }
})

export default store
