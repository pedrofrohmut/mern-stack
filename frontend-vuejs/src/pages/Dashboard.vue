<script lang="ts">
import { defineComponent } from "vue"

import AddGoalForm from "../components/AddGoalForm.vue"
import Spinner from "../components/Spinner.vue"
import GoalList from "../components/GoalList.vue"

type Goal = { id: string; text: string; userId: string }

const myGoals: Partial<Goal>[] = [
  { id: "1", text: "First Goal", userId: "123" },
  { id: "2", text: "Second Goal", userId: "123" },
  { id: "3", text: "Third Goal", userId: "123" }
]

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
      console.log("Goal", text)
    }
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false
      this.goals = myGoals
    }, 2000)
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
      <GoalList :goals="goals" />
    </div>
  </div>
</template>
