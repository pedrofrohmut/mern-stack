<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "Spinner"
})
</script>

<template>
  <div className="loadingSpinnerContainer">Loading...</div>
</template>

<style scoped>
.loadingSpinnerContainer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 5000;
  display: flex;
  justify-content: center;
  align-items: center;

  color: var(--purple);
  font-size: 2.5rem;
}
</style>
