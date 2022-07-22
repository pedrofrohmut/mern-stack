import { useState } from "react"
import { FaSignInAlt } from "react-icons/fa"

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" })

  const { email, password } = formData

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState: any) => ({ ...prevState, [e.target.name]: e.target.value }))
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
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
