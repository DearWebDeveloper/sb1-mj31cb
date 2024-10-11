import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const ProjectContext = createContext(null)

export const useProjectContext = () => useContext(ProjectContext)

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([])
  const [equipmentInventory, setEquipmentInventory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    const fetchProjects = async () => {
      if (!user || !user.orgId) return
      try {
        // Simulated API call with orgId
        const response = await fetch(`/api/projects?orgId=${user.orgId}`)
        const data = await response.json()
        setProjects(data)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch projects')
        setLoading(false)
      }
    }

    const fetchEquipmentInventory = async () => {
      if (!user || !user.orgId) return
      try {
        // Simulated API call with orgId
        const response = await fetch(`/api/equipment?orgId=${user.orgId}`)
        const data = await response.json()
        setEquipmentInventory(data)
      } catch (err) {
        setError('Failed to fetch equipment inventory')
      }
    }

    fetchProjects()
    fetchEquipmentInventory()
  }, [user])

  const addProject = async (project) => {
    if (!user || !user.orgId) return
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...project, orgId: user.orgId }),
      })
      const newProject = await response.json()
      setProjects([...projects, newProject])
    } catch (err) {
      setError('Failed to add project')
    }
  }

  const updateProject = async (updatedProject) => {
    if (!user || !user.orgId) return
    try {
      const response = await fetch(`/api/projects/${updatedProject.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProject),
      })
      const updated = await response.json()
      setProjects(projects.map(p => p.id === updated.id ? updated : p))
    } catch (err) {
      setError('Failed to update project')
    }
  }

  const deleteProject = async (id) => {
    if (!user || !user.orgId) return
    try {
      await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      })
      setProjects(projects.filter(p => p.id !== id))
    } catch (err) {
      setError('Failed to delete project')
    }
  }

  const addEquipment = async (equipment) => {
    if (!user || !user.orgId) return
    try {
      const response = await fetch('/api/equipment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...equipment, orgId: user.orgId }),
      })
      const newEquipment = await response.json()
      setEquipmentInventory([...equipmentInventory, newEquipment])
    } catch (err) {
      setError('Failed to add equipment')
    }
  }

  const updateEquipment = async (id, updatedEquipment) => {
    if (!user || !user.orgId) return
    try {
      const response = await fetch(`/api/equipment/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEquipment),
      })
      const updated = await response.json()
      setEquipmentInventory(equipmentInventory.map(e => e.id === updated.id ? updated : e))
    } catch (err) {
      setError('Failed to update equipment')
    }
  }

  const deleteEquipment = async (id) => {
    if (!user || !user.orgId) return
    try {
      await fetch(`/api/equipment/${id}`, {
        method: 'DELETE',
      })
      setEquipmentInventory(equipmentInventory.filter(e => e.id !== id))
    } catch (err) {
      setError('Failed to delete equipment')
    }
  }

  const addRoomToProject = (projectId, room) => {
    setProjects(projects.map(project => 
      project.id === projectId
        ? { ...project, affectedRooms: [...project.affectedRooms, room] }
        : project
    ))
  }

  const addDryingChamber = (projectId, chamber) => {
    setProjects(projects.map(project => 
      project.id === projectId
        ? { ...project, dryingChambers: [...project.dryingChambers, chamber] }
        : project
    ))
  }

  const updateDryingChamber = (projectId, chamberId, updatedChamber) => {
    setProjects(projects.map(project => 
      project.id === projectId
        ? {
            ...project,
            dryingChambers: project.dryingChambers.map(chamber => 
              chamber.id === chamberId ? updatedChamber : chamber
            )
          }
        : project
    ))
  }

  const addMoistureReading = (projectId, reading) => {
    setProjects(projects.map(project => 
      project.id === projectId
        ? { ...project, moistureReadings: [...project.moistureReadings, reading] }
        : project
    ))
  }

  return (
    <ProjectContext.Provider value={{
      projects,
      loading,
      error,
      addProject,
      updateProject,
      deleteProject,
      equipmentInventory,
      addEquipment,
      updateEquipment,
      deleteEquipment,
      addRoomToProject,
      addDryingChamber,
      updateDryingChamber,
      addMoistureReading,
    }}>
      {children}
    </ProjectContext.Provider>
  )
}