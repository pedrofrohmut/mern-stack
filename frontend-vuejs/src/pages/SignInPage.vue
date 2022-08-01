<script lang="ts">
import { defineComponent } from "vue"

import Spinner from "../components/Spinner.vue"

export default defineComponent({
  name: "SignInPage",
  components: { Spinner },
  data: () => ({
    isLoading: false,
    isSubmitted: false,
    email: "",
    password: ""
  }),
  methods: {
    handleSubmit: async function (e: any) {
      e.preventDefault()
      this.isSubmitted = true
      this.isLoading = true
      await this.$store.dispatch("signInUser", { email: this.email, password: this.password })
      this.$router.push("/")
      this.email = ""
      this.password = ""
      setTimeout(() => {
        this.isSubmitted = false
        this.isLoading = false
      }, 2000)
    }
  }
})
</script>

<template>
  <div class="container">
    <section class="heading">
      <h1 class="page-title">
        <i class="fa-solid fa-right-to-bracket"></i>
        Sign In
      </h1>
      <p>Inform your credentials to access the dashboard</p>
    </section>
    <div v-if="isLoading">
      <Spinner />
    </div>
    <div v-else>
      <section class="form">
        <form @submit="handleSubmit">
          <div class="form-group">
            <label class="label-block">E-mail</label>
            <input
              type="email"
              v-model="email"
              class="form-text"
              placeholder="E-mail address registred"
              required
            />
          </div>
          <div class="form-group">
            <label class="label-block">Password</label>
            <input
              type="password"
              v-model="password"
              class="form-text"
              placeholder="user password for this e-mail"
              min="3"
              required
            />
          </div>
          <div class="form-group">
            <button type="submit" class="btn" :disabled="isSubmitted && 'disabled'">Submit</button>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>
