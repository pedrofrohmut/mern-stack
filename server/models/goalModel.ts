import { model, Schema } from "mongoose"

const goalSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, "Please add a text value"]
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
)

const goalModel = model("Goal", goalSchema)

export default goalModel
