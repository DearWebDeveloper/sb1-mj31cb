import React from 'react'
import { Link } from 'react-router-dom'
import { AlertCircle, CheckCircle, Clock, Droplet, Thermometer } from 'lucide-react'

const Dashboard: React.FC = () => {
  const projects = [
    { id: 1, name: 'Smith Residence', status: 'In Progress', date: '2023-04-01', moisture: 65, temperature: 72 },
    { id: 2, name: 'Johnson Office', status: 'Completed', date: '2023-03-28', moisture: 30, temperature: 70 },
    { id: 3, name: 'Brown Apartment', status: 'Pending', date: '2023-04-05', moisture: 80, temperature: 75 },
  ]

  const tasks = [
    { id: 1, name: 'Initial Inspection', project: 'Smith Residence', deadline: '2023-04-02', status: 'Completed' },
    { id: 2, name: 'Equipment Setup', project: 'Johnson Office', deadline: '2023-03-29', status: 'In Progress' },
    { id: 3, name: 'Final Report', project: 'Brown Apartment', deadline: '2023-04-07', status: 'Pending' },
  ]

  const alerts = [
    { id: 1, message: 'Moisture levels above threshold in Smith Residence', type: 'warning' },
    { id: 2, message: 'Equipment maintenance due for Dehumidifier #5', type: 'info' },
    { id: 3, message: 'Compliance check required for Johnson Office project', type: 'error' },
  ]

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Active Projects</h2>
          <ul>
            {projects.map((project) => (
              <li key={project.id} className="mb-4 p-3 border rounded-lg hover:bg-gray-50">
                <Link to={`/project/${project.id}`} className="text-blue-600 hover:underline font-semibold">
                  {project.name}
                </Link>
                <div className="flex justify-between items-center mt-2">
                  <span className={`text-sm ${project.status === 'Completed' ? 'text-green-500' : 'text-yellow-500'}`}>
                    {project.status}
                  </span>
                  <span className="text-sm text-gray-500">{project.date}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="flex items-center text-sm">
                    <Droplet className="h-4 w-4 mr-1 text-blue-500" />
                    {project.moisture}%
                  </span>
                  <span className="flex items-center text-sm">
                    <Thermometer className="h-4 w-4 mr-1 text-red-500" />
                    {project.temperature}°F
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Tasks</h2>
          <ul>
            {tasks.map((task) => (
              <li key={task.id} className="mb-3 p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{task.name}</span>
                  <span className={`text-sm ${
                    task.status === 'Completed' ? 'text-green-500' : 
                    task.status === 'In Progress' ? 'text-yellow-500' : 'text-red-500'
                  }`}>{task.status}</span>
                </div>
                <div className="text-sm text-gray-600 mt-1">{task.project}</div>
                <div className="flex justify-between items-center mt-2">
                  <span className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    Due: {task.deadline}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Alerts</h2>
          <ul>
            {alerts.map((alert) => (
              <li key={alert.id} className="mb-3 p-3 border rounded-lg hover:bg-gray-50 flex items-center">
                {alert.type === 'warning' && <AlertCircle className="mr-2 h-5 w-5 text-yellow-500" />}
                {alert.type === 'info' && <CheckCircle className="mr-2 h-5 w-5 text-blue-500" />}
                {alert.type === 'error' && <AlertCircle className="mr-2 h-5 w-5 text-red-500" />}
                <span className="text-sm">{alert.message}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Dashboard