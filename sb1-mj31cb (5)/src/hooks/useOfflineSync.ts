import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'

const useOfflineSync = () => {
  const [offlineData, setOfflineData] = useState([])
  const [isSyncing, setIsSyncing] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    const storedData = localStorage.getItem('offlineData')
    if (storedData) {
      setOfflineData(JSON.parse(storedData))
    }
  }, [])

  const addOfflineData = (data) => {
    const newOfflineData = [...offlineData, { ...data, timestamp: Date.now() }]
    setOfflineData(newOfflineData)
    localStorage.setItem('offlineData', JSON.stringify(newOfflineData))
  }

  const syncData = async () => {
    if (!user || !navigator.onLine) return

    setIsSyncing(true)
    try {
      for (const item of offlineData) {
        // Simulated API call to sync each item
        await fetch('/api/sync', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item),
        })
      }
      setOfflineData([])
      localStorage.removeItem('offlineData')
    } catch (err) {
      console.error('Failed to sync data', err)
    } finally {
      setIsSyncing(false)
    }
  }

  useEffect(() => {
    window.addEventListener('online', syncData)
    return () => window.removeEventListener('online', syncData)
  }, [offlineData])

  return { addOfflineData, isSyncing }
}

export default useOfflineSync