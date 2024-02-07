import { useState } from "react"
import { Protein } from "../../types"
import { ResultCard } from "./ResultCard"

interface ResultCardProps {
  searchQuery: string
  results?: Protein[]
  defaultExpanded?: boolean
}

// Container of search results per DNA sequence search
export const ResultContainerCard = ({
  searchQuery,
  results,
  defaultExpanded = false,
}: ResultCardProps) => {
  const [expanded, setExpanded] = useState(defaultExpanded)

  const toggleExpanded = () => setExpanded(!expanded)

  return (
    <div className="card">
      <div className="card-header" onClick={toggleExpanded}>
        <span>{searchQuery} is found in...</span>
        <span>{expanded ? "-" : "+"}</span>
      </div>
      {results ? (
        expanded &&
        results.map((protein, index) => (
          <ResultCard result={protein} defaultExpanded={true} />
        )) // when it's a new search result, expand=true; If it's from search history, expand=false
      ) : (
        <p>No match found</p>
      )}
      <div className="card-footer">
        <span>Date: 234234324</span>
      </div>
    </div>
  )
}
