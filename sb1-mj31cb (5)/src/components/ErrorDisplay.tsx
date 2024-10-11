import React from 'react'
import { AlertCircle } from 'lucide-react'
import { useNotification } from '../contexts/NotificationContext'
import { useRole } from '../contexts/RoleContext'
import { useSubscription } from '../contexts/SubscriptionContext'

const ErrorDisplay = () => {
  const { error: notificationError } = useNotification()
  const { error: roleError } = useRole()
  const { error: subscriptionError } = useSubscription()

  const errors = [notificationError, roleError, subscriptionError].filter(Boolean)

  if (errors.length === 0) return null

  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
      <div className="flex items-center">
        <AlertCircle className="w-6 h-6 mr-2" />
        <p className="font-bold">Error(s) occurred:</p>
      </div>
      <ul className="list-disc list-inside mt-2">
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    </div>
  )
}

export default ErrorDisplay