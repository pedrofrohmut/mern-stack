<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "Footer"
})
</script>

<template>
  <footer><div class="content">&copy; Pedro Frohmut 2022</div></footer>
</template>

<style scoped>
footer {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  text-align: center;
  color: var(--gray-500);
}
</style>
