import React, { useState } from 'react'
import { CheckCircle, AlertCircle, Clock } from 'lucide-react'

interface Task {
  id: number
  name: string
  status: 'Completed' | 'In Progress' | 'Pending'
  dueDate: string
}

const ComplianceTaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: 'Initial moisture assessment', status: 'Completed', dueDate: '2023-04-02' },
    { id: 2, name: 'Equipment placement documentation', status: 'In Progress', dueDate: '2023-04-03' },
    { id: 3, name: 'Daily moisture readings', status: 'In Progress', dueDate: '2023-04-05' },
    { id: 4, name: 'Mold inspection', status: 'Pending', dueDate: '2023-04-06' },
    { id: 5, name: 'Final drying verification', status: 'Pending', dueDate: '2023-04-08' },
  ])

  const updateTaskStatus = (taskId: number, newStatus: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ))
  }

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'In Progress':
        return <Clock className="h-5 w-5 text-yellow-500" />
      case 'Pending':
        return <AlertCircle className="h-5 w-5 text-red-500" />
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Compliance Task Manager</h1>
      <div className="bg-white p-4 rounded-lg shadow">
        <ul className="divide-y divide-gray-200">
          {tasks.map(task => (
            <li key={task.id} className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {getStatusIcon(task.status)}
                  <span className="ml-3 text-lg font-medium">{task.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-4">Due: {task.dueDate}</span>
                  <select
                    value={task.status}
                    onChange={(e) => updateTaskStatus(task.id, e.target.value as Task['status'])}
                    className="block w-32 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ComplianceTaskManager