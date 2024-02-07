import React, { useState } from "react"
import { Protein } from "../types"
import axios from "axios"
import SequenceForm from "./SequenceForm"
import SequenceAnalysisResults from "./SequenceAnalysisResults"

const SequenceAnalysisContainer = () => {
  const [inputSequence, setInputSequence] = useState<string>("")
  const [response, setResponse] = useState<Protein[]>([])
  const [errorMessage, setErrorMessage] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lastChar = e.target.value.slice(-1).toUpperCase()
    const isValidChar = /^[ATCG]$/.test(lastChar)

    if (isValidChar || e.target.value === "") {
      setInputSequence(e.target.value.toUpperCase())
      setErrorMessage("")
    } else {
      setErrorMessage(`${lastChar} is an invalid character`)
      e.target.value.slice(-1)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res = await axios.post(
        "http://localhost:8000/api/sequence-analysis/",
        { inputSequence }
      )
      setErrorMessage("")
      setResponse(JSON.parse(res.data.result.replace(/'/g, '"')))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h1>Submit Sequence</h1>
      <SequenceForm
        inputSequence={inputSequence}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        errorMessage={errorMessage}
      />
      <SequenceAnalysisResults
        response={response}
        inputSequence={inputSequence}
      />
    </div>
  )
}

export default SequenceAnalysisContainer
