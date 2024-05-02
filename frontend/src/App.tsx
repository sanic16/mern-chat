import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import SignUp from "./pages/signup/SignUp"
import { Toaster } from "react-hot-toast"
import useAuthContext from "./hooks/useContextProvider"

const App = () => {
  const { authUser } = useAuthContext()
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route path="/" element={authUser._id ? <Home /> : <Navigate to='/login' />} />
        <Route path="/login" element={authUser._id ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={authUser._id ? <Navigate to="/" /> : <SignUp /> } /> 
      </Routes> 
      <Toaster />
    </div>
  )
}

export default App