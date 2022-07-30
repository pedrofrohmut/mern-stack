<script lang="ts">
import { defineComponent } from "vue"
import { v4 as uuid } from "uuid"

import type { Goal } from "../types"

import store from "../store"

import AddGoalForm from "../components/AddGoalForm.vue"
import Spinner from "../components/Spinner.vue"
import GoalList from "../components/GoalList.vue"

export default defineComponent({
  name: "DashboardPage",
  components: { AddGoalForm, Spinner, GoalList },
  data: () => ({
    isLoading: true,
    goals: [] as Partial<Goal>[],
    user: {
      id: "123",
      name: "John Doe"
    }
  }),
  methods: {
    handleAddGoal(text: string) {
      const newGoal = { 
        id: uuid(), 
        text, 
        userId: this.user.id 
      }
      store.commit('addGoal', newGoal)
      this.goals = store.getters.getAll
    },
    handleRemoveGoal(goalId:string) {
      store.commit('removeGoal', goalId)
      this.goals = store.getters.getAll
    }
  },
  mounted() {
    this.isLoading = false
    this.goals = store.getters.getAll
  }
})
</script>

<template>
  <div class="container">
    <section class="heading">
      <h1 class="page-title">Welcome {{ user ? user.name : "" }}</h1>
      <p>Goals Dashboard</p>
    </section>
    <AddGoalForm :userId="user.id" @addGoal="handleAddGoal" />
    <div v-if="isLoading">
      <Spinner />
    </div>
    <div v-else>
      <GoalList :goals="goals" @removeGoal="handleRemoveGoal" />
    </div>
  </div>
</template>
