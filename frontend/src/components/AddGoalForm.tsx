import { useState } from "react"
import { toast } from "react-toastify"

import { useAppDispatch } from "../app/hooks"
import { add, getAll } from "../features/goals/goalThunks"

type Props = { userId: string }

const AddGoalForm = ({ userId }: Props) => {
  const [text, setText] = useState("")
  const dispatch = useAppDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text) {
      toast.error("You must have text to submit")
      return
    }
    if (!userId) {
      toast.error("Could not get userId from session. Please Try to sign in")
    }
    dispatch(add({ text, userId }))
    dispatch(getAll())
    setText("")
  }

  return (
    <section className="form mb-5">
      <form className="inline-form-group" onSubmit={handleSubmit}>
        <input
          type="text"
          name="text"
          id="text"
          value={text}
          onChange={handleChange}
          placeholder="Define a goal"
        />
        <button className="btn" type="submit">
          Add
        </button>
      </form>
    </section>
  )
}

export default AddGoalForm
