import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Plus, Trash, LineChart, AlertCircle } from 'lucide-react'
import { useProjectContext } from '../contexts/ProjectContext'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const DailyMoistureReadings = () => {
  const { id: projectId } = useParams()
  const { projects, addMoistureReading } = useProjectContext()
  const [project, setProject] = useState(null)
  const [newReading, setNewReading] = useState({
    date: '',
    outsideConditions: { temperature: '', humidity: '', gpp: '' },
    unaffectedAreaConditions: { temperature: '', humidity: '', gpp: '' },
    chamberReadings: [],
  })
  const [selectedChamber, setSelectedChamber] = useState(null)
  const [selectedMaterial, setSelectedMaterial] = useState(null)
  const [dryingGoal, setDryingGoal] = useState(null)

  useEffect(() => {
    const foundProject = projects.find(p => p.id === parseInt(projectId))
    if (foundProject) {
      setProject(foundProject)
      setNewReading(prev => ({
        ...prev,
        chamberReadings: foundProject.dryingChambers.map(chamber => ({
          chamberId: chamber.id,
          temperature: '',
          humidity: '',
          gpp: '',
          materialReadings: chamber.rooms.flatMap(roomId => 
            foundProject.affectedRooms.find(r => r.id === roomId)?.materials.map(material => ({
              materialId: material.id,
              moisture: '',
            })) || []
          ),
        })),
      }))
      if (foundProject.dryingChambers.length > 0) {
        setSelectedChamber(foundProject.dryingChambers[0].id)
      }
    }
  }, [projectId, projects])

  const handleInputChange = (field, value, parentField = null) => {
    if (parentField) {
      setNewReading(prev => ({
        ...prev,
        [parentField]: { ...prev[parentField], [field]: value }
      }))
    } else {
      setNewReading(prev => ({ ...prev, [field]: value }))
    }
  }

  const handleChamberInputChange = (chamberId, field, value) => {
    setNewReading(prev => ({
      ...prev,
      chamberReadings: prev.chamberReadings.map(reading =>
        reading.chamberId === chamberId ? { ...reading, [field]: value } : reading
      ),
    }))
  }

  const handleMaterialInputChange = (chamberId, materialId, value) => {
    setNewReading(prev => ({
      ...prev,
      chamberReadings: prev.chamberReadings.map(reading =>
        reading.chamberId === chamberId ? {
          ...reading,
          materialReadings: reading.materialReadings.map(material =>
            material.materialId === materialId ? { ...material, moisture: value } : material
          ),
        } : reading
      ),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addMoistureReading(parseInt(projectId), newReading)
    setNewReading({
      date: '',
      outsideConditions: { temperature: '', humidity: '', gpp: '' },
      unaffectedAreaConditions: { temperature: '', humidity: '', gpp: '' },
      chamberReadings: project.dryingChambers.map(chamber => ({
        chamberId: chamber.id,
        temperature: '',
        humidity: '',
        gpp: '',
        materialReadings: chamber.rooms.flatMap(roomId => 
          project.affectedRooms.find(r => r.id === roomId)?.materials.map(material => ({
            materialId: material.id,
            moisture: '',
          })) || []
        ),
      })),
    })
  }

  const generateChartData = () => {
    if (!project || !selectedChamber) return null

    const chamber = project.dryingChambers.find(c => c.id === selectedChamber)
    if (!chamber) return null

    const dates = project.moistureReadings.map(reading => reading.date)
    const chamberTemperatures = project.moistureReadings.map(reading => 
      reading.chamberReadings.find(cr => cr.chamberId === selectedChamber)?.temperature
    )
    const chamberHumidities = project.moistureReadings.map(reading => 
      reading.chamberReadings.find(cr => cr.chamberId === selectedChamber)?.humidity
    )
    const materialMoisture = project.moistureReadings.map(reading => 
      reading.chamberReadings.find(cr => cr.chamberId === selectedChamber)?.materialReadings.find(mr => mr.materialId === selectedMaterial)?.moisture
    )

    return {
      labels: dates,
      datasets: [
        {
          label: 'Temperature (°F)',
          data: chamberTemperatures,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          yAxisID: 'y',
        },
        {
          label: 'Relative Humidity (%)',
          data: chamberHumidities,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          yAxisID: 'y',
        },
        {
          label: 'Material Moisture (%)',
          data: materialMoisture,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          yAxisID: 'y1',
        },
      ],
    }
  }

  const chartOptions = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: 'Chamber Environmental Conditions and Material Moisture Over Time',
      },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  }

  const calculateDryingProgress = () => {
    if (!project || !selectedMaterial) return null

    const initialReading = project.moistureReadings[0]?.chamberReadings
      .find(cr => cr.chamberId === selectedChamber)?.materialReadings
      .find(mr => mr.materialId === selectedMaterial)?.moisture

    const latestReading = project.moistureReadings[project.moistureReadings.length - 1]?.chamberReadings
      .find(cr => cr.chamberId === selectedChamber)?.materialReadings
      .find(mr => mr.materialId === selectedMaterial)?.moisture

    if (!initialReading || !latestReading || !dryingGoal) return null

    const totalDrying = initialReading - dryingGoal
    const currentDrying = initialReading - latestReading
    const progress = (currentDrying / totalDrying) * 100

    return Math.min(Math.max(progress, 0), 100).toFixed(2)
  }

  if (!project) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-4">
      <Link to={`/project/${projectId}`} className="flex items-center text-blue-500 hover:underline mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Project Details
      </Link>
      <h1 className="text-3xl font-bold mb-6">Daily Moisture Readings: {project.name}</h1>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={newReading.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Outside Temperature (°F)</label>
            <input
              type="number"
              value={newReading.outsideConditions.temperature}
              onChange={(e) => handleInputChange('temperature', e.target.value, 'outsideConditions')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Outside Humidity (%)</label>
            <input
              type="number"
              value={newReading.outsideConditions.humidity}
              onChange={(e) => handleInputChange('humidity', e.target.value, 'outsideConditions')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-2">Chamber Readings</h3>
        {project.dryingChambers.map(chamber => (
          <div key={chamber.id} className="mb-4 p-4 bg-gray-100 rounded">
            <h4 className="font-medium mb-2">{chamber.name}</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Temperature (°F)</label>
                <input
                  type="number"
                  value={newReading.chamberReadings.find(cr => cr.chamberId === chamber.id)?.temperature}
                  onChange={(e) => handleChamberInputChange(chamber.id, 'temperature', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Humidity (%)</label>
                <input
                  type="number"
                  value={newReading.chamberReadings.find(cr => cr.chamberId === chamber.id)?.humidity}
                  onChange={(e) => handleChamberInputChange(chamber.id, 'humidity', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">GPP</label>
                <input
                  type="number"
                  value={newReading.chamberReadings.find(cr => cr.chamberId === chamber.id)?.gpp}
                  onChange={(e) => handleChamberInputChange(chamber.id, 'gpp', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>
            </div>
            <h5 className="font-medium mt-2 mb-1">Material Readings</h5>
            {chamber.rooms.flatMap(roomId => 
              project.affectedRooms.find(r => r.id === roomId)?.materials.map(material => (
                <div key={material.id} className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">{material.type} Moisture (%)</label>
                  <input
                    type="number"
                    value={newReading.chamberReadings.find(cr => cr.chamberId === chamber.id)?.materialReadings.find(mr => mr.materialId === material.id)?.moisture}
                    onChange={(e) => handleMaterialInputChange(chamber.id, material.id, e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  />
                </div>
              ))
            )}
          </div>
        ))}
        
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add Readings
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Environmental Conditions and Material Moisture Chart</h2>
        <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Chamber</label>
            <select
              value={selectedChamber}
              onChange={(e) => setSelectedChamber(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              {project.dryingChambers.map(chamber => (
                <option key={chamber.id} value={chamber.id}>{chamber.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Material</label>
            <select
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Select a material</option>
              {project.affectedRooms.flatMap(room => room.materials).map(material => (
                <option key={material.id} value={material.id}>{material.type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Drying Goal (%)</label>
            <input
              type="number"
              value={dryingGoal}
              onChange={(e) => setDryingGoal(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter drying goal"
            />
          </div>
        </div>
        {generateChartData() && (
          <div className="bg-white p-4 rounded shadow">
            <Line options={chartOptions} data={generateChartData()} />
          </div>
        )}
      </div>

      {calculateDryingProgress() !== null && (
        <div className="mt-4 bg-blue-100 border-l-4 border-blue-500 p-4">
          <div className="flex items-center">
            <AlertCircle className="w-6 h-6 text-blue-500 mr-2" />
            <p className="text-blue-700">
              Drying Progress: {calculateDryingProgress()}% complete
            </p>
          </div>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Previous Readings</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 bg-gray-100">Date</th>
                <th className="px-4 py-2 bg-gray-100">Outside Temp</th>
                <th className="px-4 py-2 bg-gray-100">Outside Humidity</th>
                {project.dryingChambers.map(chamber => (
                  <React.Fragment key={chamber.id}>
                    <th className="px-4 py-2 bg-gray-100">{chamber.name} Temp</th>
                    <th className="px-4 py-2 bg-gray-100">{chamber.name} Humidity</th>
                    <th className="px-4 py-2 bg-gray-100">{chamber.name} GPP</th>
                  </React.Fragment>
                ))}
              </tr>
            </thead>
            <tbody>
              {project.moistureReadings.map((reading, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-4 py-2">{reading.date}</td>
                  <td className="px-4 py-2">{reading.outsideConditions.temperature}°F</td>
                  <td className="px-4 py-2">{reading.outsideConditions.humidity}%</td>
                  {project.dryingChambers.map(chamber => {
                    const chamberReading = reading.chamberReadings.find(cr => cr.chamberId === chamber.id)
                    return (
                      <React.Fragment key={chamber.id}>
                        <td className="px-4 py-2">{chamberReading?.temperature}°F</td>
                        <td className="px-4 py-2">{chamberReading?.humidity}%</td>
                        <td className="px-4 py-2">{chamberReading?.gpp}</td>
                      </React.Fragment>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DailyMoistureReadings