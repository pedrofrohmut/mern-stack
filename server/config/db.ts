import { connect } from "mongoose"

export const connectDb = async (): Promise<void> => {
  if (!process.env.MONGO_URI) {
    throw new Error("MongoDB cound NOT found a URI in the server ENV")
  }
  try {
    const conn = await connect(process.env.MONGO_URI)
    if (conn.connection.readyState === 1) {
      console.log(`MongoDB connected on ${conn.connection.host}:${conn.connection.port}`)
    }
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}
