import { createRouter, createWebHistory } from "vue-router"

import DashboardPage from "../pages/Dashboard.vue"
import SignInPage from "../pages/SignInPage.vue"
import SignUpPage from "../pages/SignUpPage.vue"

const routes = [
  { path: "/", name: "dashboard", component: DashboardPage },
  { path: "/signin", name: "signin", component: SignInPage },
  { path: "/signup", name: "signup", component: SignUpPage }
]

const history = createWebHistory()

const router = createRouter({ history, routes })

export default router
