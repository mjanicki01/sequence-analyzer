import { Protein } from "../types"
import { ResultContainerCard } from "./cards/ResultContainerCard"

interface SequenceAnalysisResultsProps {
  response: Protein[]
  inputSequence: string
}

const SequenceAnalysisResults = ({
  response,
  inputSequence,
}: SequenceAnalysisResultsProps) => {
  return (
    <div>
      {inputSequence && response.length > 0 && (
        <ResultContainerCard
          searchQuery={inputSequence}
          results={response}
          defaultExpanded={true}
        />
      )}
    </div>
  )
}

export default SequenceAnalysisResults
