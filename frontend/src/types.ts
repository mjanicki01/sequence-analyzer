export interface Protein {
  name: string
  id: string
  match_indices: string
}

export interface AuthData {
  token: string
  username: string
  search_history?: SearchQuery[]
}

export interface SearchQuery {
  query: string
  results: Protein[]
  isLoading?: boolean
  error?: string
}
