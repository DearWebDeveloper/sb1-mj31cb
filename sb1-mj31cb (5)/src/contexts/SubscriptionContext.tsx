import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const SubscriptionContext = createContext(null)

export const useSubscription = () => useContext(SubscriptionContext)

export const SubscriptionProvider = ({ children }) => {
  const [subscriptionStatus, setSubscriptionStatus] = useState(null)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    const checkSubscription = async () => {
      if (!user || !user.orgId) return
      try {
        // Simulated API call with mock data
        const mockSubscriptionStatus = {
          status: 'active',
          expirationDate: '2023-12-31',
          plan: 'premium'
        }
        setSubscriptionStatus(mockSubscriptionStatus)
        setError(null)
      } catch (err) {
        console.error('Failed to check subscription status', err)
        setError('Failed to check subscription status. Please try again later.')
      }
    }

    checkSubscription()
  }, [user])

  return (
    <SubscriptionContext.Provider value={{ subscriptionStatus, error }}>
      {children}
    </SubscriptionContext.Provider>
  )
}