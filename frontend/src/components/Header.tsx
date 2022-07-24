import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "../app/hooks"
import { RootState } from "../app/store"
import { reset } from "../features/auth/authSlice"
import { signout } from "../features/auth/authThunks"

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector((state: RootState) => state.auth.user)

  const handleSignOut = () => {
    dispatch(signout())
    dispatch(reset())
    navigate("/signin")
  }

  return (
    <header className="header container">
      <div className="logo">
        <Link to="/">Goals Setter</Link>
      </div>
      <ul>
        {!user && (
          <>
            <li>
              <Link to="/signin">
                <FaSignInAlt /> Sign In
              </Link>
            </li>
            <li>
              <Link to="/signup">
                <FaUser /> sign Up
              </Link>
            </li>
          </>
        )}
        {user && (
          <>
            <span>{user.name}</span>
            <li>
              <button className="btn" onClick={handleSignOut}>
                <FaSignOutAlt /> Sign Out
              </button>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header
