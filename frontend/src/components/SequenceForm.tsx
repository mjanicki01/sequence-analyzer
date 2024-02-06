import { ChangeEvent, FormEvent } from "react"

interface SequenceFormProps {
  sequence: string
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
}

const SequenceForm = ({
  sequence,
  handleInputChange,
  handleSubmit,
}: SequenceFormProps) => (
  <form onSubmit={handleSubmit}>
    <label>
      Enter Sequence:
      <input type="text" value={sequence} onChange={handleInputChange} />
    </label>
    <button type="submit">Submit</button>
  </form>
)

export default SequenceForm
