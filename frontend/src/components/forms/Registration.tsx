import { useContext, useState } from "react"
import axios from "axios"
import { AuthContext } from "../../context/AuthContext"
import { SearchContext } from "../../context/SearchContext"

const Registration = () => {
  const { setAuthData } = useContext(AuthContext)
  const { searchData } = useContext(SearchContext)
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    search_history: [],
  })
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:8000/api/register/", {
        ...credentials,
        search_history: searchData,
      })
      setAuthData({
        token: response.data.token,
        username: response.data.username,
        search_history: response.data.search_history,
      })
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const firstErrorMessage = Object.values(error.response.data)[0]
        const errorMessage = Array.isArray(firstErrorMessage)
          ? firstErrorMessage[0]
          : "Unknown error"
        setErrorMessage(errorMessage)
      } else if (error instanceof Error) {
        setErrorMessage(error.message)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Register</h3>
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
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <button type="submit">Register</button>
    </form>
  )
}

export default Registration
