import { createContext, useState, ReactNode } from "react"
import { AuthData } from "../types"

interface AuthContextType {
  authData: AuthData
  setAuthData: (authData: AuthData) => void
}

const defaultAuthData: AuthData = {
  isAuthenticated: false,
}

export const AuthContext = createContext<AuthContextType>({
  authData: defaultAuthData,
  setAuthData: () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authData, setAuthData] = useState<AuthData>(defaultAuthData)

  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  )
}
