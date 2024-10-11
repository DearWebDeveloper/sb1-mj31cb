import React, { useState } from 'react'
import { CheckSquare, AlertCircle } from 'lucide-react'

const ComplianceManager = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Initial Inspection', completed: true },
    { id: 2, title: 'Moisture Mapping', completed: false },
    { id: 3, title: 'Equipment Setup', completed: false },
    { id: 4, title: 'Daily Moisture Readings', completed: false },
    { id: 5, title: 'Final Inspection', completed: false },
  ])

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Compliance Task Manager</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Current Project Tasks</h2>
        <ul className="space-y-4">
          {tasks.map(task => (
            <li key={task.id} className="flex items-center">
              <button
                onClick={() => toggleTask(task.id)}
                className={`flex items-center justify-center w-6 h-6 rounded-full mr-3 ${
                  task.completed ? 'bg-green-500 text-white' : 'border-2 border-gray-300'
                }`}
              >
                {task.completed && <CheckSquare className="w-4 h-4" />}
              </button>
              <span className={task.completed ? 'line-through text-gray-500' : ''}>
                {task.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded">
        <div className="flex items-center">
          <AlertCircle className="w-6 h-6 text-yellow-500 mr-2" />
          <p className="text-yellow-700">
            Remember to update and sync your compliance tasks daily to ensure all requirements are met.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ComplianceManager