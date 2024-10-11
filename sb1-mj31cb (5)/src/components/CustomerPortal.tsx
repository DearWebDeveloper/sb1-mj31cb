import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useProjectContext } from '../contexts/ProjectContext'

const CustomerPortal = () => {
  const { id } = useParams()
  const { projects } = useProjectContext()
  const [project, setProject] = useState(null)

  useEffect(() => {
    const foundProject = projects.find(p => p.id === parseInt(id))
    setProject(foundProject)
  }, [id, projects])

  if (!project) return <div>Loading...</div>

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{project.name}</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Project Status</h2>
        <p className="text-lg">{project.status}</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Recent Updates</h2>
        <ul className="space-y-2">
          {project.updates && project.updates.map((update, index) => (
            <li key={index} className="border-b pb-2">
              <p className="font-semibold">{update.date}</p>
              <p>{update.description}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Documents</h2>
        <ul className="space-y-2">
          {project.documents && project.documents.map((doc, index) => (
            <li key={index}>
              <a href={doc.url} className="text-blue-600 hover:underline">{doc.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default CustomerPortal