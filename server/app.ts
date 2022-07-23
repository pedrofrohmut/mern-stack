import express, { Application } from "express"
import cors from "cors"

import { errorHandler } from "./middlewares/errorHandler"
import goalsRoutes from "./routes/goalRoutes"
import userRoutes from "./routes/userRoutes"

const app: Application = express()

// Middlewares: Before routes
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use("/api/goals", goalsRoutes)
app.use("/api/users", userRoutes)

// Middlewares: After routes
app.use(errorHandler)

export default app
