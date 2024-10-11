import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AlertCircle, CheckCircle, Clock, Droplet, Tool, FileText } from 'lucide-react'
import { useProjectContext } from '../contexts/ProjectContext'
import { useAuth } from '../contexts/AuthContext'
import { useNotification } from '../contexts/NotificationContext'
import NotificationBell from './NotificationBell'

const Dashboard = () => {
  const { projects, equipmentInventory } = useProjectContext()
  const { user } = useAuth()
  const { notifications } = useNotification()
  const [tasks, setTasks] = useState([])
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    // Fetch tasks and alerts (simulated API calls)
    const fetchData = async () => {
      try {
        // Simulated tasks data
        const tasksData = [
          { id: 1, description: 'Initial inspection for 123 Main St', dueDate: '2023-05-15', status: 'Pending' },
          { id: 2, description: 'Equipment removal for 456 Elm St', dueDate: '2023-05-16', status: 'Overdue' },
          { id: 3, description: 'Final report for 789 Oak St', dueDate: '2023-05-17', status: 'Completed' },
        ]
        setTasks(tasksData)

        // Simulated alerts data
        const alertsData = [
          { id: 1, message: 'High humidity detected in 123 Main St', type: 'warning' },
          { id: 2, message: 'Equipment maintenance due for Dehumidifier DH-001', type: 'info' },
          { id: 3, message: 'Compliance check required for 789 Oak St', type: 'error' },
        ]
        setAlerts(alertsData)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      }
    }

    fetchData()
  }, [])

  const activeProjects = projects.filter(project => project.status === 'In Progress')
  const equipmentInUse = equipmentInventory.filter(equipment => equipment.status === 'In Use')
  const equipmentAvailable = equipmentInventory.filter(equipment => equipment.status === 'Available')

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <NotificationBell />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Active Projects</h2>
          <ul className="space-y-2">
            {activeProjects.map(project => (
              <li key={project.id} className="flex items-center justify-between">
                <Link to={`/project/${project.id}`} className="text-blue-500 hover:underline">
                  {project.name}
                </Link>
                <span className="px-2 py-1 rounded text-sm bg-yellow-200 text-yellow-800">
                  In Progress
                </span>
              </li>
            ))}
          </ul>
          <Link to="/projects" className="mt-4 inline-block text-blue-500 hover:underline">
            View all projects
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Pending Tasks</h2>
          <ul className="space-y-2">
            {tasks.map(task => (
              <li key={task.id} className="flex items-center justify-between">
                <span>{task.description}</span>
                <span className={`px-2 py-1 rounded text-sm ${
                  task.status === 'Overdue' ? 'bg-red-200 text-red-800' :
                  task.status === 'Completed' ? 'bg-green-200 text-green-800' :
                  'bg-yellow-200 text-yellow-800'
                }`}>
                  {task.status}
                </span>
              </li>
            ))}
          </ul>
          <Link to="/tasks" className="mt-4 inline-block text-blue-500 hover:underline">
            View all tasks
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Alerts & Notifications</h2>
          <ul className="space-y-2">
            {alerts.map(alert => (
              <li key={alert.id} className="flex items-center">
                {alert.type === 'warning' && <AlertCircle className="w-5 h-5 text-yellow-500 mr-2" />}
                {alert.type === 'info' && <Clock className="w-5 h-5 text-blue-500 mr-2" />}
                {alert.type === 'error' && <AlertCircle className="w-5 h-5 text-red-500 mr-2" />}
                <span>{alert.message}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Equipment Overview</h2>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-medium">In Use: {equipmentInUse.length}</p>
              <p className="text-lg font-medium">Available: {equipmentAvailable.length}</p>
            </div>
            <Link to="/equipment" className="text-blue-500 hover:underline">
              Manage Equipment
            </Link>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Reports</h2>
          <ul className="space-y-2">
            <li className="flex items-center justify-between">
              <span>Final Report - 123 Main St</span>
              <Link to="/reports/1" className="text-blue-500 hover:underline flex items-center">
                <FileText className="w-4 h-4 mr-1" />
                View
              </Link>
            </li>
            <li className="flex items-center justify-between">
              <span>Progress Report - 456 Elm St</span>
              <Link to="/reports/2" className="text-blue-500 hover:underline flex items-center">
                <FileText className="w-4 h-4 mr-1" />
                View
              </Link>
            </li>
          </ul>
          <Link to="/reports" className="mt-4 inline-block text-blue-500 hover:underline">
            View all reports
          </Link>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/projects/new" className="bg-blue-500 text-white px-4 py-2 rounded text-center hover:bg-blue-600 transition duration-300">
            New Project
          </Link>
          <Link to="/equipment" className="bg-green-500 text-white px-4 py-2 rounded text-center hover:bg-green-600 transition duration-300">
            Manage Equipment
          </Link>
          <Link to="/reports" className="bg-purple-500 text-white px-4 py-2 rounded text-center hover:bg-purple-600 transition duration-300">
            Generate Reports
          </Link>
          <Link to="/compliance" className="bg-yellow-500 text-white px-4 py-2 rounded text-center hover:bg-yellow-600 transition duration-300">
            Compliance Checks
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard