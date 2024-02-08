import { useState } from "react"

interface SequenceFormProps {
  onSubmit: (inputSequence: string) => void
}

const SequenceForm = ({ onSubmit }: SequenceFormProps) => {
  const [inputSequence, setInputSequence] = useState<string>("")
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(inputSequence)
    setErrorMessage("")
    setInputSequence("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter Sequence:
        <input type="text" value={inputSequence} onChange={handleInputChange} />
      </label>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <button type="submit">Submit</button>
    </form>
  )
}

export default SequenceForm
