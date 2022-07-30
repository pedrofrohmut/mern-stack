<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "GoalList",
  props: {
    goals: Array
  }
})
</script>

<template>
  <div class="goals" v-if="goals.length > 0">
    <div class="goals-title">Goals</div>
    <div :key="goal.id" v-for="goal in goals" class="goals-container">
      <div class="goal">
        <div class="content">{{ goal.text }}</div>
        <button class="btn" @click="$emit('deleteGoal')">
          <i class="fa-solid fa-trash-can"></i> Delete
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.goals {
  margin: 2rem 0;
}

.goals .goals-title {
  color: var(--gray-500);
  font-size: 2rem;
  font-weight: 500;
  padding: 1.2rem 0 1.2rem 0.3rem;
}

.goal {
  background-color: var(--bDarkBlue);
  color: var(--black);
  margin: 0 0 1rem 0;
  border: 0;
  border-radius: var(--borderRadius);
  padding: 1rem;
  display: flex;
  align-items: center;
}

.goal div {
  flex: 1;
  font-size: 1.1rem;
  color: var(--green);
  font-weight: 500;
}

.goal button {
  background-color: var(--blue-100);
  border: 0;
  color: var(--gray-500);
  padding: 1rem;
  font-size: 0.9rem;
}

.goal i {
  font-size: 0.8rem;
}
</style>
