import { useContext, useEffect } from "react"
import { SearchContext } from "../context/SearchContext"
import SequenceForm from "./forms/SequenceForm"
import SequenceAnalysisResults from "./SequenceAnalysisResults"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"

const SequenceAnalysisContainer = () => {
  const { searchData, setSearchData } = useContext(SearchContext)
  const { authData } = useContext(AuthContext)

  const handleSubmit = async (inputSequence: string) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/sequence-analysis/",
        { query: inputSequence },
        {
          headers: {
            Authorization: `Token ${authData.token}`,
          },
        }
      )
      setSearchData([
        {
          query: inputSequence,
          results: response.data.results,
        },
        ...searchData,
      ])
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    authData.search_history && setSearchData(authData.search_history)
  }, [authData, setSearchData])

  return (
    <div>
      <h1>Submit Sequence</h1>
      <SequenceForm onSubmit={handleSubmit} />
      {searchData.map((searchQuery, index) => (
        <SequenceAnalysisResults
          key={index}
          inputSequence={searchQuery.query}
          response={searchQuery.results}
        />
      ))}
    </div>
  )
}

export default SequenceAnalysisContainer
