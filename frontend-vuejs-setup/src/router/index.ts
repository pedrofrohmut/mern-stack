import { createRouter, createWebHistory } from "vue-router"
import axios from "axios"

import DashboardPage from "../pages/Dashboard.vue"
import SignInPage from "../pages/SignInPage.vue"
import SignUpPage from "../pages/SignUpPage.vue"

import store from "../store"

const guestGuard = async () => {
    console.log("Guest guard")
    const lsUser = localStorage.getItem("user")
    if (!lsUser) {
        return true
    }
    try {
        const token = JSON.parse(lsUser).token
        const response = await axios.get("http://localhost:5000/api/users/current", {
            headers: { Authorization: `Bearer ${token}` }
        })
        const user = response.data
        store.commit("setUser", user)
        localStorage.setItem("user", JSON.stringify(user))
        return "/"
    } catch (err) {
        localStorage.removeItem("user")
        store.commit("setUser", null)
        return true
    }
}

const authGuard = async () => {
    console.log("Auth Route")
    const lsUser = localStorage.getItem("user")
    if (!lsUser) {
        return "/signin"
    }
    try {
        const token = JSON.parse(lsUser).token
        const response = await axios.get("http://localhost:5000/api/users/current", {
            headers: { Authorization: `Bearer ${token}` }
        })
        const user = response.data
        store.commit("setUser", user)
        localStorage.setItem("user", JSON.stringify(user))
        return true
    } catch (err) {
        localStorage.removeItem("user")
        store.commit("setUser", null)
        return "/signin"
    }
}

const routes = [
    { path: "/", name: "dashboard", component: DashboardPage, beforeEnter: authGuard },
    { path: "/signin", name: "signin", component: SignInPage, beforeEnter: guestGuard },
    { path: "/signup", name: "signup", component: SignUpPage, beforeEnter: guestGuard }
]

const history = createWebHistory()

const router = createRouter({ history, routes })

export default router
