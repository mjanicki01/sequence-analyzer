import "./styles.css"
import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { DNASequenceRouter } from "./Router"

const rootElement = document.getElementById("root")
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)

  root.render(
    <React.StrictMode>
      <RouterProvider router={DNASequenceRouter} />
    </React.StrictMode>
  )
}
