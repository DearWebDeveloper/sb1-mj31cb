import React, { useState, useEffect } from 'react'
import { CheckSquare, RotateCcw, UserPlus, Trash, Plus, Camera } from 'lucide-react'

const ComplianceTaskList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Initial Inspection', status: 'Pending', assignedTo: 'john@example.com', projectId: 1, type: 'manual' },
    { id: 2, title: 'Moisture Mapping', status: 'Completed', assignedTo: 'jane@example.com', completedAt: '2023-04-15 10:30', projectId: 1, type: 'manual' },
    { id: 3, title: 'Equipment Setup', status: 'Pending', assignedTo: 'mike@example.com', projectId: 1, type: 'manual' },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newTask, setNewTask] = useState({
    title: '',
    assignedTo: '',
    projectId: '',
    type: 'manual',
  })

  useEffect(() => {
    // Simulate automatic task generation
    const interval = setInterval(() => {
      generateAutomaticTasks()
    }, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [])

  const generateAutomaticTasks = () => {
    // This is a placeholder for the logic to generate automatic tasks
    // In a real application, this would check project statuses, equipment, etc.
    const newAutomaticTask = {
      id: Date.now(),
      title: 'Daily Dehumidifier Check',
      status: 'Pending',
      assignedTo: 'auto-assigned',
      projectId: 1,
      type: 'automatic',
    }
    setTasks(prevTasks => [...prevTasks, newAutomaticTask])
  }

  const updateTaskStatus = (id, newStatus) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, status: newStatus, completedAt: newStatus === 'Completed' ? new Date().toLocaleString() : null } : task
    ))
  }

  const assignTask = (id, newAssignee) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, assignedTo: newAssignee } : task
    ))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const addTask = () => {
    setShowAddForm(true)
  }

  const handleAddTask = (e) => {
    e.preventDefault()
    const taskToAdd = {
      ...newTask,
      id: Date.now(),
      status: 'Pending',
    }
    setTasks(prevTasks => [...prevTasks, taskToAdd])
    setShowAddForm(false)
    setNewTask({ title: '', assignedTo: '', projectId: '', type: 'manual' })
  }

  const handleTaskAction = (task) => {
    if (task.title === 'Front Risk Photo') {
      // Simulate taking a photo
      console.log('Taking front risk photo')
      updateTaskStatus(task.id, 'Completed')
    } else if (task.title.includes('Dehumidifier Check')) {
      // Simulate entering dehumidifier readings
      console.log('Entering dehumidifier readings')
      updateTaskStatus(task.id, 'Completed')
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Compliance Tasks</h1>
      <button onClick={addTask} className="mb-4 bg-blue-500 text-white px-4 py-2 rounded flex items-center">
        <Plus className="w-5 h-5 mr-2" />
        Add New Task
      </button>
      {showAddForm && (
        <form onSubmit={handleAddTask} className="mb-4 bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="border p-2 rounded"
              required
            />
            <input
              type="email"
              placeholder="Assigned To"
              value={newTask.assignedTo}
              onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
              className="border p-2 rounded"
              required
            />
            <input
              type="number"
              placeholder="Project ID"
              value={newTask.projectId}
              onChange={(e) => setNewTask({ ...newTask, projectId: e.target.value })}
              className="border p-2 rounded"
              required
            />
          </div>
          <button type="submit" className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
            Add Task
          </button>
        </form>
      )}
      <ul className="space-y-4">
        {tasks.map(task => (
          <li key={task.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{task.title}</h3>
              <div className="space-x-2">
                <button onClick={() => handleTaskAction(task)} className="text-green-500">
                  {task.title === 'Front Risk Photo' ? <Camera className="w-5 h-5" /> : <CheckSquare className="w-5 h-5" />}
                </button>
                <button onClick={() => updateTaskStatus(task.id, 'Pending')} className="text-yellow-500">
                  <RotateCcw className="w-5 h-5" />
                </button>
                <button onClick={() => assignTask(task.id, prompt('Enter new assignee email:'))} className="text-blue-500">
                  <UserPlus className="w-5 h-5" />
                </button>
                <button onClick={() => deleteTask(task.id)} className="text-red-500">
                  <Trash className="w-5 h-5" />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-500">Status: {task.status}</p>
            <p className="text-sm text-gray-500">Assigned to: {task.assignedTo}</p>
            <p className="text-sm text-gray-500">Project ID: {task.projectId}</p>
            <p className="text-sm text-gray-500">Type: {task.type}</p>
            {task.completedAt && <p className="text-sm text-gray-500">Completed at: {task.completedAt}</p>}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ComplianceTaskList