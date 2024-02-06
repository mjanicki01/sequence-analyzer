interface Protein {
  name: string
}

interface SequenceAnalysisResultsProps {
  response: Protein[] | string
}

const SequenceAnalysisResults = ({
  response,
}: SequenceAnalysisResultsProps) => {
  return (
    <div>
      {typeof response === "string" ? (
        <div>Response: {response}</div>
      ) : (
        <div>
          Response:
          <ul>
            {Array.isArray(response) &&
              response.map((protein, index) => (
                <li key={index}>{protein.name}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SequenceAnalysisResults
