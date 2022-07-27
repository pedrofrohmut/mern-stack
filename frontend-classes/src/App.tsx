import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import Dashboard from "./pages/Dashboard"
import SignUpPage from "./pages/SignUpPage"
import SignInPage from "./pages/SignInPage"
import Header from "./components/Header"

import { useAppDispatch } from "./app/hooks"
import { setUser } from "./features/auth/authSlice"

import "react-toastify/dist/ReactToastify.css"
import { Component } from "react"

class AppComponent extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </>
    )
  }
}

export default () => {
  const dispatch = useAppDispatch()
  const localStorageUser = localStorage.getItem("user")
  if (localStorageUser) {
    dispatch(setUser(JSON.parse(localStorageUser)))
  }
  return <AppComponent />
}
