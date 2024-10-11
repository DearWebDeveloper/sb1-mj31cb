import React, { useState } from 'react'
import { MessageCircle, Check } from 'lucide-react'

const MessageList = () => {
  const [messages, setMessages] = useState([
    { id: 1, from: 'John Doe', content: 'When will the restoration be complete?', status: 'Pending' },
    { id: 2, from: 'Jane Smith', content: 'Can you provide an update on the drying process?', status: 'Pending' },
    { id: 3, from: 'Mike Johnson', content: 'Is it safe to enter the affected area?', status: 'Pending' },
  ])

  const markAsReviewed = (id) => {
    setMessages(messages.map(message =>
      message.id === id ? { ...message, status: 'Reviewed' } : message
    ))
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Homeowner Messages</h1>
      <ul className="space-y-4">
        {messages.filter(message => message.status === 'Pending').map(message => (
          <li key={message.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">{message.from}</h3>
              <button onClick={() => markAsReviewed(message.id)} className="text-green-500">
                <Check className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-700">{message.content}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MessageList