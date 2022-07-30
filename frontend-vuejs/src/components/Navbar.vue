<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "Navbar",
  methods: {
    handleSignOut() {
      console.log("Sign Out")
    }
  }
})
</script>

<template>
  <header>
    <router-link to="/" class="logo">Goals Setter</router-link>
    <nav>
      <router-link class="nav-link" to="/signin">Sign In</router-link>
      <router-link class="nav-link" to="/signup">Sign Up</router-link>
      <a class="nav-link" @click="handleSignOut">Sign Out</a>
    </nav>
  </header>
</template>

<style scoped>
header {
  background-color: var(--gray-800);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  margin: 0 0 2rem 0;
}

.logo,
.nav-link {
  color: var(--purple);
  cursor: pointer;
  text-decoration: none;
}

.logo {
  font-size: 1.35rem;
}

.nav-link {
  margin: 0 17px 0 0;
  color: var(--purple);
}

.nav-link:last-child {
  margin: 0;
}
</style>
