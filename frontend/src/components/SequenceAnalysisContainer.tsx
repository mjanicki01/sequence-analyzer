import React, { useState } from "react"
import axios from "axios"
import SequenceForm from "./SequenceForm"
import SequenceAnalysisResults from "./SequenceAnalysisResults"

interface Protein {
  name: string
}

const SequenceAnalysisContainer = () => {
  const [sequence, setSequence] = useState<string>("")
  const [response, setResponse] = useState<Protein[] | string>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSequence(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res = await axios.post(
        "http://localhost:8000/api/sequence-analysis/",
        { sequence }
      )
      setResponse(res.data.result)
    } catch (error) {
      console.error(error)
      setResponse("Error!")
    }
  }

  return (
    <div>
      <h1>Submit Sequence</h1>
      <SequenceForm
        sequence={sequence}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
      <SequenceAnalysisResults response={response} />
    </div>
  )
}

export default SequenceAnalysisContainer
