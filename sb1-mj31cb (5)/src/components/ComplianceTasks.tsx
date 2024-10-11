import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CheckSquare, AlertCircle, Plus, Trash } from 'lucide-react'
import { useProjectContext } from '../contexts/ProjectContext'

const ComplianceTasks = () => {
  const { id } = useParams()
  const { projects, updateProject } = useProjectContext()
  const [project, setProject] = useState(null)
  const [newTask, setNewTask] = useState({ description: '', status: 'Pending' })

  useEffect(() => {
    const foundProject = projects.find(p => p.id === parseInt(id))
    if (foundProject) {
      setProject(foundProject)
    }
  }, [id, projects])

  const addTask = () => {
    if (newTask.description.trim() === '') return
    const updatedProject = {
      ...project,
      complianceTasks: [
        ...project.complianceTasks,
        { id: Date.now(), ...newTask }
      ]
    }
    updateProject(updatedProject)
    setProject(updatedProject)
    setNewTask({ description: '', status: 'Pending' })
  }

  const toggleTaskStatus = (taskId) => {
    const updatedProject = {
      ...project,
      complianceTasks: project.complianceTasks.map(task =>
        task.id === taskId
          ? { ...task, status: task.status === 'Completed' ? 'Pending' : 'Completed' }
          : task
      )
    }
    updateProject(updatedProject)
    setProject(updatedProject)
  }

  const deleteTask = (taskId) => {
    const updatedProject = {
      ...project,
      complianceTasks: project.complianceTasks.filter(task => task.id !== taskId)
    }
    updateProject(updatedProject)
    setProject(updatedProject)
  }

  if (!project) return <div>Loading...</div>

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Compliance Tasks: {project.name}</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
        <div className="flex mb-4">
          <input
            type="text"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            className="flex-grow mr-2 p-2 border rounded"
            placeholder="Task description"
          />
          <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 rounded flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Add Task
          </button>
        </div>
        <ul className="space-y-4">
          {project.complianceTasks.map(task => (
            <li key={task.id} className="flex items-center justify-between bg-gray-100 p-3 rounded">
              <div className="flex items-center">
                <button
                  onClick={() => toggleTaskStatus(task.id)}
                  className={`flex items-center justify-center w-6 h-6 rounded-full mr-3 ${
                    task.status === 'Completed' ? 'bg-green-500 text-white' : 'border-2 border-gray-300'
                  }`}
                >
                  {task.status === 'Completed' && <CheckSquare className="w-4 h-4" />}
                </button>
                <span className={task.status === 'Completed' ? 'line-through text-gray-500' : ''}>
                  {task.description}
                </span>
              </div>
              <div>
                <span className={`px-2 py-1 rounded text-sm ${
                  task.status === 'Completed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                }`}>
                  {task.status}
                </span>
                <button onClick={() => deleteTask(task.id)} className="ml-2 text-red-500 hover:text-red-700">
                  <Trash className="w-5 h-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ComplianceTasks