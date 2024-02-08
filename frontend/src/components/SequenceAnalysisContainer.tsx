import { useContext, useEffect } from "react"
import { SearchContext } from "../context/SearchContext"
import SequenceForm from "./forms/SequenceForm"
import SequenceAnalysisResults from "./SequenceAnalysisResults"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"
import { SearchQuery } from "../types"

const SequenceAnalysisContainer = () => {
  const { searchData, setSearchData } = useContext(SearchContext)
  const { authData } = useContext(AuthContext)

  const handleSubmit = async (inputSequence: string) => {
    const newQuery: SearchQuery = {
      query: inputSequence,
      results: [],
      isLoading: true,
    }
    setSearchData((prevData) => [newQuery, ...prevData])

    try {
      const headers = authData.token
        ? { Authorization: `Token ${authData.token}` }
        : {}
      const response = await axios.post(
        "http://localhost:8000/api/sequence-analysis/",
        { query: inputSequence },
        { headers }
      )

      setSearchData((prevData) =>
        prevData.map((item) =>
          item.query === inputSequence
            ? { ...item, results: response.data.results, isLoading: false }
            : item
        )
      )
    } catch (error) {
      console.error(error)
      // Handle error by updating the respective query's loading state and optionally storing the error message
      setSearchData((prevData) =>
        prevData.map((item) =>
          item.query === inputSequence
            ? { ...item, isLoading: false, error: "Invalid Request" }
            : item
        )
      )
    }
  }

  useEffect(() => {
    if (authData.search_history) {
      setSearchData(
        authData.search_history.map((item) => ({ ...item, isLoading: false }))
      )
    }
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
          isLoading={searchQuery.isLoading}
          error={searchQuery.error}
        />
      ))}
    </div>
  )
}

export default SequenceAnalysisContainer
