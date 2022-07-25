import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useAppSelector } from "../app/hooks"
import { RootState } from "../app/store"

const Dashboard = () => {
  const navigate = useNavigate()

  const { user } = useAppSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (!user) {
      navigate("/signin")
    }
  }, [user, navigate])

  return (
    <div className="container">
      <h1>Dashboard</h1>
    </div>
  )
}

export default Dashboard
