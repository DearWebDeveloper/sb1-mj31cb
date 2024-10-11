import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Plus, Trash, Edit, Tool } from 'lucide-react'

const ProjectEquipment = () => {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [equipment, setEquipment] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newEquipment, setNewEquipment] = useState({
    type: '',
    model: '',
    serialNumber: '',
    room: '',
    startTimestamp: '',
    endTimestamp: '',
  })

  useEffect(() => {
    // Fetch project details and equipment
    const fetchProjectDetails = async () => {
      // Simulated API call
      const projectData = {
        id: parseInt(id),
        name: 'Water Damage Restoration - 123 Main St',
        affectedRooms: [
          { id: 1, name: 'Living Room' },
          { id: 2, name: 'Kitchen' },
        ],
      }
      setProject(projectData)

      const equipmentData = [
        { id: 1, type: 'Dehumidifier', model: 'DH-2000', serialNumber: 'DH2000-001', room: 'Living Room', startTimestamp: '2023-04-01T12:00:00Z', endTimestamp: null },
        { id: 2, type: 'Air Mover', model: 'AM-500', serialNumber: 'AM500-001', room: 'Kitchen', startTimestamp: '2023-04-01T12:30:00Z', endTimestamp: null },
      ]
      setEquipment(equipmentData)
    }

    fetchProjectDetails()
  }, [id])

  const addEquipment = () => {
    const equipmentToAdd = {
      ...newEquipment,
      id: equipment.length + 1,
      startTimestamp: new Date().toISOString(),
      endTimestamp: null,
    }
    setEquipment([...equipment, equipmentToAdd])
    setShowAddForm(false)
    setNewEquipment({
      type: '',
      model: '',
      serialNumber: '',
      room: '',
      startTimestamp: '',
      endTimestamp: '',
    })
  }

  const removeEquipment = (id) => {
    setEquipment(equipment.filter(eq => eq.id !== id))
  }

  const updateEquipment = (id, updates) => {
    setEquipment(equipment.map(eq => eq.id === id ? { ...eq, ...updates } : eq))
  }

  if (!project) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Project Equipment: {project.name}</h1>
      <button
        onClick={() => setShowAddForm(true)}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded flex items-center"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add Equipment
      </button>
      {showAddForm && (
        <form onSubmit={(e) => { e.preventDefault(); addEquipment(); }} className="mb-4 bg-white p-4 rounded-lg shadow">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Equipment Type"
              value={newEquipment.type}
              onChange={(e) => setNewEquipment({ ...newEquipment, type: e.target.value })}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Model"
              value={newEquipment.model}
              onChange={(e) => setNewEquipment({ ...newEquipment, model: e.target.value })}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Serial Number"
              value={newEquipment.serialNumber}
              onChange={(e) => setNewEquipment({ ...newEquipment, serialNumber: e.target.value })}
              className="border p-2 rounded"
              required
            />
            <select
              value={newEquipment.room}
              onChange={(e) => setNewEquipment({ ...newEquipment, room: e.target.value })}
              className="border p-2 rounded"
              required
            >
              <option value="">Select Room</option>
              {project.affectedRooms.map(room => (
                <option key={room.id} value={room.name}>{room.name}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
            Add Equipment
          </button>
        </form>
      )}
      <ul className="space-y-4">
        {equipment.map(eq => (
          <li key={eq.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{eq.type} - {eq.model}</h3>
                <p>Serial Number: {eq.serialNumber}</p>
                <p>Room: {eq.room}</p>
                <p>Start: {new Date(eq.startTimestamp).toLocaleString()}</p>
                {eq.endTimestamp && <p>End: {new Date(eq.endTimestamp).toLocaleString()}</p>}
              </div>
              <div>
                <button
                  onClick={() => updateEquipment(eq.id, { endTimestamp: new Date().toISOString() })}
                  className="text-blue-500 mr-2"
                  disabled={eq.endTimestamp}
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button onClick={() => removeEquipment(eq.id)} className="text-red-500">
                  <Trash className="w-5 h-5" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProjectEquipment