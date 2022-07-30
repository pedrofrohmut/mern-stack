<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "SignInPage"
})
</script>

<template>
  <div class="container">
    <section class="heading">
      <h1 class="page-title">Sign In</h1>
    </section>
    <section class="form">
      <form>
        <div class="form-group">
          <label class="label-block">E-mail</label>
          <input type="email" v-model="email" class="form-text" placeholder="E-mail address registred" required />
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
          <button type="submit" class="btn">Submit</button>
        </div>
      </form>
    </section>
  </div>
</template>
