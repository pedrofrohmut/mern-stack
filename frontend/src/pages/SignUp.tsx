import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { FaUser } from "react-icons/fa"

import Spinner from "../components/Spinner"

import { reset } from "../features/auth/authSlice"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { RootState } from "../app/store"
import { signup } from "../features/auth/authThunks"

type SignUpState = {
  name: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  })
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { name, email, phone, password, confirmPassword } = formData

  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state: RootState) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
      dispatch(reset())
    }
    if (isSuccess) navigate("/signin")
    if (user) navigate("/")
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState: SignUpState) => ({ ...prevState, [e.target.name]: e.target.value }))
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: add html5 form validation
    if (password !== confirmPassword) {
      toast.error("Password do not match")
      return
    }
    dispatch(signup({ name, email, phone, password }))
  }

  if (isLoading) {
    return (
      <div className="container">
        <Spinner />
      </div>
    )
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
        <form onSubmit={onSubmit}>
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
              onChange={onChange}
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
              onChange={onChange}
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
              onChange={onChange}
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
              onChange={onChange}
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
              onChange={onChange}
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

export default SignUp
