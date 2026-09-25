import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user')

    return storedUser
      ? JSON.parse(storedUser)
      : null
  })

  const [token, setToken] = useState(() => {
    return localStorage.getItem('token')
  })

  const login = (userData, accessToken) => {
    setUser(userData)
    setToken(accessToken)

    localStorage.setItem(
      'user',
      JSON.stringify(userData)
    )

    localStorage.setItem(
      'token',
      accessToken
    )
  }

  const logout = () => {
    setUser(null)
    setToken(null)

    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(token),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}