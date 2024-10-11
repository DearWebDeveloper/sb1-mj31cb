import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const NotificationContext = createContext(null)

export const useNotification = () => useContext(NotificationContext)

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])
  const [error, setError] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user || !user.orgId) return
      try {
        // Simulated API call with mock data
        const mockNotifications = [
          { id: 1, message: 'New project assigned', timestamp: new Date().toISOString() },
          { id: 2, message: 'Equipment maintenance due', timestamp: new Date().toISOString() },
        ]
        setNotifications(mockNotifications)
        setError(null)
      } catch (err) {
        console.error('Failed to fetch notifications', err)
        setError('Failed to fetch notifications. Please try again later.')
      }
    }

    fetchNotifications()
    const interval = setInterval(fetchNotifications, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [user])

  const addNotification = (notification) => {
    setNotifications(prev => [...prev, { id: Date.now(), ...notification }])
  }

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification, error }}>
      {children}
    </NotificationContext.Provider>
  )
}