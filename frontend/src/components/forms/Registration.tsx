import { useState } from "react"
import axios from "axios"

const Registration = () => {
  const [userData, setUserData] = useState({ username: "", password: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        "http://localhost:8000/api/register/",
        userData
      )
      console.log(response.data)
      // redirect user
    } catch (error) {
      console.error(error)
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
          value={userData.username}
          onChange={handleChange}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userData.password}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Register</button>
    </form>
  )
}

export default Registration
