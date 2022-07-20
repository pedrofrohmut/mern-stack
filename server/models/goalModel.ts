import { model, Schema } from "mongoose"

const goalSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, "Please add a text value"]
    }
  },
  {
    timestamps: true
  }
)

const goalModel = model("Goal", goalSchema)

export default goalModel
