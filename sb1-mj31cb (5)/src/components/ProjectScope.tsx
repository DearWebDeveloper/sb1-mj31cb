import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Plus, Trash, Edit, Droplet, ArrowLeft } from 'lucide-react'
import { useProjectContext } from '../contexts/ProjectContext'

const ProjectScope = () => {
  const { id } = useParams()
  const { projects, updateProject } = useProjectContext()
  const [project, setProject] = useState(null)
  const [showAddRoomForm, setShowAddRoomForm] = useState(false)
  const [newRoom, setNewRoom] = useState({
    name: '',
    floorLevel: '',
    length: '',
    width: '',
    height: '',
    offsets: '',
    affectedFloorSF: '',
    affectedWallSF: '',
    affectedCeilingSF: '',
  })
  const [editingRoomId, setEditingRoomId] = useState(null)

  useEffect(() => {
    const foundProject = projects.find(p => p.id === parseInt(id))
    if (foundProject) {
      setProject(foundProject)
    }
  }, [id, projects])

  const calculateAreas = (room) => {
    const length = parseFloat(room.length)
    const width = parseFloat(room.width)
    const height = parseFloat(room.height)
    const offsets = parseFloat(room.offsets) || 0

    const floorArea = length * width
    const wallArea = 2 * (length + width) * height
    const ceilingArea = floorArea

    return {
      affectedFloorSF: floorArea.toFixed(2),
      affectedWallSF: (wallArea - offsets).toFixed(2),
      affectedCeilingSF: ceilingArea.toFixed(2),
    }
  }

  const handleRoomInputChange = (e) => {
    const { name, value } = e.target
    setNewRoom(prev => {
      const updatedRoom = { ...prev, [name]: value }
      if (['length', 'width', 'height', 'offsets'].includes(name)) {
        const calculatedAreas = calculateAreas(updatedRoom)
        return { ...updatedRoom, ...calculatedAreas }
      }
      return updatedRoom
    })
  }

  const addRoom = () => {
    const roomToAdd = {
      ...newRoom,
      id: Date.now(),
    }
    const updatedProject = {
      ...project,
      affectedRooms: [...project.affectedRooms, roomToAdd]
    }
    updateProject(updatedProject)
    setProject(updatedProject)
    setNewRoom({
      name: '',
      floorLevel: '',
      length: '',
      width: '',
      height: '',
      offsets: '',
      affectedFloorSF: '',
      affectedWallSF: '',
      affectedCeilingSF: '',
    })
    setShowAddRoomForm(false)
  }

  const deleteRoom = (roomId) => {
    const updatedRooms = project.affectedRooms.filter(room => room.id !== roomId)
    const updatedProject = { ...project, affectedRooms: updatedRooms }
    updateProject(updatedProject)
    setProject(updatedProject)
  }

  const startEditingRoom = (room) => {
    setEditingRoomId(room.id)
    setNewRoom(room)
  }

  const updateRoom = () => {
    const updatedRooms = project.affectedRooms.map(room =>
      room.id === editingRoomId ? { ...newRoom, id: editingRoomId } : room
    )
    const updatedProject = { ...project, affectedRooms: updatedRooms }
    updateProject(updatedProject)
    setProject(updatedProject)
    setEditingRoomId(null)
    setNewRoom({
      name: '',
      floorLevel: '',
      length: '',
      width: '',
      height: '',
      offsets: '',
      affectedFloorSF: '',
      affectedWallSF: '',
      affectedCeilingSF: '',
    })
  }

  if (!project) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-4">
      <Link to={`/project/${id}`} className="flex items-center text-blue-500 hover:underline mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Project Details
      </Link>
      <h1 className="text-3xl font-bold mb-6">Project Scope: {project.name}</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Affected Rooms</h2>
        <button
          onClick={() => setShowAddRoomForm(true)}
          className="mb-4 bg-blue-500 text-white px-4 py-2 rounded flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Room
        </button>
        {(showAddRoomForm || editingRoomId) && (
          <form onSubmit={(e) => { e.preventDefault(); editingRoomId ? updateRoom() : addRoom(); }} className="mb-4 bg-white p-4 rounded-lg shadow">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Room Name"
                value={newRoom.name}
                onChange={handleRoomInputChange}
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                name="floorLevel"
                placeholder="Floor Level"
                value={newRoom.floorLevel}
                onChange={handleRoomInputChange}
                className="border p-2 rounded"
                required
              />
              <input
                type="number"
                name="length"
                placeholder="Length (ft)"
                value={newRoom.length}
                onChange={handleRoomInputChange}
                className="border p-2 rounded"
                required
              />
              <input
                type="number"
                name="width"
                placeholder="Width (ft)"
                value={newRoom.width}
                onChange={handleRoomInputChange}
                className="border p-2 rounded"
                required
              />
              <input
                type="number"
                name="height"
                placeholder="Height (ft)"
                value={newRoom.height}
                onChange={handleRoomInputChange}
                className="border p-2 rounded"
                required
              />
              <input
                type="number"
                name="offsets"
                placeholder="Offsets greater than 18 (sq ft)"
                value={newRoom.offsets}
                onChange={handleRoomInputChange}
                className="border p-2 rounded"
              />
              <input
                type="number"
                name="affectedFloorSF"
                placeholder="Affected Floor SF"
                value={newRoom.affectedFloorSF}
                onChange={handleRoomInputChange}
                className="border p-2 rounded bg-gray-100"
                readOnly
              />
              <input
                type="number"
                name="affectedWallSF"
                placeholder="Affected Wall SF"
                value={newRoom.affectedWallSF}
                onChange={handleRoomInputChange}
                className="border p-2 rounded bg-gray-100"
                readOnly
              />
              <input
                type="number"
                name="affectedCeilingSF"
                placeholder="Affected Ceiling SF"
                value={newRoom.affectedCeilingSF}
                onChange={handleRoomInputChange}
                className="border p-2 rounded bg-gray-100"
                readOnly
              />
            </div>
            <button type="submit" className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
              {editingRoomId ? 'Update Room' : 'Add Room'}
            </button>
            {editingRoomId && (
              <button type="button" onClick={() => setEditingRoomId(null)} className="mt-4 ml-2 bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
            )}
          </form>
        )}
        <ul className="space-y-4">
          {project.affectedRooms.map(room => (
            <li key={room.id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">{room.name}</h3>
                <div>
                  <button onClick={() => startEditingRoom(room)} className="text-blue-500 mr-2">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button onClick={() => deleteRoom(room.id)} className="text-red-500">
                    <Trash className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <p>Floor Level: {room.floorLevel}</p>
              <p>Dimensions: {room.length}' x {room.width}' x {room.height}'</p>
              <p>Offsets greater than 18": {room.offsets || 'N/A'}</p>
              <p>Affected Floor: {room.affectedFloorSF} SF</p>
              <p>Affected Wall: {room.affectedWallSF} SF</p>
              <p>Affected Ceiling: {room.affectedCeilingSF} SF</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <Link
          to={`/project/${id}/drying-details`}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center w-fit"
        >
          <Droplet className="w-5 h-5 mr-2" />
          Equipment & Drying Details
        </Link>
      </div>
    </div>
  )
}

export default ProjectScope