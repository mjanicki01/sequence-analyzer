import { useState } from "react"
import Login from "../components/forms/Login"
import Registration from "../components/forms/Registration"
import SequenceAnalysisContainer from "../components/SequenceAnalysisContainer"

// 2)  If logged in,
//     -> Display username somewhere
//     -> Display result history


export const MainPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false) // placeholder for authentication state
  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => setExpanded(!expanded)

  const NIHCOLLECTION =
    "https://www.ncbi.nlm.nih.gov/sites/myncbi/magda.janicki.1/collections/63742707/public/"

  const handleLogout = () => {
    // send request & update useContext object
    setIsLoggedIn(false)
    return
  }

  return (
    <>
      <div className="upper-right-corner">Logged in as {}. Logout</div>
      <div className="container">
        <SequenceAnalysisContainer />
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
        <div style={{ display: "flex", gap: "32px" }}>
          {!isLoggedIn && expanded && <Registration />}
          {!isLoggedIn && expanded && <Login />}
        </div>
        {isLoggedIn && <button onClick={handleLogout}>Log out</button>}
      </div>
    </>
  )
}
