import { useEffect } from "react"
import { Protein } from "../types"

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
      {/* todo: Create:
            - UI when no results exist yet
            - UI when loading (clear form and list a new card with a loading symbol)
            - UI to display results
            - Container for result history */}
      <p>{inputSequence} is found in...</p>
      <ul>
        {response ? (
          response.map((protein, index) => (
            <li key={index}>
              {/* todo: Create expandable/collapsable boundaries for extremely long lists of results */}
              {/* todo: Create message if no results */}
              {protein.name} {protein.match_indices}
            </li>
          ))) : (<p>No match found</p>)}
      </ul>
    </div>
  )
}

export default SequenceAnalysisResults
