import { useState } from "react"
import { Protein } from "../../types"
import { ResultCard } from "./ResultCard"

interface ResultCardProps {
  searchQuery: string
  results: Protein[]
  errorMessage?: string
}

// Container of search results per DNA sequence search
export const ResultContainerCard = ({
  searchQuery,
  results,
  errorMessage,
}: ResultCardProps) => {
  const [expanded, setExpanded] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const showToggle = results.length > 0

  const truncatedQueryLength = 50
  const isTruncated = searchQuery.length > truncatedQueryLength
  const displayQuery = isTruncated
    ? `${searchQuery.substring(0, truncatedQueryLength)}...`
    : searchQuery

  const handleClick = () => {
    if (showToggle) {
      setExpanded(!expanded)
    }
  }

  const handleDialogToggle = () => {
    setDialogOpen(!dialogOpen)
  }

  return (
    <div className="card">
      <div className="card-header" onClick={handleClick}>
        <span style={{ fontWeight: 600, color: "navy" }}>
          {displayQuery}
          {isTruncated && (
            <span className="show-more" onClick={handleDialogToggle}>
              [...]
            </span>
          )}
        </span>
        <span>{results.length > 0 ? "is found in..." : "No match found"}</span>
        {showToggle && <span>{expanded ? "-" : "+"}</span>}
      </div>
      {expanded &&
        !errorMessage &&
        results.map((protein, index) => (
          <ResultCard key={index} result={protein} />
        ))}
      {errorMessage && (
        <div className="card-content">Error: {errorMessage}</div>
      )}
      <dialog open={dialogOpen} className="dialog-box">
        <p>Sequence Search Query:</p>
        <p>{searchQuery}</p>
        <button onClick={handleDialogToggle}>Close</button>
      </dialog>
    </div>
  )
}
