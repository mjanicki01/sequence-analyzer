import { Protein } from "../types"
import { ResultContainerCard } from "./cards/ResultContainerCard"

interface SequenceAnalysisResultsProps {
  response: Protein[]
  inputSequence: string
  isLoading?: boolean
  error?: string
}

const SequenceAnalysisResults = ({
  response,
  inputSequence,
  isLoading,
  error,
}: SequenceAnalysisResultsProps) => {
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <ResultContainerCard
          searchQuery={inputSequence}
          results={[]}
          errorMessage={error}
        />
      ) : (
        inputSequence && (
          <ResultContainerCard searchQuery={inputSequence} results={response} />
        )
      )}
    </div>
  )
}

export default SequenceAnalysisResults
