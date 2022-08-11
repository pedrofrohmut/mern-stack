<script setup lang="ts">
import { ref } from "vue"

const emit = defineEmits(["addGoal"])

const text = ref("")
const isSubmitted = ref(false)

const handleAddGoal = (e: any) => {
    e.preventDefault()
    isSubmitted.value = true
    emit("addGoal", text.value)
    text.value = ""
    setTimeout(() => {
        isSubmitted.value = false
    }, 2000)
}
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
