import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'

const SystemHealthDashboard = () => {
  const [systemHealth, setSystemHealth] = useState(null)
  const [errorLogs, setErrorLogs] = useState([])
  const [userActivity, setUserActivity] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    if (user.role !== 'developer') {
      // Redirect or show error if not a developer
      return
    }

    const fetchSystemHealth = async () => {
      // Simulated API calls
      const healthResponse = await fetch('/api/system-health')
      const healthData = await healthResponse.json()
      setSystemHealth(healthData)

      const errorResponse = await fetch('/api/error-logs')
      const errorData = await errorResponse.json()
      setErrorLogs(errorData)

      const activityResponse = await fetch('/api/user-activity')
      const activityData = await activityResponse.json()
      setUserActivity(activityData)
    }

    fetchSystemHealth()
    const interval = setInterval(fetchSystemHealth, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [user])

  if (user.role !== 'developer') {
    return <div>Access Denied</div>
  }

  if (!systemHealth) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">System Health Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">System Status</h2>
          <p className={`text-lg ${systemHealth.status === 'OK' ? 'text-green-600' : 'text-red-600'}`}>
            {systemHealth.status}
          </p>
          <p>Uptime: {systemHealth.uptime}</p>
          <p>CPU Usage: {systemHealth.cpuUsage}%</p>
          <p>Memory Usage: {systemHealth.memoryUsage}%</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Error Logs</h2>
          <ul className="space-y-2">
            {errorLogs.map((log, index) => (
              <li key={index} className="text-red-600">
                {log.timestamp}: {log.message}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">User Activity</h2>
          <ul className="space-y-2">
            {userActivity.map((activity, index) => (
              <li key={index}>
                {activity.timestamp}: User {activity.userId} - {activity.action}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SystemHealthDashboard