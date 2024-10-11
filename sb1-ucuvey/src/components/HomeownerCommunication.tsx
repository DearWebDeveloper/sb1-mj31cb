import React, { useState } from 'react'
import { Send, Phone, Video, Calendar } from 'lucide-react'

interface Message {
  id: number
  sender: 'Technician' | 'Homeowner'
  content: string
  timestamp: string
}

const HomeownerCommunication: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'Technician', content: "Hello! I'm the technician assigned to your water damage restoration project. How can I assist you today?", timestamp: '2023-04-01 09:00 AM' },
    { id: 2, sender: 'Homeowner', content: 'Hi, I have a question about the drying process. How long will it take?', timestamp: '2023-04-01 09:05 AM' },
    { id: 3, sender: 'Technician', content: "The drying process typically takes 3-5 days, depending on the extent of the damage. We'll be monitoring the moisture levels daily and will keep you updated on the progress.", timestamp: '2023-04-01 09:10 AM' },
  ])

  // Rest of the component remains unchanged
  // ...
}

export default HomeownerCommunication