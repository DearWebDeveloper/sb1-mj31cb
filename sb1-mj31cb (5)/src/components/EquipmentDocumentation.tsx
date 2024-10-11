import React, { useState } from 'react'
import { Fan, Thermometer, Droplet } from 'lucide-react'

const EquipmentDocumentation = () => {
  const [equipment, setEquipment] = useState([
    { id: 1, type: 'Air Mover', count: 3, runtime: 72 },
    { id: 2, type: 'Dehumidifier', count: 1, runtime: 72 },
    { id: 3, type: 'Air Scrubber', count: 1, runtime: 48 },
  ])

  const [readings, setReadings] = useState({
    temperature: 72,
    humidity: 45,
    moisture: 12,
  })

  const updateEquipmentRuntime = (id, hours) => {
    setEquipment(equipment.map(item =>
      item.id === id ? { ...item, runtime: item.runtime + hours } : item
    ))
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Equipment Documentation</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Equipment Log</h2>
          <ul className="space-y-4">
            {equipment.map(item => (
              <li key={item.id} className="flex items-center justify-between">
                <span>{item.type} (x{item.count})</span>
                <div>
                  <span className="mr-2">{item.runtime} hrs</span>
                  <button
                    onClick={() => updateEquipmentRuntime(item.id, 24)}
                    className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                  >
                    +24h
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Environmental Readings</h2>
          <div className="space-y-4">
            <ReadingItem
              icon={Thermometer}
              label="Temperature"
              value={readings.temperature}
              unit="°F"
            />
            <ReadingItem
              icon={Droplet}
              label="Relative Humidity"
              value={readings.humidity}
              unit="%"
            />
            <ReadingItem
              icon={Fan}
              label="Moisture Content"
              value={readings.moisture}
              unit="%"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const ReadingItem = ({ icon: Icon, label, value, unit }) => (
  <div className="flex items-center">
    <Icon className="w-6 h-6 text-blue-500 mr-2" />
    <span className="flex-1">{label}</span>
    <span className="font-semibold">
      {value} {unit}
    </span>
  </div>
)

export default EquipmentDocumentation