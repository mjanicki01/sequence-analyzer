import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom"
import Login from "./components/forms/Login"
import SequenceAnalysisContainer from "./components/SequenceAnalysisContainer"
import { MainPage } from "./pages/Main"

export const DNASequenceRouter = createBrowserRouter(
  createRoutesFromElements(
    // no protected routes - user can submit to analyze-sequence-form, but results will not be saved
    // display option to register if user wants to save results
    <>
      <Route path="/" element={<MainPage />} />,
      <Route path="/login" element={<Login />} />,
      <Route path="/analyze" element={<SequenceAnalysisContainer />} />,
    </>
  )
)