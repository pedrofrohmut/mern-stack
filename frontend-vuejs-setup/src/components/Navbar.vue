<script setup lang="ts">
import { computed } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"

const store = useStore()
const router = useRouter()

const user = computed(() => store.state.auth.user)

const handleSignOut = async () => {
    await store.dispatch("signOutUser")
    router.push("/signin")
    console.log("Sign Out")
}
</script>

<template>
    <header>
        <router-link to="/" class="logo">Goals Setter</router-link>
        <nav v-if="!user">
            <router-link class="nav-link" to="/signin">Sign In</router-link>
            <router-link class="nav-link" to="/signup">Sign Up</router-link>
        </nav>
        <nav v-if="user">
            <router-link class="nav-link" to="/signin">Sign In</router-link>
            <router-link class="nav-link" to="/signup">Sign Up</router-link>
            <span class="nav-username">{{ user.name }}</span>
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

.nav-username {
    color: var(--white);
    margin-right: 1.0em;
}
</style>
