import { Component } from "react"
import { FaUser } from "react-icons/fa"
import { Navigate, NavigateFunction, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import { useAppDispatch, useAppSelector } from "../app/hooks"
import { RootState } from "../app/store"
import { reset as resetAuth } from "../features/auth/authSlice"
import { signup } from "../features/auth/authThunks"

import Spinner from "../components/Spinner"

import { AuthState } from "../features/types"

type Props = {
  authState: AuthState
  navigate: NavigateFunction
  dispatch(args: any): any
}

type State = {
  name: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

class SignUpPageComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: ""
    }
  }

  componentWillUnmount = () => {
    this.props.dispatch(resetAuth())
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(state => ({ ...state, [e.target.name]: e.target.value }))
  }

  resetState = () => {
    this.setState({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: ""
    })
  }

  onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { name, email, phone, password, confirmPassword } = this.state
    const { dispatch, authState, navigate } = this.props
    if (password !== confirmPassword) {
      toast.error("Password do not match")
      return
    }
    await dispatch(signup({ name, email, phone, password }))
    if (authState.isSuccess) {
      this.resetState()
      navigate("/signin")
    }
  }

  render() {
    const { name, email, phone, password, confirmPassword } = this.state
    if (this.props.authState.isError) {
      toast.error(this.props.authState.message)
      this.props.dispatch(resetAuth())
    }
    if (this.props.authState.isLoading) {
      return <Spinner />
    }
    if (this.props.authState.user) {
      return <Navigate to="/" />
    }
    return (
      <div className="container">
        <section className="heading">
          <h1>
            <FaUser /> Sign Up
          </h1>
          <p>Please create an account</p>
        </section>
        <section className="form">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={name}
                onChange={this.onChange}
                placeholder="Enter your full name"
              />
            </div>
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
              <label className="form-label" htmlFor="phone">
                Phone
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={phone}
                onChange={this.onChange}
                placeholder="Enter your Phone Number"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                onChange={this.onChange}
                placeholder="Enter your secret password"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={this.onChange}
                placeholder="Reenter your password to confirm"
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-block">
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
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  return <SignUpPageComponent authState={authState} navigate={navigate} dispatch={dispatch} />
}
