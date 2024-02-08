import { useEffect } from "react"
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
  useEffect(() => {
    console.log(response) // remember to delete
  }, [response])

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
