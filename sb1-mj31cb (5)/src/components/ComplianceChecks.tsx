import React, { useState, useEffect } from 'react'
import { useProjectContext } from '../contexts/ProjectContext'
import { useRole } from '../contexts/RoleContext'
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react'

const ComplianceChecks = () => {
  const { projects, updateProject } = useProjectContext()
  const { hasPermission } = useRole()
  const [complianceItems, setComplianceItems] = useState([])

  useEffect(() => {
    const fetchComplianceItems = async () => {
      // Simulated API call to fetch S500 compliance items
      const response = await fetch('/api/compliance-items')
      const data = await response.json()
      setComplianceItems(data)
    }

    fetchComplianceItems()
  }, [])

  const checkCompliance = (project) => {
    const incompleteItems = complianceItems.filter(item => !project[item.key])
    return incompleteItems.length === 0
  }

  const updateComplianceStatus = async (projectId, itemKey, status) => {
    if (!hasPermission('update_compliance')) return

    const updatedProject = projects.find(p => p.id === projectId)
    updatedProject[itemKey] = status

    try {
      await updateProject(updatedProject)
    } catch (error) {
      console.error('Failed to update compliance status:', error)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Compliance Checks</h2>
      {projects.map(project => (
        <div key={project.id} className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">{project.name}</h3>
          <div className="flex items-center mb-4">
            {checkCompliance(project) ? (
              <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
            ) : (
              <AlertTriangle className="w-6 h-6 text-yellow-500 mr-2" />
            )}
            <span className={`text-lg ${checkCompliance(project) ? 'text-green-600' : 'text-yellow-600'}`}>
              {checkCompliance(project) ? 'Compliant' : 'Partially Compliant'}
            </span>
          </div>
          {hasPermission('view_compliance_details') && (
            <ul className="mt-4 space-y-2">
              {complianceItems.map(item => (
                <li key={item.key} className="flex items-center justify-between">
                  <span className="flex items-center">
                    {project[item.key] ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 mr-2" />
                    )}
                    {item.description}
                  </span>
                  {hasPermission('update_compliance') && (
                    <div>
                      <button
                        onClick={() => updateComplianceStatus(project.id, item.key, true)}
                        className={`px-2 py-1 rounded ${project[item.key] ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                      >
                        Complete
                      </button>
                      <button
                        onClick={() => updateComplianceStatus(project.id, item.key, false)}
                        className={`ml-2 px-2 py-1 rounded ${!project[item.key] ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                      >
                        Incomplete
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}

export default ComplianceChecks