import React, { useState } from 'react'
import { Plus, Edit, Trash } from 'lucide-react'

const EquipmentList = () => {
  const [equipment, setEquipment] = useState([
    { id: 1, type: 'Dehumidifier', model: 'DH-2000', ahamRating: 70 },
    { id: 2, type: 'Air Mover', model: 'AM-500', cfmRating: 2500 },
    { id: 3, type: 'Air Filtration Unit', model: 'AFD-1000', cfmRating: 1000 },
    { id: 4, type: 'Hydroxyl Generator', model: 'HG-3000', optics: 3 },
    { id: 5, type: 'Portable Generator', model: 'PG-5000', wattage: 5000 },
    { id: 6, type: 'Ozone Generator', model: 'OG-1500', cfmRating: 1500 },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newEquipment, setNewEquipment] = useState({
    type: '',
    model: '',
    specification: '',
  })

  const addEquipment = () => {
    setShowAddForm(true)
  }

  const handleAddEquipment = (e) => {
    e.preventDefault()
    const equipmentToAdd = {
      id: equipment.length + 1,
      ...newEquipment,
      [getSpecificationKey(newEquipment.type)]: parseFloat(newEquipment.specification),
    }
    setEquipment([...equipment, equipmentToAdd])
    setShowAddForm(false)
    setNewEquipment({ type: '', model: '', specification: '' })
  }

  const editEquipment = (id) => {
    // Implement edit equipment functionality
  }

  const deleteEquipment = (id) => {
    setEquipment(equipment.filter(item => item.id !== id))
  }

  const getSpecificationKey = (type) => {
    switch (type) {
      case 'Dehumidifier':
        return 'ahamRating'
      case 'Air Mover':
      case 'Air Filtration Unit':
      case 'Ozone Generator':
        return 'cfmRating'
      case 'Hydroxyl Generator':
        return 'optics'
      case 'Portable Generator':
        return 'wattage'
      default:
        return ''
    }
  }

  const renderSpecification = (item) => {
    switch (item.type) {
      case 'Dehumidifier':
        return `AHAM Rating: ${item.ahamRating} pints/day`
      case 'Air Mover':
      case 'Air Filtration Unit':
      case 'Ozone Generator':
        return `CFM Rating: ${item.cfmRating}`
      case 'Hydroxyl Generator':
        return `Optics: ${item.optics}`
      case 'Portable Generator':
        return `Wattage: ${item.wattage}W`
      default:
        return ''
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Equipment Stock</h1>
      <button onClick={addEquipment} className="mb-4 bg-blue-500 text-white px-4 py-2 rounded flex items-center">
        <Plus className="w-5 h-5 mr-2" />
        Add New Equipment
      </button>
      {showAddForm && (
        <form onSubmit={handleAddEquipment} className="mb-4 bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Add New Equipment</h2>
          <div className="grid grid-cols-3 gap-4">
            <select
              value={newEquipment.type}
              onChange={(e) => setNewEquipment({ ...newEquipment, type: e.target.value })}
              className="border p-2 rounded"
              required
            >
              <option value="">Select Type</option>
              <option value="Dehumidifier">Dehumidifier</option>
              <option value="Air Mover">Air Mover</option>
              <option value="Air Filtration Unit">Air Filtration Unit</option>
              <option value="Hydroxyl Generator">Hydroxyl Generator</option>
              <option value="Portable Generator">Portable Generator</option>
              <option value="Ozone Generator">Ozone Generator</option>
            </select>
            <input
              type="text"
              placeholder="Model"
              value={newEquipment.model}
              onChange={(e) => setNewEquipment({ ...newEquipment, model: e.target.value })}
              className="border p-2 rounded"
              required
            />
            <input
              type="number"
              placeholder={newEquipment.type ? `${getSpecificationKey(newEquipment.type)}` : 'Specification'}
              value={newEquipment.specification}
              onChange={(e) => setNewEquipment({ ...newEquipment, specification: e.target.value })}
              className="border p-2 rounded"
              required
            />
          </div>
          <button type="submit" className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
            Add Equipment
          </button>
        </form>
      )}
      <ul className="space-y-4">
        {equipment.map(item => (
          <li key={item.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{item.type}</h3>
              <p className="text-sm text-gray-500">Model: {item.model}</p>
              <p className="text-sm text-gray-500">{renderSpecification(item)}</p>
            </div>
            <div>
              <button onClick={() => editEquipment(item.id)} className="text-blue-500 mr-2">
                <Edit className="w-5 h-5" />
              </button>
              <button onClick={() => deleteEquipment(item.id)} className="text-red-500">
                <Trash className="w-5 h-5" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default EquipmentList