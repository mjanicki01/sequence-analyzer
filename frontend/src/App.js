import React, { useState } from "react"
import axios from "axios"

function App() {
  const [sequence, setSequence] = useState("")
  const [response, setResponse] = useState("")

  const handleInputChange = (e) => {
    setSequence(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        "http://localhost:8000/api/sequence-analysis/",
        { sequence }
      )
      setResponse(response.data.result)
      console.log(response.data.result)
    } catch (error) {
      console.error(error)
      setResponse("Error!")
    }
  }

  return (
    <div>
      <h1>Submit Sequence</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Sequence:
          <input type="text" value={sequence} onChange={handleInputChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {response && <p>Response: {response}</p>}
    </div>
  )
}

export default App
