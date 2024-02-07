import { useState } from "react"
import { Protein } from "../../types"

interface ResultCardProps {
  result: Protein
  defaultExpanded: boolean
}

// Individual search result card
export const ResultCard = ({
  result,
  defaultExpanded = false,
}: ResultCardProps) => {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const [showFullMatches, setShowFullMatches] = useState(false)

  const toggleExpanded = () => setExpanded(!expanded)
  const toggleShowFullMatches = () => setShowFullMatches(!showFullMatches)

  const truncateMatches = (matches: string) => {
    if (showFullMatches || matches.length <= 50) return matches
    return matches.substring(0, 50) + "..."
  }

  return (
    <div className="card">
      <div className="card-header" onClick={toggleExpanded}>
        <span>{result.name}</span>
        <span>{expanded ? "-" : "+"}</span>
      </div>
      {expanded && (
        <div className="card-content expanded">
          <p>ID: {result.id}</p>
          <p className={showFullMatches ? "" : "truncated"}>
            Matches: {truncateMatches(result.match_indices)}
          </p>
          {result.match_indices.length > 50 && (
            <div className="show-more" onClick={toggleShowFullMatches}>
              {showFullMatches ? "Show Less" : "Show More"}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
