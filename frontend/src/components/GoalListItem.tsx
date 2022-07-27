import { FaTrashAlt } from "react-icons/fa"

import { Goal } from "../features/types"

type Props = {
  goal: Goal
  handleDelete(goalId: string): void
}

const GoalListItem = ({ goal, handleDelete }: Props) => {
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

export default GoalListItem
