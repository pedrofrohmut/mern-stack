import { Component } from "react"
import { FaSignInAlt } from "react-icons/fa"
import { Navigate, NavigateFunction, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks"

import Spinner from "../components/Spinner"

import { signin } from "../features/auth/authThunks"
import { RootState } from "../app/store"

import { AuthState } from "../features/types"
import { toast } from "react-toastify"
import { reset as resetAuth } from "../features/auth/authSlice"

type Props = {
  authState: AuthState
  dispatch(args: any): any
  navigate: NavigateFunction
}

type State = {
  email: string
  password: string
}

class SignInPageComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      email: "",
      password: ""
    }
  }

  componentWillUnmount = () => {
    this.props.dispatch(resetAuth())
  }

  resetState = () => {
    this.setState({
      email: "",
      password: ""
    })
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState((state: State) => ({ ...state, [e.target.name]: e.target.value }))
  }

  onSubmit = async (e: React.FormEvent) => {
    const { email, password } = this.state
    e.preventDefault()
    await this.props.dispatch(signin({ email, password }))
    if (this.props.authState.isSuccess) {
      this.resetState()
      this.props.navigate("/")
    }
  }

  render() {
    const { isLoading, isError, message, user } = this.props.authState
    const { email, password } = this.state
    if (isError && message) {
      toast.error(message)
      this.props.dispatch(resetAuth())
    }
    if (isLoading) {
      return <Spinner />
    }
    if (user) {
      return <Navigate to="/" />
    }
    return (
      <div className="container">
        <section className="heading">
          <h1>
            <FaSignInAlt /> Sign In
          </h1>
          <p>Inform your credentials to sign in</p>
        </section>
        <section className="form">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                E-mail
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={this.onChange}
                placeholder="Enter your e-mail address"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                id=""
                className="form-control"
                type="password"
                name="password"
                value={password}
                onChange={this.onChange}
                placeholder="Enter your secret password"
              />
            </div>
            <div className="form-group">
              <button className="btn btn-block" type="submit">
                Submit
              </button>
            </div>
          </form>
        </section>
      </div>
    )
  }
}

export default () => {
  const authState = useAppSelector((state: RootState) => state.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  return <SignInPageComponent authState={authState} dispatch={dispatch} navigate={navigate} />
}
