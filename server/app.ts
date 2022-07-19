import express, { Application } from "express"

const app: Application = express()

app.get("/", (_, res) => {
  res.json({ message: "Hello, People!" })
})

export default app
