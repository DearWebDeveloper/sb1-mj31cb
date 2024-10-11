import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Plus, Trash, Edit, Droplet } from 'lucide-react'

const MoistureMapping = () => {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [newReading, setNewReading] = useState({
    date: '',
    readings: {},
  })

  useEffect(() => {
    // Fetch project details
    const fetchProjectDetails = async () => {
      // Simulated API call
      const projectData = {
        id: parseInt(id),
        name: 'Water Damage Restoration - 123 Main St',
        affectedRooms: [
          {
            id: 1,
            name: 'Living Room',
            materials: [
              { id: 1, type: 'Carpet', location: 'Floor', area: '300', initialMoisture: '80' },
              { id: 2, type: 'Drywall', location: 'Wall', area: '200', initialMoisture: '40' },
            ],
            moistureReadings: [
              {
                date: '2023-05-01',
                readings: {
                  1: '75',
                  2: '35',
                },
              },
              {
                date: '2023-05-02',
                readings: {
                  1: '70',
                  2: '30',
                },
              },
            ],
          },
        ],
      }
      setProject(projectData)
      setSelectedRoom(projectData.affectedRooms[0])
    }

    fetchProjectDetails()
  }, [id])

  const addMoistureReading = () => {
    const updatedRoom = {
      ...selectedRoom,
      moistureReadings: [...selectedRoom.moistureReadings, newReading],
    }
    setProject({
      ...project,
      affectedRooms: project.affectedRooms.map(room =>
        room.id === selectedRoom.id ? updatedRoom : room
      ),
    })
    setSelectedRoom(updatedRoom)
    setNewReading({
      date: '',
      readings: {},
    })
  }

  const handleReadingChange = (materialId, value) => {
    setNewReading({
      ...newReading,
      readings: {
        ...newReading.readings,
        [materialId]: value,
      },
    })
  }

  if (!project || !selectedRoom) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Moisture Mapping: {project.name}</h1>
      <Link to={`/project/${id}`} className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to Project Details
      </Link>
      
      <div className="mb-4">
        <label htmlFor="room-select" className="block text-sm font-medium text-gray-700">Select Room</label>
        <select
          id="room-select"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          value={selectedRoom.id}
          onChange={(e) => setSelectedRoom(project.affectedRooms.find(room => room.id === parseInt(e.target.value)))}
        >
          {project.affectedRooms.map(room => (
            <option key={room.id} value={room.id}>{room.name}</option>
          ))}
        </select>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Moisture Readings for {selectedRoom.name}</h3>
        </div>
        <div className="border-t border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                {selectedRoom.materials.map(material => (
                  <th key={material.id} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {material.type} ({material.location})
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {selectedRoom.moistureReadings.map((reading, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {reading.date}
                  </td>
                  {selectedRoom.materials.map(material => (
                    <td key={material.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {reading.readings[material.id]}%
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Add New Moisture Reading</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                id="date"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                value={newReading.date}
                onChange={(e) => setNewReading({ ...newReading, date: e.target.value })}
                required
              />
            </div>
            {selectedRoom.materials.map(material => (
              <div key={material.id}>
                <label htmlFor={`material-${material.id}`} className="block text-sm font-medium text-gray-700">
                  {material.type} ({material.location})
                </label>
                <input
                  type="number"
                  name={`material-${material.id}`}
                  id={`material-${material.id}`}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Moisture %"
                  value={newReading.readings[material.id] || ''}
                  onChange={(e) => handleReadingChange(material.id, e.target.value)}
                  required
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={addMoistureReading}
          >
            Add Reading
          </button>
        </div>
      </div>
    </div>
  )
}

export default MoistureMapping