import { useEffect, useState } from "react"
import { FaSignInAlt } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

import Spinner from "../components/Spinner"

import { useAppDispatch, useAppSelector } from "../app/hooks"
import { RootState } from "../app/store"
import { toast } from "react-toastify"
import { reset } from "../features/auth/authSlice"
import { signin } from "../features/auth/authThunks"

type SignInState = {
  email: string
  password: string
}

const SignIn = () => {
  const [formData, setFormData] = useState<SignInState>({ email: "", password: "" })
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { email, password } = formData

  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state: RootState) => state.auth
  )

  useEffect(() => {
    if (isError) { 
      toast.error(message)
      dispatch(reset())
    }
    if (isSuccess) navigate("/")
    if (user) navigate("/")
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState: any) => ({ ...prevState, [e.target.name]: e.target.value }))
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: add html5 form validation
    dispatch(signin({ email, password }))
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
          <FaSignInAlt /> Sign In
        </h1>
        <p>Inform your credentials to sign in</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
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
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              id=""
              className="form-control"
              type="password"
              name="password"
              value={password}
              onChange={onChange}
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

export default SignIn
