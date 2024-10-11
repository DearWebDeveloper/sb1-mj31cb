import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useProjectContext } from '../contexts/ProjectContext'
import { CheckSquare, Plus, Trash, Edit } from 'lucide-react'

const ProjectTasks = () => {
  const { id } = useParams()
  const { projects, updateProject } = useProjectContext()
  const [project, setProject] = useState(null)
  const [newTask, setNewTask] = useState({ title: '', description: '' })
  const [editingTask, setEditingTask] = useState(null)

  useEffect(() => {
    const foundProject = projects.find(p => p.id === parseInt(id))
    if (foundProject) {
      setProject(foundProject)
    }
  }, [id, projects])

  const addTask = () => {
    if (!newTask.title.trim()) return

    const updatedProject = {
      ...project,
      tasks: [
        ...(project.tasks || []),
        { id: Date.now(), ...newTask, status: 'Pending', createdAt: new Date().toISOString() }
      ]
    }
    updateProject(updatedProject)
    setProject(updatedProject)
    setNewTask({ title: '', description: '' })
  }

  const updateTask = (taskId, updates) => {
    const updatedProject = {
      ...project,
      tasks: project.tasks.map(task =>
        task.id === taskId ? { ...task, ...updates } : task
      )
    }
    updateProject(updatedProject)
    setProject(updatedProject)
    setEditingTask(null)
  }

  const deleteTask = (taskId) => {
    const updatedProject = {
      ...project,
      tasks: project.tasks.filter(task => task.id !== taskId)
    }
    updateProject(updatedProject)
    setProject(updatedProject)
  }

  if (!project) return <div>Loading...</div>

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <CheckSquare className="w-6 h-6 mr-2" />
        Project Tasks
      </h2>
      <div className="mb-4">
        <input
          type="text"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          placeholder="Task title"
          className="w-full p-2 border rounded-md mb-2"
        />
        <textarea
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          placeholder="Task description"
          className="w-full p-2 border rounded-md mb-2"
          rows={3}
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </button>
      </div>
      <div className="space-y-4">
        {project.tasks && project.tasks.map(task => (
          <div key={task.id} className="bg-gray-100 p-4 rounded-md">
            {editingTask === task.id ? (
              <div>
                <input
                  type="text"
                  value={task.title}
                  onChange={(e) => updateTask(task.id, { title: e.target.value })}
                  className="w-full p-2 border rounded-md mb-2"
                />
                <textarea
                  value={task.description}
                  onChange={(e) => updateTask(task.id, { description: e.target.value })}
                  className="w-full p-2 border rounded-md mb-2"
                  rows={3}
                />
                <button
                  onClick={() => setEditingTask(null)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingTask(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{task.title}</h3>
                    <p className="text-gray-600">{task.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingTask(task.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    task.status === 'Completed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                  }`}>
                    {task.status}
                  </span>
                  <button
                    onClick={() => updateTask(task.id, { status: task.status === 'Completed' ? 'Pending' : 'Completed' })}
                    className={`text-sm ${task.status === 'Completed' ? 'text-yellow-500' : 'text-green-500'}`}
                  >
                    {task.status === 'Completed' ? 'Mark as Pending' : 'Mark as Completed'}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjectTasks