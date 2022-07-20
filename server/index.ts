import dotenv from "dotenv"

import app from "./app"
import { connectDb } from "./config/db"

dotenv.config()

if (process.env.NODE_ENV === "development") {
  console.clear()
}

const port = process.env.PORT || 5000

const run = async () => {
  connectDb()
  app.listen(port, () => console.log(`Server started at http://localhost:${port}`))
}
run()
