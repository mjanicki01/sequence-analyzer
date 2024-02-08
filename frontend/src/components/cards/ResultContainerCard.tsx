import { useState } from "react"
import { Protein } from "../../types"
import { ResultCard } from "./ResultCard"

interface ResultCardProps {
  searchQuery: string
  results: Protein[]
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
        <span style={{ fontWeight: 600, color: "navy" }}>{searchQuery}</span>{" "}
        <span>is found in...</span>
        <span>{expanded ? "-" : "+"}</span>
      </div>
      {expanded &&
        (
          results && results.length > 0 ? (
            results.map((protein, index) => (
              <ResultCard key={index} result={protein} />
            ))
          ) : (
            <p className="card-content">No match found</p>
          )
        )}
    </div>
  )
}
