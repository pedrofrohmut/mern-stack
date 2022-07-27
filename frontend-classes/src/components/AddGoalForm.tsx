import { Component } from "react"
import { toast } from "react-toastify"

import { useAppDispatch } from "../app/hooks"
import { add } from "../features/goals/goalThunks"

type Props = { userId: string }

type ComponentProps = Props & {
  dispatch(arg: any):any
}

class AddGoalFormComponent extends Component<ComponentProps, any> {
  constructor(props: ComponentProps) {
    super(props)
    this.state = {
      text: ""
    }
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value })
  }

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!this.state.text) {
      toast.error("You must have text to submit")
      return
    }
    if (!this.props.userId) {
      toast.error("Could not get userId from session. Please Try to sign in")
    }
    this.props.dispatch(add({ text: this.state.text, userId: this.props.userId }))
    this.setState({ ...this.state, text: "" })
  }

  render() {
    const {text} = this.state
    return (
      <section className="form mb-5">
        <form className="inline-form-group" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={this.handleChange}
            placeholder="Define a goal"
          />
          <button className="btn" type="submit">
            Add
          </button>
        </form>
      </section>
    )
  }
}

export default ({ userId }: Props) => {
  const dispatch = useAppDispatch()
  return <AddGoalFormComponent userId={userId} dispatch={dispatch} />
}
