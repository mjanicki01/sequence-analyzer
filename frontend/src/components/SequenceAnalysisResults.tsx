import { useEffect } from "react"
import { Protein } from "../types"
import { ResultCard } from "./cards/ResultCard"
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
      <ResultContainerCard
        searchQuery={inputSequence}
        results={response}
        defaultExpanded={true}
      />
    </div>
  )
}

export default SequenceAnalysisResults
