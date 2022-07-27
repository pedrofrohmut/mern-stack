import { Component } from "react"
import { Navigate, NavigateFunction, useNavigate } from "react-router-dom"

import Spinner from "../components/Spinner"
import AddGoalForm from "../components/AddGoalForm"
import GoalListItem from "../components/GoalListItem"

import { useAppDispatch, useAppSelector } from "../app/hooks"
import { RootState } from "../app/store"
import { getAll, remove } from "../features/goals/goalThunks"
import { reset as resetGoals } from "../features/goals/goalSlice"
import { toast } from "react-toastify"
import { Goal, User } from "../features/types"

type ComponentProps = {
  isLoading: boolean
  user: User | null | undefined
  goals: Goal[]
  dispatch(args: any): any
  navigate: NavigateFunction
}

class DashboardComponent extends Component<ComponentProps> {
  constructor(props: ComponentProps) {
    super(props)
    this.props.dispatch(getAll())
  }

  componentWillUnmount = () => {
    this.props.dispatch(resetGoals())
  }

  handleDelete = (goalId: string) => {
    if (!goalId) {
      toast.error("No goalId to edit")
      return
    }
    this.props.dispatch(remove(goalId))
  }

  render() {
    const { isLoading, user, goals } = this.props
    if (isLoading) {
      return <Spinner />
    }
    if (!user || !user.id) {
      return <Navigate to="/signin" />
    }
    return (
      <div className="container">
        <section className="heading mb-5">
          <h1>Welcome {user && user.name}</h1>
          <p>Goals Dashboard</p>
        </section>
        <AddGoalForm userId={user.id} />
        <ul style={{ textAlign: "left", width: "70%", margin: "0 auto" }}>
          {goals.map((goal: Goal) => (
            <GoalListItem key={goal.id} goal={goal} handleDelete={this.handleDelete} />
          ))}
        </ul>
      </div>
    )
  }
}

export default () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector((state: RootState) => state.auth.user)
  const { goals, isLoading } = useAppSelector((state: RootState) => state.goals)
  return (
    <DashboardComponent
      isLoading={isLoading}
      user={user}
      goals={goals}
      dispatch={dispatch}
      navigate={navigate}
    />
  )
}
