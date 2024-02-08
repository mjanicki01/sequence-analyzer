import "./styles.css"
import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { DNASequenceRouter } from "./Router"
import { AuthProvider } from "./context/AuthContext"
import { SearchProvider } from "./context/SearchContext"

const rootElement = document.getElementById("root")
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)

  root.render(
    <React.StrictMode>
      <AuthProvider>
        <SearchProvider>
          <RouterProvider router={DNASequenceRouter} />
        </SearchProvider>
      </AuthProvider>
    </React.StrictMode>
  )
}
