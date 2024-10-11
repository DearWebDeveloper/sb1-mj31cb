import React, { useState } from 'react'
import { Plus, Edit, Trash, ChevronDown, ChevronUp, Camera } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useProjectContext } from '../contexts/ProjectContext'
import useFormValidation from '../hooks/useFormValidation'

const INITIAL_STATE = {
  name: '',
  type: 'Water Damage',
  category: '',
  insuranceCarrier: '',
  claimNumber: '',
  dateOfLoss: '',
  customerContactDate: '',
  initialInspectionDate: '',
  streetAddress: '',
  city: '',
  state: '',
  zipCode: '',
  sourceOfLoss: '',
  status: 'In Progress',
}

const validate = (values) => {
  let errors = {}
  if (!values.name) errors.name = 'Project name is required'
  if (!values.dateOfLoss) errors.dateOfLoss = 'Date of loss is required'
  if (!values.streetAddress) errors.streetAddress = 'Street address is required'
  if (!values.city) errors.city = 'City is required'
  if (!values.state) errors.state = 'State is required'
  if (!values.zipCode) errors.zipCode = 'Zip code is required'
  return errors
}

const ProjectList = () => {
  const { projects, loading, error, addProject, updateProject, deleteProject } = useProjectContext()
  const [expandedProject, setExpandedProject] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProject, setEditingProject] = useState(null)

  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    isSubmitting,
    setValues
  } = useFormValidation(INITIAL_STATE, validate)

  const handleAddProject = () => {
    addProject(values)
    setShowAddForm(false)
    setValues(INITIAL_STATE)
  }

  const handleEditProject = (project) => {
    setEditingProject(project)
    setValues(project)
    setShowAddForm(true)
  }

  const handleUpdateProject = () => {
    updateProject(values)
    setEditingProject(null)
    setShowAddForm(false)
    setValues(INITIAL_STATE)
  }

  const handleDeleteProject = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(id)
    }
  }

  const toggleProjectExpansion = (id) => {
    setExpandedProject(expandedProject === id ? null : id)
  }

  if (loading) return <div>Loading projects...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <button onClick={() => setShowAddForm(true)} className="mb-4 bg-blue-500 text-white px-4 py-2 rounded flex items-center">
        <Plus className="w-5 h-5 mr-2" />
        {editingProject ? 'Edit Project' : 'Add New Project'}
      </button>
      {showAddForm && (
        <form onSubmit={handleSubmit} className="mb-4 bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">{editingProject ? 'Edit Project' : 'Add New Project'}</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Project Name</label>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.name && 'border-red-500'}`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Project Type</label>
              <select
                name="type"
                value={values.type}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="Water Damage">Water Damage</option>
                <option value="Mold Remediation">Mold Remediation</option>
                <option value="Fire Damage">Fire Damage</option>
              </select>
            </div>
            {values.type === 'Water Damage' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="">Select category</option>
                  <option value="Category 1">Category 1 (Clean Water)</option>
                  <option value="Category 2">Category 2 (Gray Water)</option>
                  <option value="Category 3">Category 3 (Black Water)</option>
                </select>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700">Insurance Carrier</label>
              <input
                type="text"
                name="insuranceCarrier"
                value={values.insuranceCarrier}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Claim Number</label>
              <input
                type="text"
                name="claimNumber"
                value={values.claimNumber}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Loss</label>
              <input
                type="date"
                name="dateOfLoss"
                value={values.dateOfLoss}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.dateOfLoss && 'border-red-500'}`}
              />
              {errors.dateOfLoss && <p className="text-red-500 text-sm mt-1">{errors.dateOfLoss}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Customer Contact Date</label>
              <input
                type="date"
                name="customerContactDate"
                value={values.customerContactDate}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Initial Inspection Date</label>
              <input
                type="date"
                name="initialInspectionDate"
                value={values.initialInspectionDate}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Street Address</label>
              <input
                type="text"
                name="streetAddress"
                value={values.streetAddress}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.streetAddress && 'border-red-500'}`}
              />
              {errors.streetAddress && <p className="text-red-500 text-sm mt-1">{errors.streetAddress}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                name="city"
                value={values.city}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.city && 'border-red-500'}`}
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">State</label>
              <input
                type="text"
                name="state"
                value={values.state}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.state && 'border-red-500'}`}
              />
              {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Zip Code</label>
              <input
                type="text"
                name="zipCode"
                value={values.zipCode}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.zipCode && 'border-red-500'}`}
              />
              {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Source of Loss</label>
              <select
                name="sourceOfLoss"
                value={values.sourceOfLoss}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">Select source of loss</option>
                <option value="Pipe Break">Pipe Break</option>
                <option value="Storm">Storm</option>
                <option value="Roof Leak">Roof Leak</option>
                <option value="Appliance Overflow">Appliance Overflow</option>
                <option value="Sewage Backup">Sewage Backup</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => {
                setShowAddForm(false)
                setEditingProject(null)
                setValues(INITIAL_STATE)
              }}
              className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={isSubmitting}
              onClick={editingProject ? handleUpdateProject : handleAddProject}
            >
              {isSubmitting ? 'Saving...' : (editingProject ? 'Update Project' : 'Add Project')}
            </button>
          </div>
        </form>
      )}
      <ul className="space-y-4">
        {projects.map(project => (
          <li key={project.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{project.name}</h3>
              <div className="flex items-center space-x-2">
                <button onClick={() => handleEditProject(project)} className="text-blue-500">
                  <Edit className="w-5 h-5" />
                </button>
                <button onClick={() => handleDeleteProject(project.id)} className="text-red-500">
                  <Trash className="w-5 h-5" />
                </button>
                <button onClick={() => toggleProjectExpansion(project.id)} className="text-gray-500">
                  {expandedProject === project.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-500">Type: {project.type}</p>
            <p className="text-sm text-gray-500">Status: {project.status}</p>
            {expandedProject === project.id && (
              <div className="mt-4 space-y-4">
                <div>
                  <p><strong>Insurance Carrier:</strong> {project.insuranceCarrier}</p>
                  <p><strong>Claim Number:</strong> {project.claimNumber}</p>
                  <p><strong>Date of Loss:</strong> {project.dateOfLoss}</p>
                  <p><strong>Address:</strong> {project.streetAddress}, {project.city}, {project.state} {project.zipCode}</p>
                  <p><strong>Source of Loss:</strong> {project.sourceOfLoss}</p>
                </div>
                <div className="flex space-x-4">
                  <Link to={`/project/${project.id}`} className="bg-blue-500 text-white px-4 py-2 rounded">
                    View Details
                  </Link>
                  <Link to={`/project/${project.id}/photos`} className="bg-green-500 text-white px-4 py-2 rounded flex items-center">
                    <Camera className="w-5 h-5 mr-2" />
                    Photos
                  </Link>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProjectList