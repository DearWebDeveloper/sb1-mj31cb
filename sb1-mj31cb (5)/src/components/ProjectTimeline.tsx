import React from 'react'
import { useParams } from 'react-router-dom'
import { useProjectContext } from '../contexts/ProjectContext'
import { Calendar, CheckCircle, AlertTriangle } from 'lucide-react'

const ProjectTimeline = () => {
  const { id } = useParams()
  const { projects } = useProjectContext()
  const project = projects.find(p => p.id === parseInt(id))

  if (!project) {
    return <div>Loading...</div>
  }

  const timelineEvents = [
    { date: project.createdAt, title: 'Project Created', icon: Calendar },
    { date: project.initialInspectionDate, title: 'Initial Inspection', icon: CheckCircle },
    ...project.moistureReadings.map(reading => ({
      date: reading.date,
      title: 'Moisture Reading',
      icon: AlertTriangle,
    })),
    ...(project.completedAt ? [{ date: project.completedAt, title: 'Project Completed', icon: CheckCircle }] : []),
  ].sort((a, b) => new Date(a.date) - new Date(b.date))

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Project Timeline</h2>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
        {timelineEvents.map((event, index) => (
          <div key={index} className="mb-8 flex items-center">
            <div className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center z-10">
              <event.icon className="text-white w-5 h-5" />
            </div>
            <div className="ml-4 flex-grow">
              <div className="font-semibold">{event.title}</div>
              <div className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjectTimeline