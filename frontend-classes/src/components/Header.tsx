import { Component } from "react"
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import { Link, NavigateFunction, useNavigate } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "../app/hooks"
import { RootState } from "../app/store"
import { reset } from "../features/auth/authSlice"
import { signout } from "../features/auth/authThunks"
import { AuthState } from "../features/types"

type Props = {
  authState: AuthState
  dispatch(args: any): any
  navigate: NavigateFunction
}

class HeaderComponent extends Component<Props> {
  constructor(props: Props) {
    super(props)
  }
  
  handleSignOut = () => {
    const { dispatch, navigate } = this.props
    dispatch(signout())
    dispatch(reset())
    navigate("/signin")
  }

  render() {
    const { user } = this.props.authState
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
                <button className="btn" onClick={this.handleSignOut}>
                  <FaSignOutAlt /> Sign Out
                </button>
              </li>
            </>
          )}
        </ul>
      </header>
    )
  }
}

export default () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const authState = useAppSelector((state: RootState) => state.auth)
  return <HeaderComponent authState={authState} navigate={navigate} dispatch={dispatch} />
}
