import { useState, useContext, useEffect } from "react"
import axios from "axios"
import { AuthContext } from "../../context/AuthContext"
import { SearchContext } from "../../context/SearchContext"

const Login = () => {
  const { setAuthData } = useContext(AuthContext)
  const { setSearchData } = useContext(SearchContext)
  const [credentials, setCredentials] = useState({ username: "", password: "" })

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
      setAuthData({
        token: response.data.token,
        username: response.data.username,
        search_history: response.data.search_history,
      })
      setSearchData(response.data.search_history)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Login</h3>
      <label>
        Username:
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Login</button>
    </form>
  )
}

export default Login
