<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { useStore } from "vuex"

import Navbar from "./components/Navbar.vue"
import Footer from "./components/Footer.vue"
import Spinner from "./components/Spinner.vue"

const store = useStore()

const isLoading = ref(true)

const user = computed(() => store.state.auth.user)

onMounted(() => {
    setTimeout(() => {
        isLoading.value = false
    }, 500)
})
</script>

<template>
    <Navbar class="page-navbar" />
    <div v-if="isLoading">
        <Spinner />
    </div>
    <div v-if="!isLoading" class="app-container">
        <router-view class="router-container"></router-view>
    </div>
    <Footer class="page-footer" />
</template>

<style scoped>
.app-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.app-container .router-container {
    flex: 1;
}
</style>
