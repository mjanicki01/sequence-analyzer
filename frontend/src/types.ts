export interface Protein {
  name: string
  id: string
}

export interface AuthData {
  isAuthenticated: boolean
  token?: string
  user?: {
    username: string
    // user's search history
  }
}
