<script lang="ts">
import { defineComponent } from "vue"

import Navbar from "./components/Navbar.vue"
import Footer from "./components/Footer.vue"

export default defineComponent({
  name: "App",
  components: { Navbar, Footer },
  computed: {
    user() {
      return this.$store.state.auth.user || null
    }
  },
  mounted: function () {
    try {
      const user = this.$store.state.auth.user
      if (user) return
      const localStorageUser = JSON.parse(localStorage.getItem("user") || "")
      if (!localStorageUser) return
      this.$store.commit("setUser", localStorageUser)
    } catch (err) {
      console.log(err)
    }
  }
})
</script>

<template>
  <div class="app-container">
    <Navbar class="page-navbar" />
    <router-view class="router-container"></router-view>
    <Footer class="page-footer" />
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--gray-700);
}

.app-container .router-container {
  flex: 1;
}
</style>
