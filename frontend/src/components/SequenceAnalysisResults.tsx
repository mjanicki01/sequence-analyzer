import { Protein } from "../types"
import { ResultContainerCard } from "./cards/ResultContainerCard"

interface SequenceAnalysisResultsProps {
  response: Protein[]
  inputSequence: string
  isLoading?: boolean
}

const SequenceAnalysisResults = ({
  response,
  inputSequence,
  isLoading,
}: SequenceAnalysisResultsProps) => {
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        inputSequence &&
        response.length > 0 && (
          <ResultContainerCard
            searchQuery={inputSequence}
            results={response}
            defaultExpanded={true}
          />
        )
      )}
    </div>
  )
}

export default SequenceAnalysisResults
