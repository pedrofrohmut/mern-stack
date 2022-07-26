import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import Spinner from "../components/Spinner"

import { useAppDispatch, useAppSelector } from "../app/hooks"
import { RootState } from "../app/store"
import { getAll } from "../features/goals/goalThunks"
import { reset as resetGoals } from "../features/goals/goalSlice"

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { user } = useAppSelector((state: RootState) => state.auth)

  const { goals } = useAppSelector((state: RootState) => state.goals)

  useEffect(() => {
    if (!user) {
      navigate("/signin")
    }
    dispatch(getAll())
    return () => {
      dispatch(resetGoals())
    }
  }, [user, navigate])

  const Goals = () => (
    <ul>
      {goals.map(goal => (
        <li key={goal.id}>{goal.text}</li>
      ))}
    </ul>
  )

  return (
    <div className="container">
      <h1>Goals</h1>
      <React.Suspense fallback={<Spinner />}>
        <Goals />
      </React.Suspense>
    </div>
  )
}

export default Dashboard
