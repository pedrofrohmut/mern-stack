<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "AddGoalForm",
  props: {
    userId: String
  },
  data: () => ({
    text: "",
    isSubmitted: false
  }),
  methods: {
    handleAddGoal(e: any) {
      this.isSubmitted = true
      e.preventDefault()
      this.$emit("addGoal", this.text)
      this.text = ""
      setTimeout(() => {
        this.isSubmitted = false
      }, 2000)
    }
  }
})
</script>

<template>
  <section class="form">
    <form @submit="handleAddGoal">
      <div class="form-inline-group">
        <input
          type="text"
          class="form-text"
          v-model="text"
          placeholder="What is your goal?"
          required
          min="3"
        />
        <button type="submit" class="btn" :disabled="isSubmitted && 'disabled'">
          <i class="fa-solid fa-paper-plane"></i> Submit
        </button>
      </div>
    </form>
  </section>
</template>
