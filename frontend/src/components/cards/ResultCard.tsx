import { useState } from "react"
import { Protein } from "../../types"

interface ResultCardProps {
  result: Protein
  defaultExpanded?: boolean
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
    return matches.substring(0, 70) + "..."
  }

  return (
    <div className="card sub">
      <div className="card-header" id="sub" onClick={toggleExpanded}>
        <span>{result.name}</span>
        <span></span>
        <span>{expanded ? "-" : "+"}</span>
      </div>
      {expanded && (
        <div className="card-content">
          <p>ID: {result.id}</p>
          <span style={{ display: "flex", justifyContent: "space-between" }}>
            <p>Matches:</p>{" "}
            {result.match_indices.length > 50 && (
              <p className="show-more" onClick={toggleShowFullMatches}>
                {showFullMatches ? "Show Less" : "Show More"}
              </p>
            )}
          </span>
          <p className={showFullMatches ? "" : "truncated"}>
            {truncateMatches(result.match_indices)}
          </p>
        </div>
      )}
    </div>
  )
}
