<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "SignUpPage",
  data: () => ({
    isSubmitted: false,
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  }),
  methods: {
    handleSubmit(e: any) {
      this.isSubmitted = true
      e.preventDefault()
      // Submit api call
      this.name = ""
      this.email = ""
      this.phone = ""
      this.password = ""
      this.confirmPassword = ""
      setTimeout(() => {
        this.isSubmitted = false
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
        Sign Up
      </h1>
      <p>Inform your credentials to access the dashboard</p>
    </section>
    <section class="form">
      <form @submit="handleSubmit">
        <div class="form-group">
          <label class="label-block">Name</label>
          <input
            type="text"
            v-model="name"
            class="form-text"
            placeholder="Your full name"
            required
          />
        </div>
        <div class="form-group">
          <label class="label-block">E-mail</label>
          <input
            type="email"
            v-model="email"
            class="form-text"
            placeholder="Enter an E-mail address"
            required
          />
        </div>
        <div class="form-group">
          <label class="label-block">Phone</label>
          <input
            type="text"
            v-model="phone"
            class="form-text"
            placeholder="Phone number like: 999-999-9999"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            required
          />
        </div>
        <div class="form-group">
          <label class="label-block">Password</label>
          <input
            type="password"
            v-model="password"
            class="form-text"
            placeholder="Enter a password for this e-mail"
            min="3"
            required
          />
        </div>
        <div class="form-group">
          <label class="label-block">Confirm Password</label>
          <input
            type="password"
            v-model="confirmPassword"
            class="form-text"
            placeholder="Retype your password to be sure"
            required
          />
        </div>
        <div class="form-group">
          <button type="submit" class="btn" :disabled="isSubmitted && 'disabled'">Submit</button>
        </div>
      </form>
    </section>
  </div>
</template>
