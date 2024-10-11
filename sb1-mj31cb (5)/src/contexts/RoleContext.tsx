import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const RoleContext = createContext(null)

export const useRole = () => useContext(RoleContext)

export const RoleProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null)
  const [permissions, setPermissions] = useState([])
  const [error, setError] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user) return
      try {
        // Simulated API call with mock data
        const mockUserRole = {
          role: 'admin',
          permissions: ['edit_project', 'view_compliance', 'manage_equipment']
        }
        setUserRole(mockUserRole.role)
        setPermissions(mockUserRole.permissions)
        setError(null)
      } catch (err) {
        console.error('Failed to fetch user role', err)
        setError('Failed to fetch user role. Please try again later.')
      }
    }

    fetchUserRole()
  }, [user])

  const hasPermission = (permission) => {
    return permissions.includes(permission)
  }

  return (
    <RoleContext.Provider value={{ userRole, permissions, hasPermission, error }}>
      {children}
    </RoleContext.Provider>
  )
}