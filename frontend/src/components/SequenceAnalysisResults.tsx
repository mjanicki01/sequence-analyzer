import { useEffect } from "react"
import { Protein } from "../types"

interface SequenceAnalysisResultsProps {
  response: Protein[]
}

const SequenceAnalysisResults = ({
  response,
}: SequenceAnalysisResultsProps) => {


  useEffect(() => {
    console.log(response)
  }, [response])


  return (
    <div>
      Response:
      <ul>
        {Array.isArray(response) &&
          response.map((protein, index) => <li key={index}>{protein.name}</li>)}
      </ul>
    </div>
  )
}

export default SequenceAnalysisResults
