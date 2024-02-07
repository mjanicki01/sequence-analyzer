import { ChangeEvent, FormEvent } from "react"

interface SequenceFormProps {
  inputSequence: string
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  errorMessage: string
}

const SequenceForm = ({
  inputSequence,
  handleInputChange,
  handleSubmit,
  errorMessage,
}: SequenceFormProps) => (
  <form onSubmit={handleSubmit}>
    <label>
      Enter Sequence:
      <input type="text" value={inputSequence} onChange={handleInputChange} />
    </label>
    {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    <button type="submit">Submit</button>
  </form>
)

export default SequenceForm
