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
    setSearchData((prevData) => [
      { query: inputSequence, results: [], isLoading: true },
      ...prevData,
    ])

    const headers: Record<string, string> = {}
    if (authData.token) {
      headers["Authorization"] = `Token ${authData.token}`
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/sequence-analysis/",
        { query: inputSequence },
        { headers }
      )
      setSearchData((prevData: SearchQuery[]) => [
        {
          query: inputSequence,
          results: response.data.results,
          isLoading: false,
        },
        ...prevData.filter(
          (item) => item.query !== inputSequence || item.isLoading === false
        ),
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
          isLoading={searchQuery.isLoading}
        />
      ))}
    </div>
  )
}

export default SequenceAnalysisContainer
