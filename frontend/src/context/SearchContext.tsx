import { createContext, useState, ReactNode } from "react"
import { SearchQuery } from "../types"

const defaultSearchData: SearchQuery[] = [
  {
    query: "",
    results: [],
  },
]

interface SearchContextType {
  searchData: SearchQuery[]
  setSearchData: (data: SearchQuery[]) => void
}

export const SearchContext = createContext<SearchContextType>({
  searchData: defaultSearchData,
  setSearchData: () => {},
})

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchData, setSearchData] = useState<SearchQuery[]>(defaultSearchData)

  return (
    <SearchContext.Provider value={{ searchData, setSearchData }}>
      {children}
    </SearchContext.Provider>
  )
}
