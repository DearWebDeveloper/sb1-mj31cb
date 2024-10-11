import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Plus, Trash, Edit } from 'lucide-react'

const DryingDetails = () => {
  const { id: projectId } = useParams()
  const [project, setProject] = useState(null)
  const [equipment, setEquipment] = useState([])

  useEffect(() => {
    // Fetch project details and equipment stock
    // This is a placeholder for the API call
    const fetchProjectDetails = async () => {
      // Simulated API call
      const projectData = {
        id: projectId,
        name: 'Water Damage Restoration - 123 Main St',
        dryingChambers: [
          {
            id: 1,
            name: 'Main Floor',
            equipment: [
              { id: 1, type: 'Dehumidifier', model: 'DH-2000', serialNumber: 'DH2000-001' },
              { id: 2, type: 'Air Mover', model: 'AM-500', serialNumber: 'AM500-001' },
            ],
            dailyReadings: [
              {
                date: '2023-04-02',
                chamberConditions: { temperature: 72, rh: 45, gpp: 55 },
                outdoorConditions: { temperature: 68, rh: 60 },
                unaffectedAreaConditions: { temperature: 70, rh: 50 },
                equipmentReadings: [
                  { equipmentId: 1, temperature: 85, rh: 30, gpp: 40 },
                  { equipmentId: 2, amperage: 2.5 },
                ],
              },
            ],
          },
        ],
      }
      setProject(projectData)
    }

    const fetchEquipmentStock = async () => {
      // Simulated API call
      const equipmentData = [
        { id: 1, type: 'Dehumidifier', model: 'DH-2000', available: 5 },
        { id: 2, type: 'Air Mover', model: 'AM-500', available: 10 },
        { id: 3, type: 'Air Scrubber', model: 'AS-1000', available: 3 },
      ]
      setEquipment(equipmentData)
    }

    fetchProjectDetails()
    fetchEquipmentStock()
  }, [projectId])

  const addDryingChamber = () => {
    const chamberName = prompt('Enter drying chamber name:')
    if (chamberName) {
      const newChamber = {
        id: Date.now(),
        name: chamberName,
        equipment: [],
        dailyReadings: [],
      }
      setProject({
        ...project,
        dryingChambers: [...project.dryingChambers, newChamber],
      })
    }
  }

  const addEquipmentToChamber = (chamberId) => {
    const selectedEquipmentId = prompt('Enter equipment ID to add:')
    const selectedEquipment = equipment.find(eq => eq.id === parseInt(selectedEquipmentId))
    if (selectedEquipment) {
      const updatedChambers = project.dryingChambers.map(chamber => 
        chamber.id === chamberId
          ? {
              ...chamber,
              equipment: [
                ...chamber.equipment,
                {
                  id: Date.now(),
                  type: selectedEquipment.type,
                  model: selectedEquipment.model,
                  serialNumber: prompt(`Enter serial number for ${selectedEquipment.type} ${selectedEquipment.model}:`),
                }
              ],
            }
          : chamber
      )
      setProject({ ...project, dryingChambers: updatedChambers })
    }
  }

  const addDailyReading = (chamberId) => {
    const newReading = {
      date: new Date().toISOString().split('T')[0],
      chamberConditions: { temperature: '', rh: '', gpp: '' },
      outdoorConditions: { temperature: '', rh: '' },
      unaffectedAreaConditions: { temperature: '', rh: '' },
      equipmentReadings: [],
    }
    const updatedChambers = project.dryingChambers.map(chamber => 
      chamber.id === chamberId
        ? { ...chamber, dailyReadings: [...chamber.dailyReadings, newReading] }
        : chamber
    )
    setProject({ ...project, dryingChambers: updatedChambers })
  }

  const updateDailyReading = (chamberId, readingIndex, field, value) => {
    const updatedChambers = project.dryingChambers.map(chamber => 
      chamber.id === chamberId
        ? {
            ...chamber,
            dailyReadings: chamber.dailyReadings.map((reading, index) => 
              index === readingIndex
                ? { ...reading, [field]: value }
                : reading
            ),
          }
        : chamber
    )
    setProject({ ...project, dryingChambers: updatedChambers })
  }

  if (!project) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Drying & Equipment Details</h1>
      <h2 className="text-2xl font-semibold mb-4">{project.name}</h2>
      <Link to={`/project/${projectId}`} className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to Project Details
      </Link>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Drying Chambers</h3>
        <button onClick={addDryingChamber} className="bg-green-500 text-white px-3 py-1 rounded text-sm mb-2">
          Add Drying Chamber
        </button>
        {project.dryingChambers.map(chamber => (
          <div key={chamber.id} className="bg-gray-100 p-4 rounded mb-4">
            <h4 className="text-lg font-medium mb-2">{chamber.name}</h4>
            <div className="mb-4">
              <h5 className="font-medium">Equipment</h5>
              <ul className="list-disc pl-5">
                {chamber.equipment.map(eq => (
                  <li key={eq.id}>{eq.type} - {eq.model} (S/N: {eq.serialNumber})</li>
                ))}
              </ul>
              <button onClick={() => addEquipmentToChamber(chamber.id)} className="bg-blue-500 text-white px-2 py-1 rounded text-xs mt-2">
                Add Equipment
              </button>
            </div>
            <div>
              <h5 className="font-medium">Daily Readings</h5>
              {chamber.dailyReadings.map((reading, index) => (
                <div key={index} className="bg-white p-2 rounded mb-2">
                  <p>Date: {reading.date}</p>
                  <p>Chamber: {reading.chamberConditions.temperature}°F, {reading.chamberConditions.rh}%, {reading.chamberConditions.gpp} GPP</p>
                  <p>Outdoor: {reading.outdoorConditions.temperature}°F, {reading.outdoorConditions.rh}%</p>
                  <p>Unaffected: {reading.unaffectedAreaConditions.temperature}°F, {reading.unaffectedAreaConditions.rh}%</p>
                  <h6 className="font-medium">Equipment Readings:</h6>
                  <ul className="list-disc pl-5">
                    {reading.equipmentReadings.map(eqReading => (
                      <li key={eqReading.equipmentId}>
                        {chamber.equipment.find(eq => eq.id === eqReading.equipmentId)?.type}: 
                        {eqReading.temperature && ` ${eqReading.temperature}°F,`}
                        {eqReading.rh && ` ${eqReading.rh}%,`}
                        {eqReading.gpp && ` ${eqReading.gpp} GPP,`}
                        {eqReading.amperage && ` ${eqReading.amperage} A`}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <button onClick={() => addDailyReading(chamber.id)} className="bg-blue-500 text-white px-2 py-1 rounded text-xs">
                Add Daily Reading
              </button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Equipment Stock</h3>
        <ul className="list-disc pl-5">
          {equipment.map(eq => (
            <li key={eq.id}>{eq.type} - {eq.model}: {eq.available} available</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default DryingDetails