import { useState, useContext } from "react"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const { setAuthData } = useContext(AuthContext)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        "http://localhost:8000/api/login/",
        credentials
      )
      setAuthData(response.data.token)
      //  redirect
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={credentials.username}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={credentials.password}
        onChange={handleChange}
      />
      <button type="submit">Login</button>
    </form>
  )
}

export default Login
