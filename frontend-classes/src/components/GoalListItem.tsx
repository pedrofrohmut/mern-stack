import { Component } from "react"
import { FaTrashAlt } from "react-icons/fa"

import { Goal } from "../features/types"

type Props = {
  goal: Goal
  handleDelete(goalId: string): void
}

class GoalListItem extends Component<Props, any> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    const { goal, handleDelete } = this.props
    return (
      <li className="goal-list-item mb-2">
        <div className="text">{goal.text}</div>
        <button className="btn-delete" onClick={() => handleDelete(goal.id!)}>
          <FaTrashAlt className="icon" />
          Delete
        </button>
      </li>
    )
  }
}

export default GoalListItem
