<script lang="ts">
import { defineComponent } from "vue"
import { v4 as uuid } from "uuid"

import type { Goal } from "../types"

import AddGoalForm from "../components/AddGoalForm.vue"
import Spinner from "../components/Spinner.vue"
import GoalList from "../components/GoalList.vue"

export default defineComponent({
  name: "DashboardPage",
  components: { AddGoalForm, Spinner, GoalList },
  data: () => ({
    isLoading: true,
    user: {
      id: "123",
      name: "John Doe"
    }
  }),
  computed: {
    goals(): Partial<Goal>[] {
      return this.$store.state.goals.goals || []
    }
  },
  methods: {
    handleAddGoal(text: string) {
      const newGoal = {
        id: uuid(),
        text,
        userId: this.user.id
      }
      this.$store.dispatch("addGoal", newGoal)
    },
    handleRemoveGoal(goalId: string) {
      this.$store.dispatch("removeGoal", goalId)
    }
  },
  async mounted() {
    await this.$store.dispatch("getAllGoals")
    this.isLoading = false
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
