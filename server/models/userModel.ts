import { model, Schema } from "mongoose"

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"]
    },
    email: {
      type: String,
      required: [true, "Please provide a e-mail"],
      unique: true
    },
    passwordHash: {
      type: String,
      required: [true, "Please provide a password"]
    },
    phone: {
      type: String,
      required: [true, "Please provide a phone"]
    }
  },
  {
    timestamps: true
  }
)

const userModel = model("User", userSchema)

export default userModel
