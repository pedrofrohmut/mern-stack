import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import Dashboard from "./pages/Dashboard"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Header from "./components/Header"

import { useAppDispatch } from "./app/hooks"
import { setUser } from "./features/auth/authSlice"

import "react-toastify/dist/ReactToastify.css"

const App = () => {
  const dispatch = useAppDispatch()
  const localStorageUser = localStorage.getItem("user")
  if (localStorageUser) {
    dispatch(setUser(JSON.parse(localStorageUser)))
  }
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
