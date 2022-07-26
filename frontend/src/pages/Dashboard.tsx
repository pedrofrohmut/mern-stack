import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import Spinner from "../components/Spinner"
import AddGoalForm from "../components/AddGoalForm"

import { useAppDispatch, useAppSelector } from "../app/hooks"
import { RootState } from "../app/store"
import { getAll } from "../features/goals/goalThunks"
import { reset as resetGoals } from "../features/goals/goalSlice"

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
        <ul>
          {goals.map(goal => (
            <li key={goal.id}>{goal.text}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dashboard
