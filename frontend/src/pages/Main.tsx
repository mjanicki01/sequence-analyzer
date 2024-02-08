import { useContext, useEffect, useState } from "react"
import Login from "../components/forms/Login"
import Registration from "../components/forms/Registration"
import SequenceAnalysisContainer from "../components/SequenceAnalysisContainer"
import { AuthContext } from "../context/AuthContext"
import axios from "axios"

export const MainPage = () => {
  const NIHCOLLECTION =
    "https://www.ncbi.nlm.nih.gov/sites/myncbi/magda.janicki.1/collections/63742707/public/"
  const { authData, setAuthData } = useContext(AuthContext)
  const [isLoggedIn, setIsLoggedIn] = useState(!!authData.token)
  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => setExpanded(!expanded)

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/logout/",
        {},
        {
          headers: {
            Authorization: `Token ${authData.token}`,
          },
        }
      )
      setAuthData({
        token: "",
        username: "",
        search_history: [],
      })
      setIsLoggedIn(false)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    authData.token && setIsLoggedIn(true)
  }, [authData])

  const welcomeMessage = () => {
    return (
      <div className="auth-message">
        Welcome! Enter a DNA sequence to see if exists within
        <a href={NIHCOLLECTION} target="blank">
          this collection
        </a>
        of proteins.
        {!isLoggedIn && (
          <>
            <span className="show-more" onClick={toggleExpanded}>
              Register or login
            </span>
            {" to save your search history."}
          </>
        )}
      </div>
    )
  }

  return (
    <>
      {isLoggedIn && (
        <div className="upper-right-corner">
          Logged in as {authData.username}
          <span className="show-more" onClick={handleLogout}>
            Logout
          </span>
        </div>
      )}
      <div className="container">
        {welcomeMessage()}
        <SequenceAnalysisContainer />
        <div style={{ display: "flex", gap: "32px" }}>
          {!isLoggedIn && expanded && <Registration />}
          {!isLoggedIn && expanded && <Login />}
        </div>
      </div>
    </>
  )
}
