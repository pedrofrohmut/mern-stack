<script lang="ts">
import { defineComponent } from "vue"
import { v4 as uuid } from "uuid"

import AddGoalForm from "../components/AddGoalForm.vue"
import Spinner from "../components/Spinner.vue"
import GoalList from "../components/GoalList.vue"

export default defineComponent({
  name: "DashboardPage",
  components: { AddGoalForm, Spinner, GoalList },
  data: () => ({
    isLoading: true
  }),
  computed: {
    goals() {
      return this.$store.state.goals.goals || []
    },
    user() {
      return this.$store.state.auth.user || null
    }
  },
  methods: {
    handleAddGoal(text: string) {
      const newGoal = { id: uuid(), text, userId: this.user.id }
      this.$store.dispatch("addGoal", newGoal)
    },
    handleRemoveGoal(goalId: string) {
      this.$store.dispatch("removeGoal", goalId)
    }
  },
  async mounted() {
    if (!this.$store.state.auth.user) {
      this.$router.push("/signin")
      return
    }
    await this.$store.dispatch("getAllGoals")
    this.isLoading = false
  }
})
</script>

<template>
  <div class="container">
    <section class="heading">
      <h1 class="page-title">Welcome {{ user && user.name ? user.name : "" }}</h1>
      <p>Goals Dashboard</p>
    </section>
    <AddGoalForm @addGoal="handleAddGoal" />
    <div v-if="isLoading">
      <Spinner />
    </div>
    <div v-else>
      <GoalList :goals="goals" @removeGoal="handleRemoveGoal" />
    </div>
  </div>
</template>
