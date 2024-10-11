import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Camera, FileText, Clipboard, Wrench, BarChart2, Droplet, Edit, Save, X, AlertCircle, CheckCircle, Calendar } from 'lucide-react'
import { useProjectContext } from '../contexts/ProjectContext'
import { useRole } from '../contexts/RoleContext'
import ProjectNotes from './ProjectNotes'
import ProjectTasks from './ProjectTasks'
import ProjectSummaryDashboard from './ProjectSummaryDashboard'

const ProjectDetail = () => {
  const { id } = useParams()
  const { projects, updateProject } = useProjectContext()
  const { hasPermission } = useRole()
  const [project, setProject] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedProject, setEditedProject] = useState(null)

  useEffect(() => {
    const foundProject = projects.find(p => p.id === parseInt(id))
    if (foundProject) {
      setProject(foundProject)
      setEditedProject(foundProject)
    }
  }, [id, projects])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    updateProject(editedProject)
    setProject(editedProject)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedProject(project)
    setIsEditing(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditedProject(prev => ({ ...prev, [name]: value }))
  }

  if (!project) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 flex items-center justify-between">
        <span>{project.name}</span>
        {hasPermission('edit_project') && !isEditing && (
          <button onClick={handleEdit} className="text-blue-500 hover:text-blue-700">
            <Edit className="w-6 h-6" />
          </button>
        )}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Project Details</h2>
          {isEditing ? (
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Project Name</label>
                <input
                  type="text"
                  name="name"
                  value={editedProject.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  name="type"
                  value={editedProject.type}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="Water Damage">Water Damage</option>
                  <option value="Fire Damage">Fire Damage</option>
                  <option value="Mold Remediation">Mold Remediation</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={editedProject.status}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Date of Loss</label>
                <input
                  type="date"
                  name="dateOfLoss"
                  value={editedProject.dateOfLoss}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Insurance Carrier</label>
                <input
                  type="text"
                  name="insuranceCarrier"
                  value={editedProject.insuranceCarrier}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Claim Number</label>
                <input
                  type="text"
                  name="claimNumber"
                  value={editedProject.claimNumber}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </form>
          ) : (
            <>
              <p><strong>Type:</strong> {project.type}</p>
              <p><strong>Status:</strong> {project.status}</p>
              <p><strong>Date of Loss:</strong> {project.dateOfLoss}</p>
              <p><strong>Insurance Carrier:</strong> {project.insuranceCarrier}</p>
              <p><strong>Claim Number:</strong> {project.claimNumber}</p>
              <p><strong>Address:</strong> {project.streetAddress}, {project.city}, {project.state} {project.zipCode}</p>
            </>
          )}
        </div>

        <ProjectSummaryDashboard project={project} />
      </div>

      {isEditing && (
        <div className="flex justify-end space-x-4 mb-6">
          <button onClick={handleCancel} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Save Changes
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Link to={`/project/${project.id}/scope`} className="bg-purple-500 text-white px-4 py-2 rounded flex items-center justify-center hover:bg-purple-600 transition duration-300">
          <Clipboard className="w-5 h-5 mr-2" />
          Scope of Work
        </Link>
        <Link to={`/project/${project.id}/equipment`} className="bg-blue-500 text-white px-4 py-2 rounded flex items-center justify-center hover:bg-blue-600 transition duration-300">
          <Wrench className="w-5 h-5 mr-2" />
          Equipment
        </Link>
        <Link to={`/project/${project.id}/moisture-readings`} className="bg-teal-500 text-white px-4 py-2 rounded flex items-center justify-center hover:bg-teal-600 transition duration-300">
          <Droplet className="w-5 h-5 mr-2" />
          Moisture Readings
        </Link>
        <Link to={`/project/${project.id}/photos`} className="bg-green-500 text-white px-4 py-2 rounded flex items-center justify-center hover:bg-green-600 transition duration-300">
          <Camera className="w-5 h-5 mr-2" />
          Photos
        </Link>
        <Link to={`/project/${project.id}/documents`} className="bg-yellow-500 text-white px-4 py-2 rounded flex items-center justify-center hover:bg-yellow-600 transition duration-300">
          <FileText className="w-5 h-5 mr-2" />
          Documents
        </Link>
        <Link to={`/project/${project.id}/report-generator`} className="bg-red-500 text-white px-4 py-2 rounded flex items-center justify-center hover:bg-red-600 transition duration-300">
          <BarChart2 className="w-5 h-5 mr-2" />
          Generate Report
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <ProjectNotes project={project} />
        <ProjectTasks project={project} />
      </div>

      {hasPermission('view_compliance') && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Compliance Status</h2>
          <div className="flex items-center">
            {project.isCompliant ? (
              <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
            ) : (
              <AlertCircle className="w-6 h-6 text-red-500 mr-2" />
            )}
            <span className={project.isCompliant ? 'text-green-500' : 'text-red-500'}>
              {project.isCompliant ? 'Compliant' : 'Non-compliant'}
            </span>
          </div>
          <Link to={`/project/${project.id}/compliance`} className="mt-2 inline-block text-blue-500 hover:underline">
            View Compliance Details
          </Link>
        </div>
      )}
    </div>
  )
}

export default ProjectDetail