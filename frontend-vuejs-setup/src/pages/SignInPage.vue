<script setup lang="ts">
import { ref } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"

const store = useStore()
const router = useRouter()

const isSubmitted = ref(false)
const email = ref("")
const password = ref("")

const handleSubmit = async (e: any) => {
    e.preventDefault()
    isSubmitted.value = true
    await store.dispatch("signInUser", { email: email.value, password: password.value })
    email.value = ""
    password.value = ""
    setTimeout(() => {
        router.push("/")
        isSubmitted.value = false
    }, 500)
}
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
                    <button type="submit" class="btn" :disabled="isSubmitted && 'disabled'">
                        Submit
                    </button>
                </div>
            </form>
        </section>
    </div>
</template>
