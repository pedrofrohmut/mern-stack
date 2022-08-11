<script setup lang="ts">
import { computed, onMounted } from "vue"
import { v4 as uuid } from "uuid"
import { useStore } from "vuex"
import { useRouter } from "vue-router"

import AddGoalForm from "../components/AddGoalForm.vue"
import Spinner from "../components/Spinner.vue"
import GoalList from "../components/GoalList.vue"

const store = useStore()
const router = useRouter()

const goals = computed(() => store.state.goals.goals || [])
const user = computed(() => store.state.auth.user || null)

const handleAddGoal = (text: string) => {
    // @ts-ignore
    const newGoal = { id: uuid(), text, userId: user.id }
    store.dispatch("addGoal", newGoal)
}

const handleRemoveGoal = (goalId: string) => {
    store.dispatch("removeGoal", goalId)
}

onMounted(() => {
    //const lsUser = localStorage.getItem("user")
    //if (!lsUser) {
        //router.push("/signin")
        //return
    //}
    store.dispatch("getAllGoals")
})
</script>

<template>
    <div class="container">
        <section class="heading">
            <h1 class="page-title">Welcome {{ user && user.name ? user.name : "" }}</h1>
            <p>Goals Dashboard</p>
        </section>
        <AddGoalForm @addGoal="handleAddGoal" />
        <GoalList :goals="goals" @removeGoal="handleRemoveGoal" />
    </div>
</template>
