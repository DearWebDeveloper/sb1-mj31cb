import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Plus, Trash, Edit, Droplet, ArrowLeft } from 'lucide-react'
import { useProjectContext } from '../contexts/ProjectContext'

const EquipmentDryingDetails = () => {
  const { id: projectId } = useParams()
  const { projects, addDryingChamber, updateDryingChamber } = useProjectContext()
  const [project, setProject] = useState(null)
  const [availableEquipment, setAvailableEquipment] = useState([])
  const [showAddChamberForm, setShowAddChamberForm] = useState(false)
  const [newChamber, setNewChamber] = useState({ name: '', rooms: [] })

  useEffect(() => {
    const foundProject = projects.find(p => p.id === parseInt(projectId))
    if (foundProject) {
      setProject(foundProject)
    }

    // Simulated API call for available equipment
    const fetchAvailableEquipment = async () => {
      const equipmentData = [
        { id: 1, type: 'Dehumidifier', model: 'DH-2000', serialNumber: 'DH2000-001' },
        { id: 2, type: 'Air Mover', model: 'AM-500', serialNumber: 'AM500-001' },
        { id: 3, type: 'Air Scrubber', model: 'AS-1000', serialNumber: 'AS1000-001' },
      ]
      setAvailableEquipment(equipmentData)
    }
    fetchAvailableEquipment()
  }, [projectId, projects])

  const handleAddDryingChamber = () => {
    const chamberToAdd = {
      id: Date.now(),
      ...newChamber,
      equipment: [],
    }
    addDryingChamber(parseInt(projectId), chamberToAdd)
    setNewChamber({ name: '', rooms: [] })
    setShowAddChamberForm(false)
  }

  const handleAddEquipmentToChamber = (chamberId, equipmentId, roomId) => {
    const equipment = availableEquipment.find(eq => eq.id === equipmentId)
    if (!equipment) return

    const updatedChamber = project.dryingChambers.find(chamber => chamber.id === chamberId)
    if (!updatedChamber) return

    const newEquipment = {
      ...equipment,
      roomId,
      setTimestamp: new Date().toISOString(),
      removedTimestamp: null,
      runtime: 0,
    }

    updateDryingChamber(parseInt(projectId), chamberId, {
      ...updatedChamber,
      equipment: [...updatedChamber.equipment, newEquipment]
    })

    setAvailableEquipment(availableEquipment.filter(eq => eq.id !== equipmentId))
  }

  const handleRemoveEquipmentFromChamber = (chamberId, equipmentId) => {
    const updatedChamber = project.dryingChambers.find(chamber => chamber.id === chamberId)
    if (!updatedChamber) return

    const removedTimestamp = new Date().toISOString()
    const updatedEquipment = updatedChamber.equipment.map(eq => {
      if (eq.id === equipmentId) {
        const runtime = calculateRuntime(eq.setTimestamp, removedTimestamp)
        return { ...eq, removedTimestamp, runtime }
      }
      return eq
    })

    updateDryingChamber(parseInt(projectId), chamberId, {
      ...updatedChamber,
      equipment: updatedEquipment
    })

    const removedEquipment = updatedChamber.equipment.find(eq => eq.id === equipmentId)
    setAvailableEquipment([...availableEquipment, {
      id: removedEquipment.id,
      type: removedEquipment.type,
      model: removedEquipment.model,
      serialNumber: removedEquipment.serialNumber,
    }])
  }

  const calculateRuntime = (startTime, endTime) => {
    const start = new Date(startTime)
    const end = endTime ? new Date(endTime) : new Date()
    const diffInMilliseconds = end - start
    return Math.round(diffInMilliseconds / (1000 * 60 * 60)) // Convert to hours
  }

  const updateEquipmentRuntime = () => {
    const updatedChambers = project.dryingChambers.map(chamber => ({
      ...chamber,
      equipment: chamber.equipment.map(eq => ({
        ...eq,
        runtime: eq.removedTimestamp
          ? calculateRuntime(eq.setTimestamp, eq.removedTimestamp)
          : calculateRuntime(eq.setTimestamp, new Date().toISOString())
      }))
    }))

    setProject(prevProject => ({
      ...prevProject,
      dryingChambers: updatedChambers
    }))
  }

  useEffect(() => {
    const runtimeInterval = setInterval(updateEquipmentRuntime, 60000) // Update every minute
    return () => clearInterval(runtimeInterval)
  }, [project])

  if (!project) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-4">
      <Link to={`/project/${projectId}/scope`} className="flex items-center text-blue-500 hover:underline mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Scope of Work
      </Link>
      <h1 className="text-3xl font-bold mb-6">Equipment & Drying Details: {project.name}</h1>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Drying Chambers</h2>
        <button
          onClick={() => setShowAddChamberForm(true)}
          className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        >
          <Plus className="w-4 h-4 inline mr-2" />
          Add Drying Chamber
        </button>

        {showAddChamberForm && (
          <div className="bg-white p-4 rounded shadow mb-4">
            <input
              type="text"
              placeholder="Chamber Name"
              value={newChamber.name}
              onChange={(e) => setNewChamber({ ...newChamber, name: e.target.value })}
              className="border p-2 rounded w-full mb-2"
            />
            <select
              multiple
              value={newChamber.rooms}
              onChange={(e) => setNewChamber({ ...newChamber, rooms: Array.from(e.target.selectedOptions, option => Number(option.value)) })}
              className="border p-2 rounded w-full mb-2"
            >
              {project.affectedRooms.map(room => (
                <option key={room.id} value={room.id}>{room.name}</option>
              ))}
            </select>
            <div className="flex justify-end">
              <button
                onClick={handleAddDryingChamber}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Chamber
              </button>
            </div>
          </div>
        )}

        {project.dryingChambers.map(chamber => (
          <div key={chamber.id} className="bg-white p-4 rounded shadow mb-4">
            <h3 className="text-xl font-semibold mb-2">{chamber.name}</h3>
            <p className="mb-2">
              Rooms: {chamber.rooms.map(roomId => project.affectedRooms.find(r => r.id === roomId)?.name).join(', ')}
            </p>
            <h4 className="font-semibold mb-2">Equipment:</h4>
            <ul className="list-disc pl-5 mb-2">
              {chamber.equipment.map(eq => (
                <li key={eq.id} className="mb-1">
                  {eq.type} - {eq.model} (S/N: {eq.serialNumber})
                  <br />
                  <span className="text-sm text-gray-600">
                    Room: {project.affectedRooms.find(r => r.id === eq.roomId)?.name}
                    <br />
                    Set: {new Date(eq.setTimestamp).toLocaleString()}
                    {eq.removedTimestamp && <><br />Removed: {new Date(eq.removedTimestamp).toLocaleString()}</>}
                    <br />
                    Runtime: {eq.runtime} hours
                  </span>
                  {!eq.removedTimestamp && (
                    <button
                      onClick={() => handleRemoveEquipmentFromChamber(chamber.id, eq.id)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <Trash className="w-4 h-4 inline" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
            {chamber.rooms.map(roomId => (
              <div key={roomId} className="mb-2">
                <h5 className="font-semibold">{project.affectedRooms.find(r => r.id === roomId)?.name}</h5>
                <select
                  onChange={(e) => handleAddEquipmentToChamber(chamber.id, Number(e.target.value), roomId)}
                  className="border p-2 rounded w-full"
                >
                  <option value="">Add equipment...</option>
                  {availableEquipment.map(eq => (
                    <option key={eq.id} value={eq.id}>
                      {eq.type} - {eq.model} (S/N: {eq.serialNumber})
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Available Equipment</h2>
        <ul className="list-disc pl-5">
          {availableEquipment.map(eq => (
            <li key={eq.id}>
              {eq.type} - {eq.model} (S/N: {eq.serialNumber})
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default EquipmentDryingDetails