import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import { Link } from "react-router-dom"

const Header = () => (
  <header className="header container">
    <div className="logo">
      <Link to="/">Goals Setter</Link>
    </div>
    <ul>
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
    </ul>
  </header>
)

export default Header
