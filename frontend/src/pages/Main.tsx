import { useState } from "react"
import Login from "../components/forms/Login"
import Registration from "../components/forms/Registration"
import SequenceAnalysisContainer from "../components/SequenceAnalysisContainer"

// 1)  Sequence Analyzer form
//     -> Modify to accept either text-based DNA sequence or file-based sequence (.txt file or .FASTA)
// 2)  If logged in,
//     -> Display username somewhere
//     -> Display result history
// 3) Else,
//     -> Display statement "Would you like to save your results?"
//     -> Present options to log in or register. Forms for each of these should open like an accordian
// 4) Nice to have:
//     -> Header, description, name, date, etc for more prof appeal
//     -> Option to add new proteins to database (stretch goal)

export const MainPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false) // placeholder for authentication state

  const handleLogout = () => {
    // send request & update useContext object
    setIsLoggedIn(false)
    return
  }

  return (
    <>
      <div className="container">
        <SequenceAnalysisContainer />
        <div className="auth-message">
          Welcome! You are free to use the analyzer, but you must register/login
          to save your results.
        </div>
        {!isLoggedIn && <Registration />}
        {!isLoggedIn && <Login />}
        {isLoggedIn && <button onClick={handleLogout}>Log out</button>}
      </div>
    </>
  )
}
