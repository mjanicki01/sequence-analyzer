import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom"
import Login from "./components/Login"
import SequenceAnalysisContainer from "./components/SequenceAnalysisContainer"

export const DNASequenceRouter = createBrowserRouter(
  createRoutesFromElements(
    // no protected routes - user can submit to analyze-sequence-form, but results will not be saved
    // display option to register if user wants to save results
    <>
      <Route path="/" element={<div>Home</div>} />,
      <Route path="/login" element={<Login />} />,
      <Route path="/analyze" element={<SequenceAnalysisContainer />} />,
    </>
  )
)