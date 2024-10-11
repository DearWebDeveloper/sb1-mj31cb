import React from 'react'
import { useParams } from 'react-router-dom'
import { Calendar, MapPin, User, Clock, CheckCircle, Droplet, Thermometer, Wrench, AlertCircle } from 'lucide-react'

const ProjectOverview: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  // Mock project data
  const project = {
    id: id,
    name: 'Smith Residence',
    location: '123 Main St, Anytown, USA',
    customer: 'John Smith',
    startDate: '2023-04-01',
    endDate: '2023-04-10',
    status: 'In Progress',
    phase: 'Dry Out',
    scope: [
      'Water extraction from basement',
      'Dehumidification of affected areas',
      'Mold prevention treatment',
      'Structural drying of walls and floors',
    ],
    moisture: 65,
    temperature: 72,
    equipment: [
      { name: 'Dehumidifier', count: 3 },
      { name: 'Air Mover', count: 5 },
      { name: 'Air Scrubber', count: 2 },
    ],
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Project Overview: {project.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Project Details</h2>
          <ul className="space-y-3">
            <li className="flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-gray-500" />
              <span>{project.location}</span>
            </li>
            <li className="flex items-center">
              <User className="mr-2 h-5 w-5 text-gray-500" />
              <span>{project.customer}</span>
            </li>
            <li className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-gray-500" />
              <span>{project.startDate} to {project.endDate}</span>
            </li>
            <li className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-gray-500" />
              <span>Status: <span className="font-semibold text-blue-600">{project.status}</span></span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 text-gray-500" />
              <span>Phase: <span className="font-semibold text-green-600">{project.phase}</span></span>
            </li>
            <li className="flex items-center">
              <Droplet className="mr-2 h-5 w-5 text-blue-500" />
              <span>Moisture: <span className="font-semibold">{project.moisture}%</span></span>
            </li>
            <li className="flex items-center">
              <Thermometer className="mr-2 h-5 w-5 text-red-500" />
              <span>Temperature: <span className="font-semibold">{project.temperature}°F</span></span>
            </li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Scope of Work</h2>
          <ul className="list-disc list-inside space-y-2">
            {project.scope.map((item, index) => (
              <li key={index} className="text-gray-700">{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Equipment Deployed</h2>
          <ul className="space-y-2">
            {project.equipment.map((item, index) => (
              <li key={index} className="flex items-center justify-between border-b pb-2">
                <span className="flex items-center">
                  <Wrench className="mr-2 h-5 w-5 text-gray-500" />
                  {item.name}
                </span>
                <span className="font-semibold">{item.count}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Compliance Verification</h2>
          <p className="text-gray-600 mb-4">
            This section ensures that the project adheres to industry standards and compliance requirements.
            Any issues or non-compliant items will be flagged here.
          </p>
          <ul className="space-y-2">
            <li className="flex items-center text-green-600">
              <CheckCircle className="mr-2 h-5 w-5" />
              IICRC S500 Standard compliant
            </li>
            <li className="flex items-center text-green-600">
              <CheckCircle className="mr-2 h-5 w-5" />
              OSHA safety guidelines followed
            </li>
            <li className="flex items-center text-yellow-600">
              <AlertCircle className="mr-2 h-5 w-5" />
              EPA lead-safe practices (pending verification)
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ProjectOverview