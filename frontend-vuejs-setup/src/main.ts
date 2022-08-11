import { createApp } from "vue"

import router from "./router/index"
import store from "./store/index"

import App from "./App.vue"

import "./style.css"

const app = createApp(App)
app.use(store)
app.use(router)
app.mount("#app")
