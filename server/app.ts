import express, { Application } from "express"

import { errorHandler } from "./middlewares/errorHandler"
import goalsRoutes from "./routes/goalRoutes"

const app: Application = express()

// Middlewares: Before routes
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use("/api/goals", goalsRoutes)

// Middlewares: After routes
app.use(errorHandler)

export default app
