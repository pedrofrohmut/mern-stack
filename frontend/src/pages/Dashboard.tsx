import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import Spinner from "../components/Spinner"
import AddGoalForm from "../components/AddGoalForm"
import GoalListItem from "../components/GoalListItem"

import { useAppDispatch, useAppSelector } from "../app/hooks"
import { RootState } from "../app/store"
import { getAll, remove } from "../features/goals/goalThunks"
import { reset as resetGoals } from "../features/goals/goalSlice"
import { toast } from "react-toastify"

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { user } = useAppSelector((state: RootState) => state.auth)

  const { goals, isLoading } = useAppSelector((state: RootState) => state.goals)

  useEffect(() => {
    if (!user) {
      navigate("/signin")
    }
    dispatch(getAll())
    return () => {
      dispatch(resetGoals())
    }
  }, [user, navigate])

  const handleDelete = async (goalId: string) => {
    if (!goalId) {
      toast.error("No goalId to edit")
      return
    }
    dispatch(remove(goalId))
  }

  if (!user || !user.id) return null

  return (
    <div className="container">
      <section className="heading mb-5">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      <AddGoalForm userId={user.id} />
      {isLoading && <Spinner />}
      {!isLoading && goals && (
        <ul style={{ textAlign: "left", width: "70%", margin: "0 auto" }}>
          {goals.map(goal => (
            <GoalListItem key={goal.id} goal={goal} handleDelete={handleDelete} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dashboard
